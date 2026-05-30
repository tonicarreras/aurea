import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSpinner } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSpinner],
  template: `<div class="docs-preview-spinner">
    <au-spinner size="md" />
  </div>`,
  styles: `
    .docs-preview-spinner {
      color: var(--au-color-action-primary);
    }
  `,
})
export class SpinnerDemo {}
