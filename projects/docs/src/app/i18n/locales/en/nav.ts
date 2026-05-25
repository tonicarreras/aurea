import { COMPONENT_NAV_LABELS } from '../../component-nav-labels';
import type { DocsNavMessages } from '../../types/nav';

export const NAV_EN: DocsNavMessages = {
  intro: {
    title: 'Introduction',
    home: 'Design overview',
    getStarted: 'Get started',
    adoption: 'Adoption guide',
    signalForms: 'Signal forms',
    troubleshooting: 'Troubleshooting',
    crudDemo: 'CRUD demo',
    themes: 'Themes & tokens',
  },
  ecosystem: {
    title: 'Ecosystem',
    maturity: 'Maturity matrix',
    designTokens: 'Figma tokens',
  },
  components: {
    title: 'Components',
    index: 'Index',
    labels: { ...COMPONENT_NAV_LABELS },
  },
};
