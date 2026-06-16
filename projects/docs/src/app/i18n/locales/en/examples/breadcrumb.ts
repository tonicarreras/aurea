import { BreadcrumbDemo } from '../../../../demos/previews/breadcrumb.preview';
import {
  ExampleBreadcrumbDeepDemo,
  ExampleBreadcrumbLinksOnlyDemo,
  ExampleBreadcrumbTwoLevelDemo,
} from '../../../../demos/examples/breadcrumb.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Trail',
    demoComponent: BreadcrumbDemo,
    code: `import { AuBreadcrumb } from '@aurea-design-system/components';

<au-breadcrumb [items]="[
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Table' },
]" />`,
  },
  {
    title: 'Two levels',
    description: 'Parent link plus current page as plain text (no `href` on the last item).',
    demoComponent: ExampleBreadcrumbTwoLevelDemo,
    code: `<au-breadcrumb [items]="[
  { label: 'Home', href: '/' },
  { label: 'Settings' },
]" />`,
  },
  {
    title: 'Deep hierarchy',
    description: 'Longer trails for nested settings or docs sections.',
    demoComponent: ExampleBreadcrumbDeepDemo,
    code: `<au-breadcrumb [items]="[
  { label: 'Home', href: '/' },
  { label: 'Workspace', href: '/workspace' },
  { label: 'People', href: '/people' },
  { label: 'Ada Lovelace' },
]" />`,
  },
  {
    title: 'All linked segments',
    description: 'Every item except the current page can include `href` for upward navigation.',
    demoComponent: ExampleBreadcrumbLinksOnlyDemo,
    code: `<au-breadcrumb [items]="[
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb' },
]" />`,
  },
];
