import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { AuStep } from './au-step.directive';
import { createChildRegistry } from '../shared/child-registry';

export type AuStepsLayout = 'tabs' | 'sections';

/**
 * Design-system **steps**: horizontal section navigation for docs and wizards.
 *
 * @remarks
 * - **Value:** `[(value)]` matches `auStep` / `auStepPanel` string keys.
 * - **Structure:** `button[auStep]` in the step list; `[auStepPanel]` for each section.
 * - **Layout:** `tabs` (un panel activo) o `sections` (todos visibles; el step hace scroll, estilo docs).
 * - **Accessibility:** patrón tab en `tabs`; `navigation` + secciones en `sections`.
 *
 * @example
 * ```html
 * <au-steps [(value)]="section" ariaLabel="Documentation sections">
 *   <button type="button" auStep="overview">Overview</button>
 *   <button type="button" auStep="api">API</button>
 *   <div auStepPanel="overview">…</div>
 * </au-steps>
 * ```
 */
@Component({
  selector: 'au-steps',
  templateUrl: './steps.html',
  styleUrl: './steps.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-steps',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-layout]': 'layout()',
  },
})
export class AuSteps {
  private static idCounter = 0;

  readonly value = model<string>('');
  readonly ariaLabel = input<string>('');
  readonly size = input<'sm' | 'md'>('md');
  /** `tabs`: un panel; `sections`: todos visibles y scroll al pulsar (documentación). */
  readonly layout = input<AuStepsLayout>('tabs');

  readonly valueChange = output<string>();
  readonly id = input<string>('');

  /**
   * Shared child registry managing step registration, selection,
   * and keyboard navigation.
   */
  private readonly registry = createChildRegistry<AuStep>({
    value: this.value,
    onValueChange: (v) => this.applyValue(v),
    itemKey: (s) => s.auStep(),
    itemDisabled: (s) => s.auStepDisabled(),
    focusItem: (s) => s.focus(),
  });

  readonly resolvedId = computed(() => {
    const custom = this.id();
    return custom || `au-steps-${++AuSteps.idCounter}`;
  });

  registerStep(step: AuStep): void {
    this.registry.register(step);
  }

  unregisterStep(step: AuStep): void {
    this.registry.unregister(step);
  }

  getEnabledSteps(): readonly AuStep[] {
    return this.registry.enabledItems();
  }

  selectStep(next: string, options?: { scroll?: boolean }): void {
    this.registry.select(next);
    if (options?.scroll && this.layout() === 'sections') {
      this.scrollToPanel(next);
    }
  }

  /** Updates model + emits `valueChange` when the key actually changes. */
  private applyValue(next: string): void {
    if (this.value() === next) {
      return;
    }
    this.value.set(next);
    this.valueChange.emit(next);
  }

  scrollToPanel(stepKey: string): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.getElementById(this.panelIdFor(stepKey))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  stepIdFor(value: string): string {
    return `${this.resolvedId()}-step-${value}`;
  }

  panelIdFor(value: string): string {
    return `${this.resolvedId()}-panel-${value}`;
  }

  onListKeydown(event: KeyboardEvent): void {
    this.registry.onKeydown(event);
  }
}
