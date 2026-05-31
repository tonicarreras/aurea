import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuAccordion, AuAccordionItem, AuAccordionPanel } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-accordion-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
  template: `
    <au-accordion
      [(value)]="expanded"
      [ariaLabel]="t().ariaLabel"
      style="max-width: 28rem"
    >
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="profile"
        >
          {{ t().profile }}
        </button>
        <div auAccordionPanel="profile">{{ t().profilePanel }}</div>
      </div>
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="billing"
        >
          {{ t().billing }}
        </button>
        <div auAccordionPanel="billing">{{ t().billingPanel }}</div>
      </div>
    </au-accordion>
  `,
})
export class ExampleAccordionBasicDemo {
  readonly t = docsExampleLive('accordion');
  readonly expanded = model(['profile']);
}

@Component({
  selector: 'docs-example-accordion-single',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
  template: `
    <au-accordion
      [(value)]="expanded"
      [multiple]="false"
      [ariaLabel]="t().ariaLabel"
      style="max-width: 28rem"
    >
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="one"
        >
          {{ t().sectionOne }}
        </button>
        <div auAccordionPanel="one">{{ t().sectionOnePanel }}</div>
      </div>
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="two"
        >
          {{ t().sectionTwo }}
        </button>
        <div auAccordionPanel="two">{{ t().sectionTwoPanel }}</div>
      </div>
    </au-accordion>
  `,
})
export class ExampleAccordionSingleDemo {
  readonly t = docsExampleLive('accordion');
  readonly expanded = model(['one']);
}
