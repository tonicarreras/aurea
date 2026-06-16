import {
  ExampleAvatarImageDemo,
  ExampleAvatarPersonRowDemo,
  ExampleAvatarSizesDemo,
} from '../../../../demos/examples/avatar.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Tamaños e iniciales',
    description: 'De xs a xl; sin imagen se derivan las iniciales del nombre.',
    demoComponent: ExampleAvatarSizesDemo,
    code: `<au-avatar size="xs" name="Ada Lovelace" />
<au-avatar size="sm" name="Ada Lovelace" />
<au-avatar name="Ada Lovelace" />
<au-avatar size="lg" name="Ada Lovelace" />
<au-avatar size="xl" name="Ada Lovelace" />`,
  },
  {
    title: 'Imagen y forma',
    description: 'Con `src` y `alt`; `shape="square"` para esquinas redondeadas.',
    demoComponent: ExampleAvatarImageDemo,
    code: `<au-avatar size="lg" src="/ada.jpg" alt="Ada Lovelace" name="Ada Lovelace" />
<au-avatar size="lg" shape="square" src="/ada.jpg" alt="Ada Lovelace" name="Ada Lovelace" />`,
  },
  {
    title: 'Junto a metadatos',
    description: 'Patrón típico en filas de tabla o listados de personas.',
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
