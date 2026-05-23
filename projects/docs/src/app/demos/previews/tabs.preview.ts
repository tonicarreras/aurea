import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuTab, AuTabPanel, AuTabs } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTabs, AuTab, AuTabPanel],
  template: `
    <div class="docs-preview docs-preview--wide">
      <au-tabs
        [(value)]="tab"
        ariaLabel="Ejemplo de pestañas"
      >
        <button
          type="button"
          auTab="general"
        >
          General
        </button>
        <button
          type="button"
          auTab="seguridad"
        >
          Seguridad
        </button>
        <div auTabPanel="general">
          <p>Preferencias generales de la cuenta.</p>
        </div>
        <div auTabPanel="seguridad">
          <p>Contraseña y autenticación en dos pasos.</p>
        </div>
      </au-tabs>
    </div>
  `,
})
export class TabsDemo {
  readonly tab = model('general');
}
