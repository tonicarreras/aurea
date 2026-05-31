import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAvatar } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAvatar],
  template: `<div class="docs-preview docs-preview--row">
    <au-avatar [name]="t().name" />
    <au-avatar
      size="lg"
      [src]="t().src"
      [alt]="t().alt"
      [name]="t().name"
    />
  </div>`,
})
export class AvatarDemo {
  readonly t = docsPreviewCopy('avatar');
}
