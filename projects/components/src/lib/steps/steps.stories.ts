import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuStep } from './au-step.directive';
import { AuStepPanel } from './au-step-panel.directive';
import { AuSteps } from './steps';

const storyImports = { imports: [AuSteps, AuStep, AuStepPanel] };


const meta: Meta<AuSteps> = {
  title: 'Aurea/Steps',
  component: AuSteps,
  tags: ['autodocs', 'au', 'beta'],
  parameters: storyMetaParameters('steps'),
  argTypes: {
    value: {
      control: 'text',
      description: 'Active step key (`[(value)]`).',
      table: { category: 'State' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name of the step list.',
      table: { category: 'Accessibility' },
    },
    layout: {
      control: 'select',
      options: ['tabs', 'sections'],
      description: 'One panel at a time vs. scrollable sections.',
      table: { category: 'Layout' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Step button density.',
      table: { category: 'Appearance' },
    },
  },
  args: {
    ariaLabel: 'Documentation sections',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<AuSteps>;

export const DocsNavigation: Story = {
  render: (args) => ({
    props: { ...args, section: 'overview' },
    moduleMetadata: storyImports,
    template: `
      <au-steps [(value)]="section" [ariaLabel]="ariaLabel" [size]="size">
        <button type="button" auStep="overview">Overview</button>
        <button type="button" auStep="api">API</button>
        <button type="button" auStep="styling">Styling</button>
        <button type="button" auStep="examples">Examples</button>
        <div auStepPanel="overview"><p>Overview content</p></div>
        <div auStepPanel="api"><p>API reference</p></div>
        <div auStepPanel="styling"><p>Design tokens</p></div>
        <div auStepPanel="examples"><p>Usage examples</p></div>
      </au-steps>
    `,
  }),
};
