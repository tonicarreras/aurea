import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { AuBreadcrumb } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-breadcrumb-two-level',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBreadcrumb],
  template: `
    <au-breadcrumb [items]="items()" />
  `,
})
export class ExampleBreadcrumbTwoLevelDemo {
  readonly t = docsExampleLive('breadcrumb');
  readonly items = computed(() => {
    const copy = this.t();
    return [{ label: copy.home, href: '#' }, { label: copy.settings }];
  });
}

@Component({
  selector: 'docs-example-breadcrumb-deep',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBreadcrumb],
  template: `
    <au-breadcrumb [items]="items()" />
  `,
})
export class ExampleBreadcrumbDeepDemo {
  readonly t = docsExampleLive('breadcrumb');
  readonly items = computed(() => {
    const copy = this.t();
    return [
      { label: copy.home, href: '#' },
      { label: copy.workspace, href: '#' },
      { label: copy.people, href: '#' },
      { label: copy.personDetail },
    ];
  });
}

@Component({
  selector: 'docs-example-breadcrumb-links-only',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBreadcrumb],
  template: `
    <au-breadcrumb [items]="items()" />
  `,
})
export class ExampleBreadcrumbLinksOnlyDemo {
  readonly t = docsExampleLive('breadcrumb');
  readonly items = computed(() => {
    const copy = this.t();
    return [
      { label: copy.docs, href: '#' },
      { label: copy.components, href: '#' },
      { label: copy.breadcrumb },
    ];
  });
}
