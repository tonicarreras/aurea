import type { DocsMessages } from '../../types/messages';
import { GUIDES_EN } from './guides';

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
  landing: {
    eyebrow: 'Aurea · Design system · Angular 21',
    title: 'Less visual noise.',
    titleAccent: 'More focus on the task.',
    lead: 'Open npm library (MIT) for any product: semantic tokens, accessible components, and signal-based forms. Explore the design overview here; open technical documentation when you build.',
    ctaDocs: 'Documentation',
    ctaStorybook: 'Storybook',
    overviewTitle: 'Design overview',
    overviewAria: 'Design principles',
    principles: [
      {
        title: 'Clear task, quiet UI',
        text: 'Hierarchy and contrast serve the job — decoration never fights the content.',
        accent: 'task',
      },
      {
        title: 'Semantic tokens',
        text: 'Surfaces, actions, and form states share one <code>--au-*</code> vocabulary in light and dark.',
        accent: 'tokens',
      },
      {
        title: 'Accessible by default',
        text: 'Focus rings, labels, and live regions are part of every component contract.',
        accent: 'a11y',
      },
    ],
    systemTitle: 'How the system is built',
    systemLead:
      'Three layers: primitives (internal), semantic tokens in <code>au-tokens.css</code>, and component styles that map semantics to real UI.',
    systemPoints: [
      'WCAG 2.2-minded patterns on primary flows',
      'Signal forms aligned with Angular 21 <code>formField</code>',
      'Published as <code>@aurea-design-system/components</code> on npm',
    ],
    themesLink: 'Explore themes & tokens',
    previewsTitle: 'Component previews',
    previewsLead:
      'All 24 catalog components, four per page — use the arrows to browse the full set.',
    previewsAria: 'Component preview gallery',
    previewOpenDoc: 'View docs',
    carouselAria: 'Component carousel',
    carouselPrev: 'Previous page',
    carouselNext: 'Next page',
    carouselPageStatus: (current, total) => `Page ${current} of ${total}`,
    carouselSlideAria: (page) => `Components, page ${page}`,
    carouselDotsAria: 'Go to carousel page',
    carouselGoToPage: (page) => `Go to page ${page}`,
    footer:
      'MIT · Use Aurea in any Angular product. Technical reference also lives in Storybook.',
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
      ngAdd: {
        title: 'Schematic (recommended)',
        intro: 'Adds global styles to angular.json automatically:',
        expand: 'Show ng add command',
      },
      nextGuides: {
        title: 'Go deeper',
        intro: 'Follow the adoption guide for signal forms, patterns, troubleshooting, and bundle tips.',
      },
    },
  },
  guides: GUIDES_EN,
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
    previewHighContrast: 'High contrast',
    densityHeading: 'Density (v2)',
    densityBody:
      'Set <code>data-au-density</code> on the shell: <code>compact</code>, <code>comfortable</code> (default), or <code>spacious</code>. Use the <code>auDensity</code> directive for reactive binding.',
    densityExpand: 'Show density HTML',
    highContrastHeading: 'High contrast (experimental)',
    highContrastBody:
      'Fixed palette for stronger borders and focus: <code>data-au-theme="high-contrast"</code> or <code>[auTheme]="\'high-contrast\'"</code>. Validate with your QA checklist.',
    highContrastExpand: 'Show high-contrast HTML',
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
    lead: 'Design system primitives. Each page includes a live preview, maturity badge, and import example.',
    maturityLegend: 'Maturity: stable = production-ready; beta = usable with noted edge cases; experimental = may change.',
    maturityStable: 'Stable',
    maturityBeta: 'Beta',
    maturityExperimental: 'Experimental',
  },
  componentDoc: {
    sectionsAria: (title) => `${title} sections`,
    overview: 'Overview',
    api: 'API',
    styling: 'Styling',
    examples: 'Examples',
    export: 'Export',
    selector: 'Selector',
    apiLead: (exportName) => `API for <code>${exportName}</code>. Inputs use Angular signals`,
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
