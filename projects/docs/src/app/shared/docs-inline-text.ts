import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface InlineTextPart {
  /** Stable key for `@for` tracking (index + kind + value). */
  key: string;
  type: 'text' | 'code';
  value: string;
}

/** Divide texto con fragmentos entre backticks (`código`) en partes texto/código. */
export function splitInlineCode(text: string): InlineTextPart[] {
  const parts: InlineTextPart[] = [];
  const re = /`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let partIndex = 0;

  const push = (type: InlineTextPart['type'], value: string): void => {
    parts.push({ key: `${partIndex++}:${type}:${value}`, type, value });
  };

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      push('text', text.slice(lastIndex, match.index));
    }
    push('code', match[1]);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    push('text', text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [pushSingle(text)];
}

function pushSingle(text: string): InlineTextPart {
  return { key: `0:text:${text}`, type: 'text', value: text };
}

@Component({
  selector: 'docs-inline-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (part of parts(); track part.key) {
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
