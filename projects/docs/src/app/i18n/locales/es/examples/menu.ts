import { MenuDemo } from '../../../../demos/previews/menu.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Menú de acciones',
    demoComponent: MenuDemo,
    code: `import { AuMenu, AuMenuItem, AuMenuTrigger, AuButton } from '@aurea-design-system/components';

<au-menu>
  <au-button auMenuTrigger>Acciones</au-button>
  <au-menu-item>Editar</au-menu-item>
</au-menu>`,
  },
];
