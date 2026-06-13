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
    code: `<button auButton variant="primary">Guardar</button>`,
  },
  {
    title: 'Secondary',
    demoComponent: ExampleButtonSecondaryDemo,
    code: `<button auButton variant="secondary">Cancelar</button>`,
  },
  {
    title: 'Outline',
    demoComponent: ExampleButtonOutlineDemo,
    code: `<button auButton variant="outline">Más opciones</button>`,
  },
  {
    title: 'Ghost',
    demoComponent: ExampleButtonGhostDemo,
    code: `<button auButton variant="ghost">Descartar</button>`,
  },
  {
    title: 'Cargando',
    description: 'Muestra un `au-spinner` decorativo y establece `aria-busy` en el botón.',
    demoComponent: ExampleButtonLoadingDemo,
    code: `<button auButton variant="primary" [loading]="true">Guardando…</button>`,
  },
  {
    title: 'Deshabilitado',
    demoComponent: ExampleButtonDisabledDemo,
    code: `<button auButton variant="primary" [disabled]="true">No disponible</button>`,
  },
  {
    title: 'Tamaños',
    demoComponent: ExampleButtonSizesDemo,
    code: `<button auButton size="sm">Pequeño</button>
<button auButton size="md">Mediano</button>
<button auButton size="lg">Grande</button>`,
  },
];
