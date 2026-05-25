import type { DocsMessages } from '../../types/messages';
import { ECOSYSTEM_ES } from './ecosystem';
import { FIXTURES_ES } from './fixtures';
import { GET_STARTED_COMPONENT_SNIPPET } from './get-started-snippets';
import { GUIDES_ES } from './guides';
import { EXAMPLE_LIVE_ES } from './example-live';
import { NAV_ES } from './nav';
import { PREVIEWS_ES } from './previews';

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
  landing: {
    eyebrow: 'Aurea · Sistema de diseño · Angular 21',
    title: 'Sistema de diseño',
    titleAccent: 'para Angular 21',
    lead: 'Librería npm open source (MIT): tokens CSS semánticos, componentes standalone y signal forms de Angular. Guía de instalación, referencia de componentes y Storybook.',
    ctaDocs: 'Documentación',
    ctaStorybook: 'Storybook',
    overviewTitle: 'Principios',
    overviewAria: 'Principios de diseño',
    principles: [
      {
        title: 'Jerarquía visual',
        text: 'Tipografía, espaciado y contraste usan tokens <code>--au-*</code> documentados, no estilos sueltos.',
        accent: 'hierarchy',
      },
      {
        title: 'Tokens semánticos',
        text: 'Superficies, acciones y estados de formulario comparten los mismos nombres de token en tema claro y oscuro.',
        accent: 'tokens',
      },
      {
        title: 'Accesible por defecto',
        text: 'Foco visible, etiquetas y roles ARIA documentados en cada componente.',
        accent: 'a11y',
      },
    ],
    systemTitle: 'Arquitectura',
    systemLead:
      'Primitivos (internos), tokens semánticos en <code>au-tokens.css</code> y CSS de componente que mapea tokens a la UI.',
    systemPoints: [
      'Notas de accesibilidad y teclado en la documentación de cada componente',
      'Signal forms con <code>formField</code> de Angular 21',
      'Publicado como <code>@aurea-design-system/components</code> en npm',
    ],
    themesLink: 'Temas y tokens',
    previewsTitle: 'Vista previa de componentes',
    previewsLead: 'Solo componentes estables — cuatro por página del carrusel.',
    previewsAria: 'Galería de vistas previas',
    previewOpenDoc: 'Ver docs',
    carouselAria: 'Carrusel de componentes',
    carouselPrev: 'Página anterior',
    carouselNext: 'Página siguiente',
    carouselPageStatus: (current, total) => `Página ${current} de ${total}`,
    carouselSlideAria: (page) => `Componentes, página ${page}`,
    carouselDotsAria: 'Ir a una página del carrusel',
    carouselGoToPage: (page) => `Ir a la página ${page}`,
    footer: 'Licencia MIT. Referencia de componentes también en Storybook.',
  },
  getStarted: {
    title: 'Empezar',
    lead: 'Instala el paquete publicado y conecta tokens y componentes en tu aplicación Angular 21.',
    componentSnippet: GET_STARTED_COMPONENT_SNIPPET,
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
      ngAdd: {
        title: 'Schematic (recomendado)',
        intro: 'Añade los estilos globales a angular.json automáticamente:',
        expand: 'Ver comando ng add',
      },
      nextGuides: {
        title: 'Siguiente paso',
        intro:
          'Consulta la guía de adopción: signal forms y resolución de problemas — o abre la',
        adoptionLink: 'Guía de adopción →',
        crudDemoLink: 'Demo CRUD de referencia →',
      },
    },
  },
  guides: GUIDES_ES,
  ecosystem: ECOSYSTEM_ES,
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
    previewHighContrast: 'Alto contraste',
    densityHeading: 'Densidad (v2)',
    densityBody:
      'Define <code>data-au-density</code> en el shell: <code>compact</code>, <code>comfortable</code> (por defecto) o <code>spacious</code>. Usa la directiva <code>auDensity</code> para enlazarlo de forma reactiva.',
    densityExpand: 'Ver HTML de densidad',
    highContrastHeading: 'Alto contraste (experimental)',
    highContrastBody:
      'Paleta fija con bordes y foco más marcados: <code>data-au-theme="high-contrast"</code> o <code>[auTheme]="\'high-contrast\'"</code>. Valídalo con tu checklist de QA.',
    highContrastExpand: 'Ver HTML alto contraste',
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
    lead: 'Catálogo de primitivos. Cada página incluye vista previa, badge de madurez y ejemplo de importación.',
    maturityLegend:
      'Madurez: stable = listo para producción; beta = usable con casos límite documentados; experimental = puede cambiar.',
    maturityStable: 'Estable',
    maturityBeta: 'Beta',
    maturityExperimental: 'Experimental',
  },
  componentDoc: {
    sectionsAria: (title) => `Secciones de ${title}`,
    overview: 'Resumen',
    api: 'API',
    styling: 'Estilos',
    examples: 'Ejemplos',
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
    exampleFallbackTitle: 'Uso básico',
    notFoundTitle: 'No encontrado',
    notFoundLead: 'No hay documentación para este componente.',
    backToIndex: 'Volver al índice',
    apiTable: {
      colName: 'Nombre',
      colType: 'Tipo',
      colDescription: 'Descripción',
      colDefault: 'Por defecto',
      colKind: 'Rol',
    },
  },
  demoPanel: {
    ariaLabel: 'Vista previa en vivo',
    title: 'Vista previa',
    badge: 'En vivo',
  },
  fixtures: FIXTURES_ES,
  previews: PREVIEWS_ES,
  exampleLive: EXAMPLE_LIVE_ES,
  nav: NAV_ES,
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
    copyAria: 'Copiar código',
    copiedAria: 'Código copiado',
    snippetAria: (language) => `Código ${language}`,
    lang: {
      typescript: 'TypeScript',
      css: 'CSS',
      bash: 'Shell',
      html: 'HTML',
      text: 'Texto',
    },
  },
};
