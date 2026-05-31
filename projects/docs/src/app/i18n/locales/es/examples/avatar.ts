import { AvatarDemo } from '../../../../demos/previews/avatar.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Avatar con iniciales',
    demoComponent: AvatarDemo,
    code: `import { AuAvatar } from '@aurea-design-system/components';

<au-avatar name="Jane Doe" />`,
  },
];
