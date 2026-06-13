import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuDialogFooter, AuDrawer } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDrawer, AuDialogFooter],
  template: `
    <div class="docs-preview docs-preview--action">
      <button
        auButton
        type="button"
        (click)="open.set(true)"
      >
        {{ t().open }}
      </button>
      <au-drawer
        [(open)]="open"
        [title]="t().title"
      >
        <p>{{ t().body }}</p>
        <div auDrawerFooter>
          <button
            auButton
            variant="secondary"
            type="button"
            (click)="open.set(false)"
          >
            {{ t().cancel }}
          </button>
          <button
            auButton
            type="button"
            (click)="open.set(false)"
          >
            {{ t().apply }}
          </button>
        </div>
      </au-drawer>
    </div>
  `,
})
export class DrawerDemo {
  readonly t = docsPreviewCopy('drawer');
  readonly open = model(false);
}
