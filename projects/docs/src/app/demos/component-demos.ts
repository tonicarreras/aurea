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
} from '@aurea-ds/aurea';

const selectOptions: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
];

const autocompleteOptions: AutocompleteOption[] = [
  { value: 'mad', label: 'Madrid' },
  { value: 'bcn', label: 'Barcelona' },
  { value: 'vlc', label: 'Valencia' },
];

const radioOptions: RadioOption[] = [
  { value: 'free', label: 'Gratis' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Equipo' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `
    <div class="docs-demo-row">
      <au-button variant="primary">Primary</au-button>
      <au-button variant="secondary">Secondary</au-button>
      <au-button variant="outline">Outline</au-button>
      <au-button variant="ghost">Ghost</au-button>
    </div>
  `,
  styles: [
    `
      .docs-demo-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--au-space-3);
        align-items: center;
      }
    `,
  ],
})
export class ButtonDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `<au-input-text label="Nombre" placeholder="Tu nombre" style="max-width: 20rem" />`,
})
export class InputTextDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTextarea],
  template: `<au-textarea label="Bio" [rows]="3" placeholder="Cuéntanos sobre ti…" style="max-width: 24rem" />`,
})
export class TextareaDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `
    <div class="docs-demo-stack">
      <au-checkbox label="Acepto los términos" />
      <au-checkbox label="Newsletter" [checked]="true" />
    </div>
  `,
  styles: [
    `
      .docs-demo-stack {
        display: flex;
        flex-direction: column;
        gap: var(--au-space-3);
      }
    `,
  ],
})
export class CheckboxDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSwitch],
  template: `<au-switch label="Modo oscuro del sistema" />`,
})
export class SwitchDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSelect],
  template: `
    <au-select
      label="País"
      placeholder="Elige un país"
      [options]="options"
      style="max-width: 16rem"
    />
  `,
})
export class SelectDemo {
  readonly options = selectOptions;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAutocomplete],
  template: `
    <au-autocomplete
      label="Ciudad"
      placeholder="Buscar ciudad…"
      [options]="options"
      style="max-width: 16rem"
    />
  `,
})
export class AutocompleteDemo {
  readonly options = autocompleteOptions;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuRadioGroup],
  template: `<au-radio-group label="Plan" [options]="options" />`,
})
export class RadioGroupDemo {
  readonly options = radioOptions;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputNumber],
  template: `<au-input-number label="Cantidad" [min]="0" [max]="10" style="max-width: 12rem" />`,
})
export class InputNumberDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputDate],
  template: `<au-input-date label="Fecha de inicio" style="max-width: 14rem" />`,
})
export class InputDateDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <au-button type="button" (click)="open.set(true)">Abrir diálogo</au-button>
    <au-dialog [(open)]="open" title="Confirmar acción" size="sm">
      <p>Esta acción no se puede deshacer.</p>
      <div auDialogFooter>
        <au-button variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
        <au-button type="button" (click)="open.set(false)">Confirmar</au-button>
      </div>
    </au-dialog>
  `,
})
export class DialogDemo {
  readonly open = model(false);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard, AuCardFooter, AuButton],
  template: `
    <au-card variant="outlined" style="max-width: 22rem">
      <h3 auCardHeader>Proyecto Aurea</h3>
      <p>Superficie con cabecera, cuerpo y pie opcional para agrupar contenido relacionado.</p>
      <div auCardFooter>
        <au-button variant="primary" size="sm">Abrir</au-button>
      </div>
    </au-card>
  `,
})
export class CardDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTabs, AuTab, AuTabPanel],
  template: `
    <au-tabs [(value)]="tab" ariaLabel="Ejemplo de pestañas" style="max-width: 28rem">
      <button type="button" auTab value="general">General</button>
      <button type="button" auTab value="seguridad">Seguridad</button>
      <div auTabPanel value="general">
        <p>Preferencias generales de la cuenta.</p>
      </div>
      <div auTabPanel value="seguridad">
        <p>Contraseña y autenticación en dos pasos.</p>
      </div>
    </au-tabs>
  `,
})
export class TabsDemo {
  readonly tab = model('general');
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `
    <div class="docs-demo-row">
      <au-chip label="Angular" />
      <au-chip label="TypeScript" variant="outline" />
      <au-chip label="Removible" [removable]="true" />
    </div>
  `,
  styles: [
    `
      .docs-demo-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--au-space-2);
      }
    `,
  ],
})
export class ChipDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button type="button" (click)="open.set(true)">Mostrar snackbar</au-button>
    <au-snackbar
      [(open)]="open"
      message="Cambios guardados"
      variant="success"
      [durationMs]="3500"
    />
  `,
})
export class SnackbarDemo {
  readonly open = model(false);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `
    <div class="docs-demo-stack">
      <p>Sección superior</p>
      <au-divider />
      <au-divider label="o" />
      <p>Sección inferior</p>
    </div>
  `,
  styles: [
    `
      .docs-demo-stack {
        display: flex;
        flex-direction: column;
        gap: var(--au-space-4);
        max-width: 20rem;
      }
    `,
  ],
})
export class DividerDemo {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <au-button variant="outline" auTooltip="Texto de ayuda contextual" placement="top">
      Pasar el cursor
    </au-button>
  `,
})
export class TooltipDemo {}
