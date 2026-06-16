import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAvatar } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-example-avatar-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAvatar],
  template: `
    <div class="docs-demo-row">
      <au-avatar
        size="xs"
        name="Ada Lovelace"
      />
      <au-avatar
        size="sm"
        name="Ada Lovelace"
      />
      <au-avatar name="Ada Lovelace" />
      <au-avatar
        size="lg"
        name="Ada Lovelace"
      />
      <au-avatar
        size="xl"
        name="Ada Lovelace"
      />
    </div>
  `,
})
export class ExampleAvatarSizesDemo {}

@Component({
  selector: 'docs-example-avatar-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAvatar],
  template: `
    <div class="docs-demo-row">
      <au-avatar
        size="lg"
        [src]="t().src"
        [alt]="t().alt"
        [name]="t().name"
      />
      <au-avatar
        size="lg"
        shape="square"
        [src]="t().src"
        [alt]="t().alt"
        [name]="t().name"
      />
    </div>
  `,
})
export class ExampleAvatarImageDemo {
  readonly t = docsPreviewCopy('avatar');
}

@Component({
  selector: 'docs-example-avatar-person-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAvatar],
  template: `
    <div class="docs-preview-person">
      <au-avatar
        size="md"
        [name]="t().name"
      />
      <div class="docs-preview-person__meta">
        <span class="docs-preview-person__name">{{ t().name }}</span>
        <span class="docs-preview-person__detail">{{ t().role }}</span>
      </div>
    </div>
  `,
})
export class ExampleAvatarPersonRowDemo {
  readonly t = docsPreviewCopy('avatar');
}
