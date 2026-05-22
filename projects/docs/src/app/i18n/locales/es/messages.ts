import type { DocsMessages } from '../../types/messages';

export const MESSAGES_ES: DocsMessages = {
  shell: {
    skipToContent: 'Saltar al contenido',
    theme: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    themeToggleAria: (mode) => {
      const labels = { light: 'claro', dark: 'oscuro', system: 'sistema' };
      return `Tema: ${labels[mode]}. Pulsa para cambiar.`;
    },
    lang: 'Idioma',
    langEn: 'English',
    langEs: 'Español',
    menuLabel: 'Menú',
    menuCloseAria: 'Cerrar menú',
    settingsMenuAria: 'Ajustes del sitio',
    githubLabel: 'GitHub',
    npmLabel: 'npm',
    storybookLabel: 'Storybook',
    navAria: 'Documentación',
    githubAria: 'Repositorio en GitHub',
    npmAria: 'Paquete en npm',
    storybookAria: 'Abrir Storybook',
  },
  home: {
    eyebrow: 'Angular 21 · Accesible · Signals',
    title: 'Aurea Design System',
    lead: 'Componentes listos para producción, tokens semánticos y formularios con signals — documentados, probados y publicados en npm.',
    statsAria: 'Resumen del sistema',
    statsComponents: 'Componentes',
    statsA11y: 'Accesibilidad',
    statsForms: 'Formularios',
    exploreAria: 'Explorar documentación',
    cardGetStartedTitle: 'Empezar',
    cardGetStartedText: 'Instala el paquete y conecta tokens en tu app Angular.',
    cardThemesTitle: 'Temas',
    cardThemesText: 'Modo claro, oscuro y variables --au-* semánticas.',
    cardComponentsTitle: 'Componentes',
    cardComponentsText: 'Vistas previas en vivo y fragmentos de código.',
    footer:
      'Paquete npm <code>@aurea-design-system/components</code> — guías, temas y demos interactivas en esta app; catálogo completo en Storybook.',
    ctaComponents: 'Ver componentes',
    ctaInstall: 'Guía de instalación',
  },
  getStarted: {
    title: 'Empezar',
    lead: 'Instala el paquete publicado y conecta tokens y componentes en tu aplicación Angular 21.',
    steps: {
      requirements: {
        title: 'Requisitos',
        intro: 'Versiones mínimas en el toolchain del proyecto:',
      },
      install: { title: 'Instalación', expand: 'Ver instalación' },
      tokens: {
        title: 'Tokens globales',
        intro: 'Importa los estilos semánticos en angular.json o en tu hoja global:',
        expand: 'Ver imports CSS',
      },
      firstComponent: { title: 'Primer componente', expand: 'Ver ejemplo Angular' },
    },
  },
  themes: {
    title: 'Temas y tokens',
    lead: 'Variables globales --au-* definidas en au-tokens.css. Cada componente documenta solo los tokens que consume en su pestaña Styling.',
    attrHeading: 'Atributo de tema',
    attrBody:
      'Coloca <code>data-au-theme</code> en un ancestro (por ejemplo <code>&lt;html&gt;</code> o el shell de la app). Valores: <code>light</code>, <code>dark</code>.',
    attrExpand: 'Ver HTML',
    directiveHeading: 'Directiva AuTheme',
    directiveBody:
      'Alternativa reactiva con <code>system</code> para seguir <code>prefers-color-scheme</code>:',
    directiveExpand: 'Ver TypeScript',
    previewHeading: 'Vista previa',
    previewCardTitle: 'Superficie de ejemplo',
    previewCardBody: 'Los colores siguen el tema del contenedor.',
    previewLight: 'Claro',
    previewDark: 'Oscuro',
    globalHeading: 'Tokens globales',
    globalBody:
      'Sobrescribe en <code>:root</code> o <code>[data-au-theme]</code>. Los tokens de un componente concreto (p. ej. <code>--au-card-padding</code>) se listan en la página de ese componente —',
    globalLink: 'índice de componentes',
    ruleHeading: 'Regla de uso',
    ruleBody:
      'En producto, usa solo variables <code>--au-*</code> documentadas. Reserva nombres primitivos para capas internas del tema. Fuente de verdad:',
  },
  componentsIndex: {
    title: 'Componentes',
    lead: 'Catálogo de primitivos del design system. Cada página incluye vista previa y ejemplo de importación.',
  },
  componentDoc: {
    sectionsAria: (title) => `Secciones de ${title}`,
    overview: 'Overview',
    api: 'API',
    styling: 'Styling',
    examples: 'Examples',
    export: 'Export',
    selector: 'Selector',
    apiLead: (exportName) =>
      `API de <code>${exportName}</code>. Los inputs usan signals de Angular`,
    signalApiHint: ' (`input()`, `model()`, `output()`).',
    importExpand: 'Import',
    importCollapse: 'Ocultar import',
    apiEmpty:
      'Consulta la pestaña <strong>Autodocs</strong> en Storybook para la referencia completa de este componente.',
    stylingLead: (title) =>
      `Tokens que <strong>${title}</strong> consume en su CSS (específicos de este componente). La paleta global, formularios compartidos y capas del tema están en`,
    themesLink: 'Temas y tokens',
    examplesLead: 'Variantes con vista previa en vivo y fragmento de código listo para copiar.',
    notFoundTitle: 'No encontrado',
    notFoundLead: 'No hay documentación para este componente.',
    backToIndex: 'Volver al índice',
  },
  overviewUi: {
    introSr: 'Introducción',
    relatedExports: 'Exportaciones relacionadas',
    anatomy: 'Anatomía',
    accessibility: 'Accesibilidad',
    keyboard: 'Teclado',
  },
  codeBlock: {
    show: 'Ver código',
    hide: 'Ocultar código',
    copy: 'Copiar',
    copied: 'Copiado',
  },
};
