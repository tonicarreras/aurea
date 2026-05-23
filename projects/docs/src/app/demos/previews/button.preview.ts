import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `
    <div class="docs-preview docs-preview--row">
      <div class="docs-demo-row">
        <au-button variant="primary">Primary</au-button>
        <au-button variant="secondary">Secondary</au-button>
        <au-button variant="outline">Outline</au-button>
        <au-button variant="ghost">Ghost</au-button>
      </div>
    </div>
  `,
})
export class ButtonDemo {}
