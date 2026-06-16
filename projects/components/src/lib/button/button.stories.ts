import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { fn, expect } from 'storybook/test';

import { AuButton } from './au-button.directive';

interface ButtonStoryArgs {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  loading: boolean;
  type: 'button' | 'submit' | 'reset';
  name: string;
  label: string;
  onClick: ReturnType<typeof fn>;
}

const storyImports = { imports: [AuButton] };

function buttonRender(args: Record<string, unknown>, template: string) {
  return { props: args, moduleMetadata: storyImports, template };
}

const meta: Meta<ButtonStoryArgs> = {
  title: 'Aurea/Button',
  component: AuButton,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('button'),
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description:
        'Visual style: primary (solid), secondary (filled), outline (border-only), ghost (text-only).',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Density: sm (compact), md (default), lg (touch-friendly, 44px min).',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and suppresses click events.',
      table: { category: 'State' },
    },
    loading: {
      control: 'boolean',
      description: 'Shows spinner and suppresses clicks.',
      table: { category: 'State' },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native HTML type.',
      table: { category: 'Form' },
    },
    name: {
      control: 'text',
      description: 'Native `name` attribute for form submission.',
      table: { category: 'Form' },
    },
    label: {
      control: 'text',
      description: 'Visible label (for icons only; use ng-content for text).',
      table: { category: 'Accessibility' },
    },
    onClick: {
      description: 'Native `(click)` handler on the host button (Storybook demo).',
      table: { category: 'Events' },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    type: 'button',
    name: '',
    label: '',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default **primary** variant with solid accent background. Use for main CTAs.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" (click)="onClick($event)">Primary</button>`,
    ),
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Secondary** variant with filled surface and neutral border. Use for supporting actions.',
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" (click)="onClick($event)">Secondary</button>`,
    ),
};

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Outline** variant with transparent background and accent border. Use for secondary CTAs.',
      },
    },
  },
  args: {
    variant: 'outline',
    size: 'md',
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" (click)="onClick($event)">Outline</button>`,
    ),
};

export const Ghost: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Ghost** variant with text-only appearance. Use for tertiary actions or toolbars.',
      },
    },
  },
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" (click)="onClick($event)">Ghost</button>`,
    ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Disabled buttons have **`aria-disabled`** and **`disabled`**. Focus is still reachable for screen reader announcements but click events are suppressed.',
      },
    },
  },
  args: {
    variant: 'primary',
    disabled: true,
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [disabled]="disabled" (click)="onClick($event)">Disabled</button>`,
    ),
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Loading state shows a spinner with **`aria-busy="true"`**. Click events are suppressed while loading.',
      },
    },
  },
  args: {
    variant: 'primary',
    loading: true,
    label: 'Processing',
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [loading]="loading" [label]="label" (click)="onClick($event)">Processing...</button>`,
    ),
};

export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size (**`size="sm"`**) for dense layouts like tables or compact toolbars.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'sm',
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [size]="size" (click)="onClick($event)">Small</button>`,
    ),
};

export const Large: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Large size (**`size="lg"`**) meets the 44×44px touch target recommendation (WCAG 2.5.8).',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'lg',
  },
  render: (args) =>
    buttonRender(
      args,
      `<button type="button" auButton [variant]="variant" [size]="size" (click)="onClick($event)">Large (Touch)</button>`,
    ),
};

export const FocusRing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Focus ring: **outer ring on Tab**, **inset ring on click**. The **play** function demonstrates tab navigation vs pointer focus.',
      },
    },
  },
  args: {
    variant: 'primary',
  },
  render: (args) =>
    buttonRender(
      args,
      `
      <div style="display: flex; gap: 16px; align-items: center;">
        <button type="button" auButton [variant]="variant" (click)="onClick($event)">Tab to me</button>
        <button type="button" auButton [variant]="'secondary'">Next element</button>
      </div>
    `,
    ),
  play: async ({ canvasElement }) => {
    const firstButton = canvasElement.querySelector('button.au-button') as HTMLButtonElement;
    if (firstButton) {
      firstButton.focus();
      await expect(firstButton).toHaveFocus();
    }
  },
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Quick reference showing all four variants in a row.',
      },
    },
  },
  render: () =>
    buttonRender(
      {},
      `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <button type="button" auButton variant="primary">Primary</button>
        <button type="button" auButton variant="secondary">Secondary</button>
        <button type="button" auButton variant="outline">Outline</button>
        <button type="button" auButton variant="ghost">Ghost</button>
      </div>
    `,
    ),
};
