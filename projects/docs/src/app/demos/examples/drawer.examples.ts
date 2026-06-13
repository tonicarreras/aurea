import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuDialogFooter, AuDrawer } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-drawer-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDrawer, AuDialogFooter],
  template: `
    <button auButton
      type="button"
      (click)="open.set(true)"
      >{{ t().trigger }}</button
    >
    <au-drawer
      [(open)]="open"
      [title]="t().title"
      position="end"
    >
      <p>{{ t().body }}</p>
      <div auDrawerFooter>
        <button auButton
          variant="secondary"
          type="button"
          (click)="open.set(false)"
          >{{ t().cancel }}</button
        >
        <button auButton
          type="button"
          (click)="open.set(false)"
          >{{ t().apply }}</button
        >
      </div>
    </au-drawer>
  `,
})
export class ExampleDrawerBasicDemo {
  readonly t = docsExampleLive('drawer');
  readonly open = model(false);
}
