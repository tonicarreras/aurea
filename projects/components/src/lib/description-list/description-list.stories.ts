import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { expect, within } from 'storybook/test';
import { AuDescriptionItem } from './description-item';
import { AuDescriptionList } from './description-list';

const meta: Meta<AuDescriptionList> = {
  title: 'Aurea/DescriptionList',
  component: AuDescriptionList,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('description-list'),
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      table: { category: 'Layout' },
    },
    columns: { control: 'select', options: [1, 2, 3], table: { category: 'Layout' } },
  },
  args: { layout: 'vertical', columns: 1 },
};

export default meta;
type Story = StoryObj<AuDescriptionList>;

const itemImports = [AuDescriptionList, AuDescriptionItem];

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: itemImports },
    template: `
      <au-description-list [layout]="layout" [columns]="columns">
        <au-description-item term="Name">Ada Lovelace</au-description-item>
        <au-description-item term="Email">ada@example.com</au-description-item>
        <au-description-item term="Role">Engineer</au-description-item>
      </au-description-list>
    `,
  }),
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    await expect(canvasElement.querySelector('dl.au-description-list__list')).toBeTruthy();
    await expect(el.getAllByRole('term')).toHaveLength(3);
    await expect(el.getAllByRole('definition')).toHaveLength(3);
  },
};

export const Horizontal: Story = {
  args: { layout: 'horizontal' },
  render: Default.render,
};

export const NativeDtDd: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Advanced: project native `<dt>` and `<dd>` for custom markup inside descriptions.',
      },
    },
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuDescriptionList] },
    template: `
      <au-description-list [layout]="layout" [columns]="columns">
        <dt>Name</dt><dd>Ada Lovelace</dd>
        <dt>Email</dt><dd>ada@example.com</dd>
      </au-description-list>
    `,
  }),
};
