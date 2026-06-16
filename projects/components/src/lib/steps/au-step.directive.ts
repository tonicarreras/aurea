import {
  afterNextRender,
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { tabFocusState } from '../au-tab-focus-state';
import { injectHostRef } from '../au-host-element';
import { AuSteps } from './steps';

/**
 * Step trigger inside `au-steps`. Place on a `<button type="button">`.
 */
@Directive({
  selector: 'button[auStep]',
  host: {
    type: 'button',
    class: 'au-steps__step',
    '[attr.role]': 'steps.layout() === "sections" ? null : "tab"',
    '[class.au-steps__step--selected]': 'isSelected()',
    '[class.au-steps__step--from-tab]': 'focusByTab()',
    '[attr.id]': 'stepId()',
    '[attr.aria-selected]': 'steps.layout() === "tabs" && isSelected() ? "true" : null',
    '[attr.aria-current]': 'steps.layout() === "sections" && isSelected() ? "true" : null',
    '[attr.aria-controls]': 'steps.layout() === "tabs" ? panelId() : null',
    '[attr.tabindex]': 'tabIndexAttr()',
    '[attr.disabled]': 'auStepDisabled() ? true : null',
    '(click)': 'onClick($event)',
    '(focusin)': 'onFocusin()',
    '(focusout)': 'onFocusout()',
  },
})
export class AuStep {
  protected readonly steps = inject(AuSteps);
  private readonly host = injectHostRef<HTMLButtonElement>();
  private readonly destroyRef = inject(DestroyRef);

  readonly auStep = input.required<string>();
  readonly auStepDisabled = input(false);

  protected readonly focusByTab = signal(false);

  readonly stepId = computed(() => this.steps.stepIdFor(this.auStep()));
  readonly panelId = computed(() => this.steps.panelIdFor(this.auStep()));
  readonly isSelected = computed(() => this.steps.value() === this.auStep());
  readonly tabIndexAttr = computed(() => (this.isSelected() ? 0 : -1));

  private readonly registerWhenReady = afterNextRender(() => {
    this.steps.registerStep(this);
  });

  private readonly unregisterOnDestroy = this.destroyRef.onDestroy(() => {
    this.steps.unregisterStep(this);
  });

  focus(): void {
    this.host.nativeElement.focus();
  }

  protected onClick(event: MouseEvent): void {
    if (this.auStepDisabled()) {
      event.preventDefault();
      return;
    }
    this.steps.selectStep(this.auStep(), { scroll: true });
  }

  protected onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  protected onFocusout(): void {
    this.focusByTab.set(false);
  }
}
