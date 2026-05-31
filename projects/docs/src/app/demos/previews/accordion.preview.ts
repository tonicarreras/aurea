import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuAccordion, AuAccordionItem, AuAccordionPanel } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
  template: `
    <div class="docs-preview docs-preview--wide">
      <au-accordion
        [(value)]="expanded"
        [ariaLabel]="t().ariaLabel"
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
    </div>
  `,
})
export class AccordionDemo {
  readonly t = docsPreviewCopy('accordion');
  readonly expanded = model(['profile']);
}
