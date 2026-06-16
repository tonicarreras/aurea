import { PopoverDemo } from '../../../../demos/previews/popover.preview';
import {
  ExamplePopoverControlledDemo,
  ExamplePopoverFiltersDemo,
  ExamplePopoverPlacementDemo,
} from '../../../../demos/examples/popover.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Popover de filtros',
    demoComponent: PopoverDemo,
    code: `import { AuPopover, AuPopoverTrigger, AuButton } from '@aurea-design-system/components';

<au-popover [(open)]="open">
  <button auButton auPopoverTrigger>Filtros</button>
  <p>Contenido compacto del panel.</p>
</au-popover>`,
  },
  {
    title: 'Posición',
    description: 'Alinea el panel a `start` o `end` cuando el espacio en el eje inline es justo.',
    demoComponent: ExamplePopoverPlacementDemo,
    code: `<au-popover [(open)]="open" placement="end">
  <button auButton auPopoverTrigger>Filtros</button>
  <p>Contenido del panel</p>
</au-popover>`,
  },
  {
    title: 'Filtros inline',
    description: 'Proyecta controles de formulario; cierra con Aplicar o clic fuera.',
    demoComponent: ExamplePopoverFiltersDemo,
    code: `<au-popover [(open)]="filtersOpen">
  <button auButton auPopoverTrigger>Filtros</button>
  <au-form-field label="Estado">
    <input type="checkbox" auCheckbox>Solo activos
  </au-form-field>
</au-popover>`,
  },
  {
    title: 'Apertura controlada',
    description: 'Abre desde otro control con `[(open)]` — útil para ayuda contextual.',
    demoComponent: ExamplePopoverControlledDemo,
    code: `<button auButton type="button" (click)="open.set(true)">Abrir ayuda</button>
<au-popover [(open)]="open">
  <button auButton auPopoverTrigger>Ayuda</button>
  <p>Texto de ayuda breve.</p>
</au-popover>`,
  },
];
