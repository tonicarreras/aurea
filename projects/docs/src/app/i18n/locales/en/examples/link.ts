import {
  ExampleLinkExternalDemo,
  ExampleLinkInlineDemo,
} from '../../../../demos/examples/link.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Inline link',
    description: 'Inside a paragraph; keeps the surrounding text rhythm.',
    demoComponent: ExampleLinkInlineDemo,
    code: `<p>
  See the
  <a auLink href="/docs/tokens">design tokens</a>
  guide to map variables in your app.
</p>`,
  },
  {
    title: 'External link',
    description: 'Opens in a new tab with proper `target` and `rel`.',
    demoComponent: ExampleLinkExternalDemo,
    code: `<a auLink href="https://angular.dev" target="_blank" rel="noopener noreferrer">
  Angular documentation
</a>`,
  },
];
