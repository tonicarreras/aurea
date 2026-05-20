import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { AuStep } from './au-step.directive';

export type StepsLayout = 'tabs' | 'sections';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-steps',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-layout]': 'layout()',
  },
})
export class AuSteps {
  private static idCounter = 0;

  private readonly stepRegistry = signal<readonly AuStep[]>([]);

  readonly value = model<string>('');
  readonly ariaLabel = input<string>('');
  readonly size = input<'sm' | 'md'>('md');
  /** `tabs`: un panel; `sections`: todos visibles y scroll al pulsar (documentación). */
  readonly layout = input<StepsLayout>('tabs');

  readonly valueChange = output<string>();
  readonly id = input<string>('');

  readonly resolvedId = computed(() => {
    const custom = this.id();
    return custom || `au-steps-${++AuSteps.idCounter}`;
  });

  registerStep(step: AuStep): void {
    this.stepRegistry.update((list) => (list.includes(step) ? list : [...list, step]));
    this.scheduleEnsureValidSelection();
  }

  unregisterStep(step: AuStep): void {
    this.stepRegistry.update((list) => list.filter((s) => s !== step));
    this.scheduleEnsureValidSelection();
  }

  private scheduleEnsureValidSelection(): void {
    queueMicrotask(() => this.ensureValidSelection());
  }

  getEnabledSteps(): readonly AuStep[] {
    return this.stepRegistry().filter((s) => !s.auStepDisabled());
  }

  selectStep(next: string, options?: { scroll?: boolean }): void {
    const changed = this.value() !== next;
    if (changed) {
      this.value.set(next);
      this.valueChange.emit(next);
    }
    if (options?.scroll && this.layout() === 'sections') {
      this.scrollToPanel(next);
    }
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
    const enabled = this.getEnabledSteps();
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
    this.selectStep(target.auStep());
    target.focus();
  }

  private ensureValidSelection(): void {
    const enabled = this.getEnabledSteps();
    if (enabled.length === 0) {
      return;
    }
    const current = this.value();
    if (current && enabled.some((s) => s.auStep() === current)) {
      return;
    }
    this.selectStep(enabled[0]!.auStep());
  }
}
