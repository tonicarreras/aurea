import { Directive, ElementRef, afterNextRender, computed, inject, input, OnDestroy, signal } from '@angular/core';
import { tabFocusState } from '../au-tab-focus-state';
import { AuTabs } from './tabs';

/**
 * Tab trigger inside `au-tabs`. Place on a `<button type="button">`.
 *
 * The projected button registers its label with the parent; an internal `ngTab`
 * button (rendered by `au-tabs`) handles WAI-ARIA behaviour via `@angular/aria`.
 *
 * @example
 * ```html
 * <button type="button" auTab="settings">Settings</button>
 * ```
 */
@Directive({
  selector: 'button[auTab]',
  host: {
    type: 'button',
    hidden: '',
    'aria-hidden': 'true',
    tabindex: '-1',
  },
})
export class AuTab implements OnDestroy {
  private readonly tabs = inject(AuTabs);
  readonly element = inject(ElementRef<HTMLButtonElement>);

  /** Tab key; must match the paired `auTabPanel` value. */
  readonly auTab = input.required<string>();
  readonly auTabDisabled = input(false);

  readonly focusByTab = signal(false);

  readonly label = computed(() => this.element.nativeElement.textContent?.trim() ?? '');

  private readonly registerWhenReady = afterNextRender(() => {
    this.tabs.registerTab(this);
  });

  ngOnDestroy(): void {
    this.tabs.unregisterTab(this);
  }

  onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onFocusout(): void {
    this.focusByTab.set(false);
  }
}
