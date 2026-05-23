import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuChip } from '../chip/chip';
import { AuChipGroup } from './chip-group';

const docsOverview = getStoryOverview('chip-group');

const meta: Meta<AuChipGroup> = {
  title: 'Aurea/Chip group',
  component: AuChipGroup,
  tags: ['autodocs', 'au', 'beta'],
  parameters: storyMetaParameters(docsOverview),
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
