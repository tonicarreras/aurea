import type { Meta, StoryObj } from '@storybook/angular';

import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuBadge } from './badge';

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-badge` is a compact status or count label. Variants map to semantic tokens; use **dot** mode when the meaning is clear from surrounding text.',
  whenToUse: {
    use: [
      'Unread counts, status pills, or category labels inline with headings or list rows',
      'Dot indicator when context supplies the meaning (e.g. online status)',
    ],
    avoid: [
      'Removable or selectable filters → **`au-chip`** / **`au-chip-group`**',
      'Full sentences or dismissible alerts → **`au-message`**',
    ],
  },
  anatomy: [
    { region: 'Host `au-badge`', notes: '`data-au-variant`; optional `data-au-dot`.' },
    { region: 'Label', notes: 'Text via `label`; hidden visually in dot-only mode.' },
  ],
  accessibility: [
    {
      topic: 'Dot-only',
      detail: 'Pair with visible text or an accessible name on a parent.',
    },
    {
      topic: 'Live updates',
      detail: 'Use `aria-live` on a parent when counts are announced dynamically.',
    },
  ],
  tokens: [
    { concern: 'Shape / type', examples: '`--au-radius-pill`, `--au-text-xs`' },
    {
      concern: 'Surfaces',
      examples: '`--au-color-surface-sunken`, semantic `-*-surface` per variant',
    },
  ],
});

const meta: Meta<AuBadge> = {
  title: 'Aurea/Badge',
  component: AuBadge,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warning', 'error', 'info'],
      description: 'Semantic surface and border colors.',
      table: { category: 'Appearance' },
    },
    dot: {
      control: 'boolean',
      description: 'Renders a dot without visible label text.',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: 'Visible count or status text.',
      table: { category: 'Content' },
    },
  },
  args: { variant: 'default', dot: false, label: '12' },
};

export default meta;
type Story = StoryObj<AuBadge>;

export const Default: Story = {};

export const Dot: Story = { args: { dot: true, label: '' } };

export const Variants: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuBadge] },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">
        <au-badge label="Default" />
        <au-badge variant="accent" label="New" />
        <au-badge variant="success" label="OK" />
        <au-badge variant="warning" label="!" />
        <au-badge variant="error" label="3" />
        <au-badge variant="info" label="i" />
      </div>
    `,
  }),
};
