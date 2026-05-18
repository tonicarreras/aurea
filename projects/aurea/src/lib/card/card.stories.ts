import type { Meta, StoryObj } from '@storybook/angular';

import { Card } from './card';

const meta: Meta<Card> = {
  title: 'Aurea/Card',
  component: Card,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual style of the card.',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Density / padding of the card.',
      table: { category: 'Appearance' },
    },
  },
  args: {
    variant: 'elevated',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default elevated card. Projected content receives standard body padding.',
      },
    },
  },
  render: () => ({
    template: `
      <au-card>
        <h3 auCardHeader>Card title</h3>
        <p auCardBody>Body copy uses design tokens for type and color.</p>
      </au-card>
    `,
  }),
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
  render: () => ({
    template: `
      <au-card variant="outlined">
        <h3 auCardHeader>Outlined card</h3>
        <p auCardBody>Border instead of shadow for lighter layouts.</p>
      </au-card>
    `,
  }),
};

export const Filled: Story = {
  args: { variant: 'filled' },
  render: () => ({
    template: `
      <au-card variant="filled">
        <h3 auCardHeader>Filled card</h3>
        <p auCardBody>Subtle background for grouped sections.</p>
      </au-card>
    `,
  }),
};

export const WithFooter: Story = {
  render: () => ({
    template: `
      <au-card>
        <h3 auCardHeader>Confirm</h3>
        <p auCardBody>Review the summary before continuing.</p>
        <div auCardFooter>
          <button type="button">Cancel</button>
          <button type="button">Continue</button>
        </div>
      </au-card>
    `,
  }),
};

export const SmallSize: Story = {
  args: { size: 'sm' },
  render: () => ({
    template: `
      <au-card size="sm">
        <h3 auCardHeader>Compact</h3>
        <p auCardBody>Reduced padding for dense lists.</p>
      </au-card>
    `,
  }),
};

export const LargeSize: Story = {
  args: { size: 'lg' },
  render: () => ({
    template: `
      <au-card size="lg">
        <h3 auCardHeader>Spacious</h3>
        <p auCardBody>More padding for emphasis or hero cards.</p>
      </au-card>
    `,
  }),
};
