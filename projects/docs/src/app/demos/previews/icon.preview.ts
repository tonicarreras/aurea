import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuIcon, type AuIconName } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  template: `
    <div class="docs-preview docs-preview--row">
      <div class="docs-demo-row">
        @for (name of names; track name) {
          <au-icon
            [name]="name"
            size="md"
          />
        }
      </div>
    </div>
  `,
})
export class IconDemo {
  readonly names: AuIconName[] = ['check-circle', 'warning', 'error', 'info', 'close', 'spinner'];
}
