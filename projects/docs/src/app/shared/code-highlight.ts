import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

export type CodeLanguage = 'typescript' | 'css' | 'bash' | 'html' | 'text';

const GRAMMAR: Record<Exclude<CodeLanguage, 'text'>, Prism.Grammar> = {
  typescript: Prism.languages['typescript'],
  css: Prism.languages['css'],
  bash: Prism.languages['bash'],
  html: Prism.languages['markup'],
};

const PRISM_LANG: Record<Exclude<CodeLanguage, 'text'>, string> = {
  typescript: 'typescript',
  css: 'css',
  bash: 'bash',
  html: 'markup',
};

export function highlightCode(code: string, language: CodeLanguage): string {
  if (language === 'text') {
    return escapeHtml(code);
  }

  const grammar = GRAMMAR[language];
  return Prism.highlight(code.trimEnd(), grammar, PRISM_LANG[language]);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
