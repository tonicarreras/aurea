import {
  ExampleLinkExternalDemo,
  ExampleLinkInlineDemo,
} from '../../../../demos/examples/link.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Enlace inline',
    description: 'Dentro de un párrafo; mantiene el ritmo tipográfico del texto.',
    demoComponent: ExampleLinkInlineDemo,
    code: `<p>
  Consulta la guía de
  <a auLink href="/docs/tokens">tokens de diseño</a>
  para mapear variables en tu app.
</p>`,
  },
  {
    title: 'Enlace externo',
    description: 'Abre en pestaña nueva con `target` y `rel` adecuados.',
    demoComponent: ExampleLinkExternalDemo,
    code: `<a auLink href="https://angular.dev" target="_blank" rel="noopener noreferrer">
  Documentación de Angular
</a>`,
  },
];
