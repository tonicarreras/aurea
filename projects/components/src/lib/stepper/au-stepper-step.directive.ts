import {
  DestroyRef,
  Directive,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';
import { tabFocusState } from '../au-tab-focus-state';
import { AuStepper } from './stepper';

/**
 * Step trigger inside `au-stepper`. Place on a `<button type="button">`.
 *
 * @remarks
 * Step key for `au-stepper`. Import `AuStepperStep` from the stepper entry.
 */
@Directive({
  selector: 'button[auStep]',
  host: {
    type: 'button',
    class: 'au-stepper__step',
    '[attr.id]': 'stepId()',
    '[attr.aria-controls]': 'panelId()',
    '[attr.aria-current]': 'isCurrent() ? "step" : null',
    '[attr.aria-disabled]': 'isBlocked() ? "true" : null',
    '[attr.disabled]': 'auStepDisabled() ? true : null',
    '[attr.tabindex]': 'tabIndexAttr()',
    '[class.au-stepper__step--current]': 'isCurrent()',
    '[class.au-stepper__step--completed]': 'isCompleted()',
    '[class.au-stepper__step--blocked]': 'isBlocked()',
    '[class.au-stepper__step--optional]': 'auStepOptional()',
    '[class.au-stepper__step--error]': 'auStepError()',
    '[class.au-stepper__step--from-tab]': 'focusByTab()',
    '(click)': 'onClick($event)',
    '(focusin)': 'onFocusin()',
    '(focusout)': 'onFocusout()',
  },
})
export class AuStepperStep {
  protected readonly stepper = inject(AuStepper);
  private readonly host = injectHostRef<HTMLButtonElement>();
  private readonly destroyRef = inject(DestroyRef);

  readonly auStep = input.required<string>();
  readonly auStepDisabled = input(false);
  readonly auStepCompleted = input(false);
  readonly auStepOptional = input(false);
  readonly auStepError = input(false);
  readonly auStepSubtitle = input('');

  protected readonly focusByTab = signal(false);

  readonly stepId = computed(() => this.stepper.stepIdFor(this.auStep()));
  readonly panelId = computed(() => this.stepper.panelIdFor(this.auStep()));
  readonly isCurrent = computed(() => this.stepper.isStepCurrent(this.auStep()));
  readonly isCompleted = computed(() => this.auStepCompleted());
  readonly isBlocked = computed(() => this.stepper.isStepBlocked(this.auStep()));
  readonly tabIndexAttr = computed(() => (this.isCurrent() ? 0 : -1));

  private readonly registerWhenReady = afterNextRender(() => {
    this.stepper.registerStep(this);
  });

  private readonly unregisterOnDestroy = this.destroyRef.onDestroy(() => {
    this.stepper.unregisterStep(this);
  });

  focus(): void {
    this.host.nativeElement.focus();
  }

  protected onClick(event: MouseEvent): void {
    if (this.auStepDisabled() || this.isBlocked()) {
      event.preventDefault();
      return;
    }
    this.stepper.selectStep(this.auStep());
  }

  protected onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  protected onFocusout(): void {
    this.focusByTab.set(false);
  }
}
