export interface GuideLinkCard {
  title: string;
  description: string;
  /** Route segments without locale, e.g. guides/signal-forms */
  path: string;
}

export interface GuideSection {
  heading: string;
  body: string;
  code?: string;
  codeLanguage?: 'typescript' | 'html' | 'css' | 'bash';
  expandLabel?: string;
}

export interface GuidesMessages {
  adoption: {
    title: string;
    lead: string;
    cards: GuideLinkCard[];
  };
  apiConventions: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
  floatingUi: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
  composition: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
  recipes: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
  signalForms: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
  bundleSize: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
}
