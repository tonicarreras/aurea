import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { AuBreadcrumb } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBreadcrumb],
  template: `
    <div class="docs-preview docs-preview--inline">
      <au-breadcrumb [items]="items()" />
    </div>
  `,
})
export class BreadcrumbDemo {
  readonly t = docsPreviewCopy('breadcrumb');
  readonly items = computed(() => {
    const t = this.t();
    return [{ label: t.home, href: '#' }, { label: t.components, href: '#' }, { label: t.table }];
  });
}
