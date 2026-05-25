import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuChip } from '../chip/chip';
import { AuListItem } from './au-list-item.directive';
import { AuList } from './list';


const meta: Meta<AuList> = {
  title: 'Aurea/List',
  component: AuList,
  tags: ['autodocs', 'au', 'beta'],
  parameters: storyMetaParameters('list'),
  argTypes: {
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
    ariaLabelledBy: { control: 'text', table: { category: 'Accessibility' } },
  },
  args: {
    ariaLabel: 'Selected tags',
  },
};

export default meta;
type Story = StoryObj<AuList>;

export const WithChips: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuList, AuChip] },
    template: `
      <au-list [ariaLabel]="ariaLabel">
        <au-chip label="Angular" removable />
        <au-chip label="TypeScript" removable />
        <au-chip label="Vitest" removable />
      </au-list>
    `,
  }),
};

export const CustomItems: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuList, AuListItem] },
    template: `
      <au-list ariaLabel="Steps">
        <div auListItem style="padding:0.25rem 0.5rem;border:1px solid var(--au-color-border-default);border-radius:4px;">Draft</div>
        <div auListItem style="padding:0.25rem 0.5rem;border:1px solid var(--au-color-border-default);border-radius:4px;">Review</div>
        <div auListItem style="padding:0.25rem 0.5rem;border:1px solid var(--au-color-border-default);border-radius:4px;">Done</div>
      </au-list>
    `,
  }),
};
