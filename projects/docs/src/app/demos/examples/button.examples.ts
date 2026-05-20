import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton } from '@aurea-design-system/components';
import { DEMO_ROW } from '../shared/demo-layout';

@Component({
  selector: 'docs-example-button-primary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary">Guardar</au-button>`,
})
export class ExampleButtonPrimaryDemo {}

@Component({
  selector: 'docs-example-button-secondary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="secondary">Cancelar</au-button>`,
})
export class ExampleButtonSecondaryDemo {}

@Component({
  selector: 'docs-example-button-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="outline">Más opciones</au-button>`,
})
export class ExampleButtonOutlineDemo {}

@Component({
  selector: 'docs-example-button-ghost',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="ghost">Descartar</au-button>`,
})
export class ExampleButtonGhostDemo {}

@Component({
  selector: 'docs-example-button-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary" [loading]="true">Guardando…</au-button>`,
})
export class ExampleButtonLoadingDemo {}

@Component({
  selector: 'docs-example-button-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary" [disabled]="true">No disponible</au-button>`,
})
export class ExampleButtonDisabledDemo {}

@Component({
  selector: 'docs-example-button-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `
    <div class="docs-demo-row">
      <au-button size="sm">Pequeño</au-button>
      <au-button size="md">Mediano</au-button>
      <au-button size="lg">Grande</au-button>
    </div>
  `,
  styles: [DEMO_ROW],
})
export class ExampleButtonSizesDemo {}

// —— Input text ——
