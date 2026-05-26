import { ExampleTabsBasicDemo } from '../../../../demos/examples/tabs.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Tabs',
    demoComponent: ExampleTabsBasicDemo,
    code: `<au-tabs [(value)]="tab" ariaLabel="Account">
  <button type="button" auTab="profile">Profile</button>
  <button type="button" auTab="security">Security</button>
  <div auTabPanel="profile">…</div>
  <div auTabPanel="security">…</div>
</au-tabs>`,
    language: 'typescript',
  },
];
