import type { DocsMessages } from '../../types/messages';
import { ECOSYSTEM_EN } from './ecosystem';
import { FIXTURES_EN } from './fixtures';
import { GET_STARTED_COMPONENT_SNIPPET } from './get-started-snippets';
import { GUIDES_EN } from './guides';
import { EXAMPLE_LIVE_EN } from './example-live';
import { NAV_EN } from './nav';
import { PREVIEWS_EN } from './previews';

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
    title: 'Design system',
    titleAccent: 'for Angular 21',
    lead: 'Open-source npm library (MIT): semantic CSS tokens, standalone components, and Angular signal forms. Install guide, component reference, and Storybook.',
    ctaDocs: 'Documentation',
    ctaStorybook: 'Storybook',
    overviewTitle: 'Principles',
    overviewAria: 'Design principles',
    principles: [
      {
        title: 'Visual hierarchy',
        text: 'Typography, spacing, and contrast use documented <code>--au-*</code> tokens instead of one-off styles.',
        accent: 'hierarchy',
      },
      {
        title: 'Semantic tokens',
        text: 'Surfaces, actions, and form states share the same token names in light and dark themes.',
        accent: 'tokens',
      },
      {
        title: 'Accessible by default',
        text: 'Focus rings, labels, and ARIA roles are documented per component.',
        accent: 'a11y',
      },
    ],
    systemTitle: 'Architecture',
    systemLead:
      'Primitives (internal), semantic tokens in <code>au-tokens.css</code>, and component CSS that maps tokens to UI.',
    systemPoints: [
      'Accessibility notes and keyboard behavior in component docs',
      'Signal forms with Angular 21 <code>formField</code>',
      'Published as <code>@aurea-design-system/components</code> on npm',
    ],
    themesLink: 'Themes and tokens',
    previewsTitle: 'Component previews',
    previewsLead: 'Stable components only — four per carousel page.',
    previewsAria: 'Component preview gallery',
    previewOpenDoc: 'View docs',
    carouselAria: 'Component carousel',
    carouselPrev: 'Previous page',
    carouselNext: 'Next page',
    carouselPageStatus: (current, total) => `Page ${current} of ${total}`,
    carouselSlideAria: (page) => `Components, page ${page}`,
    carouselDotsAria: 'Go to carousel page',
    carouselGoToPage: (page) => `Go to page ${page}`,
    footer: 'MIT license. Component reference also in Storybook.',
  },
  getStarted: {
    title: 'Get started',
    lead: 'Install the published package and connect tokens and components in your Angular 21 app.',
    componentSnippet: GET_STARTED_COMPONENT_SNIPPET,
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
        intro:
          'See the adoption guide for signal forms — or open the',
        adoptionLink: 'Adoption guide →',
        crudDemoLink: 'CRUD reference demo →',
      },
    },
  },
  guides: GUIDES_EN,
  ecosystem: ECOSYSTEM_EN,
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
    previewThemeLabel: 'Appearance',
    previewHighContrast: 'High contrast (a11y)',
    previewHighContrastHint:
      'Combines with appearance: light → high-contrast, dark → high-contrast-dark.',
    previewDensityLabel: 'Density',
    previewDensityCompact: 'Compact',
    previewDensityComfortable: 'Comfortable',
    previewDensitySpacious: 'Spacious',
    densityHeading: 'Density (v2)',
    densityBody:
      'Set <code>data-au-density</code> on the shell: <code>compact</code>, <code>comfortable</code> (default), or <code>spacious</code>. Use the <code>auDensity</code> directive for reactive binding.',
    densityExpand: 'Show density HTML',
    highContrastHeading: 'High contrast (experimental)',
    highContrastBody:
      'Separate from appearance: stronger borders and focus for accessibility. When the user opts in, map appearance to <code>high-contrast</code> (light) or <code>high-contrast-dark</code> (dark) via <code>data-au-theme</code> or <code>[auTheme]</code>. Both palettes are experimental — validate with your QA checklist.',
    highContrastExpand: 'Show high-contrast HTML',
    brandHeading: 'Brand customization',
    brandBody:
      'Create a small stylesheet loaded <strong>after</strong> <code>au-tokens.css</code>. Override semantic tokens on <code>:root</code> and per theme — no fork of the library required.',
    brandExpand: 'Show brand override CSS',
    overrideLevelsHeading: 'Three override levels',
    overrideLevelsBody:
      'Pick the narrowest level that solves your need. Prefer tokens over targeting internal class names.',
    overrideGlobalTitle: '1. Global (recommended for brand)',
    overrideGlobalBody:
      'Set <code>--au-color-*</code>, <code>--au-font-sans</code>, <code>--au-shadow-*</code> on <code>:root</code> or <code>[data-au-theme]</code>. Every component picks them up automatically.',
    overrideHostTitle: '2. Per component (host)',
    overrideHostBody:
      'Set <code>--au-card-padding</code>, <code>--au-table-row-hover</code>, etc. on the custom element (<code>au-card</code>, <code>au-table</code>…). Works best on components with <code>ViewEncapsulation.None</code>.',
    overrideAvoidTitle: '3. Avoid in product apps',
    overrideAvoidBody:
      'Do not rely on internal BEM classes (<code>.au-button__element</code>) or <code>::ng-deep</code>. They are not part of the public API and can change in minor releases.',
    hostOverrideHeading: 'Host overrides (reference)',
    hostOverrideBody:
      'Common per-host variables. Each component’s <strong>Styling</strong> tab lists every token that component reads.',
    hostOverrideColHost: 'Host',
    hostOverrideColToken: 'Token',
    hostOverrideColDescription: 'Description',
    globalHeading: 'Global token catalog',
    globalBody:
      'Full reference below. Per-component tokens (e.g. <code>--au-card-padding</code>) are listed on that component’s page — see the',
    globalLink: 'component index',
    ruleHeading: 'Usage rule',
    ruleBody:
      'In product code, use only documented <code>--au-*</code> variables. Reserve primitive names for internal theme layers. Source of truth:',
  },
  componentsIndex: {
    title: 'Components',
    lead: 'Design system primitives. Each page includes a live preview, maturity badge, and import example.',
    maturityLegend:
      'Maturity: stable = production-ready; beta = usable with noted edge cases; experimental = may change.',
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
    exampleFallbackTitle: 'Basic usage',
    notFoundTitle: 'Not found',
    notFoundLead: 'There is no documentation for this component.',
    backToIndex: 'Back to index',
    apiTable: {
      colName: 'Name',
      colType: 'Type',
      colDescription: 'Description',
      colDefault: 'Default',
      colKind: 'Role',
    },
  },
  demoPanel: {
    ariaLabel: 'Live preview',
    title: 'Preview',
    badge: 'Live',
  },
  fixtures: FIXTURES_EN,
  previews: PREVIEWS_EN,
  exampleLive: EXAMPLE_LIVE_EN,
  nav: NAV_EN,
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
    copyAria: 'Copy code',
    copiedAria: 'Code copied',
    snippetAria: (language) => `Code ${language}`,
    lang: {
      typescript: 'TypeScript',
      css: 'CSS',
      bash: 'Shell',
      html: 'HTML',
      text: 'Text',
    },
  },
};
