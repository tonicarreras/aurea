import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuCard, AuCardFooter } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard, AuCardFooter, AuButton],
  template: `
    <div class="docs-preview docs-preview--block">
      <au-card variant="outlined">
        <h3 auCardHeader>Proyecto Aurea</h3>
        <p>Superficie con cabecera, cuerpo y pie opcional para agrupar contenido relacionado.</p>
        <div auCardFooter>
          <au-button
            variant="primary"
            size="sm"
            >Abrir</au-button
          >
        </div>
      </au-card>
    </div>
  `,
})
export class CardDemo {}
