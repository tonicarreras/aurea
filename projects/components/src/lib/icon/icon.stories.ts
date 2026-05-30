import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuIcon, AU_ICON_NAMES } from './icon';

const semanticNames = AU_ICON_NAMES.filter((n) =>
  ['check-circle', 'check', 'warning', 'error', 'info', 'close', 'spinner'].includes(n),
);
const uiNames = AU_ICON_NAMES.filter((n) => !semanticNames.includes(n));

const meta: Meta<AuIcon> = {
  title: 'Aurea/Icon',
  component: AuIcon,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('icon'),
  argTypes: {
    name: { control: 'select', options: [...AU_ICON_NAMES], table: { category: 'Content' } },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    name: 'info',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<AuIcon>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuIcon] },
    template: `
      <div style="display:flex;gap:1.5rem;align-items:flex-end;color:var(--au-color-text-primary);">
        @for (s of sizes; track s) {
          <div style="display:flex;flex-direction:column;align-items:center;gap:0.35rem;font-size:0.75rem;">
            <au-icon name="info" [size]="s" />
            <span>{{ s }}</span>
          </div>
        }
      </div>
    `,
    props: { sizes: ['xs', 'sm', 'md', 'lg'] as const },
  }),
};

export const SemanticGlyphs: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuIcon] },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;color:var(--au-color-text-primary);">
        @for (n of names; track n) {
          <div style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;font-size:0.75rem;">
            <au-icon [name]="n" size="md" />
            <span>{{ n }}</span>
          </div>
        }
      </div>
    `,
    props: { names: semanticNames },
  }),
};

export const UiGlyphs: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuIcon] },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;color:var(--au-color-text-primary);">
        @for (n of names; track n) {
          <div style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;font-size:0.75rem;">
            <au-icon [name]="n" size="md" />
            <span>{{ n }}</span>
          </div>
        }
      </div>
    `,
    props: { names: uiNames },
  }),
};
