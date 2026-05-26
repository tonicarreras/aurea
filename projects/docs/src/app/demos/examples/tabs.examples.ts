import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuTab, AuTabPanel, AuTabs } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-tabs-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTabs, AuTab, AuTabPanel],
  template: `
    <au-tabs
      [(value)]="tab"
      [ariaLabel]="t().ariaLabel"
      style="max-width: 26rem"
    >
      <button
        type="button"
        auTab="perfil"
      >
        {{ t().profile }}
      </button>
      <button
        type="button"
        auTab="seguridad"
      >
        {{ t().security }}
      </button>
      <div auTabPanel="perfil">
        <p>{{ t().profilePanel }}</p>
      </div>
      <div auTabPanel="seguridad">
        <p>{{ t().securityPanel }}</p>
      </div>
    </au-tabs>
  `,
})
export class ExampleTabsBasicDemo {
  readonly t = docsExampleLive('tabs');
  readonly tab = model('perfil');
}
