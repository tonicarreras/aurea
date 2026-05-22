import type { Meta, StoryObj } from '@storybook/angular';

import { AuChip } from '../chip/chip';
import { AuChipGroup } from './chip-group';

const meta: Meta<AuChipGroup> = {
  title: 'Aurea/Chip group',
  component: AuChipGroup,
  tags: ['autodocs', 'au', 'beta'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component:
          'Accessible group (`role="group"`) for selectable filter chips. Use `au-list` for static/removable tags.',
      },
    },
  },
  argTypes: {
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
  },
  args: {
    ariaLabel: 'Status filters',
  },
};

export default meta;
type Story = StoryObj<AuChipGroup>;

export const FilterChips: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuChipGroup, AuChip] },
    template: `
      <au-chip-group [ariaLabel]="ariaLabel">
        <au-chip label="Draft" [selectable]="true" />
        <au-chip label="Published" [selectable]="true" [selected]="true" variant="accent" />
        <au-chip label="Archived" [selectable]="true" />
      </au-chip-group>
    `,
  }),
};
