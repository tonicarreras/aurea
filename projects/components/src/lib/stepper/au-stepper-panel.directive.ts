import { Directive, computed, inject, input } from '@angular/core';
import { AuStepper } from './stepper';

/**
 * Step panel inside `au-stepper`. Pair with a step button using the same key.
 *
 * @remarks
 * Panel key for `au-stepper`. Import `AuStepperPanel` from the stepper entry. This
 * directive must be imported from the stepper entry — do not mix both in one component.
 */
@Directive({
  selector: '[auStepPanel]',
  host: {
    class: 'au-stepper__panel',
    role: 'region',
    '[class.au-stepper__panel--active]': 'isActive()',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'stepId()',
    '[attr.hidden]': 'isActive() ? null : ""',
  },
})
export class AuStepperPanel {
  protected readonly stepper = inject(AuStepper);

  readonly auStepPanel = input.required<string>();

  readonly panelId = computed(() => this.stepper.panelIdFor(this.auStepPanel()));
  readonly stepId = computed(() => this.stepper.stepIdFor(this.auStepPanel()));
  readonly isActive = computed(() => this.stepper.value() === this.auStepPanel());
}
