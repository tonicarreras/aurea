import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSpinner } from '@aurea-design-system/components';

const spinnerDemoStyles = `
  .docs-spinner-demo {
    color: var(--au-color-action-primary);
  }
`;

@Component({
  selector: 'docs-example-spinner-default',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSpinner],
  template: `<div class="docs-spinner-demo">
    <au-spinner size="md" />
  </div>`,
  styles: spinnerDemoStyles,
})
export class ExampleSpinnerDefaultDemo {}

@Component({
  selector: 'docs-example-spinner-labeled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSpinner],
  template: `<div class="docs-spinner-demo">
    <au-spinner
      size="sm"
      label="Loading team members…"
    />
  </div>`,
  styles: spinnerDemoStyles,
})
export class ExampleSpinnerLabeledDemo {}

@Component({
  selector: 'docs-example-spinner-labeled-es',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSpinner],
  template: `<div class="docs-spinner-demo">
    <au-spinner
      size="sm"
      label="Cargando miembros del equipo…"
    />
  </div>`,
  styles: spinnerDemoStyles,
})
export class ExampleSpinnerLabeledEsDemo {}
