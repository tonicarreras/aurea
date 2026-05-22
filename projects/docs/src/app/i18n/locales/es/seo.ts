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
    title: 'Aurea Design System — Componentes Angular 21 y tokens',
    description:
      'Kit UI para Angular 21 con patrones WCAG 2.2, tokens semánticos, signal forms, Storybook y guía de instalación npm.',
  },
  getStarted: {
    title: 'Empezar — Instalar Aurea en Angular 21',
    description:
      'Requisitos, instalación de @aurea-design-system/components, tokens globales y tu primer ejemplo con au-button.',
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
