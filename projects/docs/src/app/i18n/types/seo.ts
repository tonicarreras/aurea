export interface DocsPageSeo {
  title: string;
  description: string;
}

export interface DocsSeoMessages {
  siteName: string;
  defaultDescription: string;
  breadcrumbHome: string;
  breadcrumbGetStarted: string;
  breadcrumbThemes: string;
  breadcrumbComponents: string;
  home: DocsPageSeo;
  getStarted: DocsPageSeo;
  guidesAdoption: DocsPageSeo;
  guidesSignalForms: DocsPageSeo;
  guidesPatterns: DocsPageSeo;
  guidesTroubleshooting: DocsPageSeo;
  guidesBundle: DocsPageSeo;
  themes: DocsPageSeo;
  componentsIndex: DocsPageSeo;
  componentTitle: (name: string, exportName: string) => string;
  componentDescription: (name: string, summary: string) => string;
  notFound: DocsPageSeo;
}
