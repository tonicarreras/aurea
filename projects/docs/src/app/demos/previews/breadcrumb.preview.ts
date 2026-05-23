import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuBreadcrumb } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBreadcrumb],
  template: `<au-breadcrumb [items]="items" />`,
})
export class BreadcrumbDemo {
  readonly items = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Table' },
  ];
}
