import { PLATFORM_ID } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, describe, expect, it } from 'vitest';
import { AuInternalTemporalPickerPanel } from './field-bounded-temporal-picker';
import type { TemporalPickerOption } from './field-temporal-options';

const OPTIONS: TemporalPickerOption[] = [
  { value: '2026-06-15', label: '15 Jun 2026', disabled: false },
  { value: '2026-06-01', label: '1 Jun 2026', disabled: true },
];

@Component({
  imports: [AuInternalTemporalPickerPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #anchor
      class="anchor"
    >
      Anchor
    </div>
    <au-internal-temporal-picker-panel
      [open]="open"
      [options]="options"
      [selected]="selected"
      [anchor]="anchorRef()?.nativeElement ?? null"
      [ariaLabel]="ariaLabel"
      (pick)="onPick($event)"
      (dismiss)="onDismiss()"
    />
  `,
})
class Host {
  open = true;
  options = OPTIONS;
  selected: string | null = '2026-06-15';
  ariaLabel = 'Choose a date';
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

describe('AuInternalTemporalPickerPanel', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
  });

  afterEach(() => {
    document.body.querySelectorAll('.au-field-bounded-picker').forEach((el) => el.remove());
  });

  async function createHost(): Promise<ReturnType<typeof TestBed.createComponent<Host>>> {
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    return fix;
  }

  function panelInstance(
    fix: ReturnType<typeof TestBed.createComponent<Host>>,
  ): AuInternalTemporalPickerPanel {
    return fix.debugElement.query(By.directive(AuInternalTemporalPickerPanel))
      .componentInstance as AuInternalTemporalPickerPanel;
  }

  function panelOptions(): NodeListOf<Element> {
    return document.body.querySelectorAll('.au-field-bounded-picker__option');
  }

  it('renders options when open', async () => {
    const fix = await createHost();
    await fix.whenStable();
    expect(panelOptions().length).toBe(2);
  });

  it('does not render panel when closed', async () => {
    const fix = await createHost();
    fix.componentInstance.open = false;
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-field-bounded-picker')).toBeNull();
  });

  it('emits pick and dismiss for enabled option', async () => {
    const fix = await createHost();
    await fix.whenStable();
    const btn = document.body.querySelector(
      '.au-field-bounded-picker__option:not([disabled])',
    ) as HTMLButtonElement;
    btn.click();
    expect(fix.componentInstance.picked).toBe('2026-06-15');
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('ignores disabled option picks', async () => {
    const fix = await createHost();
    panelInstance(fix).onPick(OPTIONS[1]);
    expect(fix.componentInstance.picked).toBeNull();
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('dismisses on Escape in panel', async () => {
    const fix = await createHost();
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    panelInstance(fix).onPanelKeydown(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('dismisses on Escape via host panel keydown binding', async () => {
    const fix = await createHost();
    await fix.whenStable();
    const panel = document.body.querySelector('.au-field-bounded-picker') as HTMLElement;
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    panel.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('ignores non-Escape keys in panel', async () => {
    const fix = await createHost();
    await fix.whenStable();
    const panel = document.body.querySelector('.au-field-bounded-picker') as HTMLElement;
    const ev = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    panel.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(false);
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('dismisses on Escape at document level', async () => {
    const fix = await createHost();
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    panelInstance(fix).onDocumentKeydown(ev);
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('ignores document Escape when closed', async () => {
    const fix = TestBed.createComponent(Host);
    fix.componentInstance.open = false;
    await fix.whenStable();
    panelInstance(fix).onDocumentKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('dismisses on outside click', async () => {
    const fix = await createHost();
    await fix.whenStable();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(1);
  });

  it('ignores click inside panel', async () => {
    const fix = await createHost();
    await fix.whenStable();
    const panelEl = document.body.querySelector('.au-field-bounded-picker') as HTMLElement;
    panelEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('ignores click on anchor', async () => {
    const fix = await createHost();
    await fix.whenStable();
    fix.nativeElement
      .querySelector('.anchor')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('ignores click on host element', async () => {
    const fix = await createHost();
    await fix.whenStable();
    fix.nativeElement
      .querySelector('au-internal-temporal-picker-panel')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('ignores document click when target is not a Node', async () => {
    const fix = await createHost();
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: null, configurable: true });
    panelInstance(fix).onDocumentClick(ev);
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('skips document click on server platform', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(fix.componentInstance.dismissCount).toBe(0);
  });

  it('detaches overlay when anchor is missing', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AuInternalTemporalPickerPanel],
    }).compileComponents();
    const fix = TestBed.createComponent(AuInternalTemporalPickerPanel);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('options', OPTIONS);
    fix.componentRef.setInput('anchor', null);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-field-bounded-picker')).toBeTruthy();
  });
});
