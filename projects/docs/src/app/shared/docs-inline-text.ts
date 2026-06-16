import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface InlineTextPart {
  /** Stable key for `@for` tracking (index + kind + value). */
  key: string;
  type: 'text' | 'code' | 'strong';
  value: string;
}

/** Divide texto con `backticks` o etiquetas inline <code> / <strong>. */
export function splitInlineCode(text: string): InlineTextPart[] {
  const parts: InlineTextPart[] = [];
  const re = /`([^`]+)`|<code>([\s\S]*?)<\/code>|<strong>([\s\S]*?)<\/strong>/gi;
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
    if (match[1] !== undefined) {
      push('code', match[1]);
    } else if (match[2] !== undefined) {
      push('code', match[2]);
    } else {
      push('strong', match[3]);
    }
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
      } @else if (part.type === 'strong') {
        <strong>{{ part.value }}</strong>
      } @else {
        <span>{{ part.value }}</span>
      }
    }
  `,
  styles: `
    :host {
      display: inline;
    }
  `,
})
export class DocsInlineText {
  readonly text = input.required<string>();

  readonly parts = computed(() => splitInlineCode(this.text()));
}
