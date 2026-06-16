import { PLATFORM_ID } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AuInternalTimePickerPanel } from './field-time-picker-panel';

@Component({
  imports: [AuInternalTimePickerPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #anchor
      class="anchor"
    >
      Anchor
    </div>
    <au-internal-time-picker-panel
      [open]="open"
      [selected]="selected"
      [minTime]="minTime"
      [maxTime]="maxTime"
      [anchor]="anchorRef()?.nativeElement ?? null"
      [locale]="locale"
      (pick)="onPick($event)"
      (dismiss)="onDismiss()"
    />
  `,
})
class Host {
  open = true;
  selected: string | null = '14:30';
  minTime: string | undefined = '08:00';
  maxTime: string | undefined = '20:00';
  locale: string | undefined = undefined;
  picked: string | null = null;
  dismissCount = 0;
  readonly anchorRef = viewChild<ElementRef<HTMLElement>>('anchor');

  onPick(value: string): void {
    this.picked = value;
  }

  onDismiss(): void {
    this.dismissCount++;
  }
}

describe('AuInternalTimePickerPanel', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
  });

  afterEach(() => {
    document.body.querySelectorAll('.au-time-picker').forEach((el) => el.remove());
  });

  function createHost() {
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    return fix;
  }

  function panelInstance(fix: ReturnType<typeof createHost>): AuInternalTimePickerPanel {
    return fix.debugElement.query(By.directive(AuInternalTimePickerPanel))
      .componentInstance as AuInternalTimePickerPanel;
  }

  it('renders hour and minute columns when open', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    expect(document.body.querySelectorAll('.au-time-picker__option').length).toBe(84);
  });

  it('picks a minute and dismisses', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const minute = document.body.querySelector(
      '.au-time-picker__column:last-of-type .au-time-picker__option:not([disabled])',
    ) as HTMLButtonElement;
    minute.click();
    expect(fix.componentInstance.picked).toBeTruthy();
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('moves to minute column after hour pick', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const hour = document.body.querySelector(
      '.au-time-picker__column:first-of-type .au-time-picker__option:not([disabled])',
    ) as HTMLButtonElement;
    hour.click();
    await fix.whenStable();
    expect(fix.componentInstance.dismissCount).toBe(0);
    expect(
      (panelInstance(fix) as unknown as { activeColumn: () => string }).activeColumn(),
    ).toBe('minute');
  });

  it('dismisses on Escape', () => {
    const fix = createHost();
    panelInstance(fix).onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('prevents wheel scroll without hiding the page scrollbar', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
  });

  it('dismisses when the page scrolls outside the panel', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    document.dispatchEvent(new Event('scroll'));
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('navigates columns with arrow keys', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
    );
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }),
    );
    expect(
      (panel as unknown as { activeColumn: () => string }).activeColumn(),
    ).toBe('hour');
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }),
    );
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
  });

  it('ignores unhandled panel keys', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true }),
    );
    expect(fix.componentInstance.picked).toBeNull();
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('traps Tab within the panel', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panelEl = document.body.querySelector('.au-time-picker') as HTMLElement;
    panelEl.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    );
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
  });

  it('falls back when every minute is disabled for an hour', () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.minTime = '12:00';
    fix.componentInstance.maxTime = '11:59';
    fix.detectChanges();
    const panel = panelInstance(fix);
    expect(
      (panel as unknown as { firstEnabledMinute(hour: number): number }).firstEnabledMinute(12),
    ).toBe(0);
  });

  it('skips hour arrow navigation at the first enabled hour', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.selected = '08:00';
    fix.componentInstance.minTime = '08:00';
    fix.componentInstance.maxTime = '20:00';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }),
    );
    expect(fix.componentInstance.picked).toBeNull();
  });

  it('does not emit invalid times from emitPick', () => {
    const fix = createHost();
    const panel = panelInstance(fix);
    (panel as unknown as { emitPick(value: string): void }).emitPick('25:99');
    expect(fix.componentInstance.picked).toBeNull();
  });

  it('ignores disabled minute picks', () => {
    const fix = createHost();
    fix.componentInstance.maxTime = '20:00';
    fix.detectChanges();
    const panel = panelInstance(fix);
    panel.onPickHour(20);
    panel.onPickMinute(30);
    expect(fix.componentInstance.picked).toBeNull();
  });

  it('ignores disabled hour picks', () => {
    const fix = createHost();
    panelInstance(fix).onPickHour(7);
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('switches columns with PageUp and PageDown', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    const panelEl = document.body.querySelector('.au-time-picker') as HTMLElement;
    panelEl.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true, cancelable: true }),
    );
    expect(
      (panel as unknown as { activeColumn: () => string }).activeColumn(),
    ).toBe('minute');
    panelEl.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true, cancelable: true }),
    );
    expect(
      (panel as unknown as { activeColumn: () => string }).activeColumn(),
    ).toBe('hour');
  });

  it('moves hour focus with vertical keys', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }),
    );
    expect(
      (panel as unknown as { focusedHour: () => number }).focusedHour(),
    ).not.toBe(14);
  });

  it('moves minute focus with vertical keys', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    (panel as unknown as { activeColumn: { set(v: string): void } }).activeColumn.set(
      'minute',
    );
    const before = (panel as unknown as { focusedMinute: () => number }).focusedMinute();
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }),
    );
    expect(
      (panel as unknown as { focusedMinute: () => number }).focusedMinute(),
    ).toBe(before + 1);
  });

  it('skips minute navigation when already at edge', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.selected = '08:00';
    fix.componentInstance.minTime = '08:00';
    fix.componentInstance.maxTime = '08:00';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    (panel as unknown as { activeColumn: { set(v: string): void } }).activeColumn.set(
      'minute',
    );
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }),
    );
    expect(fix.componentInstance.picked).toBeNull();
  });

  it('confirms with Enter on hour then minute columns', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
    );
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
    );
    expect(fix.componentInstance.picked).toBeTruthy();
  });

  it('confirms with Space on minute column', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    (panel as unknown as { activeColumn: { set(v: string): void } }).activeColumn.set(
      'minute',
    );
    panel.onPanelKeydown(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
    expect(fix.componentInstance.picked).toBeTruthy();
  });

  it('dismisses on Escape at document level', () => {
    const fix = createHost();
    panelInstance(fix).onDocumentKeydown(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('ignores document Escape when closed', () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.open = false;
    fix.detectChanges();
    panelInstance(fix).onDocumentKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('ignores document click when target is not a Node', () => {
    const fix = createHost();
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: null, configurable: true });
    panelInstance(fix).onDocumentClick(ev);
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('prevents wheel when the event target is not a Node', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    Object.defineProperty(wheel, 'target', { value: {}, configurable: true });
    document.body.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
  });

  it('stays open when scrolling inside the panel', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = document.body.querySelector('.au-time-picker') as HTMLElement;
    panel.dispatchEvent(new Event('scroll', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('blocks wheel on panel chrome outside the scroll columns', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const preview = document.body.querySelector('.au-time-picker__preview') as HTMLElement;
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 10 });
    preview.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('allows wheel inside scrollable time columns', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const column = document.body.querySelector('.au-time-picker__column') as HTMLElement;
    Object.defineProperty(column, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(column, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(column, 'clientHeight', { value: 200, configurable: true });
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 10 });
    column.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(false);
  });

  it('focusActiveOption no-ops when panel is missing', () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.open = false;
    fix.detectChanges();
    const panel = panelInstance(fix);
    expect(() =>
      (panel as unknown as { focusActiveOption(): void }).focusActiveOption(),
    ).not.toThrow();
  });

  it('does not render panel when closed', async () => {
    const fix = createHost();
    fix.componentInstance.open = false;
    fix.detectChanges();
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-time-picker')).toBeNull();
  });

  it('dismisses on outside click', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('blocks outside pointer interaction while open', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const outside = document.createElement('a');
    outside.href = 'https://example.com';
    document.body.append(outside);
    const event = new PointerEvent('pointerdown', { bubbles: true, cancelable: true });
    outside.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(fix.componentInstance.dismissCount).toBe(1);
    outside.remove();
  });

  it('skips document click on server platform', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    await fix.whenStable();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });
});
