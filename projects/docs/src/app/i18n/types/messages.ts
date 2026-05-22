export interface DocsMessages {
  shell: {
    skipToContent: string;
    theme: string;
    themeSystem: string;
    themeLight: string;
    themeDark: string;
    themeToggleAria: (mode: 'light' | 'dark' | 'system') => string;
    lang: string;
    langEn: string;
    langEs: string;
    menuLabel: string;
    menuCloseAria: string;
    settingsMenuAria: string;
    githubLabel: string;
    npmLabel: string;
    storybookLabel: string;
    navAria: string;
    githubAria: string;
    npmAria: string;
    storybookAria: string;
  };
  home: {
    eyebrow: string;
    title: string;
    lead: string;
    statsAria: string;
    statsComponents: string;
    statsA11y: string;
    statsForms: string;
    exploreAria: string;
    cardGetStartedTitle: string;
    cardGetStartedText: string;
    cardThemesTitle: string;
    cardThemesText: string;
    cardComponentsTitle: string;
    cardComponentsText: string;
    footer: string;
    ctaComponents: string;
    ctaInstall: string;
  };
  getStarted: {
    title: string;
    lead: string;
    steps: {
      requirements: { title: string; intro: string };
      install: { title: string; expand: string };
      tokens: { title: string; intro: string; expand: string };
      firstComponent: { title: string; expand: string };
    };
  };
  themes: {
    title: string;
    lead: string;
    attrHeading: string;
    attrBody: string;
    attrExpand: string;
    directiveHeading: string;
    directiveBody: string;
    directiveExpand: string;
    previewHeading: string;
    previewCardTitle: string;
    previewCardBody: string;
    previewLight: string;
    previewDark: string;
    globalHeading: string;
    globalBody: string;
    globalLink: string;
    ruleHeading: string;
    ruleBody: string;
  };
  componentsIndex: {
    title: string;
    lead: string;
  };
  componentDoc: {
    sectionsAria: (title: string) => string;
    overview: string;
    api: string;
    styling: string;
    examples: string;
    export: string;
    selector: string;
    apiLead: (exportName: string) => string;
    signalApiHint: string;
    importExpand: string;
    importCollapse: string;
    apiEmpty: string;
    stylingLead: (title: string) => string;
    themesLink: string;
    examplesLead: string;
    notFoundTitle: string;
    notFoundLead: string;
    backToIndex: string;
  };
  overviewUi: {
    introSr: string;
    relatedExports: string;
    anatomy: string;
    accessibility: string;
    keyboard: string;
  };
  codeBlock: {
    show: string;
    hide: string;
    copy: string;
    copied: string;
  };
}
