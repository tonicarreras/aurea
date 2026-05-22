import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuStep, AuStepPanel, AuSteps } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSteps, AuStep, AuStepPanel],
  template: `
    <au-steps
      [(value)]="section"
      ariaLabel="Secciones de documentación"
      style="max-width: 32rem"
    >
      <button
        type="button"
        auStep="overview"
      >
        Overview
      </button>
      <button
        type="button"
        auStep="api"
      >
        API
      </button>
      <button
        type="button"
        auStep="examples"
      >
        Examples
      </button>
      <div auStepPanel="overview"><p>Introducción y cuándo usar el componente.</p></div>
      <div auStepPanel="api"><p>Inputs, outputs y directivas relacionadas.</p></div>
      <div auStepPanel="examples"><p>Fragmentos listos para copiar.</p></div>
    </au-steps>
  `,
})
export class StepsDemo {
  readonly section = model('overview');
}
