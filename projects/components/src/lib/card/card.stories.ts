import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import type { Type } from '@angular/core';

import { AuButton } from '../button';
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
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('card'),
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
    interactive: {
      control: 'boolean',
      description: 'Hover lift on elevated variant (clickable tiles / links).',
      table: { category: 'Behavior' },
    },
    equalHeight: {
      control: 'boolean',
      description: 'Fill parent height in grid/flex layouts.',
      table: { category: 'Layout' },
    },
    mediaBleed: {
      control: 'boolean',
      description: 'Media slot flush to card top edges.',
      table: { category: 'Layout' },
    },
  },
  args: {
    variant: 'elevated',
    size: 'md',
    interactive: false,
  },
};

export default meta;
type Story = StoryObj<AuCard>;

export const Default: Story = {
  render: (args) =>
    cardRender(
      args,
      `
      <au-card [variant]="variant" [size]="size" [interactive]="interactive">
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
      <au-card [variant]="variant" [size]="size" [interactive]="interactive">
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
      <au-card [variant]="variant" [size]="size" [interactive]="interactive">
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
      <au-card [variant]="variant" [size]="size" [interactive]="interactive">
        <h3 auCardHeader>Confirm</h3>
        <p auCardBody>Review the summary before continuing.</p>
        <div auCardFooter>
          <button auButton style="margin-right: var(--au-space-2);" variant="secondary" type="button">Cancel</button>
          <button auButton type="button">Continue</button>
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
      <au-card [variant]="variant" [size]="size" [interactive]="interactive">
        <h3 auCardHeader>Compact</h3>
        <p auCardBody>Reduced padding for dense lists.</p>
      </au-card>
    `,
    ),
};

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) =>
    cardRender(
      args,
      `
      <au-card
        [variant]="variant"
        [size]="size"
        [interactive]="interactive"
        style="max-width: 22rem;"
      >
        <h3 auCardHeader>Open workspace</h3>
        <p auCardBody>Whole card is the hit target — interactive strengthens the border on hover (no lift).</p>
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
      <au-card [variant]="variant" [size]="size" [interactive]="interactive">
        <h3 auCardHeader>Spacious</h3>
        <p auCardBody>More padding for emphasis or hero cards.</p>
      </au-card>
    `,
    ),
};

export const EqualHeightGrid: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuCard, AuButton, AuCardFooter] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--au-space-4);max-width:40rem;align-items:stretch;">
        <au-card equalHeight variant="elevated">
          <h3 auCardHeader part="card-title">Margherita</h3>
          <p auCardBody>Tomate, mozzarella, albahaca.</p>
          <div auCardFooter><button auButton type="button">Pedir</button></div>
        </au-card>
        <au-card equalHeight variant="elevated">
          <h3 auCardHeader part="card-title">Quattro formaggi</h3>
          <p auCardBody>Cuatro quesos, miel y romero. Descripción más larga para demostrar altura igual en grid.</p>
          <div auCardFooter><button auButton type="button">Pedir</button></div>
        </au-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Usa `[equalHeight]="true"` en cada card del grid. Personaliza títulos con `part="card-title"` + `::part(card-title)`.',
      },
    },
  },
};

export const MediaBleed: Story = {
  args: { mediaBleed: true, variant: 'elevated' },
  render: (args) =>
    cardRender(
      args,
      `
      <au-card
        [variant]="variant"
        [mediaBleed]="mediaBleed"
        style="max-width: 22rem; overflow: hidden;"
      >
        <img
          auCardMedia
          src="https://placehold.co/640x360/e2e8f0/64748b?text=Pizza"
          alt=""
        />
        <h3 auCardHeader>Diavola</h3>
        <p auCardBody>Media a sangre en el borde superior de la card.</p>
      </au-card>
    `,
    ),
};
