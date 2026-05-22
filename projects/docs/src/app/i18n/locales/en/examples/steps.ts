import {
  ExampleStepsSectionsDemo,
  ExampleStepsTabsDemo,
} from '../../../../demos/examples/steps.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Tabs layout',
    description: 'One active panel (`layout="tabs"`).',
    demoComponent: ExampleStepsTabsDemo,
    code: `<au-steps [(value)]="section" ariaLabel="Documentation" layout="tabs">
  <button type="button" auStep="overview">Overview</button>
  <button type="button" auStep="api">API</button>
  <div auStepPanel="overview">…</div>
  <div auStepPanel="api">…</div>
</au-steps>`,
    language: 'typescript',
  },
  {
    title: 'Sections layout',
    description: 'All panels visible; step buttons scroll (`layout="sections"`).',
    demoComponent: ExampleStepsSectionsDemo,
    code: `<au-steps [(value)]="section" ariaLabel="On-page sections" layout="sections">
  <button type="button" auStep="intro">Intro</button>
  <button type="button" auStep="usage">Usage</button>
  <div auStepPanel="intro">…</div>
  <div auStepPanel="usage">…</div>
</au-steps>`,
    language: 'typescript',
  },
];
