import { Type } from '@angular/core';

import {
  AutocompleteDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  ChipDemo,
  DialogDemo,
  DividerDemo,
  InputDateDemo,
  InputNumberDemo,
  InputTextDemo,
  RadioGroupDemo,
  SelectDemo,
  SnackbarDemo,
  SwitchDemo,
  TabsDemo,
  TextareaDemo,
  TooltipDemo,
} from '../demos/component-demos';

export interface ComponentDoc {
  slug: string;
  title: string;
  exportName: string;
  selector: string;
  summary: string;
  demoComponent: Type<unknown>;
  snippet: string;
}

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: 'button',
    title: 'Button',
    exportName: 'AuButton',
    selector: 'au-button',
    summary: 'Acciones principales y secundarias con variantes, estados de carga y anillo de foco accesible.',
    demoComponent: ButtonDemo,
    snippet: `import { AuButton } from '@aurea-ds/aurea';

@Component({
  imports: [AuButton],
  template: \`
    <au-button variant="primary">Guardar</au-button>
    <au-button variant="outline">Cancelar</au-button>
  \`,
})
export class Example {}`,
  },
  {
    slug: 'input-text',
    title: 'Input text',
    exportName: 'AuInputText',
    selector: 'au-input-text',
    summary: 'Campo de una línea con etiqueta, hint, error y soporte para signal forms (`formField`).',
    demoComponent: InputTextDemo,
    snippet: `import { AuInputText } from '@aurea-ds/aurea';

<au-input-text label="Email" placeholder="tu@correo.com" />`,
  },
  {
    slug: 'textarea',
    title: 'Textarea',
    exportName: 'AuTextarea',
    selector: 'au-textarea',
    summary: 'Texto multilínea con la misma gramática visual que el resto de campos.',
    demoComponent: TextareaDemo,
    snippet: `import { AuTextarea } from '@aurea-ds/aurea';

<au-textarea label="Notas" [rows]="4" />`,
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    exportName: 'AuCheckbox',
    selector: 'au-checkbox',
    summary: 'Selección booleana con estado indeterminado y descripción opcional.',
    demoComponent: CheckboxDemo,
    snippet: `import { AuCheckbox } from '@aurea-ds/aurea';

<au-checkbox label="Recordarme" />`,
  },
  {
    slug: 'switch',
    title: 'Switch',
    exportName: 'AuSwitch',
    selector: 'au-switch',
    summary: 'Alternar configuraciones on/off con rol de switch y etiqueta asociada.',
    demoComponent: SwitchDemo,
    snippet: `import { AuSwitch } from '@aurea-ds/aurea';

<au-switch label="Notificaciones" />`,
  },
  {
    slug: 'select',
    title: 'Select',
    exportName: 'AuSelect',
    selector: 'au-select',
    summary: 'Lista desplegable con listbox en portal y teclado completo.',
    demoComponent: SelectDemo,
    snippet: `import { AuSelect, type SelectOption } from '@aurea-ds/aurea';

options: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
];`,
  },
  {
    slug: 'autocomplete',
    title: 'Autocomplete',
    exportName: 'AuAutocomplete',
    selector: 'au-autocomplete',
    summary: 'Búsqueda con filtrado y misma superficie de campo que select.',
    demoComponent: AutocompleteDemo,
    snippet: `import { AuAutocomplete } from '@aurea-ds/aurea';

<au-autocomplete label="Ciudad" [options]="cities" />`,
  },
  {
    slug: 'radio-group',
    title: 'Radio group',
    exportName: 'AuRadioGroup',
    selector: 'au-radio-group',
    summary: 'Elección única entre opciones relacionadas.',
    demoComponent: RadioGroupDemo,
    snippet: `import { AuRadioGroup } from '@aurea-ds/aurea';

<au-radio-group label="Plan" [options]="plans" />`,
  },
  {
    slug: 'input-number',
    title: 'Input number',
    exportName: 'AuInputNumber',
    selector: 'au-input-number',
    summary: 'Valor numérico con incremento/decremento y límites opcionales.',
    demoComponent: InputNumberDemo,
    snippet: `import { AuInputNumber } from '@aurea-ds/aurea';

<au-input-number label="Cantidad" [min]="0" [max]="99" />`,
  },
  {
    slug: 'input-date',
    title: 'Input date',
    exportName: 'AuInputDate',
    selector: 'au-input-date',
    summary: 'Selector de fecha nativo estilizado con tokens Aurea.',
    demoComponent: InputDateDemo,
    snippet: `import { AuInputDate } from '@aurea-ds/aurea';

<au-input-date label="Fecha" />`,
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    exportName: 'AuDialog',
    selector: 'au-dialog',
    summary: 'Diálogo modal sobre `<dialog>` nativo con trampa de foco integrada.',
    demoComponent: DialogDemo,
    snippet: `import { AuDialog, AuDialogFooter, AuButton } from '@aurea-ds/aurea';

<au-dialog [(open)]="open" title="Confirmar">
  <p>¿Continuar?</p>
  <div auDialogFooter>
    <au-button (click)="open = false">Cerrar</au-button>
  </div>
</au-dialog>`,
  },
  {
    slug: 'card',
    title: 'Card',
    exportName: 'AuCard',
    selector: 'au-card',
    summary: 'Superficie con cabecera, cuerpo y pie opcional (`AuCardFooter`).',
    demoComponent: CardDemo,
    snippet: `import { AuCard, AuCardFooter, AuButton } from '@aurea-ds/aurea';

<au-card variant="outlined">
  <h3 auCardHeader>Título</h3>
  <p>Contenido</p>
</au-card>`,
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    exportName: 'AuTabs',
    selector: 'au-tabs',
    summary: 'Pestañas WAI-ARIA con `AuTab` y `AuTabPanel`.',
    demoComponent: TabsDemo,
    snippet: `import { AuTabs, AuTab, AuTabPanel } from '@aurea-ds/aurea';

<au-tabs [(value)]="tab">
  <button type="button" auTab value="a">Uno</button>
  <button type="button" auTab value="b">Dos</button>
  <div auTabPanel value="a">Panel A</div>
</au-tabs>`,
  },
  {
    slug: 'chip',
    title: 'Chip',
    exportName: 'AuChip',
    selector: 'au-chip',
    summary: 'Etiquetas compactas, removibles o seleccionables.',
    demoComponent: ChipDemo,
    snippet: `import { AuChip } from '@aurea-ds/aurea';

<au-chip label="Angular" [removable]="true" />`,
  },
  {
    slug: 'snackbar',
    title: 'Snackbar',
    exportName: 'AuSnackbar',
    selector: 'au-snackbar',
    summary: 'Feedback breve con auto-cierre, acción opcional y posiciones configurables.',
    demoComponent: SnackbarDemo,
    snippet: `import { AuSnackbar } from '@aurea-ds/aurea';

<au-snackbar [(open)]="saved" message="Guardado" variant="success" />`,
  },
  {
    slug: 'divider',
    title: 'Divider',
    exportName: 'AuDivider',
    selector: 'au-divider',
    summary: 'Separador horizontal o vertical, con inset y etiqueta opcional.',
    demoComponent: DividerDemo,
    snippet: `import { AuDivider } from '@aurea-ds/aurea';

<au-divider />
<au-divider label="o" />`,
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    exportName: 'AuTooltip',
    selector: '[auTooltip]',
    summary: 'Directiva de ayuda contextual sobre el elemento disparador.',
    demoComponent: TooltipDemo,
    snippet: `import { AuTooltip, AuButton } from '@aurea-ds/aurea';

<au-button auTooltip="Más información">?</au-button>`,
  },
];

export const COMPONENT_DOCS_BY_SLUG = Object.fromEntries(
  COMPONENT_DOCS.map((doc) => [doc.slug, doc]),
) as Record<string, ComponentDoc>;
