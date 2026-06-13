import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuCard, AuCardFooter } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard, AuCardFooter, AuButton],
  template: `
    <div class="docs-preview docs-preview--block">
      <au-card variant="outlined">
        <h3 auCardHeader>{{ t().title }}</h3>
        <p>{{ t().body }}</p>
        <div auCardFooter>
          <button auButton
            variant="primary"
            size="sm"
            >{{ t().action }}</button
          >
        </div>
      </au-card>
    </div>
  `,
})
export class CardDemo {
  readonly t = docsPreviewCopy('card');
}
