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
    code: `<au-button variant="primary">Save</au-button>`,
  },
  {
    title: 'Secondary',
    demoComponent: ExampleButtonSecondaryDemo,
    code: `<au-button variant="secondary">Cancel</au-button>`,
  },
  {
    title: 'Outline',
    demoComponent: ExampleButtonOutlineDemo,
    code: `<au-button variant="outline">More options</au-button>`,
  },
  {
    title: 'Ghost',
    demoComponent: ExampleButtonGhostDemo,
    code: `<au-button variant="ghost">Discard</au-button>`,
  },
  {
    title: 'Loading',
    description: 'Shows a spinner and sets `aria-busy` on the button.',
    demoComponent: ExampleButtonLoadingDemo,
    code: `<au-button variant="primary" [loading]="true">Saving…</au-button>`,
  },
  {
    title: 'Disabled',
    demoComponent: ExampleButtonDisabledDemo,
    code: `<au-button variant="primary" [disabled]="true">Unavailable</au-button>`,
  },
  {
    title: 'Sizes',
    demoComponent: ExampleButtonSizesDemo,
    code: `<au-button size="sm">Small</au-button>
<au-button size="md">Medium</au-button>
<au-button size="lg">Large</au-button>`,
  },
];
