import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuCard, AuCardFooter } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-card-elevated',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard],
  template: `
    <au-card
      variant="elevated"
      style="max-width: 20rem"
    >
      <h3 auCardHeader>Elevada</h3>
      <p>Sombra sutil para destacar sobre el canvas.</p>
    </au-card>
  `,
})
export class ExampleCardElevatedDemo {}

@Component({
  selector: 'docs-example-card-outlined',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard],
  template: `
    <au-card
      variant="outlined"
      style="max-width: 20rem"
    >
      <h3 auCardHeader>Contorno</h3>
      <p>Borde visible sin sombra pronunciada.</p>
    </au-card>
  `,
})
export class ExampleCardOutlinedDemo {}

@Component({
  selector: 'docs-example-card-filled-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard, AuCardFooter, AuButton],
  template: `
    <au-card
      variant="filled"
      style="max-width: 20rem"
    >
      <h3 auCardHeader>Con pie</h3>
      <p>Superficie rellena con acciones en el footer.</p>
      <div auCardFooter>
        <au-button size="sm">Ver detalle</au-button>
      </div>
    </au-card>
  `,
})
export class ExampleCardFilledFooterDemo {}

// —— Tabs ——
