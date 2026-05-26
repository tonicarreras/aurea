import { MenuDemo } from '../../../../demos/previews/menu.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Actions menu',
    demoComponent: MenuDemo,
    code: `import { AuMenu, AuMenuItem, AuMenuTrigger, AuButton } from '@aurea-design-system/components';

<au-menu>
  <au-button auMenuTrigger>Actions</au-button>
  <au-menu-item>Edit</au-menu-item>
</au-menu>`,
  },
];
