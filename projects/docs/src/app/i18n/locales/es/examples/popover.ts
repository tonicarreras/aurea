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
  <au-button auPopoverTrigger>Filtros</au-button>
  <p>Contenido compacto del panel.</p>
</au-popover>`,
  },
  {
    title: 'Posición',
    description: 'Alinea el panel a `start` o `end` cuando el espacio en el eje inline es justo.',
    demoComponent: ExamplePopoverPlacementDemo,
    code: `<au-popover [(open)]="open" placement="end">
  <au-button auPopoverTrigger>Filtros</au-button>
  <p>Contenido del panel</p>
</au-popover>`,
  },
  {
    title: 'Filtros inline',
    description: 'Proyecta controles de formulario; cierra con Aplicar o clic fuera.',
    demoComponent: ExamplePopoverFiltersDemo,
    code: `<au-popover [(open)]="filtersOpen">
  <au-button auPopoverTrigger>Filtros</au-button>
  <au-form-field label="Estado">
    <au-checkbox>Solo activos</au-checkbox>
  </au-form-field>
</au-popover>`,
  },
  {
    title: 'Apertura controlada',
    description: 'Abre desde otro control con `[(open)]` — útil para ayuda contextual.',
    demoComponent: ExamplePopoverControlledDemo,
    code: `<au-button type="button" (click)="open.set(true)">Abrir ayuda</au-button>
<au-popover [(open)]="open">
  <au-button auPopoverTrigger>Ayuda</au-button>
  <p>Texto de ayuda breve.</p>
</au-popover>`,
  },
];
