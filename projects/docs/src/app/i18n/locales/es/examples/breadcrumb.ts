import { BreadcrumbDemo } from '../../../../demos/previews/breadcrumb.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Ruta',
    demoComponent: BreadcrumbDemo,
    code: `import { AuBreadcrumb } from '@aurea-design-system/components';

<au-breadcrumb [items]="[
  { label: 'Inicio', href: '/' },
  { label: 'Componentes' },
]" />`,
  },
];
