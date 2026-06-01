import { Type } from '@angular/core';

import { COMPONENT_SUMMARIES } from '../i18n';
import { type DocsLocale, pickL } from './docs-locale';

import {
  AccordionDemo,
  AutocompleteDemo,
  AvatarDemo,
  BadgeDemo,
  BreadcrumbDemo,
  ButtonDemo,
  ButtonGroupDemo,
  CardDemo,
  CheckboxDemo,
  FormFieldDemo,
  ChipDemo,
  ChipGroupDemo,
  LinkDemo,
  ListDemo,
  MenuDemo,
  MessageDemo,
  PaginationDemo,
  PopoverDemo,
  ProgressDemo,
  IconDemo,
  SkeletonDemo,
  SpinnerDemo,
  StepsDemo,
  DialogDemo,
  DividerDemo,
  DescriptionListDemo,
  DrawerDemo,
  EmptyStateDemo,
  FieldsetDemo,
  FileUploadDemo,
  InputDateDemo,
  InputPasswordDemo,
  InputTimeDemo,
  InputNumberDemo,
  InputTextDemo,
  RadioGroupDemo,
  SelectDemo,
  SliderDemo,
  SnackbarDemo,
  SwitchDemo,
  TableDemo,
  TabsDemo,
  TagInputDemo,
  TextareaDemo,
  TooltipDemo,
} from '../demos/previews';

export type ComponentApiKind = 'input' | 'model' | 'output';

export interface ComponentApiEntry {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  kind?: ComponentApiKind;
}

export interface ComponentDocApiSection {
  title: string;
  description?: string;
  rows: ComponentApiEntry[];
}

export interface ResolvedComponentApi {
  importNames: string[];
  sections: ComponentDocApiSection[];
}

export interface ComponentStylingToken {
  token: string;
  description: string;
}

export type ComponentDocStepId = 'overview' | 'api' | 'styling' | 'examples';

export const COMPONENT_DOC_STEPS: readonly { id: ComponentDocStepId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'api', label: 'API' },
  { id: 'styling', label: 'Styling' },
  { id: 'examples', label: 'Examples' },
] as const;

export interface ComponentDoc {
  slug: string;
  title: string;
  exportName: string;
  selector: string;
  summary: string;
  demoComponent: Type<unknown>;
  snippet: string;
  api?: ComponentApiEntry[];
  styling?: ComponentStylingToken[];
}

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: 'button',
    title: 'Button',
    exportName: 'AuButton',
    selector: 'au-button',
    summary:
      'Acciones principales y secundarias con variantes, estados de carga y anillo de foco accesible.',
    demoComponent: ButtonDemo,
    snippet: `import { AuButton } from '@aurea-design-system/components';

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
    slug: 'button-group',
    title: 'Button group',
    exportName: 'AuButtonGroup',
    selector: 'au-button-group',
    summary: 'Agrupa acciones `au-button` relacionadas.',
    demoComponent: ButtonGroupDemo,
    snippet: `import { AuButton, AuButtonGroup } from '@aurea-design-system/components';

<au-button-group ariaLabel="Document actions">
  <au-button variant="outline">Cancel</au-button>
  <au-button>Save</au-button>
</au-button-group>`,
  },
  {
    slug: 'form-field',
    title: 'Form field',
    exportName: 'AuFormField',
    selector: 'au-form-field',
    summary:
      'Cromado de etiqueta, hint y error alrededor del control proyectado; comparte `controlId` con el hijo vía DI.',
    demoComponent: FormFieldDemo,
    snippet: `import { AuFormField, AuInputText } from '@aurea-design-system/components';

<au-form-field label="Email" hint="Work address" [required]="true">
  <au-input-text type="email" placeholder="you@company.com" />
</au-form-field>`,
  },
  {
    slug: 'fieldset',
    title: 'Fieldset',
    exportName: 'AuFieldset',
    selector: 'au-fieldset',
    summary: 'Agrupa campos relacionados con fieldset nativo, leyenda y descripción opcional.',
    demoComponent: FieldsetDemo,
    snippet: `import { AuFieldset, AuFormField, AuInputText } from '@aurea-design-system/components';

<au-fieldset legend="Shipping address" description="Where we deliver your order.">
  <au-form-field label="Street">
    <au-input-text />
  </au-form-field>
</au-fieldset>`,
  },
  {
    slug: 'input-text',
    title: 'Input text',
    exportName: 'AuInputText',
    selector: 'au-input-text',
    summary:
      'Control de una línea; envuelve en `au-form-field` para label, hint y error. Signal forms con `formField`.',
    demoComponent: InputTextDemo,
    snippet: `import { AuFormField, AuInputText } from '@aurea-design-system/components';

<au-form-field label="Email">
  <au-input-text type="email" placeholder="you@company.com" />
</au-form-field>`,
  },
  {
    slug: 'textarea',
    title: 'Textarea',
    exportName: 'AuTextarea',
    selector: 'au-textarea',
    summary: 'Texto multilínea con la misma gramática visual que el resto de campos.',
    demoComponent: TextareaDemo,
    snippet: `import { AuFormField, AuTextarea } from '@aurea-design-system/components';

<au-form-field label="Notes">
  <au-textarea [rows]="4" />
</au-form-field>`,
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    exportName: 'AuCheckbox',
    selector: 'au-checkbox',
    summary: 'Selección booleana con estado indeterminado y descripción opcional.',
    demoComponent: CheckboxDemo,
    snippet: `import { AuCheckbox } from '@aurea-design-system/components';

<au-checkbox label="Recordarme" />`,
  },
  {
    slug: 'switch',
    title: 'Switch',
    exportName: 'AuSwitch',
    selector: 'au-switch',
    summary: 'Alternar configuraciones on/off con rol de switch y etiqueta asociada.',
    demoComponent: SwitchDemo,
    snippet: `import { AuFormField, AuSwitch } from '@aurea-design-system/components';

<au-form-field hint="You can change this in system settings.">
  <au-switch label="Notifications" />
</au-form-field>`,
  },
  {
    slug: 'select',
    title: 'Select',
    exportName: 'AuSelect',
    selector: 'au-select',
    summary: 'Lista desplegable con listbox en portal y teclado completo.',
    demoComponent: SelectDemo,
    snippet: `import { AuSelect, type AuSelectOption } from '@aurea-design-system/components';

options: AuSelectOption[] = [
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
    snippet: `import { AuAutocomplete, AuFormField } from '@aurea-design-system/components';

<au-form-field label="City">
  <au-autocomplete [options]="cities" />
</au-form-field>`,
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    exportName: 'AuAvatar',
    selector: 'au-avatar',
    summary: 'Imagen de usuario o iniciales como respaldo.',
    demoComponent: AvatarDemo,
    snippet: `import { AuAvatar } from '@aurea-design-system/components';

<au-avatar name="Jane Doe" />`,
  },
  {
    slug: 'accordion',
    title: 'Accordion',
    exportName: 'AuAccordion',
    selector: 'au-accordion',
    summary: 'Secciones plegables con disparadores WAI-ARIA y paneles emparejados por clave.',
    demoComponent: AccordionDemo,
    snippet: `import { AuAccordion, AuAccordionItem, AuAccordionPanel } from '@aurea-design-system/components';

<au-accordion [(value)]="expanded" ariaLabel="FAQ">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="one">Section one</button>
    <au-accordion-panel panel="one">Panel content</au-accordion-panel>
  </div>
</au-accordion>`,
  },
  {
    slug: 'radio-group',
    title: 'Radio group',
    exportName: 'AuRadioGroup',
    selector: 'au-radio-group',
    summary: 'Elección única entre opciones relacionadas.',
    demoComponent: RadioGroupDemo,
    snippet: `import { AuFormField, AuRadioGroup } from '@aurea-design-system/components';

<au-form-field label="Plan">
  <au-radio-group [options]="plans" />
</au-form-field>`,
  },
  {
    slug: 'input-number',
    title: 'Input number',
    exportName: 'AuInputNumber',
    selector: 'au-input-number',
    summary: 'Valor numérico con incremento/decremento y límites opcionales.',
    demoComponent: InputNumberDemo,
    snippet: `import { AuFormField, AuInputNumber } from '@aurea-design-system/components';

<au-form-field label="Quantity">
  <au-input-number [min]="0" [max]="99" />
</au-form-field>`,
  },
  {
    slug: 'slider',
    title: 'Slider',
    exportName: 'AuSlider',
    selector: 'au-slider',
    summary: 'Control de rango continuo con valor opcional visible e integración con form-field.',
    demoComponent: SliderDemo,
    snippet: `import { AuFormField, AuSlider } from '@aurea-design-system/components';

<au-form-field label="Volume" hint="Adjust speaker level.">
  <au-slider [(value)]="volume" [min]="0" [max]="100" [showValue]="true" />
</au-form-field>`,
  },
  {
    slug: 'input-date',
    title: 'Input date',
    exportName: 'AuInputDate',
    selector: 'au-input-date',
    summary: 'Selector de fecha nativo estilizado con tokens Aurea.',
    demoComponent: InputDateDemo,
    snippet: `import { AuFormField, AuInputDate } from '@aurea-design-system/components';

<au-form-field label="Date">
  <au-input-date />
</au-form-field>`,
  },
  {
    slug: 'input-time',
    title: 'Input time',
    exportName: 'AuInputTime',
    selector: 'au-input-time',
    summary: 'Selector de hora nativo estilizado con tokens Aurea.',
    demoComponent: InputTimeDemo,
    snippet: `import { AuFormField, AuInputTime } from '@aurea-design-system/components';

<au-form-field label="Time">
  <au-input-time />
</au-form-field>`,
  },
  {
    slug: 'input-password',
    title: 'Input password',
    exportName: 'AuInputPassword',
    selector: 'au-input-password',
    summary: 'Campo de contraseña con toggle de revelar y tokens Aurea.',
    demoComponent: InputPasswordDemo,
    snippet: `import { AuFormField, AuInputPassword } from '@aurea-design-system/components';

<au-form-field label="Password">
  <au-input-password autocomplete="current-password" />
</au-form-field>`,
  },
  {
    slug: 'file-upload',
    title: 'File upload',
    exportName: 'AuFileUpload',
    selector: 'au-file-upload',
    summary: 'Selector de archivos con drag-and-drop, explorar y lista removible.',
    demoComponent: FileUploadDemo,
    snippet: `import { AuFileUpload, AuFormField } from '@aurea-design-system/components';

<au-form-field label="Attachments" hint="PDF or images up to 10 MB each.">
  <au-file-upload [(value)]="files" />
</au-form-field>`,
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    exportName: 'AuDialog',
    selector: 'au-dialog',
    summary: 'Diálogo modal sobre `<dialog>` nativo con trampa de foco integrada.',
    demoComponent: DialogDemo,
    snippet: `import { AuDialog, AuDialogFooter, AuButton } from '@aurea-design-system/components';

<au-dialog [(open)]="open" title="Confirmar">
  <p>¿Continuar?</p>
  <div auDialogFooter>
    <au-button (click)="open = false">Cerrar</au-button>
  </div>
</au-dialog>`,
  },
  {
    slug: 'drawer',
    title: 'Drawer',
    exportName: 'AuDrawer',
    selector: 'au-drawer',
    summary: 'Panel lateral modal para navegación, filtros o detalle.',
    demoComponent: DrawerDemo,
    snippet: `import { AuDrawer, AuDialogFooter, AuButton } from '@aurea-design-system/components';

<au-drawer [(open)]="open" title="Filters">
  <p>Content</p>
  <div auDrawerFooter>
    <au-button (click)="open = false">Close</au-button>
  </div>
</au-drawer>`,
  },
  {
    slug: 'card',
    title: 'Card',
    exportName: 'AuCard',
    selector: 'au-card',
    summary: 'Superficie con cabecera, cuerpo y pie opcional (`AuCardFooter`).',
    demoComponent: CardDemo,
    snippet: `import { AuCard, AuCardFooter, AuButton } from '@aurea-design-system/components';

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
    snippet: `import { AuTabs, AuTab, AuTabPanel } from '@aurea-design-system/components';

<au-tabs [(value)]="tab">
  <button type="button" auTab="a">Uno</button>
  <button type="button" auTab="b">Dos</button>
  <div auTabPanel="a">Panel A</div>
</au-tabs>`,
  },
  {
    slug: 'tag-input',
    title: 'Tag input',
    exportName: 'AuTagInput',
    selector: 'au-tag-input',
    summary: 'Entrada multi-valor con chips removibles (Enter o coma).',
    demoComponent: TagInputDemo,
    snippet: `import { AuFormField, AuTagInput } from '@aurea-design-system/components';

<au-form-field label="Skills">
  <au-tag-input />
</au-form-field>`,
  },
  {
    slug: 'steps',
    title: 'Steps',
    exportName: 'AuSteps',
    selector: 'au-steps',
    summary: 'Navegación por secciones con `auStep`, `auStepPanel` y layouts tabs/sections.',
    demoComponent: StepsDemo,
    snippet: `import { AuStep, AuStepPanel, AuSteps } from '@aurea-design-system/components';

<au-steps [(value)]="section" ariaLabel="Documentation">
  <button type="button" auStep="overview">Overview</button>
  <button type="button" auStep="api">API</button>
  <div auStepPanel="overview">…</div>
  <div auStepPanel="api">…</div>
</au-steps>`,
  },
  {
    slug: 'chip',
    title: 'Chip',
    exportName: 'AuChip',
    selector: 'au-chip',
    summary: 'Etiquetas compactas, removibles o seleccionables.',
    demoComponent: ChipDemo,
    snippet: `import { AuChip } from '@aurea-design-system/components';

<au-chip label="Angular" [removable]="true" />`,
  },
  {
    slug: 'chip-group',
    title: 'Chip group',
    exportName: 'AuChipGroup',
    selector: 'au-chip-group',
    summary: 'Contenedor accesible (`role="group"`) para chips de filtro seleccionables.',
    demoComponent: ChipGroupDemo,
    snippet: `import { AuChip, AuChipGroup } from '@aurea-design-system/components';

<au-chip-group ariaLabel="Status filters">
  <au-chip label="Draft" [selectable]="true" />
  <au-chip label="Published" [selectable]="true" [(selected)]="publishedOnly" variant="accent" />
</au-chip-group>`,
  },
  {
    slug: 'list',
    title: 'List',
    exportName: 'AuList',
    selector: 'au-list',
    summary: 'Lista accesible (`role="list"`) para etiquetas removibles o ítems con `auListItem`.',
    demoComponent: ListDemo,
    snippet: `import { AuChip, AuList } from '@aurea-design-system/components';

<au-list ariaLabel="Selected tags">
  <au-chip label="Angular" [removable]="true" />
  <au-chip label="TypeScript" [removable]="true" />
</au-list>`,
  },
  {
    slug: 'snackbar',
    title: 'Snackbar',
    exportName: 'AuSnackbar',
    selector: 'au-snackbar',
    summary: 'Feedback breve con auto-cierre, acción opcional y posiciones configurables.',
    demoComponent: SnackbarDemo,
    snippet: `import { AuSnackbar } from '@aurea-design-system/components';

<au-snackbar [(open)]="saved" message="Guardado" variant="success" />`,
  },
  {
    slug: 'message',
    title: 'Message',
    exportName: 'AuMessage',
    selector: 'au-message',
    summary: 'Aviso inline o banner a ancho completo con variantes semánticas.',
    demoComponent: MessageDemo,
    snippet: `import { AuMessage } from '@aurea-design-system/components';

<au-message
  variant="success"
  title="Saved"
  message="Your changes were stored."
/>`,
  },
  {
    slug: 'icon',
    title: 'Icon',
    exportName: 'AuIcon',
    selector: 'au-icon',
    summary: 'Glifos SVG compartidos (decorativos); usados en message, chips y controles.',
    demoComponent: IconDemo,
    snippet: `import { AuIcon } from '@aurea-design-system/components';

<au-icon name="info" size="md" />`,
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    exportName: 'AuSkeleton',
    selector: 'au-skeleton',
    summary: 'Placeholders de carga con variantes text, circular, button y animación pulse/wave.',
    demoComponent: SkeletonDemo,
    snippet: `import { AuSkeleton } from '@aurea-design-system/components';

<div aria-busy="true">
  <au-skeleton variant="circular" size="lg" />
  <au-skeleton variant="text" width="40%" />
</div>`,
  },
  {
    slug: 'divider',
    title: 'Divider',
    exportName: 'AuDivider',
    selector: 'au-divider',
    summary: 'Separador horizontal o vertical, con inset y etiqueta opcional.',
    demoComponent: DividerDemo,
    snippet: `import { AuDivider } from '@aurea-design-system/components';

<au-divider />
<au-divider label="o" />`,
  },
  {
    slug: 'description-list',
    title: 'Description list',
    exportName: 'AuDescriptionList',
    selector: 'au-description-list',
    summary: 'Lista semántica clave–valor con `au-description-item`.',
    demoComponent: DescriptionListDemo,
    snippet: `import { AuDescriptionItem, AuDescriptionList } from '@aurea-design-system/components';

<au-description-list layout="horizontal">
  <au-description-item term="Name">Ada Lovelace</au-description-item>
  <au-description-item term="Email">ada@example.com</au-description-item>
</au-description-list>`,
  },
  {
    slug: 'empty-state',
    title: 'Empty state',
    exportName: 'AuEmptyState',
    selector: 'au-empty-state',
    summary: 'Placeholder centrado para listas, tablas o búsquedas sin resultados.',
    demoComponent: EmptyStateDemo,
    snippet: `import { AuEmptyState } from '@aurea-design-system/components';

<au-empty-state
  icon="search"
  title="No results"
  description="Try another search."
/>`,
  },
  {
    slug: 'badge',
    title: 'Badge',
    exportName: 'AuBadge',
    selector: 'au-badge',
    summary: 'Etiqueta compacta de estado o contador.',
    demoComponent: BadgeDemo,
    snippet: `import { AuBadge } from '@aurea-design-system/components';

<au-badge variant="accent" label="New" />`,
  },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    exportName: 'AuBreadcrumb',
    selector: 'au-breadcrumb',
    summary: 'Ruta de navegación jerárquica.',
    demoComponent: BreadcrumbDemo,
    snippet: `import { AuBreadcrumb } from '@aurea-design-system/components';

<au-breadcrumb [items]="[
  { label: 'Home', href: '/' },
  { label: 'Components' },
]" />`,
  },
  {
    slug: 'link',
    title: 'Link',
    exportName: 'AuLink',
    selector: 'a[auLink]',
    summary: 'Enlace inline con tokens semánticos.',
    demoComponent: LinkDemo,
    snippet: `import { AuLink } from '@aurea-design-system/components';

<a auLink href="/docs">Documentation</a>`,
  },
  {
    slug: 'menu',
    title: 'Menu',
    exportName: 'AuMenu',
    selector: 'au-menu',
    summary: 'Menú desplegable con panel en portal.',
    demoComponent: MenuDemo,
    snippet: `import { AuMenu, AuMenuItem, AuMenuTrigger, AuButton } from '@aurea-design-system/components';

<au-menu>
  <au-button auMenuTrigger>Actions</au-button>
  <au-menu-item>Edit</au-menu-item>
</au-menu>`,
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    exportName: 'AuPagination',
    selector: 'au-pagination',
    summary: 'Navegación por páginas para listados.',
    demoComponent: PaginationDemo,
    snippet: `import { AuPagination } from '@aurea-design-system/components';

<au-pagination [page]="page()" [pageCount]="12" (pageChange)="page.set($event)" />`,
  },
  {
    slug: 'popover',
    title: 'Popover',
    exportName: 'AuPopover',
    selector: 'au-popover',
    summary: 'Panel anclado para filtros o contenido compacto.',
    demoComponent: PopoverDemo,
    snippet: `import { AuPopover, AuPopoverTrigger, AuButton } from '@aurea-design-system/components';

<au-popover>
  <au-button auPopoverTrigger>Filters</au-button>
  <!-- panel content -->
</au-popover>`,
  },
  {
    slug: 'progress',
    title: 'Progress',
    exportName: 'AuProgress',
    selector: 'au-progress',
    summary: 'Indicador de progreso determinado o indeterminado.',
    demoComponent: ProgressDemo,
    snippet: `import { AuProgress } from '@aurea-design-system/components';

<au-progress [value]="45" [max]="100" />`,
  },
  {
    slug: 'spinner',
    title: 'Spinner',
    exportName: 'AuSpinner',
    selector: 'au-spinner',
    summary: 'Carga inline; `label` opcional para texto visible.',
    demoComponent: SpinnerDemo,
    snippet: `import { AuSpinner } from '@aurea-design-system/components';

<au-spinner size="md" />`,
  },
  {
    slug: 'table',
    title: 'Table',
    exportName: 'AuTable',
    selector: 'au-table',
    summary: 'Tabla con orden, selección de filas, carga y celdas custom.',
    demoComponent: TableDemo,
    snippet: `import { AuTable, AuTableColumn } from '@aurea-design-system/components';

<au-table [data]="rows" title="Team" selectionMode="multiple" [(selection)]="selection">
  <au-table-column name="name" header="Name" sortable cellVariant="primary" />
  <au-table-column name="role" header="Role" />
</au-table>`,
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    exportName: 'AuTooltip',
    selector: '[auTooltip]',
    summary: 'Directiva de ayuda contextual sobre el elemento disparador.',
    demoComponent: TooltipDemo,
    snippet: `import { AuTooltip, AuButton } from '@aurea-design-system/components';

<au-button auTooltip="Más información">?</au-button>`,
  },
];

export const COMPONENT_DOCS_BY_SLUG = Object.fromEntries(
  COMPONENT_DOCS.map((doc) => [doc.slug, doc]),
) as Record<string, ComponentDoc>;

export function componentDocSummary(doc: ComponentDoc, locale: DocsLocale): string {
  const localized = COMPONENT_SUMMARIES[doc.slug];
  return localized ? pickL(localized, locale) : doc.summary;
}
