import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuAccordionItem } from './au-accordion-item.directive';
import { AuAccordionPanel } from './au-accordion-panel';
import { AuAccordion } from './accordion';

const storyImports = [AuAccordion, AuAccordionItem, AuAccordionPanel];

const meta: Meta<AuAccordion> = {
  title: 'Aurea/Accordion',
  component: AuAccordion,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('accordion'),
  argTypes: {
    multiple: { control: 'boolean', table: { category: 'Behavior' } },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { category: 'Appearance' },
    },
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
  },
  args: {
    multiple: true,
    size: 'md',
    ariaLabel: 'Account settings',
  },
};

export default meta;
type Story = StoryObj<AuAccordion>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, expanded: ['profile'] },
    moduleMetadata: { imports: storyImports },
    template: `
      <au-accordion
        [(value)]="expanded"
        [multiple]="multiple"
        [size]="size"
        [ariaLabel]="ariaLabel"
      >
        <div class="au-accordion__item">
          <button type="button" auAccordionItem="profile">Profile</button>
          <au-accordion-panel panel="profile">Update your name, email, and avatar.</au-accordion-panel>
        </div>
        <div class="au-accordion__item">
          <button type="button" auAccordionItem="billing">Billing</button>
          <au-accordion-panel panel="billing">Manage payment methods and invoices.</au-accordion-panel>
        </div>
        <div class="au-accordion__item">
          <button type="button" auAccordionItem="security">Security</button>
          <au-accordion-panel panel="security">Change password and enable 2FA.</au-accordion-panel>
        </div>
      </au-accordion>
    `,
  }),
};

export const SingleExpand: Story = {
  args: { multiple: false },
  render: Default.render,
};

export const Compact: Story = {
  args: { size: 'sm' },
  render: Default.render,
};
