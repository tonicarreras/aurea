import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuIcon, type AuIconName } from '@aurea-design-system/components';
import { DEMO_ROW } from '../shared/demo-layout';

@Component({
  selector: 'docs-preview-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  template: `
    <div class="docs-demo-row">
      @for (name of names; track name) {
        <au-icon [name]="name" size="md" />
      }
    </div>
  `,
  styles: [DEMO_ROW],
})
export class IconDemo {
  readonly names: AuIconName[] = [
    'check-circle',
    'warning',
    'error',
    'info',
    'close',
    'spinner',
  ];
}
