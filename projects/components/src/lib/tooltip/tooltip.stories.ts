import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { AuButton } from '../button/button';
import { AuTooltip } from './au-tooltip.directive';
import type { AuTooltipPlacement } from '../overlay/tooltip-position';

const storyImports = { imports: [AuTooltip, AuButton] };

interface TooltipStoryArgs {
  text: string;
  placement: AuTooltipPlacement;
  showDelay: number;
  hideDelay: number;
  disabled: boolean;
}

const meta: Meta<TooltipStoryArgs> = {
  title: 'Aurea/Tooltip',
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component:
          'Contextual tooltip on a host via `auTooltip` / `auTooltipPlacement`. Portaled bubble with configurable show/hide delay.',
      },
    },
  },
  argTypes: {
    text: { control: 'text', table: { category: 'Content' } },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
      table: { category: 'Appearance' },
    },
    showDelay: { control: 'number', table: { category: 'Behavior' } },
    hideDelay: { control: 'number', table: { category: 'Behavior' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
  },
  args: {
    text: 'Additional context for this control.',
    placement: 'top',
    showDelay: 200,
    hideDelay: 100,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TooltipStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: storyImports,
    template: `
      <div class="au-story-stage">
        <au-button
          variant="outline"
          [auTooltip]="text"
          [auTooltipPlacement]="placement"
          [auTooltipShowDelay]="showDelay"
          [auTooltipHideDelay]="hideDelay"
          [auTooltipDisabled]="disabled"
        >
          Hover or focus me
        </au-button>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: /hover or focus/i });
    await userEvent.hover(trigger);
    const doc = canvasElement.ownerDocument;
    const tooltip = await within(doc.body).findByRole('tooltip');
    await expect(tooltip).toHaveTextContent(/additional context/i);
    await userEvent.unhover(trigger);
  },
};

export const PlacementBottom: Story = {
  args: { placement: 'bottom', text: 'Shown below the trigger' },
  render: Default.render,
};

export const LongText: Story = {
  args: {
    text: 'Tooltips wrap long copy instead of stretching past the viewport edge.',
  },
  render: Default.render,
};

export const Instant: Story = {
  args: { showDelay: 0, hideDelay: 0, text: 'No show/hide delay' },
  render: Default.render,
};

export const Disabled: Story = {
  args: { disabled: true, text: 'You should not see this' },
  render: Default.render,
};
