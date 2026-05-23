import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuCheckbox } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `
    <div class="docs-preview docs-preview--stack">
      <div class="docs-demo-stack">
        <au-checkbox label="Acepto los términos" />
        <au-checkbox
          label="Newsletter"
          [checked]="true"
        />
      </div>
    </div>
  `,
})
export class CheckboxDemo {}
