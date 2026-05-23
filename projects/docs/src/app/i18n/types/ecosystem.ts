import type { GuideSection } from './guides';

export interface EcosystemRoadmapPhase {
  name: string;
  focus: string;
  status: string;
}

export interface EcosystemMaturityRow {
  slug: string;
  title: string;
  level: string;
  since: string;
}

export type { GuideSection };

export interface EcosystemMessages {
  roadmap: {
    title: string;
    lead: string;
    phasesHeading: string;
    versionsHeading: string;
    table: { phase: string; focus: string; status: string };
    phases: EcosystemRoadmapPhase[];
    versionTargets: { version: string; focus: string }[];
    githubLink: string;
  };
  maturity: {
    title: string;
    lead: string;
    legend: string;
    columns: { component: string; level: string; since: string };
    rows: EcosystemMaturityRow[];
  };
  migrateMaterial: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
  migrateCdk: {
    title: string;
    lead: string;
    sections: GuideSection[];
  };
  designTokens: {
    title: string;
    lead: string;
    sections: GuideSection[];
    downloadLight: string;
    downloadDark: string;
  };
  crudDemo: {
    title: string;
    lead: string;
    filterLabel: string;
    filterPlaceholder: string;
    colName: string;
    colRole: string;
    colActions: string;
    newPerson: string;
    edit: string;
    delete: string;
    editTitle: string;
    deleteTitle: string;
    deleteBody: string;
    cancel: string;
    save: string;
    snackbarSaved: string;
    snackbarDeleted: string;
  };
}
