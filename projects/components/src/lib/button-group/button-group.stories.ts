import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { expect, within } from 'storybook/test';
import { AuButton } from '../button';
import { AuButtonGroup } from './button-group';

const meta: Meta<AuButtonGroup> = {
  title: 'Aurea/ButtonGroup',
  component: AuButtonGroup,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('button-group'),
  argTypes: {
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
    attached: { control: 'boolean', table: { category: 'Layout' } },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: { category: 'Layout' },
    },
  },
  args: {
    ariaLabel: 'View actions',
    attached: true,
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<AuButtonGroup>;

const renderButtons: Story['render'] = (args) => ({
  props: args,
  moduleMetadata: { imports: [AuButtonGroup, AuButton] },
  template: `
    <au-button-group
      [ariaLabel]="ariaLabel"
      [attached]="attached"
      [orientation]="orientation"
    >
      <button type="button" auButton variant="outline">Cancel</button>
      <button type="button" auButton variant="secondary">Draft</button>
      <button type="button" auButton>Publish</button>
    </au-button-group>
  `,
});

export const Attached: Story = {
  render: renderButtons,
};

export const Spaced: Story = {
  args: { attached: false, ariaLabel: 'Editor toolbar' },
  render: renderButtons,
};

export const Vertical: Story = {
  args: { orientation: 'vertical', ariaLabel: 'Stacked actions' },
  render: renderButtons,
};

export const Accessibility: Story = {
  render: renderButtons,
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const group = el.getByRole('group', { name: 'View actions' });
    await expect(group).toBeTruthy();
    await expect(el.getByRole('button', { name: 'Cancel' })).toBeTruthy();
    await expect(el.getByRole('button', { name: 'Publish' })).toBeTruthy();
  },
};
