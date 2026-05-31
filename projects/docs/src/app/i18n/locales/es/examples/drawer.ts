import { ExampleDrawerBasicDemo } from '../../../../demos/examples/drawer.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Panel lateral',
    description: 'Drawer con acciones en el pie; entra desde el borde final.',
    demoComponent: ExampleDrawerBasicDemo,
    code: `<au-button (click)="open.set(true)">Abrir filtros</au-button>

<au-drawer [(open)]="open" title="Filtros" position="end">
  <p>Controles de filtro aquí.</p>
  <div auDrawerFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancelar</au-button>
    <au-button (click)="open.set(false)">Aplicar</au-button>
  </div>
</au-drawer>`,
    language: 'typescript',
  },
];
