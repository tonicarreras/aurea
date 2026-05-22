import type { DocsSeoMessages } from '../../types/seo';

export const SEO_ES: DocsSeoMessages = {
  siteName: 'Aurea Design System',
  defaultDescription:
    'Documentación oficial de Aurea: componentes accesibles para Angular 21, tokens semánticos y formularios con signals. Paquete npm @aurea-design-system/components.',
  breadcrumbHome: 'Inicio',
  breadcrumbGetStarted: 'Empezar',
  breadcrumbThemes: 'Temas y tokens',
  breadcrumbComponents: 'Componentes',
  home: {
    title: 'Aurea — Design system Angular 21 con foco en la tarea',
    description:
      'Sistema UI abierto MIT: menos ruido visual, componentes accesibles, tokens semánticos y vistas previas. Documentación para instalar e implementar.',
  },
  getStarted: {
    title: 'Empezar — Instalar Aurea en Angular 21',
    description:
      'Requisitos, instalación de @aurea-design-system/components, tokens globales y tu primer ejemplo con au-button.',
  },
  guidesAdoption: {
    title: 'Guía de adopción — Aurea Design System',
    description:
      'Ruta desde la instalación hasta signal forms, patrones, troubleshooting, bundle y temas.',
  },
  guidesSignalForms: {
    title: 'Signal forms con Aurea — Angular 21',
    description:
      'Enlaza au-form-field y controles con FormField, form(), validadores y envío seguro.',
  },
  guidesPatterns: {
    title: 'Patrones de UI — Aurea Design System',
    description:
      'Formularios validados, diálogos de confirmación destructiva y feedback con snackbar.',
  },
  guidesTroubleshooting: {
    title: 'Resolución de problemas — Aurea',
    description:
      'Componentes sin estilo, CSS listbox, mensajes de validación, tema y imports del bundle.',
  },
  guidesBundle: {
    title: 'Bundle y tree-shaking — Aurea',
    description:
      'Imports por símbolo, CSS global, stats-json en producción y rutas lazy.',
  },
  themes: {
    title: 'Temas y tokens de diseño — Aurea',
    description:
      'Variables CSS semánticas, temas claro/oscuro con auTheme y referencia de tokens para superficies, texto, bordes y formularios.',
  },
  componentsIndex: {
    title: 'Componentes UI Angular — Catálogo Aurea',
    description:
      'Explora cada componente Aurea: botones, inputs, diálogos, chips, steps, accesibilidad, tablas API y demos interactivas.',
  },
  componentTitle: (name, exportName) => `${name} (${exportName}) — Docs Aurea`,
  componentDescription: (name, summary) =>
    `${name} para Angular 21: ${summary} Referencia API, tokens de estilo y ejemplos interactivos.`,
  notFound: {
    title: 'Página no encontrada — Aurea Design System',
    description: 'El componente o la página solicitada no existe en la documentación de Aurea.',
  },
};
