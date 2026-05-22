import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuMessage } from '@aurea-design-system/components';
import { DEMO_STACK } from '../shared/demo-layout';

@Component({
  selector: 'docs-preview-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <div class="docs-demo-stack">
      <au-message
        variant="success"
        title="Perfil actualizado"
        message="Los cambios se guardaron correctamente."
      />
      <au-message
        variant="info"
        message="La sesión caduca en 10 minutos."
      />
    </div>
  `,
  styles: [DEMO_STACK],
})
export class MessageDemo {}
