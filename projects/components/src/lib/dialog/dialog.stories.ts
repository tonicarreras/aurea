import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { fn } from 'storybook/test';

import { AuButton } from '../button/button';
import { AuDialog } from './dialog';
import { AuDialogFooter } from './dialog-footer.directive';

const docsOverview = getStoryOverview('dialog');

const meta: Meta<AuDialog> = {
  title: 'Aurea/Dialog',
  component: AuDialog,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters(docsOverview),
  argTypes: {
    open: { control: 'boolean', table: { category: 'State' } },
    close: { table: { category: 'Events' } },
    title: { control: 'text', table: { category: 'Content' } },
    showCloseButton: { control: 'boolean', table: { category: 'Content' } },
    closeOnBackdrop: { control: 'boolean', table: { category: 'Behavior' } },
    closeOnEscape: { control: 'boolean', table: { category: 'Behavior' } },
    ariaLabel: { control: 'text', table: { category: 'Content' } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    open: false,
    close: fn(),
    title: 'Dialog title',
    size: 'md',
    showCloseButton: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    ariaLabel: '',
  },
};

export default meta;
type Story = StoryObj<AuDialog>;

function dialogStory(config: { triggerLabel?: string; body: string; footer?: string }): Story {
  const footerBlock = config.footer ?? '';
  return {
    render: (args) => ({
      props: {
        ...args,
        open: signal(false),
        triggerLabel: config.triggerLabel ?? 'Abrir',
      },
      moduleMetadata: { imports: [AuDialog, AuButton, AuDialogFooter] },
      template: `
        <div class="au-story-stage">
          <au-button type="button" (click)="open.set(true)">{{ triggerLabel }}</au-button>
          <au-dialog
          [(open)]="open"
          [title]="title"
          [size]="size"
          [showCloseButton]="showCloseButton"
          [closeOnBackdrop]="closeOnBackdrop"
          [closeOnEscape]="closeOnEscape"
          [ariaLabel]="ariaLabel"
          (close)="close($event)"
        >
          ${config.body}
          ${footerBlock}
        </au-dialog>
        </div>
      `,
    }),
  };
}

export const Default: Story = {
  ...dialogStory({
    body: '<p>Esta acción no se puede deshacer.</p>',
    footer: `
          <div auDialogFooter>
            <au-button style="margin-right: var(--au-space-2);" variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
            <au-button type="button" (click)="open.set(false)">Eliminar</au-button>
          </div>`,
  }),
  args: {
    title: '¿Quieres aceptar?',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Confirmación destructiva con pie de acciones en el slot `auDialogFooter`.',
      },
    },
  },
};

export const SmallSize: Story = {
  ...dialogStory({
    body: '<p>¿Continuar con esta operación?</p>',
    footer: `
          <div auDialogFooter>
            <au-button variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
            <au-button type="button" (click)="open.set(false)">Continuar</au-button>
          </div>`,
  }),
  args: {
    title: 'Confirmar',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  ...dialogStory({
    body: `
          <p>Este diálogo admite varios párrafos o campos de formulario.</p>
          <p>El cuerpo hace scroll si el contenido supera el viewport.</p>`,
  }),
  args: {
    title: 'Vista detallada',
    size: 'lg',
  },
};

export const FullScreen: Story = {
  ...dialogStory({
    triggerLabel: 'Abrir pantalla completa',
    body: `
          <p>El panel ocupa el viewport con un margen de 16px.</p>
          <p>El scroll sigue funcionando dentro del cuerpo.</p>`,
    footer: `
          <div auDialogFooter>
            <au-button variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
            <au-button type="button" (click)="open.set(false)">Confirmar</au-button>
          </div>`,
  }),
  args: {
    title: 'Pantalla completa',
    size: 'full',
  },
};

export const WithFooter: Story = {
  ...dialogStory({
    body: '<p>Contenido del diálogo.</p>',
    footer: `
          <div auDialogFooter>
            <au-button variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
            <au-button type="button" (click)="open.set(false)">Guardar</au-button>
          </div>`,
  }),
  args: {
    title: 'Con pie de página',
  },
  parameters: {
    docs: {
      description: {
        story: 'Importa `AuDialogFooter` en el componente host que proyecta el pie.',
      },
    },
  },
};

export const NoCloseButton: Story = {
  ...dialogStory({
    body: '<p>Sin botón de cierre en la cabecera; usa backdrop o Escape.</p>',
  }),
  args: {
    title: 'Sin botón cerrar',
    showCloseButton: false,
  },
};

export const NoBackdropClose: Story = {
  ...dialogStory({
    body: '<p>Los clics en el fondo atenuado no cierran el diálogo.</p>',
  }),
  args: {
    title: 'Diálogo persistente',
    closeOnBackdrop: false,
  },
};

export const WithoutTitle: Story = {
  ...dialogStory({
    body: '<p>Sin título visible; el nombre accesible viene de <code>ariaLabel</code>.</p>',
  }),
  args: {
    title: '',
    ariaLabel: 'Información',
  },
};
