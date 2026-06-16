import {
  ExampleAvatarImageDemo,
  ExampleAvatarPersonRowDemo,
  ExampleAvatarSizesDemo,
} from '../../../../demos/examples/avatar.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Sizes and initials',
    description: 'xs through xl; without an image, initials are derived from the name.',
    demoComponent: ExampleAvatarSizesDemo,
    code: `<au-avatar size="xs" name="Ada Lovelace" />
<au-avatar size="sm" name="Ada Lovelace" />
<au-avatar name="Ada Lovelace" />
<au-avatar size="lg" name="Ada Lovelace" />
<au-avatar size="xl" name="Ada Lovelace" />`,
  },
  {
    title: 'Image and shape',
    description: 'Use `src` and `alt`; `shape="square"` for rounded corners.',
    demoComponent: ExampleAvatarImageDemo,
    code: `<au-avatar size="lg" src="/ada.jpg" alt="Ada Lovelace" name="Ada Lovelace" />
<au-avatar size="lg" shape="square" src="/ada.jpg" alt="Ada Lovelace" name="Ada Lovelace" />`,
  },
  {
    title: 'With metadata',
    description: 'Common pattern in table rows or people lists.',
    demoComponent: ExampleAvatarPersonRowDemo,
    code: `<div class="person-row">
  <au-avatar name="Jane Doe" />
  <div>
    <strong>Jane Doe</strong>
    <span>Product design</span>
  </div>
</div>`,
  },
];
