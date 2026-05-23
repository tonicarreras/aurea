import type { GuidesMessages } from '../../types/guides';

export const GUIDES_ES: GuidesMessages = {
  adoption: {
    title: 'Guía de adopción',
    lead: 'Ruta de extremo a extremo: instalación, formularios y producción. Cada tema tiene su página.',
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
        title: 'Patrones de UI',
        description: 'Formularios validados, diálogos de confirmación y snackbar.',
        path: 'guides/patterns',
      },
      {
        title: 'Resolución de problemas',
        description: 'Errores frecuentes de configuración y cómo corregirlos.',
        path: 'guides/troubleshooting',
      },
      {
        title: 'Bundle y tree-shaking',
        description: 'Imports, CSS y rutas lazy.',
        path: 'guides/bundle',
      },
      {
        title: 'Temas y tokens',
        description: 'Claro/oscuro, densidad y alto contraste.',
        path: 'themes',
      },
      {
        title: 'Migrar desde Material',
        description: 'Sustituir mat-form-field, tabla, diálogo y botones.',
        path: 'guides/migrate-material',
      },
      {
        title: 'Migrar desde CDK',
        description: 'Overlays, focus trap y cuándo mantener CDK.',
        path: 'guides/migrate-cdk',
      },
      {
        title: 'Demo CRUD de referencia',
        description: 'Tabla, paginación, menú, diálogo y signal forms.',
        path: 'guides/crud-demo',
      },
      {
        title: 'Roadmap y madurez',
        description: 'Fases públicas, criterios v1 y matriz de componentes.',
        path: 'roadmap',
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
  patterns: {
    title: 'Patrones de UI',
    lead: 'Recetas compuestas con primitivas estables de Aurea.',
    sections: [
      {
        heading: 'Bloque de acceso validado',
        body: 'Combina au-form-field, au-input-text, au-checkbox y au-button con un único modelo signal form.',
        code: `readonly model = signal({ email: '', password: '', remember: false });
readonly loginForm = form(this.model, (m) => {
  required(m.email);
  email(m.email);
  required(m.password);
});`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver modelo',
      },
      {
        heading: 'Acción destructiva con diálogo',
        body: 'Usa au-dialog con au-button variant="danger" en el pie. Escape cierra si auDialogClose está configurado.',
        code: `<au-dialog [open]="confirmOpen()" (openChange)="confirmOpen.set($event)">
  <h2 auDialogTitle>¿Eliminar proyecto?</h2>
  <p>No se puede deshacer.</p>
  <div auDialogFooter>
    <au-button variant="outline" (click)="confirmOpen.set(false)">Cancelar</au-button>
    <au-button variant="danger" (click)="onConfirmDelete()">Eliminar</au-button>
  </div>
</au-dialog>`,
        codeLanguage: 'html',
        expandLabel: 'Ver diálogo',
      },
      {
        heading: 'Pantalla CRUD',
        body: 'Combina au-breadcrumb, au-table con au-table-column, au-pagination, au-menu para acciones por fila y au-popover para filtros.',
        code: `<au-breadcrumb [items]="crumbs" />
<au-table [data]="rows" striped>
  <au-table-column name="name" header="Nombre" sortable />
  <au-table-column name="role" header="Rol" />
</au-table>
<au-pagination [page]="page()" [pageCount]="totalPages" (pageChange)="loadPage($event)" />`,
        codeLanguage: 'html',
        expandLabel: 'Ver layout CRUD',
      },
      {
        heading: 'Feedback asíncrono con snackbar',
        body: 'Tras guardar, muestra un snackbar con variant success y duración acorde a la urgencia.',
        code: `this.snackbar.show({
  message: 'Perfil guardado',
  variant: 'success',
  duration: 4000,
});`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver snackbar',
      },
    ],
  },
  troubleshooting: {
    title: 'Resolución de problemas',
    lead: 'Síntomas habituales al integrar Aurea en apps Angular existentes.',
    items: [
      {
        problem: 'Componentes sin estilo',
        cause: 'Falta au-tokens.css en estilos globales',
        fix: 'Ejecuta ng add @aurea-design-system/components o importa styles/au-tokens.css en angular.json.',
      },
      {
        problem: 'Lista de select/autocomplete rota',
        cause: 'Falta au-field-listbox.css',
        fix: 'Añade styles/au-field-listbox.css junto a los tokens.',
      },
      {
        problem: 'No aparecen mensajes de validación',
        cause: 'Control sin au-form-field o sin importar FormField',
        fix: 'Envuelve el control e importa FormField desde @angular/forms/signals.',
      },
      {
        problem: 'El tema no cambia',
        cause: 'data-au-theme en un hijo demasiado profundo',
        fix: 'Pon data-au-theme en html/body o shell; usa la directiva [auTheme].',
      },
      {
        problem: 'Doble envío / carrusel salta diapositivas',
        cause: 'El click burbujea al padre',
        fix: 'Actualiza @aurea-design-system/components (el botón hace stopPropagation tras emit).',
      },
      {
        problem: 'Bundle mayor de lo esperado',
        cause: 'import * as Aurea',
        fix: 'Importa símbolos nombrados; ver guía Bundle.',
      },
    ],
  },
  bundle: {
    title: 'Bundle y tree-shaking',
    lead: 'La librería publica módulos ES; el CLI elimina componentes no usados si importas por símbolo.',
    sections: [
      {
        heading: 'Imports por componente',
        body: 'Usa exportaciones nombradas. Evita imports con namespace que confunden el análisis estático.',
        code: `import { AuButton, AuCard } from '@aurea-design-system/components';`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver import',
      },
      {
        heading: 'El CSS no se tree-shakea',
        body: 'Incluye siempre au-tokens.css; añade au-field-error.css y au-field-listbox.css solo si los necesitas.',
        code: `@import '@aurea-design-system/components/styles/au-tokens.css';`,
        codeLanguage: 'css',
        expandLabel: 'Ver CSS',
      },
      {
        heading: 'Mide tu app',
        body: 'Ejecuta ng build --configuration=production --stats-json e inspecciona el chunk de @aurea-design-system/components.',
        code: 'ng build --configuration=production --stats-json',
        codeLanguage: 'bash',
        expandLabel: 'Ver comando',
      },
    ],
  },
};
