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
        <au-accordion-panel panel="profile">{{ t().profilePanel }}</au-accordion-panel>
      </div>
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="billing"
        >
          {{ t().billing }}
        </button>
        <au-accordion-panel panel="billing">{{ t().billingPanel }}</au-accordion-panel>
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
        <au-accordion-panel panel="one">{{ t().sectionOnePanel }}</au-accordion-panel>
      </div>
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="two"
        >
          {{ t().sectionTwo }}
        </button>
        <au-accordion-panel panel="two">{{ t().sectionTwoPanel }}</au-accordion-panel>
      </div>
    </au-accordion>
  `,
})
export class ExampleAccordionSingleDemo {
  readonly t = docsExampleLive('accordion');
  readonly expanded = model(['one']);
}

@Component({
  selector: 'docs-example-accordion-contained',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
  template: `
    <au-accordion
      [(value)]="expanded"
      variant="contained"
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
        <au-accordion-panel panel="profile">{{ t().profilePanel }}</au-accordion-panel>
      </div>
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="billing"
        >
          {{ t().billing }}
        </button>
        <au-accordion-panel panel="billing">{{ t().billingPanel }}</au-accordion-panel>
      </div>
    </au-accordion>
  `,
})
export class ExampleAccordionContainedDemo {
  readonly t = docsExampleLive('accordion');
  readonly expanded = model(['profile']);
}
