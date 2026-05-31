import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuDialogFooter, AuDrawer } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDrawer, AuDialogFooter],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-button
        type="button"
        (click)="open.set(true)"
        >{{ t().open }}</au-button
      >
      <au-drawer
        [(open)]="open"
        [title]="t().title"
      >
        <p>{{ t().body }}</p>
        <div auDrawerFooter>
          <au-button
            variant="secondary"
            type="button"
            (click)="open.set(false)"
            >{{ t().cancel }}</au-button
          >
          <au-button
            type="button"
            (click)="open.set(false)"
            >{{ t().apply }}</au-button
          >
        </div>
      </au-drawer>
    </div>
  `,
})
export class DrawerDemo {
  readonly t = docsPreviewCopy('drawer');
  readonly open = model(false);
}
