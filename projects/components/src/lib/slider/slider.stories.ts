import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuFormField } from '../form-field/form-field';
import { AuSlider } from './slider';

const meta: Meta<AuSlider> = {
  title: 'Aurea/Slider',
  component: AuSlider,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('slider'),
  argTypes: {
    min: { control: 'number', table: { category: 'Behavior' } },
    max: { control: 'number', table: { category: 'Behavior' } },
    step: { control: 'number', table: { category: 'Behavior' } },
    showValue: { control: 'boolean', table: { category: 'Appearance' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    disabled: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<AuSlider>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, volume: 35 },
    moduleMetadata: { imports: [AuFormField, AuSlider] },
    template: `
      <au-form-field label="Volume" hint="Adjust speaker level.">
        <au-slider
          [(value)]="volume"
          [min]="min"
          [max]="max"
          [step]="step"
          [showValue]="showValue"
          [disabled]="disabled"
          [size]="size"
        />
      </au-form-field>
    `,
  }),
};

export const WithoutValue: Story = {
  args: { showValue: false },
  render: Default.render,
};
