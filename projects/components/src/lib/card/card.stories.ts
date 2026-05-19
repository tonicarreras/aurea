import type { Meta, StoryObj } from '@storybook/angular';
import type { Type } from '@angular/core';

import { AuButton } from '../button/button';
import { AuCardFooter } from './card-footer.directive';
import { AuCard } from './card';

const storyImports = { imports: [AuCard] };
const withFooterImports = { imports: [AuCard, AuButton, AuCardFooter] };

function cardRender(
  args: Record<string, unknown>,
  template: string,
  moduleMetadata: { imports: Type<unknown>[] } = storyImports,
) {
  return { props: args, moduleMetadata, template };
}

const meta: Meta<AuCard> = {
  title: 'Aurea/Card',
  component: AuCard,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: { extractArgTypes: () => ({}) },
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
type Story = StoryObj<AuCard>;

export const Default: Story = {
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size">
        <h3 auCardHeader>Card title</h3>
        <p auCardBody>Body copy uses the same surface and spacing rhythm as the dialog.</p>
      </au-card>
    `,
    ),
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size">
        <h3 auCardHeader>Outlined card</h3>
        <p auCardBody>Stronger border, no elevation shadow.</p>
      </au-card>
    `,
    ),
};

export const Filled: Story = {
  args: { variant: 'filled' },
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size">
        <h3 auCardHeader>Filled card</h3>
        <p auCardBody>Subtle elevated surface for nested sections on canvas.</p>
      </au-card>
    `,
    ),
};

export const WithFooter: Story = {
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size">
        <h3 auCardHeader>Confirm</h3>
        <p auCardBody>Review the summary before continuing.</p>
        <div auCardFooter>
          <au-button style="margin-right: var(--au-space-2);" variant="secondary" type="button">Cancel</au-button>
          <au-button type="button">Continue</au-button>
        </div>
      </au-card>
    `,
      withFooterImports,
    ),
};

export const WithMedia: Story = {
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size" style="max-width: 22rem;">
        <img
          auCardMedia
          src="https://picsum.photos/seed/aurea-card/640/240"
          alt="Decorative cover"
          width="640"
          height="240"
        />
        <h3 auCardHeader>Featured</h3>
        <p auCardBody>Media is full-bleed; text keeps inner padding.</p>
      </au-card>
    `,
    ),
};

export const SmallSize: Story = {
  args: { size: 'sm' },
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size">
        <h3 auCardHeader>Compact</h3>
        <p auCardBody>Reduced padding for dense lists.</p>
      </au-card>
    `,
    ),
};

export const LargeSize: Story = {
  args: { size: 'lg' },
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size">
        <h3 auCardHeader>Spacious</h3>
        <p auCardBody>More padding for emphasis or hero cards.</p>
      </au-card>
    `,
    ),
};
