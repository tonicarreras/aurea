import type { DocsMessages } from '../../types/messages';

export const MESSAGES_EN: DocsMessages = {
  shell: {
    skipToContent: 'Skip to content',
    theme: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeToggleAria: (mode) => {
      const labels = { light: 'Light', dark: 'Dark', system: 'System' };
      return `Theme: ${labels[mode]}. Click to change.`;
    },
    lang: 'Language',
    langEn: 'English',
    langEs: 'Español',
    menuLabel: 'Menu',
    menuCloseAria: 'Close menu',
    settingsMenuAria: 'Site settings',
    githubLabel: 'GitHub',
    npmLabel: 'npm',
    storybookLabel: 'Storybook',
    navAria: 'Documentation',
    githubAria: 'GitHub repository',
    npmAria: 'npm package',
    storybookAria: 'Open Storybook',
  },
  home: {
    eyebrow: 'Angular 21 · Accessible · Signals',
    title: 'Aurea Design System',
    lead: 'Production-ready components, semantic tokens, and signal-based forms — documented, tested, and published on npm.',
    statsAria: 'System summary',
    statsComponents: 'Components',
    statsA11y: 'Accessibility',
    statsForms: 'Forms',
    exploreAria: 'Explore documentation',
    cardGetStartedTitle: 'Get started',
    cardGetStartedText: 'Install the package and wire tokens in your Angular app.',
    cardThemesTitle: 'Themes',
    cardThemesText: 'Light, dark, and semantic --au-* variables.',
    cardComponentsTitle: 'Components',
    cardComponentsText: 'Live previews and copy-ready snippets.',
    footer:
      'npm package <code>@aurea-design-system/components</code> — guides, themes, and interactive demos in this app; full catalog in Storybook.',
    ctaComponents: 'Browse components',
    ctaInstall: 'Installation guide',
  },
  getStarted: {
    title: 'Get started',
    lead: 'Install the published package and connect tokens and components in your Angular 21 app.',
    steps: {
      requirements: {
        title: 'Requirements',
        intro: 'Minimum versions for your project toolchain:',
      },
      install: { title: 'Install', expand: 'Show install command' },
      tokens: {
        title: 'Global tokens',
        intro: 'Import semantic styles in angular.json or your global stylesheet:',
        expand: 'Show CSS imports',
      },
      firstComponent: { title: 'First component', expand: 'Show Angular example' },
    },
  },
  themes: {
    title: 'Themes & tokens',
    lead: 'Global --au-* variables defined in au-tokens.css. Each component page lists only the tokens it consumes under Styling.',
    attrHeading: 'Theme attribute',
    attrBody:
      'Set <code>data-au-theme</code> on an ancestor (e.g. <code>&lt;html&gt;</code> or your app shell). Values: <code>light</code>, <code>dark</code>.',
    attrExpand: 'Show HTML',
    directiveHeading: 'AuTheme directive',
    directiveBody:
      'Reactive alternative with <code>system</code> to follow <code>prefers-color-scheme</code>:',
    directiveExpand: 'Show TypeScript',
    previewHeading: 'Preview',
    previewCardTitle: 'Sample surface',
    previewCardBody: 'Colors follow the container theme.',
    previewLight: 'Light',
    previewDark: 'Dark',
    globalHeading: 'Global tokens',
    globalBody:
      'Override on <code>:root</code> or <code>[data-au-theme]</code>. Per-component tokens (e.g. <code>--au-card-padding</code>) are listed on that component’s page —',
    globalLink: 'component index',
    ruleHeading: 'Usage rule',
    ruleBody:
      'In product code, use only documented <code>--au-*</code> variables. Reserve primitive names for internal theme layers. Source of truth:',
  },
  componentsIndex: {
    title: 'Components',
    lead: 'Design system primitives. Each page includes a live preview and import example.',
  },
  componentDoc: {
    sectionsAria: (title) => `${title} sections`,
    overview: 'Overview',
    api: 'API',
    styling: 'Styling',
    examples: 'Examples',
    export: 'Export',
    selector: 'Selector',
    apiLead: (exportName) =>
      `API for <code>${exportName}</code>. Inputs use Angular signals`,
    signalApiHint: ' (`input()`, `model()`, `output()`).',
    importExpand: 'Import',
    importCollapse: 'Hide import',
    apiEmpty:
      'See the <strong>Autodocs</strong> tab in Storybook for the full reference for this component.',
    stylingLead: (title) =>
      `Tokens consumed by <strong>${title}</strong> in its CSS (component-specific). Global palette, shared form styles, and theme layers are in`,
    themesLink: 'Themes & tokens',
    examplesLead: 'Variants with a live preview and a copy-ready code snippet.',
    notFoundTitle: 'Not found',
    notFoundLead: 'There is no documentation for this component.',
    backToIndex: 'Back to index',
  },
  overviewUi: {
    introSr: 'Introduction',
    relatedExports: 'Related exports',
    anatomy: 'Anatomy',
    accessibility: 'Accessibility',
    keyboard: 'Keyboard',
  },
  codeBlock: {
    show: 'Show code',
    hide: 'Hide code',
    copy: 'Copy',
    copied: 'Copied',
  },
};

