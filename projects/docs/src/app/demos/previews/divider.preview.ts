import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuDivider } from '@aurea-design-system/components';
import { DEMO_STACK } from '../shared/demo-layout';

@Component({
  selector: 'docs-preview-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `
    <div class="docs-demo-stack">
      <p>Sección superior</p>
      <au-divider />
      <au-divider label="o" />
      <p>Sección inferior</p>
    </div>
  `,
  styles: [DEMO_STACK],
})
export class DividerDemo {}
