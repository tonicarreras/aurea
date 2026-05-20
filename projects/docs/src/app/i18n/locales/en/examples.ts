import {
  ExampleAutocompleteBasicDemo,
  ExampleButtonDisabledDemo,
  ExampleButtonGhostDemo,
  ExampleButtonLoadingDemo,
  ExampleButtonOutlineDemo,
  ExampleButtonPrimaryDemo,
  ExampleButtonSecondaryDemo,
  ExampleButtonSizesDemo,
  ExampleCardElevatedDemo,
  ExampleCardFilledFooterDemo,
  ExampleCardOutlinedDemo,
  ExampleCheckboxBasicDemo,
  ExampleCheckboxCheckedDemo,
  ExampleCheckboxIndeterminateDemo,
  ExampleChipFilledDemo,
  ExampleChipOutlineDemo,
  ExampleChipRemovableDemo,
  ExampleDialogConfirmDemo,
  ExampleDividerBasicDemo,
  ExampleDividerLabelDemo,
  ExampleInputDateBasicDemo,
  ExampleInputNumberBasicDemo,
  ExampleInputTextBasicDemo,
  ExampleInputTextErrorDemo,
  ExampleInputTextHintDemo,
  ExampleRadioGroupBasicDemo,
  ExampleSelectBasicDemo,
  ExampleSnackbarErrorDemo,
  ExampleSnackbarSuccessDemo,
  ExampleSwitchBasicDemo,
  ExampleSwitchDisabledDemo,
  ExampleTabsBasicDemo,
  ExampleTextareaBasicDemo,
  ExampleTextareaHintDemo,
  ExampleTooltipRightDemo,
  ExampleTooltipTopDemo,
} from '../../../demos/component-doc-example-demos';
import type { ComponentDocExample } from '../../types/example';

export const COMPONENT_DOC_EXAMPLES_EN: Record<string, ComponentDocExample[]> = {
  button: [
    {
      title: 'Primary',
      description: 'Primary action in a form or dialog.',
      demoComponent: ExampleButtonPrimaryDemo,
      code: `<au-button variant="primary">Save</au-button>`,
    },
    {
      title: 'Secondary',
      demoComponent: ExampleButtonSecondaryDemo,
      code: `<au-button variant="secondary">Cancel</au-button>`,
    },
    {
      title: 'Outline',
      demoComponent: ExampleButtonOutlineDemo,
      code: `<au-button variant="outline">More options</au-button>`,
    },
    {
      title: 'Ghost',
      demoComponent: ExampleButtonGhostDemo,
      code: `<au-button variant="ghost">Discard</au-button>`,
    },
    {
      title: 'Loading',
      description: 'Shows a spinner and sets `aria-busy` on the button.',
      demoComponent: ExampleButtonLoadingDemo,
      code: `<au-button variant="primary" [loading]="true">Guardando…</au-button>`,
    },
    {
      title: 'Deshabilitado',
      demoComponent: ExampleButtonDisabledDemo,
      code: `<au-button variant="primary" [disabled]="true">No disponible</au-button>`,
    },
    {
      title: 'Tamaños',
      demoComponent: ExampleButtonSizesDemo,
      code: `<au-button size="sm">Pequeño</au-button>
<au-button size="md">Mediano</au-button>
<au-button size="lg">Grande</au-button>`,
    },
  ],
  'input-text': [
    {
      title: 'Campo básico',
      demoComponent: ExampleInputTextBasicDemo,
      code: `<au-input-text label="Email" placeholder="tu@correo.com" />`,
    },
    {
      title: 'Con hint',
      demoComponent: ExampleInputTextHintDemo,
      code: `<au-input-text
  label="Usuario"
  hint="Entre 3 y 20 caracteres."
  placeholder="nombre"
/>`,
    },
    {
      title: 'Con error',
      demoComponent: ExampleInputTextErrorDemo,
      code: `<au-input-text
  label="Email"
  errorMessage="Introduce un correo válido."
/>`,
    },
  ],
  textarea: [
    {
      title: 'Textarea básico',
      demoComponent: ExampleTextareaBasicDemo,
      code: `<au-textarea label="Comentario" [rows]="3" placeholder="Escribe aquí…" />`,
    },
    {
      title: 'Con hint',
      demoComponent: ExampleTextareaHintDemo,
      code: `<au-textarea label="Bio" [rows]="4" hint="Máximo 280 caracteres." />`,
    },
  ],
  checkbox: [
    {
      title: 'Sin marcar',
      demoComponent: ExampleCheckboxBasicDemo,
      code: `<au-checkbox label="Acepto los términos" />`,
    },
    {
      title: 'Marcado',
      demoComponent: ExampleCheckboxCheckedDemo,
      code: `<au-checkbox label="Newsletter" [checked]="true" />`,
    },
    {
      title: 'Indeterminado',
      description: 'Útil para patrones «seleccionar todo» con selección parcial.',
      demoComponent: ExampleCheckboxIndeterminateDemo,
      code: `<au-checkbox label="Seleccionar todo" [indeterminate]="true" />`,
    },
  ],
  switch: [
    {
      title: 'Switch básico',
      demoComponent: ExampleSwitchBasicDemo,
      code: `<au-switch label="Notificaciones push" />`,
    },
    {
      title: 'Deshabilitado',
      demoComponent: ExampleSwitchDisabledDemo,
      code: `<au-switch label="Modo avión" [checked]="true" [disabled]="true" />`,
    },
  ],
  select: [
    {
      title: 'Select con opciones',
      demoComponent: ExampleSelectBasicDemo,
      code: `options: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
];

<au-select label="País" placeholder="Elige…" [options]="options" />`,
      language: 'typescript',
    },
  ],
  autocomplete: [
    {
      title: 'Autocomplete',
      demoComponent: ExampleAutocompleteBasicDemo,
      code: `<au-autocomplete
  label="Ciudad"
  placeholder="Buscar…"
  [options]="cities"
/>`,
    },
  ],
  'radio-group': [
    {
      title: 'Grupo de opciones',
      demoComponent: ExampleRadioGroupBasicDemo,
      code: `<au-radio-group label="Plan" [options]="plans" />`,
    },
  ],
  'input-number': [
    {
      title: 'Con límites',
      demoComponent: ExampleInputNumberBasicDemo,
      code: `<au-input-number label="Cantidad" [min]="0" [max]="10" />`,
    },
  ],
  'input-date': [
    {
      title: 'Fecha',
      demoComponent: ExampleInputDateBasicDemo,
      code: `<au-input-date label="Fecha de entrega" />`,
    },
  ],
  dialog: [
    {
      title: 'Confirmación',
      description: 'Diálogo modal con pie de acciones.',
      demoComponent: ExampleDialogConfirmDemo,
      code: `<au-button (click)="open.set(true)">Abrir</au-button>

<au-dialog [(open)]="open" title="Eliminar proyecto" size="sm">
  <p>Esta acción no se puede deshacer.</p>
  <div auDialogFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancel</au-button>
    <au-button (click)="open.set(false)">Eliminar</au-button>
  </div>
</au-dialog>`,
      language: 'typescript',
    },
  ],
  card: [
    {
      title: 'Elevada',
      demoComponent: ExampleCardElevatedDemo,
      code: `<au-card variant="elevated">
  <h3 auCardHeader>Título</h3>
  <p>Contenido</p>
</au-card>`,
    },
    {
      title: 'Con contorno',
      demoComponent: ExampleCardOutlinedDemo,
      code: `<au-card variant="outlined">
  <h3 auCardHeader>Título</h3>
  <p>Contenido</p>
</au-card>`,
    },
    {
      title: 'Rellena con pie',
      demoComponent: ExampleCardFilledFooterDemo,
      code: `<au-card variant="filled">
  <h3 auCardHeader>Título</h3>
  <p>Contenido</p>
  <div auCardFooter>
    <au-button size="sm">Acción</au-button>
  </div>
</au-card>`,
    },
  ],
  tabs: [
    {
      title: 'Pestañas',
      demoComponent: ExampleTabsBasicDemo,
      code: `<au-tabs [(value)]="tab" ariaLabel="Cuenta">
  <button type="button" auTab="perfil">Perfil</button>
  <button type="button" auTab="seguridad">Seguridad</button>
  <div auTabPanel="perfil">…</div>
  <div auTabPanel="seguridad">…</div>
</au-tabs>`,
      language: 'typescript',
    },
  ],
  chip: [
    {
      title: 'Filled',
      demoComponent: ExampleChipFilledDemo,
      code: `<au-chip label="Angular" />`,
    },
    {
      title: 'Outline',
      demoComponent: ExampleChipOutlineDemo,
      code: `<au-chip label="TypeScript" variant="outline" />`,
    },
    {
      title: 'Removible',
      demoComponent: ExampleChipRemovableDemo,
      code: `<au-chip label="Filtro activo" variant="accent" [removable]="true" />`,
    },
  ],
  snackbar: [
    {
      title: 'Éxito',
      demoComponent: ExampleSnackbarSuccessDemo,
      code: `<au-snackbar
  [(open)]="saved"
  message="Cambios guardados"
  variant="success"
  [durationMs]="3000"
/>`,
      language: 'typescript',
    },
    {
      title: 'Error',
      demoComponent: ExampleSnackbarErrorDemo,
      code: `<au-snackbar
  [(open)]="failed"
  message="No se pudo guardar"
  variant="error"
/>`,
      language: 'typescript',
    },
  ],
  divider: [
    {
      title: 'Separador simple',
      demoComponent: ExampleDividerBasicDemo,
      code: `<p>Arriba</p>
<au-divider />
<p>Abajo</p>`,
    },
    {
      title: 'Con etiqueta',
      demoComponent: ExampleDividerLabelDemo,
      code: `<au-divider label="o continúa con" />`,
    },
  ],
  tooltip: [
    {
      title: 'Arriba',
      demoComponent: ExampleTooltipTopDemo,
      code: `<au-button auTooltip="Ayuda contextual" auTooltipPlacement="top">
  Pasar el cursor
</au-button>`,
    },
    {
      title: 'Final (end)',
      demoComponent: ExampleTooltipRightDemo,
      code: `<au-button auTooltip="Appears at the end" auTooltipPlacement="end">
  End
</au-button>`,
    },
  ],
};
