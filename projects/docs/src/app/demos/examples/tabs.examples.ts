import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuTab, AuTabPanel, AuTabs } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-tabs-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTabs, AuTab, AuTabPanel],
  template: `
    <au-tabs
      [(value)]="tab"
      ariaLabel="Cuenta"
      style="max-width: 26rem"
    >
      <button
        type="button"
        auTab="perfil"
      >
        Perfil
      </button>
      <button
        type="button"
        auTab="seguridad"
      >
        Seguridad
      </button>
      <div auTabPanel="perfil"><p>Nombre, avatar y preferencias.</p></div>
      <div auTabPanel="seguridad"><p>Contraseña y 2FA.</p></div>
    </au-tabs>
  `,
})
export class ExampleTabsBasicDemo {
  readonly tab = model('perfil');
}

// —— Chip ——
