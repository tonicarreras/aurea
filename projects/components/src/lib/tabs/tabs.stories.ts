import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { expect, userEvent, within } from 'storybook/test';

import { AuTab } from './au-tab.directive';
import { AuTabPanel } from './au-tab-panel.directive';
import { AuTabs } from './tabs';

const storyImports = { imports: [AuTabs, AuTab, AuTabPanel] };

const meta: Meta<AuTabs> = {
  title: 'Aurea/Tabs',
  component: AuTabs,
  tags: ['autodocs', 'au', 'beta'],
  parameters: storyMetaParameters('tabs'),
  argTypes: {
    value: {
      control: 'text',
      description: 'Active tab key (`ModelSignal<string>`).',
      table: { category: 'Value' },
    },
    valueChange: {
      description: 'Emits when the active tab changes.',
      table: { category: 'Events' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the tablist.',
      table: { category: 'Accessibility' },
    },
    variant: {
      control: 'select',
      options: ['line', 'contained'],
      table: { category: 'Appearance' },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    variant: 'line',
    orientation: 'horizontal',
    size: 'md',
    ariaLabel: 'Account sections',
  },
};

export default meta;
type Story = StoryObj<AuTabs>;

const tabTemplate = `
  <au-tabs
    [(value)]="active"
    [variant]="variant"
    [orientation]="orientation"
    [size]="size"
    [ariaLabel]="ariaLabel"
  >
    <button type="button" auTab="profile">Profile</button>
    <button type="button" auTab="billing">Billing</button>
    <button type="button" auTab="security">Security</button>
    <div auTabPanel="profile">
      <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Profile</h3>
      <p style="margin: 0;">Update your name, email, and avatar.</p>
    </div>
    <div auTabPanel="billing">
      <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Billing</h3>
      <p style="margin: 0;">Manage payment methods and invoices.</p>
    </div>
    <div auTabPanel="security">
      <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Security</h3>
      <p style="margin: 0;">Password, 2FA, and active sessions.</p>
    </div>
  </au-tabs>
`;

function tabsRender(args: Record<string, unknown>, active = 'profile') {
  return {
    props: { ...args, active },
    moduleMetadata: storyImports,
    template: tabTemplate,
  };
}

export const Default: Story = {
  render: (args) => tabsRender(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const billing = canvas.getByRole('tab', { name: 'Billing' });
    await userEvent.click(billing);
    await expect(billing).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Billing');
  },
};

export const Contained: Story = {
  args: { variant: 'contained' },
  render: (args) => tabsRender(args),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => tabsRender(args),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => tabsRender(args),
};

export const WithDisabledTab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled tabs are skipped by keyboard navigation and ignore clicks.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, active: 'profile' },
    moduleMetadata: storyImports,
    template: `
      <au-tabs [(value)]="active" [variant]="variant" [ariaLabel]="ariaLabel">
        <button type="button" auTab="profile">Profile</button>
        <button type="button" auTab="billing" [auTabDisabled]="true">Billing</button>
        <button type="button" auTab="security">Security</button>
        <div auTabPanel="profile"><p style="margin:0">Profile panel</p></div>
        <div auTabPanel="billing"><p style="margin:0">Billing panel</p></div>
        <div auTabPanel="security"><p style="margin:0">Security panel</p></div>
      </au-tabs>
    `,
  }),
};
