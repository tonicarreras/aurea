import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuButton } from '../button';
import { AuEmptyStateMedia } from './au-empty-state-media.directive';
import { AuEmptyState } from './empty-state';

const meta: Meta<AuEmptyState> = {
  title: 'Aurea/EmptyState',
  component: AuEmptyState,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('empty-state'),
  argTypes: {
    title: {
      control: 'text',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      table: { category: 'Content' },
    },
    icon: {
      control: 'select',
      options: [undefined, 'search', 'info', 'plus', 'menu'],
      table: { category: 'Content' },
    },
    imageSrc: {
      control: 'text',
      table: { category: 'Content' },
    },
    imageAlt: {
      control: 'text',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
    headingLevel: {
      control: 'select',
      options: [2, 3, 4],
      table: { category: 'Accessibility' },
    },
  },
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters or search term.',
    icon: 'search',
    size: 'md',
    headingLevel: 2,
  },
};

export default meta;
type Story = StoryObj<AuEmptyState>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuEmptyState, AuButton] },
    template: `
      <au-empty-state
        [title]="title"
        [description]="description"
        [icon]="icon"
        [size]="size"
        [headingLevel]="headingLevel"
      >
        <button auButton variant="outline" type="button">Clear filters</button>
      </au-empty-state>
    `,
  }),
};

export const TitleOnly: Story = {
  args: {
    title: 'Nothing here yet',
    description: '',
    icon: undefined,
  },
};

export const Compact: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg', icon: 'plus', title: 'Create your first project' },
};

export const WithImage: Story = {
  args: {
    icon: undefined,
    imageSrc: 'https://placehold.co/96x96/e2e8f0/64748b?text=Empty',
    imageAlt: '',
    title: 'Inbox zero',
    description: 'You are all caught up.',
  },
};

export const CustomSvg: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuEmptyState, AuEmptyStateMedia, AuButton] },
    template: `
      <au-empty-state
        [title]="title"
        [description]="description"
        [size]="size"
      >
        <svg
          auEmptyStateMedia
          aria-hidden="true"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="12" y="20" width="72" height="56" rx="8" stroke="currentColor" stroke-width="2" />
          <path d="M32 44h32M32 52h20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <button auButton type="button">Create project</button>
      </au-empty-state>
    `,
  }),
  args: {
    title: 'No projects yet',
    description: 'Start by creating your first project.',
    size: 'md',
  },
};
