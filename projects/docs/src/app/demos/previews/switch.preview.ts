import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSwitch } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSwitch],
  template: `<au-switch label="Modo oscuro del sistema" />`,
})
export class SwitchDemo {}
