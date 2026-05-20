import type { Meta, StoryObj } from '@storybook/angular';

import { AuStep } from './au-step.directive';
import { AuStepPanel } from './au-step-panel.directive';
import { AuSteps } from './steps';

const storyImports = { imports: [AuSteps, AuStep, AuStepPanel] };

const meta: Meta<AuSteps> = {
  title: 'Aurea/Steps',
  component: AuSteps,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: { extractArgTypes: () => ({}) },
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
