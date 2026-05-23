import {
  ExampleStepsSectionsDemo,
  ExampleStepsTabsDemo,
} from '../../../../demos/examples/steps.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Layout tabs',
    description: 'Un panel activo (`layout="tabs"`).',
    demoComponent: ExampleStepsTabsDemo,
    code: `<au-steps [(value)]="section" ariaLabel="Documentación" layout="tabs">
  <button type="button" auStep="overview">Overview</button>
  <button type="button" auStep="api">API</button>
  <div auStepPanel="overview">…</div>
  <div auStepPanel="api">…</div>
</au-steps>`,
    language: 'typescript',
  },
  {
    title: 'Layout sections',
    description: 'Todos los paneles visibles; los botones de paso hacen scroll (`layout="sections"`).',
    demoComponent: ExampleStepsSectionsDemo,
    code: `<au-steps [(value)]="section" ariaLabel="Secciones" layout="sections">
  <button type="button" auStep="intro">Intro</button>
  <button type="button" auStep="usage">Uso</button>
  <div auStepPanel="intro">…</div>
  <div auStepPanel="usage">…</div>
</au-steps>`,
    language: 'typescript',
  },
];
