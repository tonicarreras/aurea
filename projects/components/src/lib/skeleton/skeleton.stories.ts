import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuSkeleton } from './skeleton';


const meta: Meta<AuSkeleton> = {
  title: 'Aurea/Skeleton',
  component: AuSkeleton,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('skeleton'),
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded', 'button'],
      table: { category: 'Appearance' },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
    width: {
      control: 'text',
      description: 'CSS width (e.g. `100%`, `12rem`).',
      table: { category: 'Layout' },
    },
    height: {
      control: 'text',
      description: 'CSS height override.',
      table: { category: 'Layout' },
    },
    radius: {
      control: 'text',
      description: 'Border-radius override.',
      table: { category: 'Layout' },
    },
  },
  args: {
    variant: 'text',
    animation: 'pulse',
    size: 'md',
    width: undefined,
    height: undefined,
    radius: undefined,
  },
};

export default meta;
type Story = StoryObj<AuSkeleton>;

export const Text: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuSkeleton] },
    template: `
      <div style="max-width: 20rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <au-skeleton
          [variant]="variant"
          [animation]="animation"
          [size]="size"
          [width]="width"
          [height]="height"
          [radius]="radius"
        />
        <au-skeleton variant="text" [animation]="animation" width="75%" />
        <au-skeleton variant="text" [animation]="animation" width="50%" />
      </div>
    `,
  }),
};

export const Circular: Story = {
  args: { variant: 'circular', animation: 'wave' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuSkeleton] },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <au-skeleton variant="circular" size="sm" [animation]="animation" />
        <au-skeleton variant="circular" size="md" [animation]="animation" />
        <au-skeleton variant="circular" size="lg" [animation]="animation" />
      </div>
    `,
  }),
};

export const Rectangular: Story = {
  args: { variant: 'rectangular', animation: 'wave' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuSkeleton] },
    template: `
      <au-skeleton
        [variant]="variant"
        [animation]="animation"
        [width]="width ?? '100%'"
        [height]="height ?? '8rem'"
      />
    `,
  }),
};

export const Rounded: Story = {
  args: { variant: 'rounded', animation: 'pulse' },
  render: Rectangular.render,
};

export const Button: Story = {
  args: { variant: 'button', animation: 'pulse' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuSkeleton] },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
        <au-skeleton variant="button" size="sm" [animation]="animation" />
        <au-skeleton variant="button" size="md" [animation]="animation" />
        <au-skeleton variant="button" size="lg" [animation]="animation" />
      </div>
    `,
  }),
};

export const Animations: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuSkeleton] },
    template: `
      <div style="max-width: 20rem; display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--au-color-text-secondary);">Pulse</p>
          <au-skeleton variant="text" animation="pulse" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--au-color-text-secondary);">Wave</p>
          <au-skeleton variant="text" animation="wave" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: var(--au-color-text-secondary);">None</p>
          <au-skeleton variant="text" animation="none" />
        </div>
      </div>
    `,
  }),
};

export const CardPlaceholder: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuSkeleton] },
    template: `
      <div
        role="status"
        aria-busy="true"
        aria-label="Loading card"
        style="
          width: 100%;
          max-width: 22rem;
          box-sizing: border-box;
          padding: 1rem;
          border-radius: var(--au-radius-lg);
          border: 1px solid var(--au-color-border-default);
          background: var(--au-color-surface-raised);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow: hidden;
        "
      >
        <au-skeleton variant="rounded" animation="wave" height="9rem" width="100%" />
        <au-skeleton variant="text" animation="wave" width="55%" />
        <au-skeleton variant="text" animation="wave" width="100%" />
        <au-skeleton variant="text" animation="wave" width="80%" />
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.25rem;
            width: 100%;
            min-width: 0;
          "
        >
          <au-skeleton variant="button" size="md" animation="pulse" width="5.5rem" />
          <au-skeleton variant="button" size="md" animation="pulse" width="4rem" />
        </div>
      </div>
    `,
  }),
};

export const ListPlaceholder: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuSkeleton] },
    template: `
      <div
        role="status"
        aria-busy="true"
        aria-label="Loading list"
        style="max-width: 24rem; display: flex; flex-direction: column; gap: 1rem;"
      >
        @for (row of [1, 2, 3]; track row) {
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <au-skeleton variant="circular" size="md" animation="wave" />
            <div style="flex: 1; display: flex; flex-direction: column; gap: 0.375rem;">
              <au-skeleton variant="text" animation="wave" width="35%" />
              <au-skeleton variant="text" animation="wave" />
            </div>
          </div>
        }
      </div>
    `,
  }),
};
