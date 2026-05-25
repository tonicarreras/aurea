import { BreadcrumbDemo } from '../../../../demos/previews/breadcrumb.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Trail',
    demoComponent: BreadcrumbDemo,
    code: `import { AuBreadcrumb } from '@aurea-design-system/components';

<au-breadcrumb [items]="[
  { label: 'Home', href: '/' },
  { label: 'Components' },
]" />`,
  },
];
