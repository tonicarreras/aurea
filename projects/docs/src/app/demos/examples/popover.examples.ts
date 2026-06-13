import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AuButton,
  AuCheckbox,
  AuFormField,
  AuPopover,
  AuPopoverTrigger,
} from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-popover-placement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPopover, AuPopoverTrigger, AuButton],
  template: `
    <div class="docs-demo-row">
      <au-popover
        [(open)]="openStart"
        placement="start"
      >
        <button
          auButton
          auPopoverTrigger
          size="sm"
          variant="outline"
          type="button"
        >
          {{ t().placementStart }}
        </button>
        <p class="docs-example-popover__body">{{ t().content }}</p>
      </au-popover>
      <au-popover
        [(open)]="openEnd"
        placement="end"
      >
        <button
          auButton
          auPopoverTrigger
          size="sm"
          variant="outline"
          type="button"
        >
          {{ t().placementEnd }}
        </button>
        <p class="docs-example-popover__body">{{ t().content }}</p>
      </au-popover>
    </div>
  `,
  styles: `
    .docs-example-popover__body {
      margin: 0;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-normal);
      color: var(--au-color-text-primary);
    }
  `,
})
export class ExamplePopoverPlacementDemo {
  readonly t = docsExampleLive('popover');
  readonly openStart = signal(false);
  readonly openEnd = signal(false);
}

@Component({
  selector: 'docs-example-popover-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPopover, AuPopoverTrigger, AuButton, AuFormField, AuCheckbox],
  template: `
    <au-popover [(open)]="open">
      <button
        auButton
        auPopoverTrigger
        size="sm"
        variant="outline"
        type="button"
      >
        {{ t().filtersTrigger }}
      </button>
      <div class="docs-example-popover__filters">
        <au-form-field [label]="t().statusLabel">
          <input
            type="checkbox"
            auCheckbox
          />{{ t().activeOnly }}
        </au-form-field>
        <au-form-field [label]="t().roleLabel">
          <input
            type="checkbox"
            auCheckbox
          />{{ t().engineersOnly }}
        </au-form-field>
        <div class="docs-example-popover__actions">
          <button
            auButton
            size="sm"
            variant="ghost"
            type="button"
            (click)="open.set(false)"
          >
            {{ t().clear }}
          </button>
          <button
            auButton
            size="sm"
            type="button"
            (click)="open.set(false)"
          >
            {{ t().apply }}
          </button>
        </div>
      </div>
    </au-popover>
  `,
  styles: `
    .docs-example-popover__filters {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-3);
      min-width: 14rem;
    }

    .docs-example-popover__actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--au-space-2);
      padding-top: var(--au-space-2);
    }
  `,
})
export class ExamplePopoverFiltersDemo {
  readonly t = docsExampleLive('popover');
  readonly open = signal(false);
}

@Component({
  selector: 'docs-example-popover-controlled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPopover, AuPopoverTrigger, AuButton],
  template: `
    <div class="docs-demo-stack">
      <button
        auButton
        size="sm"
        variant="secondary"
        type="button"
        (click)="open.set(true)"
      >
        {{ t().openProgrammatically }}
      </button>
      <au-popover [(open)]="open">
        <button
          auButton
          auPopoverTrigger
          size="sm"
          variant="outline"
          type="button"
        >
          {{ t().trigger }}
        </button>
        <p class="docs-example-popover__body">{{ t().helpContent }}</p>
      </au-popover>
    </div>
  `,
  styles: `
    .docs-example-popover__body {
      margin: 0;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-normal);
      color: var(--au-color-text-primary);
    }
  `,
})
export class ExamplePopoverControlledDemo {
  readonly t = docsExampleLive('popover');
  readonly open = signal(false);
}
