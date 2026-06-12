import { BreadcrumbDemo } from '../../../../demos/previews/breadcrumb.preview';
import {
  ExampleBreadcrumbDeepDemo,
  ExampleBreadcrumbLinksOnlyDemo,
  ExampleBreadcrumbTwoLevelDemo,
} from '../../../../demos/examples/breadcrumb.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Ruta',
    demoComponent: BreadcrumbDemo,
    code: `import { AuBreadcrumb } from '@aurea-design-system/components';

<au-breadcrumb [items]="[
  { label: 'Inicio', href: '/' },
  { label: 'Componentes', href: '/components' },
  { label: 'Tabla' },
]" />`,
  },
  {
    title: 'Dos niveles',
    description: 'Enlace padre y página actual como texto (sin `href` en el último ítem).',
    demoComponent: ExampleBreadcrumbTwoLevelDemo,
    code: `<au-breadcrumb [items]="[
  { label: 'Inicio', href: '/' },
  { label: 'Ajustes' },
]" />`,
  },
  {
    title: 'Jerarquía profunda',
    description: 'Rutas largas en ajustes anidados o secciones de documentación.',
    demoComponent: ExampleBreadcrumbDeepDemo,
    code: `<au-breadcrumb [items]="[
  { label: 'Inicio', href: '/' },
  { label: 'Espacio', href: '/workspace' },
  { label: 'Personas', href: '/people' },
  { label: 'Ada Lovelace' },
]" />`,
  },
  {
    title: 'Segmentos enlazados',
    description: 'Cada ítem excepto la página actual puede llevar `href` para subir en la jerarquía.',
    demoComponent: ExampleBreadcrumbLinksOnlyDemo,
    code: `<au-breadcrumb [items]="[
  { label: 'Docs', href: '/docs' },
  { label: 'Componentes', href: '/components' },
  { label: 'Breadcrumb' },
]" />`,
  },
];
