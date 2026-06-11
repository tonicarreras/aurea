import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { AuTooltip } from './au-tooltip.directive';

@Component({
  imports: [AuTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="trigger"
      [auTooltip]="text"
      [auTooltipShowDelay]="showDelay"
      [auTooltipHideDelay]="hideDelay"
      [auTooltipDisabled]="disabled"
      [auTooltipPlacement]="placement"
    >
      Trigger
    </button>
  `,
})
class TooltipHost {
  text = 'Help text';
  showDelay = 0;
  hideDelay = 0;
  disabled = false;
  placement = 'top' as const;
}

describe('AuTooltip', () => {
  let fixture: ComponentFixture<TooltipHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TooltipHost);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.querySelectorAll('.au-tooltip__bubble').forEach((el) => el.remove());
  });

  function trigger(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.trigger') as HTMLButtonElement;
  }

  function bubble(): HTMLElement | null {
    return document.body.querySelector('.au-tooltip__bubble');
  }

  async function showTooltip(): Promise<void> {
    trigger().dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('shows and hides the tooltip on hover', async () => {
    await showTooltip();
    expect(bubble()?.textContent?.trim()).toBe('Help text');
    expect(bubble()?.getAttribute('role')).toBe('tooltip');
    expect(trigger().getAttribute('aria-describedby')).toMatch(/^au-tooltip-/);

    trigger().dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(bubble()).toBeFalsy();
  });

  it('shows on focus and hides on blur', async () => {
    trigger().dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(bubble()?.textContent?.trim()).toBe('Help text');

    trigger().dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }),
    );
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(bubble()).toBeFalsy();
  });

  it('respects showDelay and hideDelay', async () => {
    vi.useFakeTimers();
    const delayed = TestBed.createComponent(TooltipHost);
    delayed.componentInstance.showDelay = 100;
    delayed.componentInstance.hideDelay = 50;
    delayed.detectChanges();
    const delayedTrigger = delayed.nativeElement.querySelector('.trigger') as HTMLButtonElement;

    delayedTrigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await vi.advanceTimersByTimeAsync(99);
    delayed.detectChanges();
    expect(document.body.querySelector('.au-tooltip__bubble')).toBeFalsy();

    await vi.advanceTimersByTimeAsync(1);
    delayed.detectChanges();
    await delayed.whenStable();
    delayed.detectChanges();
    expect(document.body.querySelector('.au-tooltip__bubble')?.textContent?.trim()).toBe(
      'Help text',
    );

    delayedTrigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    await vi.advanceTimersByTimeAsync(50);
    delayed.detectChanges();
    expect(document.body.querySelector('.au-tooltip__bubble')).toBeFalsy();
    delayed.destroy();
    vi.useRealTimers();
  });

  it('does not show when disabled or text is empty', async () => {
    const disabledFix = TestBed.createComponent(TooltipHost);
    disabledFix.componentInstance.disabled = true;
    disabledFix.detectChanges();
    disabledFix.nativeElement
      .querySelector('.trigger')!
      .dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    disabledFix.detectChanges();
    await disabledFix.whenStable();
    expect(document.body.querySelector('.au-tooltip__bubble')).toBeFalsy();
    disabledFix.destroy();

    const emptyFix = TestBed.createComponent(TooltipHost);
    emptyFix.componentInstance.text = '   ';
    emptyFix.detectChanges();
    emptyFix.nativeElement
      .querySelector('.trigger')!
      .dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    emptyFix.detectChanges();
    await emptyFix.whenStable();
    expect(document.body.querySelector('.au-tooltip__bubble')).toBeFalsy();
    emptyFix.destroy();
  });

  it('closes on Escape', async () => {
    await showTooltip();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(bubble()).toBeFalsy();
  });

  it('ignores unrelated keys', async () => {
    await showTooltip();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fixture.detectChanges();
    expect(bubble()?.textContent?.trim()).toBe('Help text');
  });

  it('does not hide when focus moves within the host', async () => {
    const host = trigger();
    host.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const inner = document.createElement('span');
    host.append(inner);
    host.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: inner }));
    fixture.detectChanges();
    expect(bubble()?.textContent?.trim()).toBe('Help text');
    inner.remove();
  });

  it('clears a pending hide timer when the pointer re-enters', async () => {
    vi.useFakeTimers();
    const delayed = TestBed.createComponent(TooltipHost);
    delayed.componentInstance.hideDelay = 100;
    delayed.detectChanges();
    const delayedTrigger = delayed.nativeElement.querySelector('.trigger') as HTMLButtonElement;
    delayedTrigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    delayed.detectChanges();
    await vi.advanceTimersByTimeAsync(0);
    delayed.detectChanges();
    delayedTrigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    delayedTrigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await vi.advanceTimersByTimeAsync(100);
    delayed.detectChanges();
    expect(document.body.querySelector('.au-tooltip__bubble')?.textContent?.trim()).toBe(
      'Help text',
    );
    delayed.destroy();
    vi.useRealTimers();
  });

  it('transforms null auTooltip input to empty string', () => {
    const tipFix = TestBed.createComponent(TooltipHost);
    tipFix.componentInstance.text = null as unknown as string;
    tipFix.detectChanges();
    const directive = tipFix.debugElement.query(By.directive(AuTooltip))!.injector.get(AuTooltip);
    expect(directive.hasText()).toBe(false);
    tipFix.destroy();
  });

  it('removeBubble is a no-op when no bubble exists', () => {
    const directive = fixture.debugElement.query(By.directive(AuTooltip))!.injector.get(AuTooltip);
    (directive as unknown as { removeBubble(): void }).removeBubble();
    expect(bubble()).toBeFalsy();
  });

  it('ensureBubble reuses the existing bubble element', async () => {
    await showTooltip();
    const directive = fixture.debugElement.query(By.directive(AuTooltip))!.injector.get(AuTooltip);
    const api = directive as unknown as { ensureBubble(): HTMLElement; bubble: HTMLElement | null };
    const first = api.ensureBubble();
    const second = api.ensureBubble();
    expect(second).toBe(first);
  });

  it('removeBubble detaches the bubble when it is still in the document', () => {
    const directive = fixture.debugElement.query(By.directive(AuTooltip))!.injector.get(AuTooltip);
    const api = directive as unknown as { bubble: HTMLElement | null; removeBubble(): void };
    const el = document.createElement('div');
    el.className = 'au-tooltip__bubble';
    document.body.append(el);
    api.bubble = el;
    api.removeBubble();
    expect(document.body.contains(el)).toBe(false);
    expect(api.bubble).toBeNull();
  });
});
