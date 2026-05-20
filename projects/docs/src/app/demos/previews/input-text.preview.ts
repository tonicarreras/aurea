import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuInputText } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `<au-input-text label="Nombre" placeholder="Tu nombre" style="max-width: 20rem" />`,
})
export class InputTextDemo {}
