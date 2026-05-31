import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuAvatar } from './avatar';

const meta: Meta<AuAvatar> = {
  title: 'Aurea/Avatar',
  component: AuAvatar,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('avatar'),
  argTypes: {
    src: { control: 'text', table: { category: 'Content' } },
    alt: { control: 'text', table: { category: 'Content' } },
    name: { control: 'text', table: { category: 'Content' } },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { category: 'Appearance' },
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      table: { category: 'Appearance' },
    },
    decorative: { control: 'boolean', table: { category: 'Accessibility' } },
  },
  args: {
    src: '',
    alt: '',
    name: 'Jane Doe',
    size: 'md',
    shape: 'circle',
    decorative: false,
  },
};

export default meta;
type Story = StoryObj<AuAvatar>;

export const Initials: Story = {};

export const Image: Story = {
  args: {
    src: 'https://i.pravatar.cc/128?img=5',
    alt: 'Portrait of Jane Doe',
    name: 'Jane Doe',
  },
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuAvatar] },
    template: `
      <div class="au-story-stage" style="display:flex;align-items:center;gap:var(--au-space-3);">
        <au-avatar size="xs" name="Jane Doe" />
        <au-avatar size="sm" name="Jane Doe" />
        <au-avatar size="md" name="Jane Doe" />
        <au-avatar size="lg" name="Jane Doe" />
        <au-avatar size="xl" name="Jane Doe" />
      </div>
    `,
  }),
};

export const Square: Story = {
  args: {
    shape: 'square',
    name: 'Aurea DS',
  },
  parameters: {
    docs: {
      description: {
        story: 'Square avatar with control-radius corners (not a circle).',
      },
    },
  },
};
