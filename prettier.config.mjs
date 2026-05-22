/**
 * Prettier 3 — formatting only (ESLint handles lint/quality).
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  /** Angular / Storybook templates: one binding per line when multiline. */
  singleAttributePerLine: true,
  overrides: [
    {
      files: ['*.html'],
      options: { parser: 'angular' },
    },
    {
      files: ['*.md', '*.mdx'],
      options: { proseWrap: 'preserve' },
    },
    {
      files: ['*.json', '*.jsonc'],
      options: { trailingComma: 'none' },
    },
  ],
};

export default config;
