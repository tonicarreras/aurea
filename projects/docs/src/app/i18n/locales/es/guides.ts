import type { GuidesMessages } from '../../types/guides';

export const GUIDES_ES: GuidesMessages = {
  adoption: {
    title: 'Guía de adopción',
    lead: 'Índice de guías por tema; cada una en su propia página.',
    cards: [
      {
        title: 'Empezar',
        description: 'Instalación, CSS global y primer componente.',
        path: 'get-started',
      },
      {
        title: 'Signal forms',
        description: 'Formularios con signals, au-form-field y validadores.',
        path: 'guides/signal-forms',
      },
      {
        title: 'Temas y tokens',
        description: 'Claro/oscuro, densidad y alto contraste.',
        path: 'themes',
      },
      {
        title: 'Demo CRUD de referencia',
        description: 'Tabla, paginación, menú, diálogo y signal forms.',
        path: 'guides/crud-demo',
      },
      {
        title: 'Madurez de componentes',
        description: 'Niveles stable, beta y experimental por componente.',
        path: 'maturity',
      },
      {
        title: 'Tokens Figma',
        description: 'JSON sincronizado con au-tokens.css.',
        path: 'design-tokens',
      },
    ],
  },
  signalForms: {
    title: 'Signal forms',
    lead: 'Los controles implementan FormValueControl y se enlazan con [formField] desde @angular/forms/signals.',
    sections: [
      {
        heading: 'Modelo y form() en el host',
        body: 'Define un signal escribible para el modelo y llama a form() en contexto de inyección (constructor o inicializador de campo).',
        code: `import { Component, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import { AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  imports: [AuFormField, AuInputText, FormField],
  template: \`
    <au-form-field label="Email" [required]="true">
      <au-input-text type="email" [formField]="profileForm.email" />
    </au-form-field>
  \`,
})
export class ProfileEmail {
  readonly profile = signal({ email: '' });
  readonly profileForm = form(this.profile, (p) => {
    required(p.email, { message: 'El email es obligatorio' });
    email(p.email, { message: 'Introduce un email válido' });
  });
}`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver ejemplo',
      },
      {
        heading: 'Etiqueta y errores en au-form-field',
        body: 'No dupliques label en el control interno. au-form-field enlaza aria-describedby y muestra los mensajes del campo.',
      },
      {
        heading: 'Enviar y marcar touched',
        body: 'Llama a profileForm().markAllAsTouched() antes de enviar; persiste solo si profileForm().valid() es true.',
        code: `protected guardar(): void {
  this.profileForm().markAllAsTouched();
  if (!this.profileForm().valid()) return;
  // guardar this.profile()
}`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver guard de envío',
      },
    ],
  },
};
