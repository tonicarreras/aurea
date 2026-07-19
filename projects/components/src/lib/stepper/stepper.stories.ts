import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuStepperStep } from './au-stepper-step.directive';
import { AuStepperPanel } from './au-stepper-panel.directive';
import { AuStepper } from './stepper';

const storyImports = { imports: [AuStepper, AuStepperStep, AuStepperPanel] };

const meta: Meta<AuStepper> = {
  title: 'Aurea/Stepper',
  component: AuStepper,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('stepper'),
  argTypes: {
    value: {
      control: 'text',
      description: 'Active step key (`[(value)]`).',
      table: { category: 'State' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for step navigation.',
      table: { category: 'Accessibility' },
    },
    linear: {
      control: 'boolean',
      description: 'Block jumps to future steps until previous ones are completed.',
      table: { category: 'Behavior' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Stepper density.',
      table: { category: 'Appearance' },
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation.',
      table: { category: 'Appearance' },
    },
  },
  args: {
    ariaLabel: 'Checkout progress',
    size: 'md',
    linear: true,
    layout: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<AuStepper>;

export const CheckoutWizard: Story = {
  render: (args) => ({
    props: {
      ...args,
      step: 'account',
      accountDone: true,
      shippingDone: false,
    },
    moduleMetadata: storyImports,
    template: `
      <au-stepper
        [(value)]="step"
        [ariaLabel]="ariaLabel"
        [size]="size"
        [linear]="linear"
        [layout]="layout"
      >
        <button type="button" auStep="account" [auStepCompleted]="accountDone">Account</button>
        <button type="button" auStep="shipping" [auStepCompleted]="shippingDone">Shipping</button>
        <button type="button" auStep="review">Review</button>

        <section auStepPanel="account">
          <p>Create your account and contact details.</p>
        </section>
        <section auStepPanel="shipping">
          <p>Choose your shipping option.</p>
        </section>
        <section auStepPanel="review">
          <p>Review and confirm your order.</p>
        </section>
      </au-stepper>
    `,
  }),
};

export const NonLinear: Story = {
  args: { linear: false },
  render: CheckoutWizard.render,
};

export const VerticalLayout: Story = {
  args: { layout: 'vertical' },
  render: CheckoutWizard.render,
};

export const WithOptionalStep: Story = {
  render: (args) => ({
    props: { ...args, step: 'account', accountDone: true },
    moduleMetadata: storyImports,
    template: `
      <au-stepper [(value)]="step" [ariaLabel]="ariaLabel" [layout]="layout" [linear]="linear">
        <button type="button" auStep="account" [auStepCompleted]="true">Account</button>
        <button type="button" auStep="shipping" [auStepOptional]="true" [auStepCompleted]="true">Shipping</button>
        <button type="button" auStep="payment" [auStepOptional]="true">Payment</button>
        <button type="button" auStep="review">Review</button>
        <section auStepPanel="account"><p>Account details.</p></section>
        <section auStepPanel="shipping"><p>Shipping info (optional).</p></section>
        <section auStepPanel="payment"><p>Payment (optional).</p></section>
        <section auStepPanel="review"><p>Review order.</p></section>
      </au-stepper>`,
  }),
};

export const WithErrorStep: Story = {
  render: (args) => ({
    props: { ...args, step: 'shipping' },
    moduleMetadata: storyImports,
    template: `
      <au-stepper [(value)]="step" [ariaLabel]="ariaLabel" [layout]="layout" [linear]="linear">
        <button type="button" auStep="account" [auStepCompleted]="true">Account</button>
        <button type="button" auStep="shipping" [auStepError]="true">Shipping</button>
        <button type="button" auStep="review">Review</button>
        <section auStepPanel="account"><p>Account done.</p></section>
        <section auStepPanel="shipping"><p>Shipping has errors.</p></section>
        <section auStepPanel="review"><p>Review.</p></section>
      </au-stepper>`,
  }),
};
