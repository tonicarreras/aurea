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
        title: 'Composición',
        description: 'Directivas de layout, modelo en tres capas y overrides CSS.',
        path: 'guides/composition',
      },
      {
        title: 'Recetas',
        description: 'Barra de filtros, fila de ajustes y tarjeta de dashboard.',
        path: 'guides/recipes',
      },
      {
        title: 'Tamaño del bundle',
        description: 'CSS global vs chrome, overlays lazy y tree-shaking.',
        path: 'guides/bundle-size',
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
  composition: {
    title: 'Composición',
    lead: 'Cómo se reparten responsabilidades primitivas, tokens y CSS de la app — directivas de layout y provideAurea().',
    sections: [
      {
        heading: 'Tres capas',
        body: 'Inputs de Aurea para decisiones comunes; variables --au-{componente}-* para art direction local; CSS de la aplicación para layout de página (max-width, breakpoints, geometría de marketing).',
      },
      {
        heading: 'Directivas de layout',
        body: 'auStack (columna), auCluster (fila con wrap), auSplit (dos columnas), auSection (bloque con padding y divider opcional). Estilos en aurea-global.css.',
        code: `<div auStack gap="md" separator="solid">
  <au-form-field label="Buscar">
    <input auInputText />
  </au-form-field>
  <div auCluster gap="sm">
    <button auButton variant="ghost">Restablecer</button>
    <button auButton>Aplicar</button>
  </div>
</div>`,
        codeLanguage: 'html',
        expandLabel: 'Ver ejemplo de layout',
      },
      {
        heading: 'provideAurea() — theming en runtime',
        body: 'Override opcional en bootstrap de tokens semánticos (color primario, radios, fuentes). Complementa [auTheme] para claro/oscuro/HC. SSR: usa aurea-theme-bridge.css estático o applyAureaThemeVars(document, config) en el render del servidor.',
        code: `import { applyAureaThemeVars, provideAurea } from '@aurea-design-system/components';

bootstrapApplication(App, {
  providers: [
    provideAurea({
      theme: {
        actionPrimary: '#1059c8',
        radiusField: '0.5rem',
      },
    }),
  ],
});

// SSR / prerender (opcional):
// applyAureaThemeVars(document, { actionPrimary: '#1059c8' });`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver provider',
      },
      {
        heading: 'Overrides CSS públicos',
        body: 'Variables documentadas por componente (--au-card-padding, --au-stack-gap, …). Ver docs/COMPONENT_CSS_VARS.md y API_VOCABULARY.md en el repo.',
      },
    ],
  },
  recipes: {
    title: 'Recetas de composición',
    lead: 'Patrones completos montados solo con primitivas Aurea — sin componentes de dominio.',
    sections: [
      {
        heading: 'Barra de filtros',
        body: 'Cluster para controles en línea; au-form-field para etiquetas; acción principal al final.',
        code: `<div auCluster gap="md" justify="between" class="filter-bar">
  <div auCluster gap="sm">
    <au-form-field label="Estado">
      <au-select [options]="statuses" [(value)]="status" />
    </au-form-field>
    <au-form-field label="Consulta">
      <input auInputText [(value)]="query" />
    </au-form-field>
  </div>
  <button auButton (click)="search()">Buscar</button>
</div>`,
        codeLanguage: 'html',
        expandLabel: 'Ver barra de filtros',
      },
      {
        heading: 'Fila de ajustes',
        body: 'Split para columnas etiqueta + control; colapsa en viewports pequeños.',
        code: `<div auSplit ratio="1:2" gap="lg">
  <div auStack gap="xs">
    <strong>Notificaciones</strong>
    <span class="text-secondary">Avisos por email de facturación.</span>
  </div>
  <div auCluster gap="sm" justify="end">
    <button auSwitch [(checked)]="emailAlerts">Alternar</button>
  </div>
</div>`,
        codeLanguage: 'html',
        expandLabel: 'Ver fila de ajustes',
      },
      {
        heading: 'Tarjeta de dashboard',
        body: 'Regiones de card con stack y acciones en cluster en el footer.',
        code: `<au-card variant="elevated" [interactive]="true">
  <div auSection padding="lg">
    <div auStack gap="sm">
      <span auCardHeader>Ingresos</span>
      <span auCardBody>24.500 €</span>
      <au-badge variant="success">+12%</au-badge>
    </div>
  </div>
  <div auCardFooter>
    <div auCluster gap="sm" justify="end">
      <button auButton variant="ghost">Detalle</button>
      <button auButton>Exportar</button>
    </div>
  </div>
</au-card>`,
        codeLanguage: 'html',
        expandLabel: 'Ver tarjeta',
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
        body: 'Por defecto, el cromo de validación aparece cuando el campo está touched (`showErrorsWhen="touched"`). Para validar solo al enviar, usa `[showValidation]="submitAttempted()"` en `form[auForm]` una vez (cada campo puede hacer override).',
        code: `readonly submitAttempted = signal(false);

protected guardar(): void {
  this.submitAttempted.set(true);
  if (!this.profileForm().valid()) return;
  // guardar this.profile()
}`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver guard de envío',
      },
      {
        heading: 'Formularios en modal',
        body: 'Usa `form[auForm]` con `[showValidation]="submitAttempted()"` una vez, `FormRoot` en el formulario y `button[auDialogSubmit]="form-id"` en el footer (o `type="submit"` + `[attr.form]`). Prefiere `au-message` y snackbars dentro del dialog.',
        code: `<au-dialog [(open)]="open">
  <form auForm [formRoot]="form" id="dialog-form" [showValidation]="submitAttempted()">
    <au-form-field label="Zona">
      <au-select [formField]="form.zone" … />
    </au-form-field>
  </form>
  <div auDialogFooter>
    <button auButton variant="primary" auDialogSubmit="dialog-form">Reservar</button>
  </div>
</au-dialog>`,
        codeLanguage: 'html',
        expandLabel: 'Ver formulario en modal',
      },
      {
        heading: 'Schema mixto (campos opt-in)',
        body: 'No todo tiene que vivir en `form()`. Consentimiento marketing, cantidad en carrito o toggles demo pueden usar signals sueltos mientras el flujo principal usa `[formField]`.',
        code: `<form auForm [formRoot]="reservationForm" [showValidation]="submitAttempted()">
  <au-form-field label="Nombre"><input auInputText [formField]="reservationForm.name" /></au-form-field>
</form>
<input type="checkbox" auCheckbox label="Novedades" [(checked)]="newsletter" />`,
        codeLanguage: 'html',
        expandLabel: 'Ver formulario mixto',
      },
      {
        heading: 'Switch dentro de au-form-field',
        body: 'Proyecta un `<button auSwitch>` vacío; label e hint van en `au-form-field`, no dentro del switch.',
        code: `<au-form-field label="Entrega a domicilio" hint="Recogida gratis en el local">
  <button type="button" auSwitch [(checked)]="deliveryMode"></button>
</au-form-field>`,
        codeLanguage: 'html',
        expandLabel: 'Ver switch en campo',
      },
      {
        heading: 'Feedback en modales',
        body: 'Los snackbars en body quedan bajo la top layer del dialog. Usa `au-message` inline para resúmenes de validación, o declara `<au-snackbar>` dentro del dialog abierto.',
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
  bundleSize: {
    title: 'Tamaño del bundle',
    lead: 'Mantén la app rápida: importa la superficie CSS mínima, monta overlays en lazy y confía en el tree-shaking de TypeScript.',
    sections: [
      {
        heading: 'CSS: global vs chrome',
        body: 'La mayoría de apps necesitan au-tokens.css y aurea-global.css (todos los componentes). Flujos solo de formulario pueden usar aurea-chrome.css si solo necesitas cromo de campos y tokens.',
        code: `@import '@aurea-design-system/components/styles/au-tokens.css';
@import '@aurea-design-system/components/styles/aurea-chrome.css';`,
        codeLanguage: 'css',
        expandLabel: 'Ver CSS mínimo',
      },
      {
        heading: 'Imports TypeScript',
        body: 'Importa componentes y directivas por feature. Evita re-exportar barrels en la app; Angular elimina imports standalone no usados de @aurea-design-system/components.',
        code: `import { AuButton, AuFormField, AuInputText } from '@aurea-design-system/components';`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver imports',
      },
      {
        heading: 'Overlays lazy',
        body: 'Diferir hosts `@if` de dialog/drawer hasta el primer open evita crear nodos portal y focus trap al arrancar. Usa openOverlayLazy(ready, open) del paquete.',
        code: `import { openOverlayLazy } from '@aurea-design-system/components';

openReservation(): void {
  openOverlayLazy(this.reservationOverlayReady, this.reservationOpen);
}`,
        codeLanguage: 'typescript',
        expandLabel: 'Ver apertura lazy',
      },
      {
        heading: 'Medir en CI',
        body: 'La librería incluye guard de bundle FESM (`check:bundle`). En tu app, vigila el chunk inicial tras añadir CSS global e imports del shell; divide rutas y lazy-load páginas pesadas.',
      },
    ],
  },
};
