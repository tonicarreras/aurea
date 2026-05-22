import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSwitch } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-switch-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field>
      <au-switch label="Notificaciones push" />
    </au-form-field>
  `,
})
export class ExampleSwitchBasicDemo {}

@Component({
  selector: 'docs-example-switch-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field>
      <au-switch
        label="Modo avión"
        [checked]="true"
        [disabled]="true"
      />
    </au-form-field>
  `,
})
export class ExampleSwitchDisabledDemo {}

@Component({
  selector: 'docs-example-switch-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field
      errorMessage="Debes activar esta opción para continuar."
      [invalid]="true"
    >
      <au-switch label="Acepto la política de privacidad" />
    </au-form-field>
  `,
})
export class ExampleSwitchErrorDemo {}
