import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuButton, AuMenu, AuMenuItem, AuMenuTrigger } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <au-menu [(open)]="open">
      <au-button
        auMenuTrigger
        size="sm"
        variant="outline"
        >Menu</au-button
      >
      <au-menu-item>Edit</au-menu-item>
      <au-menu-item>Share</au-menu-item>
    </au-menu>
  `,
})
export class MenuDemo {
  readonly open = signal(false);
}
