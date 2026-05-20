import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import {
  AuAutocomplete,
  AuButton,
  AuCard,
  AuCardFooter,
  AuCheckbox,
  AuChip,
  AuDialog,
  AuDialogFooter,
  AuDivider,
  AuInputDate,
  AuInputNumber,
  AuInputText,
  AuRadioGroup,
  AuSelect,
  AuSnackbar,
  AuSwitch,
  AuTab,
  AuTabPanel,
  AuTabs,
  AuTextarea,
  AuTooltip,
  type AutocompleteOption,
  type RadioOption,
  type SelectOption,
} from '@aurea-design-system/components';

const DEMO_ROW = `
  .docs-demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--au-space-3);
    align-items: center;
  }
`;

const DEMO_STACK = `
  .docs-demo-stack {
    display: flex;
    flex-direction: column;
    gap: var(--au-space-3);
  }
`;

const selectOptions: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
];

const autocompleteOptions: AutocompleteOption[] = [
  { value: 'mad', label: 'Madrid' },
  { value: 'bcn', label: 'Barcelona' },
];

const radioOptions: RadioOption[] = [
  { value: 'free', label: 'Gratis' },
  { value: 'pro', label: 'Pro' },
];

// —— Button ——

@Component({
  selector: 'docs-example-button-primary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary">Guardar</au-button>`,
})
export class ExampleButtonPrimaryDemo {}

@Component({
  selector: 'docs-example-button-secondary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="secondary">Cancelar</au-button>`,
})
export class ExampleButtonSecondaryDemo {}

@Component({
  selector: 'docs-example-button-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="outline">Más opciones</au-button>`,
})
export class ExampleButtonOutlineDemo {}

@Component({
  selector: 'docs-example-button-ghost',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="ghost">Descartar</au-button>`,
})
export class ExampleButtonGhostDemo {}

@Component({
  selector: 'docs-example-button-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary" [loading]="true">Guardando…</au-button>`,
})
export class ExampleButtonLoadingDemo {}

@Component({
  selector: 'docs-example-button-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary" [disabled]="true">No disponible</au-button>`,
})
export class ExampleButtonDisabledDemo {}

@Component({
  selector: 'docs-example-button-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `
    <div class="docs-demo-row">
      <au-button size="sm">Pequeño</au-button>
      <au-button size="md">Mediano</au-button>
      <au-button size="lg">Grande</au-button>
    </div>
  `,
  styles: [DEMO_ROW],
})
export class ExampleButtonSizesDemo {}

// —— Input text ——

@Component({
  selector: 'docs-example-input-text-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `<au-input-text label="Email" placeholder="tu@correo.com" style="max-width: 20rem" />`,
})
export class ExampleInputTextBasicDemo {}

@Component({
  selector: 'docs-example-input-text-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `
    <au-input-text
      label="Usuario"
      hint="Entre 3 y 20 caracteres."
      placeholder="nombre"
      style="max-width: 20rem"
    />
  `,
})
export class ExampleInputTextHintDemo {}

@Component({
  selector: 'docs-example-input-text-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `
    <au-input-text
      label="Email"
      errorMessage="Introduce un correo válido."
      placeholder="correo"
      style="max-width: 20rem"
    />
  `,
})
export class ExampleInputTextErrorDemo {}

// —— Textarea ——

@Component({
  selector: 'docs-example-textarea-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTextarea],
  template: `<au-textarea label="Comentario" [rows]="3" placeholder="Escribe aquí…" style="max-width: 24rem" />`,
})
export class ExampleTextareaBasicDemo {}

@Component({
  selector: 'docs-example-textarea-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTextarea],
  template: `
    <au-textarea
      label="Bio"
      [rows]="4"
      hint="Máximo 280 caracteres."
      style="max-width: 24rem"
    />
  `,
})
export class ExampleTextareaHintDemo {}

// —— Checkbox ——

@Component({
  selector: 'docs-example-checkbox-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox label="Acepto los términos" />`,
})
export class ExampleCheckboxBasicDemo {}

@Component({
  selector: 'docs-example-checkbox-checked',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox label="Newsletter" [checked]="true" />`,
})
export class ExampleCheckboxCheckedDemo {}

@Component({
  selector: 'docs-example-checkbox-indeterminate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox label="Seleccionar todo" [indeterminate]="true" />`,
})
export class ExampleCheckboxIndeterminateDemo {}

// —— Switch ——

@Component({
  selector: 'docs-example-switch-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSwitch],
  template: `<au-switch label="Notificaciones push" />`,
})
export class ExampleSwitchBasicDemo {}

@Component({
  selector: 'docs-example-switch-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSwitch],
  template: `<au-switch label="Modo avión" [checked]="true" [disabled]="true" />`,
})
export class ExampleSwitchDisabledDemo {}

// —— Select / Autocomplete ——

@Component({
  selector: 'docs-example-select-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSelect],
  template: `
    <au-select label="País" placeholder="Elige…" [options]="options" style="max-width: 16rem" />
  `,
})
export class ExampleSelectBasicDemo {
  readonly options = selectOptions;
}

@Component({
  selector: 'docs-example-autocomplete-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAutocomplete],
  template: `
    <au-autocomplete
      label="Ciudad"
      placeholder="Buscar…"
      [options]="options"
      style="max-width: 16rem"
    />
  `,
})
export class ExampleAutocompleteBasicDemo {
  readonly options = autocompleteOptions;
}

// —— Radio / Number / Date ——

@Component({
  selector: 'docs-example-radio-group-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuRadioGroup],
  template: `<au-radio-group label="Plan" [options]="options" />`,
})
export class ExampleRadioGroupBasicDemo {
  readonly options = radioOptions;
}

@Component({
  selector: 'docs-example-input-number-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputNumber],
  template: `<au-input-number label="Cantidad" [min]="0" [max]="10" style="max-width: 12rem" />`,
})
export class ExampleInputNumberBasicDemo {}

@Component({
  selector: 'docs-example-input-date-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputDate],
  template: `<au-input-date label="Fecha de entrega" style="max-width: 14rem" />`,
})
export class ExampleInputDateBasicDemo {}

// —— Dialog ——

@Component({
  selector: 'docs-example-dialog-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <au-button type="button" (click)="open.set(true)">Abrir diálogo</au-button>
    <au-dialog [(open)]="open" title="Eliminar proyecto" size="sm">
      <p>Esta acción no se puede deshacer.</p>
      <div auDialogFooter>
        <au-button variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
        <au-button type="button" (click)="open.set(false)">Eliminar</au-button>
      </div>
    </au-dialog>
  `,
})
export class ExampleDialogConfirmDemo {
  readonly open = model(false);
}

// —— Card ——

@Component({
  selector: 'docs-example-card-elevated',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard],
  template: `
    <au-card variant="elevated" style="max-width: 20rem">
      <h3 auCardHeader>Elevada</h3>
      <p>Sombra sutil para destacar sobre el canvas.</p>
    </au-card>
  `,
})
export class ExampleCardElevatedDemo {}

@Component({
  selector: 'docs-example-card-outlined',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard],
  template: `
    <au-card variant="outlined" style="max-width: 20rem">
      <h3 auCardHeader>Contorno</h3>
      <p>Borde visible sin sombra pronunciada.</p>
    </au-card>
  `,
})
export class ExampleCardOutlinedDemo {}

@Component({
  selector: 'docs-example-card-filled-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard, AuCardFooter, AuButton],
  template: `
    <au-card variant="filled" style="max-width: 20rem">
      <h3 auCardHeader>Con pie</h3>
      <p>Superficie rellena con acciones en el footer.</p>
      <div auCardFooter>
        <au-button size="sm">Ver detalle</au-button>
      </div>
    </au-card>
  `,
})
export class ExampleCardFilledFooterDemo {}

// —— Tabs ——

@Component({
  selector: 'docs-example-tabs-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTabs, AuTab, AuTabPanel],
  template: `
    <au-tabs [(value)]="tab" ariaLabel="Cuenta" style="max-width: 26rem">
      <button type="button" auTab="perfil">Perfil</button>
      <button type="button" auTab="seguridad">Seguridad</button>
      <div auTabPanel="perfil"><p>Nombre, avatar y preferencias.</p></div>
      <div auTabPanel="seguridad"><p>Contraseña y 2FA.</p></div>
    </au-tabs>
  `,
})
export class ExampleTabsBasicDemo {
  readonly tab = model('perfil');
}

// —— Chip ——

@Component({
  selector: 'docs-example-chip-filled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="Angular" />`,
})
export class ExampleChipFilledDemo {}

@Component({
  selector: 'docs-example-chip-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="TypeScript" variant="outline" />`,
})
export class ExampleChipOutlineDemo {}

@Component({
  selector: 'docs-example-chip-removable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="Filtro activo" variant="accent" [removable]="true" />`,
})
export class ExampleChipRemovableDemo {}

// —— Snackbar ——

@Component({
  selector: 'docs-example-snackbar-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button type="button" (click)="open.set(true)">Mostrar éxito</au-button>
    <au-snackbar [(open)]="open" message="Cambios guardados" variant="success" [durationMs]="3000" />
  `,
})
export class ExampleSnackbarSuccessDemo {
  readonly open = model(false);
}

@Component({
  selector: 'docs-example-snackbar-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button variant="outline" type="button" (click)="open.set(true)">Mostrar error</au-button>
    <au-snackbar [(open)]="open" message="No se pudo guardar" variant="error" [durationMs]="4000" />
  `,
})
export class ExampleSnackbarErrorDemo {
  readonly open = model(false);
}

// —— Divider ——

@Component({
  selector: 'docs-example-divider-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `
    <div class="docs-demo-stack" style="max-width: 18rem">
      <p>Arriba</p>
      <au-divider />
      <p>Abajo</p>
    </div>
  `,
  styles: [DEMO_STACK],
})
export class ExampleDividerBasicDemo {}

@Component({
  selector: 'docs-example-divider-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `<au-divider label="o continúa con" style="max-width: 18rem" />`,
})
export class ExampleDividerLabelDemo {}

// —— Tooltip ——

@Component({
  selector: 'docs-example-tooltip-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <au-button variant="outline" auTooltip="Ayuda contextual" auTooltipPlacement="top">
      Pasar el cursor
    </au-button>
  `,
})
export class ExampleTooltipTopDemo {}

@Component({
  selector: 'docs-example-tooltip-right',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <au-button variant="ghost" auTooltip="Aparece al final (inline-end)" auTooltipPlacement="end">
      Derecha
    </au-button>
  `,
})
export class ExampleTooltipRightDemo {}
