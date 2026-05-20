import {
  ExampleTabsBasicDemo,
} from '../../../../demos/examples/tabs.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Pestañas',
      demoComponent: ExampleTabsBasicDemo,
      code: `<au-tabs [(value)]="tab" ariaLabel="Cuenta">
  <button type="button" auTab="perfil">Perfil</button>
  <button type="button" auTab="seguridad">Seguridad</button>
  <div auTabPanel="perfil">…</div>
  <div auTabPanel="seguridad">…</div>
</au-tabs>`,
      language: 'typescript',
    },
];
