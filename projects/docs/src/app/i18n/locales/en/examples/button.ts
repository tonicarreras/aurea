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
    description: 'Primary action in a form or dialog.',
    demoComponent: ExampleButtonPrimaryDemo,
    code: `<button type="button" auButton variant="primary">Save</button>`,
  },
  {
    title: 'Secondary',
    demoComponent: ExampleButtonSecondaryDemo,
    code: `<button type="button" auButton variant="secondary">Cancel</button>`,
  },
  {
    title: 'Outline',
    demoComponent: ExampleButtonOutlineDemo,
    code: `<button type="button" auButton variant="outline">More options</button>`,
  },
  {
    title: 'Ghost',
    demoComponent: ExampleButtonGhostDemo,
    code: `<button type="button" auButton variant="ghost">Discard</button>`,
  },
  {
    title: 'Loading',
    description: 'Shows a decorative `au-spinner` and sets `aria-busy` on the button.',
    demoComponent: ExampleButtonLoadingDemo,
    code: `<button type="button" auButton variant="primary" [loading]="true">Saving…</button>`,
  },
  {
    title: 'Disabled',
    demoComponent: ExampleButtonDisabledDemo,
    code: `<button type="button" auButton variant="primary" [disabled]="true">Unavailable</button>`,
  },
  {
    title: 'Sizes',
    demoComponent: ExampleButtonSizesDemo,
    code: `<button type="button" auButton size="sm">Small</button>
<button type="button" auButton size="md">Medium</button>
<button type="button" auButton size="lg">Large</button>`,
  },
];
