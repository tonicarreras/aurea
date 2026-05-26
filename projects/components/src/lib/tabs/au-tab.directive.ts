import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { tabFocusState } from '../au-tab-focus-state';
import { AuTabs } from './tabs';

/**
 * Tab trigger inside `au-tabs`. Place on a `<button type="button">`.
 *
 * Declared as `Component` (not `Directive`) to support scoped styles via `styleUrl`.
 *
 * @example
 * ```html
 * <button type="button" auTab="settings">Settings</button>
 * ```
 */
@Component({
  selector: 'button[auTab]',
  template: '<ng-content />',
  styleUrl: './au-tab.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    class: 'au-tabs__tab',
    role: 'tab',
    '[class.au-tabs__tab--selected]': 'isSelected()',
    '[class.au-tabs__tab--from-tab]': 'focusByTab()',
    '[attr.id]': 'tabId()',
    '[attr.aria-selected]': 'isSelected() ? "true" : "false"',
    '[attr.aria-controls]': 'panelId()',
    '[attr.tabindex]': 'tabIndexAttr()',
    '[attr.disabled]': 'auTabDisabled() ? true : null',
    '[attr.data-au-variant]': 'tabs.variant()',
    '[attr.data-au-size]': 'tabs.size()',
    '[attr.data-au-orientation]': 'tabs.orientation()',
    '(click)': 'onClick($event)',
    '(focusin)': 'onFocusin()',
    '(focusout)': 'onFocusout()',
  },
})
export class AuTab {
  protected readonly tabs = inject(AuTabs);
  private readonly host = inject(ElementRef<HTMLButtonElement>);
  private readonly destroyRef = inject(DestroyRef);

  /** Tab key; must match the paired `auTabPanel` value. */
  readonly auTab = input.required<string>();
  readonly auTabDisabled = input(false);

  protected readonly focusByTab = signal(false);

  readonly tabId = computed(() => this.tabs.tabIdFor(this.auTab()));
  readonly panelId = computed(() => this.tabs.panelIdFor(this.auTab()));
  readonly isSelected = computed(() => this.tabs.value() === this.auTab());
  readonly tabIndexAttr = computed(() => (this.isSelected() ? 0 : -1));

  /** Registers with the parent once inputs are bound (post-render). */
  private readonly registerWhenReady = afterNextRender(() => {
    this.tabs.registerTab(this);
  });

  private readonly unregisterOnDestroy = this.destroyRef.onDestroy(() => {
    this.tabs.unregisterTab(this);
  });

  focus(): void {
    (this.host.nativeElement as HTMLElement).focus();
  }

  protected onClick(event: MouseEvent): void {
    if (this.auTabDisabled()) {
      event.preventDefault();
      return;
    }
    this.tabs.selectTab(this.auTab());
  }

  protected onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  protected onFocusout(): void {
    this.focusByTab.set(false);
  }
}
