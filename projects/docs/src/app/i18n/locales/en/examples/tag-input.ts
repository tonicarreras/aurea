import {
  ExampleTagInputBasicDemo,
  ExampleTagInputLimitsDemo,
} from '../../../../demos/examples/tag-input.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Tags',
    demoComponent: ExampleTagInputBasicDemo,
    code: `<au-form-field label="Skills" hint="Press Enter or comma to add.">
  <au-tag-input />
</au-form-field>`,
  },
  {
    title: 'With limits',
    description: 'Use `maxTags` and `allowDuplicates` to constrain input.',
    demoComponent: ExampleTagInputLimitsDemo,
    code: `<au-form-field label="Topics" hint="Up to 5 unique tags.">
  <au-tag-input [maxTags]="5" [allowDuplicates]="false" />
</au-form-field>`,
  },
];
