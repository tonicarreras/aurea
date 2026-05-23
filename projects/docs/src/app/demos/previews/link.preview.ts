import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuLink } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuLink],
  template: `<p class="docs-preview">
    <a
      auLink
      href="#"
      >Design tokens</a
    >
  </p>`,
})
export class LinkDemo {}
