import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { AuStepperStep } from './au-stepper-step.directive';

/** Layout direction for the stepper. */
export type AuStepperLayout = 'horizontal' | 'vertical';

/**
 * Design-system **stepper**: numbered sequential progress for wizards.
 *
 * @remarks
 * - Numbered wizard. For section navigation use {@link AuTabs}.
 * - **Value:** `[(value)]` matches `auStep` / `auStepPanel` string keys.
 * - **Linear:** blocks jumps past incomplete steps (`auStepCompleted` / optional).
 * - **Numbers:** CSS `counter(stepper-index)` on each step trigger.
 *
 * @example
 * ```html
 * <au-stepper [(value)]="step" layout="horizontal" [linear]="true" ariaLabel="Checkout">
 *   <button type="button" auStep="account" [auStepCompleted]="accountDone">Account</button>
 *   <button type="button" auStep="shipping">Shipping</button>
 *   <div auStepPanel="account">…</div>
 * </au-stepper>
 * ```
 */
@Component({
  selector: 'au-stepper',
  templateUrl: './stepper.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-stepper',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-linear]': 'linear() ? "" : null',
    '[attr.data-au-layout]': 'layout()',
  },
})
export class AuStepper {
  private static idCounter = 0;

  private readonly stepRegistry = signal<readonly AuStepperStep[]>([]);

  /** Active step key (matches `auStep` / `auStepPanel`). */
  readonly value = model('');
  readonly ariaLabel = input('');
  readonly size = input<'sm' | 'md'>('md');
  /** When true, user cannot jump to blocked future steps. */
  readonly linear = input(true);
  /** Layout orientation of the stepper. */
  readonly layout = input<AuStepperLayout>('horizontal');
  readonly id = input('');

  readonly resolvedId = computed(() => {
    const custom = this.id().trim();
    return custom || `au-stepper-${++AuStepper.idCounter}`;
  });

  registerStep(step: AuStepperStep): void {
    this.stepRegistry.update((list) => (list.includes(step) ? list : [...list, step]));
    this.ensureValidSelectionAsync();
  }

  unregisterStep(step: AuStepperStep): void {
    this.stepRegistry.update((list) => list.filter((s) => s !== step));
    this.ensureValidSelectionAsync();
  }

  getSteps(): readonly AuStepperStep[] {
    return this.stepRegistry();
  }

  getStepIndex(stepKey: string): number {
    return this.getSteps().findIndex((s) => s.auStep() === stepKey);
  }

  isStepCurrent(stepKey: string): boolean {
    return this.value() === stepKey;
  }

  isStepCompleted(stepKey: string): boolean {
    const step = this.getSteps().find((s) => s.auStep() === stepKey);
    return !!step?.auStepCompleted();
  }

  isStepBlocked(stepKey: string): boolean {
    if (!this.linear()) {
      return false;
    }
    const steps = this.getSteps();
    const targetIndex = steps.findIndex((s) => s.auStep() === stepKey);
    if (targetIndex < 0) {
      return true;
    }
    if (steps[targetIndex]?.auStepOptional()) {
      return false;
    }
    if (targetIndex === 0) {
      return false;
    }
    const currentIndex = this.getStepIndex(this.value());
    if (currentIndex < 0) {
      return targetIndex > 0;
    }
    if (targetIndex <= currentIndex + 1) {
      return false;
    }
    for (let i = 0; i < targetIndex; i += 1) {
      if (!steps[i]?.auStepCompleted() && i !== currentIndex) {
        return true;
      }
    }
    return false;
  }

  canSelect(stepKey: string): boolean {
    const step = this.getSteps().find((s) => s.auStep() === stepKey);
    if (!step || step.auStepDisabled()) {
      return false;
    }
    return !this.isStepBlocked(stepKey);
  }

  selectStep(next: string): void {
    if (!this.canSelect(next) || this.value() === next) {
      return;
    }
    this.value.set(next);
  }

  stepIdFor(value: string): string {
    return `${this.resolvedId()}-step-${value}`;
  }

  panelIdFor(value: string): string {
    return `${this.resolvedId()}-panel-${value}`;
  }

  onListKeydown(event: KeyboardEvent): void {
    const enabled = this.getSteps().filter((s) => !s.auStepDisabled());
    if (enabled.length === 0) {
      return;
    }
    const relevant = new Set(['ArrowLeft', 'ArrowRight', 'Home', 'End']);
    if (!relevant.has(event.key)) {
      return;
    }
    event.preventDefault();

    const currentIndex = enabled.findIndex((s) => s.auStep() === this.value());
    const start = currentIndex >= 0 ? currentIndex : 0;
    let targetIndex = start;

    switch (event.key) {
      case 'ArrowRight':
        targetIndex = (start + 1) % enabled.length;
        break;
      case 'ArrowLeft':
        targetIndex = (start - 1 + enabled.length) % enabled.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = enabled.length - 1;
        break;
    }

    const target = enabled[targetIndex]!;
    if (this.canSelect(target.auStep())) {
      this.selectStep(target.auStep());
    }
    target.focus();
  }

  private ensureValidSelectionAsync(): void {
    queueMicrotask(() => {
      const enabled = this.getSteps().filter((s) => !s.auStepDisabled());
      if (enabled.length === 0) {
        return;
      }
      const current = this.value();
      if (current && enabled.some((s) => s.auStep() === current)) {
        return;
      }
      this.value.set(enabled[0]!.auStep());
    });
  }
}
