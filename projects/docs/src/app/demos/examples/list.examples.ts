import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuList } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-list-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuList, AuChip],
  template: `
    <au-list [ariaLabel]="t().chipsAria">
      <au-chip
        label="Angular"
        [removable]="true"
      />
      <au-chip
        label="TypeScript"
        [removable]="true"
      />
    </au-list>
  `,
})
export class ExampleListChipsDemo {
  readonly t = docsExampleLive('list');
}

@Component({
  selector: 'docs-example-list-labelled-by',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuList, AuChip],
  template: `
    <p id="tags-heading">{{ t().tagsHeading }}</p>
    <au-list ariaLabelledBy="tags-heading">
      <au-chip
        [label]="t().labelledByChip"
        [removable]="true"
      />
    </au-list>
  `,
})
export class ExampleListLabelledByDemo {
  readonly t = docsExampleLive('list');
}
