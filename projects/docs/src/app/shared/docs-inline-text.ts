import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type InlineTextPart = { type: 'text' | 'code'; value: string };

/** Divide texto con fragmentos entre backticks (`código`) en partes texto/código. */
export function splitInlineCode(text: string): InlineTextPart[] {
  const parts: InlineTextPart[] = [];
  const re = /`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', value: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'text', value: text }];
}

@Component({
  selector: 'docs-inline-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (part of parts(); track $index) {
      @if (part.type === 'code') {
        <code class="docs-inline-code">{{ part.value }}</code>
      } @else {
        <span>{{ part.value }}</span>
      }
    }
  `,
  styles: [
    `
      :host {
        display: inline;
      }
    `,
  ],
})
export class DocsInlineText {
  readonly text = input.required<string>();

  readonly parts = computed(() => splitInlineCode(this.text()));
}
