import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSwitch } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field hint="Puedes cambiarlo en ajustes del sistema.">
      <au-switch label="Modo oscuro del sistema" />
    </au-form-field>
  `,
})
export class SwitchDemo {}
