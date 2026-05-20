import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSwitch } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-switch-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSwitch],
  template: `<au-switch label="Notificaciones push" />`,
})
export class ExampleSwitchBasicDemo {}

@Component({
  selector: 'docs-example-switch-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSwitch],
  template: `<au-switch label="Modo avión" [checked]="true" [disabled]="true" />`,
})
export class ExampleSwitchDisabledDemo {}

@Component({
  selector: 'docs-example-switch-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSwitch],
  template: `
    <au-switch
      label="Acepto la política de privacidad"
      [required]="true"
      errorMessage="Debes activar esta opción para continuar."
    />
  `,
})
export class ExampleSwitchErrorDemo {}

// —— Select / Autocomplete ——
