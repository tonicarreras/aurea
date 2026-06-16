import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAvatar } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAvatar],
  template: `
    <div class="docs-preview docs-preview--row">
      <div class="docs-demo-row">
        <au-avatar
          size="sm"
          [name]="t().name2"
        />
        <au-avatar [name]="t().name" />
        <au-avatar
          size="lg"
          [src]="t().src"
          [alt]="t().alt"
          [name]="t().name"
        />
        <au-avatar
          shape="square"
          [name]="t().name2"
        />
      </div>
      <div class="docs-preview-person">
        <au-avatar
          size="lg"
          [src]="t().src"
          [alt]="t().alt"
          [name]="t().name"
        />
        <div class="docs-preview-person__meta">
          <span class="docs-preview-person__name">{{ t().name }}</span>
          <span class="docs-preview-person__detail">{{ t().role }}</span>
        </div>
      </div>
    </div>
  `,
})
export class AvatarDemo {
  readonly t = docsPreviewCopy('avatar');
}
