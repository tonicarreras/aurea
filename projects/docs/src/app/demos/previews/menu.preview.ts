import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuButton, AuMenu, AuMenuItem, AuMenuTrigger } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-menu [(open)]="open">
        <button
          auButton
          auMenuTrigger
          size="sm"
          variant="outline"
          type="button"
        >
          {{ t().trigger }}
        </button>
        <au-menu-item>{{ t().edit }}</au-menu-item>
        <au-menu-item>{{ t().share }}</au-menu-item>
      </au-menu>
    </div>
  `,
})
export class MenuDemo {
  readonly t = docsPreviewCopy('menu');
  readonly open = signal(false);
}
