import type { GuidesMessages } from '../../types/guides';

export const GUIDES_ES: GuidesMessages = {
  adoption: {
    title: 'Guía de adopción',
    lead: 'Índice de guías por tema; cada una en su propia página.',
    cards: [
      {
        title: 'Empezar',
        description: 'Instalación, au-tokens + aurea-global.css y primer componente.',
        path: 'get-started',
      },
      {
        title: 'Signal forms',
        description: 'Formularios con signals, au-form-field y validadores.',
        path: 'guides/signal-forms',
      },
      {
        title: 'Convenciones de API',
        description: 'Directivas nativas vs widgets au-*; helpers headless de tabla.',
        path: 'guides/api-conventions',
      },
      {
        title: 'Floating UI',
        description: 'Overlays compartidos: menú, popover, tooltip, listbox, pickers.',
        path: 'guides/floating-ui',
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
        description:
          'JSON DTCG 2025.10 sincronizado con au-tokens.css (`export:tokens` / `validate:tokens`).',
        path: 'design-tokens',
      },
    ],
  },
  apiConventions: {
    title: 'Convenciones de API',
    lead: 'Cuándo usar una directiva en un elemento nativo frente a un componente compuesto au-*.',
    sections: [
      {
        heading: 'Primitivo nativo → directiva en el host',
        body: 'Úsalo cuando el control es un solo elemento HTML y necesitas semántica nativa, forms y teclado.',
        code: `<button auButton variant="primary">Guardar</button>
<input auInputText [(value)]="name" />
<a auLink href="/docs">Docs</a>`,
        codeLanguage: 'html',
        expandLabel: 'Ver ejemplos',
      },
      {
        heading: 'Widget compuesto → elemento au-*',
        body: 'Úsalo cuando el componente tiene varios nodos, proyección o estado de overlay. Ejemplos: au-form-field, au-dialog, au-table, au-menu, au-popover.',
        code: `<au-form-field label="Inicio">
  <input auInputDate [(value)]="start" />
</au-form-field>

<au-table [data]="rows">
  <au-table-column name="name" header="Nombre" [sortable]="true" />
</au-table>`,
        codeLanguage: 'html',
        expandLabel: 'Ver ejemplos',
      },
      {
        heading: 'au-table no es mat-table',
        body: 'Aurea expone una tabla de alto nivel (data + au-table-column). Para rejillas custom o virtual scroll, importa helpers headless de au-table-data en lugar de duplicar la API pública.',
        code: `import { resolveTableViewRows, toggleTableSortState } from '@aurea-design-system/components';`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver import',
      },
      {
        heading: 'Evita selectores duplicados',
        body: 'No expongas el mismo widget como <au-foo> y <nativo auFoo>. Elige un patrón por componente y documéntalo en Storybook.',
      },
    ],
  },
  floatingUi: {
    title: 'Floating UI',
    lead: 'Cómo menú, popover, tooltip, listbox y pickers de fecha/hora comparten overlays, tokens y accesibilidad.',
    sections: [
      {
        heading: 'Pila de overlays',
        body: 'Los componentes delegan en TooltipOverlay, FieldListboxOverlay o FloatingPickerOverlay. Los paneles se portalan a document.body o al <dialog> abierto para permanecer en la capa superior.',
      },
      {
        heading: 'Tokens compartidos',
        body: 'Popovers de escritorio usan --au-floating-panel-bg y blur. Superficies modales (dialog, drawer, sheet móvil de pickers) usan --au-dialog-bg opaco. Flechas: --au-floating-arrow-* en menú, popover y tooltip.',
        code: `@import '@aurea-design-system/components/styles/au-tokens.css';
@import '@aurea-design-system/components/styles/aurea-global.css';`,
        codeLanguage: 'css',
        expandLabel: 'Ver imports',
      },
      {
        heading: 'Checklist de accesibilidad',
        body: 'En UI flotante nueva: aria-expanded/haspopup/controls en el trigger; role correcto en el panel; foco al abrir/cerrar; Escape para cerrar; bloquear scroll de página solo abierto; sincronizar data-au-theme en nodos portaled.',
      },
      {
        heading: 'Pickers responsive',
        body: 'Por debajo de 42rem, AuInputDate y AuInputTime abren bottom sheet (FloatingPickerOverlay + scrim). Por encima usan posicionamiento popover con el mismo panel.',
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
    <au-form-field
      label="Email"
      hint="Usamos tu correo solo para avisos."
      [required]="true"
    >
      <input auInputText type="email" [formField]="profileForm.email" />
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
        heading: 'Etiqueta, hint y errores en au-form-field',
        body: 'No dupliques label en el control interno. El hint va bajo la etiqueta; au-form-field enlaza aria-describedby y muestra los mensajes del campo.',
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
      {
        heading: 'Campos anidados',
        body: 'Enlaza propiedades anidadas con rutas en el árbol del form: profileForm.address.city.',
        code: `readonly profile = signal({ name: '', address: { city: '' as string } });
readonly profileForm = form(this.profile, (p) => {
  required(p.address.city, { message: 'La ciudad es obligatoria' });
});`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver modelo anidado',
      },
    ],
  },
};
