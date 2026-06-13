import { ExampleDrawerBasicDemo } from '../../../../demos/examples/drawer.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Panel lateral',
    description: 'Drawer con acciones en el pie; entra desde el borde final.',
    demoComponent: ExampleDrawerBasicDemo,
    code: `<button auButton (click)="open.set(true)">Abrir filtros</button>

<au-drawer [(open)]="open" title="Filtros" position="end">
  <p>Controles de filtro aquí.</p>
  <div auDrawerFooter>
    <button auButton variant="secondary" (click)="open.set(false)">Cancelar</button>
    <button auButton (click)="open.set(false)">Aplicar</button>
  </div>
</au-drawer>`,
    language: 'typescript',
  },
];
