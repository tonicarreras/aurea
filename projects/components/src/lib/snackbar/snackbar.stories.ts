import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AuButton } from '../button/button';
import { AuSnackbar, type AuSnackbarPosition, type AuSnackbarVariant } from './snackbar';

const meta: Meta<AuSnackbar> = {
  title: 'Aurea/Snackbar',
  component: AuSnackbar,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component:
          'Transient feedback toast with optional action and auto-dismiss. Control visibility with `[(open)]` on a writable signal; open from a trigger and listen to `dismiss` / `action`.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean', table: { category: 'State' } },
    message: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'] satisfies AuSnackbarVariant[],
      table: { category: 'Appearance' },
    },
    position: {
      control: 'select',
      options: [
        'bottom-center',
        'bottom-start',
        'bottom-end',
        'top-center',
        'top-start',
        'top-end',
      ] satisfies AuSnackbarPosition[],
      table: { category: 'Appearance' },
    },
    durationMs: { control: 'number', table: { category: 'Behavior' } },
    actionLabel: { control: 'text', table: { category: 'Content' } },
    showCloseButton: { control: 'boolean', table: { category: 'Content' } },
    dismiss: { table: { category: 'Events' } },
    action: { table: { category: 'Events' } },
  },
  args: {
    open: false,
    message: 'Cambios guardados correctamente.',
    variant: 'default',
    position: 'bottom-center',
    durationMs: 5000,
    actionLabel: '',
    showCloseButton: true,
    dismiss: fn(),
    action: fn(),
  },
};

export default meta;
type Story = StoryObj<AuSnackbar>;

function snackbarStory(triggerLabel?: string): Story {
  return {
    render: (args) => ({
      props: {
        ...args,
        open: signal(false),
        triggerLabel: triggerLabel ?? 'Mostrar snackbar',
      },
      moduleMetadata: { imports: [AuSnackbar, AuButton] },
      template: `
        <au-button type="button" (click)="open.set(true)">{{ triggerLabel }}</au-button>
        <au-snackbar
          [(open)]="open"
          [message]="message"
          [variant]="variant"
          [position]="position"
          [durationMs]="durationMs"
          [actionLabel]="actionLabel"
          [showCloseButton]="showCloseButton"
          (dismiss)="open.set(false); dismiss()"
          (action)="open.set(false); action()"
        />
      `,
    }),
  };
}

export const Default: Story = snackbarStory();

export const Success: Story = {
  ...snackbarStory('Mostrar éxito'),
  args: {
    message: 'Perfil actualizado.',
    variant: 'success',
  },
};

export const WithAction: Story = {
  ...snackbarStory('Mostrar con acción'),
  args: {
    message: 'Elemento eliminado.',
    actionLabel: 'Deshacer',
    durationMs: 8000,
  },
  parameters: {
    docs: {
      description: {
        story: 'La acción opcional cierra el snackbar y emite `action`.',
      },
    },
  },
};

export const ErrorPersistent: Story = {
  ...snackbarStory('Mostrar error'),
  args: {
    message: 'No se pudieron guardar los cambios. Inténtalo de nuevo.',
    variant: 'error',
    durationMs: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante error con `role="alert"`; `durationMs` 0 exige cierre manual.',
      },
    },
  },
};

export const TopEnd: Story = {
  ...snackbarStory('Mostrar arriba a la derecha'),
  args: {
    message: 'Nuevo mensaje recibido.',
    variant: 'info',
    position: 'top-end',
  },
};
