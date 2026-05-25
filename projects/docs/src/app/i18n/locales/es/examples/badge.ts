import { BadgeDemo } from '../../../../demos/previews/badge.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Badge accent',
    demoComponent: BadgeDemo,
    code: `import { AuBadge } from '@aurea-design-system/components';

<au-badge variant="accent" label="Nuevo" />`,
  },
];
