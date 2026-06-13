import type { DocsSeoMessages } from '../../types/seo';

export const SEO_ES: DocsSeoMessages = {
  siteName: 'Aurea Design System',
  defaultDescription:
    'Documentación oficial de Aurea: componentes accesibles para Angular 22, tokens semánticos y formularios con signals. Paquete npm @aurea-design-system/components.',
  breadcrumbHome: 'Inicio',
  breadcrumbGetStarted: 'Empezar',
  breadcrumbThemes: 'Temas y tokens',
  breadcrumbComponents: 'Componentes',
  home: {
    title: 'Aurea — Sistema de diseño para Angular 22',
    description:
      'Librería npm MIT: tokens semánticos, componentes accesibles, signal forms y vistas previas. Instalación y referencia de API.',
  },
  getStarted: {
    title: 'Empezar — Instalar Aurea en Angular 22',
    description:
      'Requisitos, instalación de @aurea-design-system/components, tokens globales y tu primer ejemplo con `button auButton`.',
  },
  guidesAdoption: {
    title: 'Guía de adopción — Aurea Design System',
    description: 'Guías de instalación, signal forms y temas.',
  },
  guidesSignalForms: {
    title: 'Signal forms con Aurea — Angular 22',
    description:
      'Enlaza au-form-field y controles con FormField, form(), validadores y envío seguro.',
  },
  guidesCrudDemo: {
    title: 'Demo CRUD de referencia — Aurea',
    description:
      'Pantalla de listado con tabla, paginación, filtros, menú por fila, diálogos y formulario con signals.',
  },
  maturity: {
    title: 'Matriz de madurez — Aurea',
    description: 'Niveles estable, beta y experimental de cada componente del catálogo.',
  },
  designTokens: {
    title: 'Tokens de diseño para Figma — Aurea',
    description:
      'Archivos JSON alineados con au-tokens.css para importar en herramientas de diseño.',
  },
  themes: {
    title: 'Temas y tokens de diseño — Aurea',
    description:
      'Variables CSS semánticas, temas claro/oscuro con auTheme y referencia de tokens para superficies, texto, bordes y formularios.',
  },
  componentsIndex: {
    title: 'Componentes UI Angular — Catálogo Aurea',
    description: 'Catálogo de componentes Aurea con tablas API, tokens de estilo y demos en vivo.',
  },
  componentTitle: (name, exportName) => `${name} (${exportName}) — Docs Aurea`,
  componentDescription: (name, summary) =>
    `${name} para Angular 22: ${summary} Referencia API, tokens de estilo y ejemplos interactivos.`,
  notFound: {
    title: 'Página no encontrada — Aurea Design System',
    description: 'El componente o la página solicitada no existe en la documentación de Aurea.',
  },
};
