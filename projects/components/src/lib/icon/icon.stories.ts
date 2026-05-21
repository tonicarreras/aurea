import type { Meta, StoryObj } from '@storybook/angular';

import { AuIcon, type AuIconName } from './icon';

const names: AuIconName[] = ['check-circle', 'warning', 'error', 'info', 'close', 'spinner'];

const meta: Meta<AuIcon> = {
  title: 'Aurea/Icon',
  component: AuIcon,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component: 'Shared SVG glyphs for alerts, dialogs, buttons, and chips. Decorative (`aria-hidden`).',
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: names, table: { category: 'Content' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Appearance' } },
  },
  args: {
    name: 'info',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<AuIcon>;

export const Default: Story = {};

export const AllGlyphs: Story = {
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
    props: { names },
  }),
};
