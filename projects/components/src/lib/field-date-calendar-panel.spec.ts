import { PLATFORM_ID } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AuInternalDateCalendarPanel } from './field-date-calendar-panel';

@Component({
  imports: [AuInternalDateCalendarPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #anchor
      class="anchor"
    >
      Anchor
    </div>
    <au-internal-date-calendar-panel
      [open]="open"
      [selected]="selected"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [anchor]="anchorRef()?.nativeElement ?? null"
      [locale]="locale"
      (pick)="onPick($event)"
      (dismiss)="onDismiss()"
    />
  `,
})
class Host {
  open = true;
  selected: string | null = '2026-06-15';
  minDate: string | undefined = '2026-06-01';
  maxDate: string | undefined = '2026-06-30';
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

describe('AuInternalDateCalendarPanel', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
  });

  afterEach(() => {
    document.body.querySelectorAll('.au-date-calendar').forEach((el) => el.remove());
  });

  function createHost() {
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    return fix;
  }

  function panelInstance(fix: ReturnType<typeof createHost>): AuInternalDateCalendarPanel {
    return fix.debugElement.query(By.directive(AuInternalDateCalendarPanel))
      .componentInstance as AuInternalDateCalendarPanel;
  }

  it('renders month grid when open', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    expect(document.body.querySelectorAll('.au-date-calendar__day').length).toBeGreaterThan(20);
  });

  it('does not render panel when closed', async () => {
    const fix = createHost();
    fix.componentInstance.open = false;
    fix.detectChanges();
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-date-calendar')).toBeNull();
  });

  it('picks an enabled day', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const day = document.body.querySelector(
      '.au-date-calendar__day:not([disabled])',
    ) as HTMLButtonElement;
    day.click();
    expect(fix.componentInstance.picked).toBeTruthy();
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('ignores disabled day picks', () => {
    const fix = createHost();
    panelInstance(fix).onPickDay('2026-05-31', true);
    expect(fix.componentInstance.picked).toBeNull();
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('dismisses on Escape in panel', () => {
    const fix = createHost();
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    panelInstance(fix).onPanelKeydown(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('navigates months with PageUp and PageDown', () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.minDate = undefined;
    fix.componentInstance.maxDate = undefined;
    fix.detectChanges();
    const panel = panelInstance(fix);
    const up = new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true, cancelable: true });
    panel.onPanelKeydown(up);
    expect(up.defaultPrevented).toBe(true);

    const down = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true, cancelable: true });
    panel.onPanelKeydown(down);
    expect(down.defaultPrevented).toBe(true);
  });

  it('updates focused iso when arrow moves to a new enabled day', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panelEl = document.body.querySelector('.au-date-calendar') as HTMLElement;
    const before = (panelInstance(fix) as unknown as { focusedIso: () => string }).focusedIso();
    panelEl.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
    );
    expect(
      (panelInstance(fix) as unknown as { focusedIso: () => string }).focusedIso(),
    ).not.toBe(before);
  });

  it('moves focus with arrow keys and picks with Enter', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    const right = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    panel.onPanelKeydown(right);
    expect(right.defaultPrevented).toBe(true);

    const up = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true });
    panel.onPanelKeydown(up);
    expect(up.defaultPrevented).toBe(true);

    const down = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
    panel.onPanelKeydown(down);
    expect(down.defaultPrevented).toBe(true);

    const home = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true });
    panel.onPanelKeydown(home);
    expect(home.defaultPrevented).toBe(true);

    const end = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true });
    panel.onPanelKeydown(end);
    expect(end.defaultPrevented).toBe(true);

    const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    panel.onPanelKeydown(enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(fix.componentInstance.picked).toBeTruthy();
  });

  it('skips grid update when arrow stays on the same day', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.selected = '2026-06-01';
    fix.componentInstance.minDate = '2026-06-01';
    fix.componentInstance.maxDate = '2026-06-30';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    expect((panel as unknown as { focusedIso: () => string }).focusedIso()).toBe('2026-06-01');
    panel.onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }),
    );
  });

  it('ignores arrow navigation when next day is out of bounds', async () => {
    const fix = createHost();
    fix.componentInstance.selected = '2026-06-01';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    const left = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
    panel.onPanelKeydown(left);
    expect(left.defaultPrevented).toBe(true);
    expect(fix.componentInstance.picked).toBeNull();
  });

  it('does not pick disabled focused day with Space', () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.selected = '2026-06-15';
    fix.componentInstance.minDate = '2026-06-10';
    fix.componentInstance.maxDate = '2026-06-30';
    fix.detectChanges();
    const panel = panelInstance(fix);
    (panel as unknown as { focusedIso: { set(v: string): void } }).focusedIso.set('2026-06-05');
    const space = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    panel.onPanelKeydown(space);
    expect(space.defaultPrevented).toBe(true);
    expect(fix.componentInstance.picked).toBeNull();
  });

  it('dismisses on Escape at document level', () => {
    const fix = createHost();
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    panelInstance(fix).onDocumentKeydown(ev);
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('ignores document Escape when closed', () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.open = false;
    fix.detectChanges();
    panelInstance(fix).onDocumentKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(fix.componentInstance.dismissCount).toBe(0);
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

  it('ignores click inside panel', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panelEl = document.body.querySelector('.au-date-calendar') as HTMLElement;
    panelEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('ignores click on anchor', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    fix.nativeElement
      .querySelector('.anchor')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('ignores click on host element', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    fix.nativeElement
      .querySelector('au-internal-date-calendar-panel')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('ignores document click when target is not a Node', () => {
    const fix = createHost();
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: null, configurable: true });
    panelInstance(fix).onDocumentClick(ev);
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('blocks month navigation at min and max bounds', async () => {
    const fix = createHost();
    fix.componentInstance.minDate = '2026-06-01';
    fix.componentInstance.maxDate = '2026-06-30';
    fix.componentInstance.selected = '2026-06-15';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    panel.goPreviousMonth();
    panel.goNextMonth();
    const prevBtn = document.body.querySelector(
      '.au-date-calendar__nav:first-of-type',
    ) as HTMLButtonElement;
    const nextBtn = document.body.querySelector(
      '.au-date-calendar__nav:last-of-type',
    ) as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
    expect(nextBtn.disabled).toBe(true);
  });

  it('navigates months via header buttons', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.minDate = undefined;
    fix.componentInstance.maxDate = undefined;
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panelEl = document.body.querySelector('.au-date-calendar') as HTMLElement;
    const prevBtn = document.body.querySelector(
      '.au-date-calendar__nav:first-of-type',
    ) as HTMLButtonElement;
    const nextBtn = document.body.querySelector(
      '.au-date-calendar__nav:last-of-type',
    ) as HTMLButtonElement;
    prevBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    nextBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    panelEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(document.body.querySelector('.au-date-calendar__title')?.textContent).toBeTruthy();
  });

  it('ignores unhandled panel keys', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    panelInstance(fix).onPanelKeydown(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true }),
    );
    expect(fix.componentInstance.picked).toBeNull();
  });

  it('goPreviousMonth and goNextMonth update view when in range', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.minDate = undefined;
    fix.componentInstance.maxDate = undefined;
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    panel.goPreviousMonth();
    panel.goNextMonth();
    panel.goNextMonth();
  });

  it('keeps navigated month after re-render', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.minDate = undefined;
    fix.componentInstance.maxDate = undefined;
    fix.componentInstance.selected = '2026-06-15';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    const initialMonth = (panel as unknown as { viewMonth: () => number }).viewMonth();
    panel.goNextMonth();
    fix.detectChanges();
    await fix.whenStable();
    expect((panel as unknown as { viewMonth: () => number }).viewMonth()).toBe(
      initialMonth + 1,
    );
  });

  it('keeps navigated month when no date is selected', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.minDate = undefined;
    fix.componentInstance.maxDate = undefined;
    fix.componentInstance.selected = null;
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    const initialMonth = (panel as unknown as { viewMonth: () => number }).viewMonth();
    panel.goNextMonth();
    fix.detectChanges();
    await fix.whenStable();
    expect((panel as unknown as { viewMonth: () => number }).viewMonth()).toBe(
      initialMonth + 1,
    );
  });

  it('focusActiveDay focuses the active day button', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = panelInstance(fix);
    (panel as unknown as { focusActiveDay(): void }).focusActiveDay();
    const focused = document.activeElement as HTMLElement;
    expect(focused?.classList.contains('au-date-calendar__day')).toBe(true);
  });

  it('focuses first enabled day when selected is out of range', async () => {
    const fix = createHost();
    fix.componentInstance.selected = '2026-01-01';
    fix.componentInstance.minDate = '2026-06-01';
    fix.componentInstance.maxDate = '2026-06-30';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const focused = document.body.querySelector(
      '.au-date-calendar__day[tabindex="0"]',
    ) as HTMLButtonElement;
    expect(focused?.disabled).toBe(false);
  });

  it('renders localized weekday labels when locale is set', async () => {
    const fix = createHost();
    fix.componentInstance.locale = 'es-ES';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    expect(document.body.querySelectorAll('.au-date-calendar__weekday').length).toBe(7);
  });

  it('labels each day with a full date for screen readers', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const day = document.body.querySelector('.au-date-calendar__day') as HTMLButtonElement;
    expect(day.getAttribute('aria-label')).toMatch(/2026/);
  });

  it('prevents wheel scroll without hiding the page scrollbar', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    expect(document.body.style.overflow).not.toBe('hidden');
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
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

  it('dismisses when the page scrolls outside the panel', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    document.dispatchEvent(new Event('scroll'));
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('stays open when scrolling inside the panel', async () => {
    const fix = createHost();
    await fix.whenStable();
    await fix.whenStable();
    const panel = document.body.querySelector('.au-date-calendar') as HTMLElement;
    panel.dispatchEvent(new Event('scroll', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('focusActiveDay no-ops when panel is missing', () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.open = false;
    fix.detectChanges();
    const panel = panelInstance(fix);
    expect(() =>
      (panel as unknown as { focusActiveDay(): void }).focusActiveDay(),
    ).not.toThrow();
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

  it('keeps panel in host when anchor is missing', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AuInternalDateCalendarPanel],
    }).compileComponents();
    const fix = TestBed.createComponent(AuInternalDateCalendarPanel);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('selected', '2026-06-15');
    fix.componentRef.setInput('anchor', null);
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-date-calendar')).toBeTruthy();
  });

  it('falls back to today when every day in view is disabled', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.selected = null;
    fix.componentInstance.minDate = '2099-01-01';
    fix.componentInstance.maxDate = '2099-01-01';
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    expect(document.body.querySelector('.au-date-calendar')).toBeTruthy();
  });
});
