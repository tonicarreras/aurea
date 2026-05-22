import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface AuBreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Navigation trail for hierarchical pages.
 */
@Component({
  selector: 'au-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-breadcrumb',
    role: 'navigation',
    'aria-label': 'Breadcrumb',
  },
})
export class AuBreadcrumb {
  readonly items = input<AuBreadcrumbItem[]>([]);
}
