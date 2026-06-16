import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuProgress } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-progress-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuProgress],
  template: `
    <div class="docs-example-field">
      <au-progress
        [value]="62"
        [max]="100"
        aria-label="Progreso de importación"
      />
    </div>
  `,
})
export class ExampleProgressBasicDemo {}

@Component({
  selector: 'docs-example-progress-states',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuProgress],
  template: `
    <div class="docs-example-field docs-demo-stack">
      <au-progress
        [value]="18"
        [max]="100"
        aria-label="Inicio de tarea"
      />
      <au-progress
        [value]="100"
        [max]="100"
        aria-label="Tarea completada"
      />
    </div>
  `,
})
export class ExampleProgressStatesDemo {}
