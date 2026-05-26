import { LinkDemo } from '../../../../demos/previews/link.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Inline link',
    demoComponent: LinkDemo,
    code: `import { AuLink } from '@aurea-design-system/components';

<a auLink href="/docs">Documentation</a>`,
  },
];
