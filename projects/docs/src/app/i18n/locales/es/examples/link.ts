import { LinkDemo } from '../../../../demos/previews/link.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Enlace inline',
    demoComponent: LinkDemo,
    code: `import { AuLink } from '@aurea-design-system/components';

<a auLink href="/docs">Documentación</a>`,
  },
];
