import {
  ExampleButtonDisabledDemo,
  ExampleButtonGhostDemo,
  ExampleButtonLoadingDemo,
  ExampleButtonOutlineDemo,
  ExampleButtonPrimaryDemo,
  ExampleButtonSecondaryDemo,
  ExampleButtonSizesDemo,
} from '../../../../demos/examples/button.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Primary',
      description: 'Acción principal de un formulario o diálogo.',
      demoComponent: ExampleButtonPrimaryDemo,
      code: `<au-button variant="primary">Guardar</au-button>`,
    },
    {
      title: 'Secondary',
      demoComponent: ExampleButtonSecondaryDemo,
      code: `<au-button variant="secondary">Cancelar</au-button>`,
    },
    {
      title: 'Outline',
      demoComponent: ExampleButtonOutlineDemo,
      code: `<au-button variant="outline">Más opciones</au-button>`,
    },
    {
      title: 'Ghost',
      demoComponent: ExampleButtonGhostDemo,
      code: `<au-button variant="ghost">Descartar</au-button>`,
    },
    {
      title: 'Cargando',
      description: 'Muestra un indicador y establece `aria-busy` en el botón.',
      demoComponent: ExampleButtonLoadingDemo,
      code: `<au-button variant="primary" [loading]="true">Guardando…</au-button>`,
    },
    {
      title: 'Deshabilitado',
      demoComponent: ExampleButtonDisabledDemo,
      code: `<au-button variant="primary" [disabled]="true">No disponible</au-button>`,
    },
    {
      title: 'Tamaños',
      demoComponent: ExampleButtonSizesDemo,
      code: `<au-button size="sm">Pequeño</au-button>
<au-button size="md">Mediano</au-button>
<au-button size="lg">Grande</au-button>`,
    },
];
