import { MenuDemo } from '../../../../demos/previews/menu.preview';
import {
  ExampleMenuControlledDemo,
  ExampleMenuDisabledItemDemo,
  ExampleMenuPlacementDemo,
} from '../../../../demos/examples/menu.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Menú de acciones',
    demoComponent: MenuDemo,
    code: `import { AuMenu, AuMenuItem, AuMenuTrigger, AuButton } from '@aurea-design-system/components';

<au-menu [(open)]="open">
  <au-button auMenuTrigger>Acciones</au-button>
  <au-menu-item (select)="onEdit()">Editar</au-menu-item>
  <au-menu-item>Compartir</au-menu-item>
</au-menu>`,
  },
  {
    title: 'Posición',
    description: 'Ubicación del panel respecto al trigger (`bottom`, `top`, `start`, `end`, …).',
    demoComponent: ExampleMenuPlacementDemo,
    code: `<au-menu [(open)]="open" placement="top">
  <au-button auMenuTrigger>Acciones</au-button>
  <au-menu-item>Editar</au-menu-item>
</au-menu>`,
  },
  {
    title: 'Ítem deshabilitado',
    description: 'Usa `[disabled]="true"`; el roving tabindex lo omite al navegar.',
    demoComponent: ExampleMenuDisabledItemDemo,
    code: `<au-menu>
  <au-button auMenuTrigger>Acciones</au-button>
  <au-menu-item>Editar</au-menu-item>
  <au-menu-item [disabled]="true">Archivar (no disponible)</au-menu-item>
  <au-menu-item>Eliminar</au-menu-item>
</au-menu>`,
  },
  {
    title: 'Apertura controlada',
    description: 'Controla `[(open)]` desde la app — p. ej. abrir desde otro botón.',
    demoComponent: ExampleMenuControlledDemo,
    code: `<au-button type="button" (click)="open.set(true)">Abrir menú</au-button>
<au-menu [(open)]="open">
  <au-button auMenuTrigger>Acciones</au-button>
  <au-menu-item>Editar</au-menu-item>
</au-menu>`,
  },
];
