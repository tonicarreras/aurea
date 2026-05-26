import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AuSteps } from './steps';

/**
 * Step panel inside `au-steps`. Pair with a step button using the same key.
 *
 * Declared as `Component` (not `Directive`) to support scoped styles via `styleUrl`.
 */
@Component({
  selector: '[auStepPanel]',
  template: '<ng-content />',
  styleUrl: './au-step-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-steps__panel',
    '[attr.role]': 'steps.layout() === "sections" ? "region" : "tabpanel"',
    '[class.au-steps__panel--active]': 'isActive()',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'stepId()',
    '[attr.hidden]': 'isHidden() ? "" : null',
    '[attr.tabindex]': 'isTabPanel() && isActive() ? 0 : null',
    '[attr.data-au-layout]': 'steps.layout()',
  },
})
export class AuStepPanel {
  protected readonly steps = inject(AuSteps);

  readonly auStepPanel = input.required<string>();

  readonly panelId = computed(() => this.steps.panelIdFor(this.auStepPanel()));
  readonly stepId = computed(() => this.steps.stepIdFor(this.auStepPanel()));
  readonly isActive = computed(() => this.steps.value() === this.auStepPanel());
  readonly isTabPanel = computed(() => this.steps.layout() === 'tabs');
  readonly isHidden = computed(() => this.isTabPanel() && !this.isActive());
}
