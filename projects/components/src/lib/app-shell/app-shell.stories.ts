import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuButton } from '../button';
import { AuMessage } from '../message/message';
import { AuAppShell, AuAppShellBanner, AuAppShellFooter, AuAppShellHeader } from './index';

const meta: Meta<AuAppShell> = {
  title: 'Aurea/AppShell',
  component: AuAppShell,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('layout'),
};

export default meta;
type Story = StoryObj<AuAppShell>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [
        AuAppShell,
        AuAppShellHeader,
        AuAppShellBanner,
        AuAppShellFooter,
        AuButton,
        AuMessage,
      ],
    },
    template: `
      <au-app-shell>
        <header auAppShellHeader style="padding:var(--au-space-3) var(--au-space-4);border-bottom:1px solid var(--au-color-border-subtle);background:var(--au-color-surface-raised);">
          Il Forno di Maria
        </header>
        <div auAppShellBanner>
          <au-message layout="banner" variant="info" title="Promo" message="2×1 los martes" [dismissible]="true" />
        </div>
        <div style="padding:var(--au-space-6) var(--au-space-4);">
          <p style="margin:0;">Contenido principal con <code>flex: 1</code> — el footer queda abajo en páginas cortas.</p>
        </div>
        <footer auAppShellFooter style="padding:var(--au-space-4);border-top:1px solid var(--au-color-border-subtle);">
          <button auButton variant="ghost" type="button">Contacto</button>
        </footer>
      </au-app-shell>
    `,
  }),
};
