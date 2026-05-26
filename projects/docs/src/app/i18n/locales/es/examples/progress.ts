import { ProgressDemo } from '../../../../demos/previews/progress.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Determinado',
    demoComponent: ProgressDemo,
    code: `import { AuProgress } from '@aurea-design-system/components';

<au-progress [value]="45" [max]="100" />`,
  },
];
