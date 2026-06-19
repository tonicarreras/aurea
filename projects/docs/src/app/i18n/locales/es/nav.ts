import { COMPONENT_NAV_LABELS } from '../../component-nav-labels';
import type { DocsNavMessages } from '../../types/nav';

export const NAV_ES: DocsNavMessages = {
  intro: {
    title: 'Introducción',
    home: 'Visión de diseño',
    getStarted: 'Empezar',
    adoption: 'Guía de adopción',
    apiConventions: 'Convenciones de API',
    floatingUi: 'Floating UI',
    composition: 'Composición',
    recipes: 'Recetas',
    signalForms: 'Signal forms',
    crudDemo: 'Demo CRUD',
    themes: 'Temas y tokens',
  },
  ecosystem: {
    title: 'Ecosistema',
    maturity: 'Matriz de madurez',
    designTokens: 'Tokens Figma',
  },
  components: {
    title: 'Componentes',
    index: 'Índice',
    labels: { ...COMPONENT_NAV_LABELS },
  },
};
