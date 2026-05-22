import type { DocsMessages } from '../../types/messages';
import { ECOSYSTEM_ES } from './ecosystem';
import { GUIDES_ES } from './guides';

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
    title: 'Menos ruido visual.',
    titleAccent: 'Más foco en la tarea.',
    lead: 'Librería npm abierta (MIT) para cualquier producto: tokens semánticos, componentes accesibles y formularios con signals. Explora la visión de diseño aquí; la documentación técnica cuando vayas a implementar.',
    ctaDocs: 'Documentación',
    ctaStorybook: 'Storybook',
    overviewTitle: 'Visión de diseño',
    overviewAria: 'Principios de diseño',
    principles: [
      {
        title: 'Tarea clara, UI tranquila',
        text: 'Jerarquía y contraste al servicio del trabajo — el adorno no compite con el contenido.',
        accent: 'task',
      },
      {
        title: 'Tokens semánticos',
        text: 'Superficies, acciones y estados de formulario comparten el vocabulario <code>--au-*</code> en claro y oscuro.',
        accent: 'tokens',
      },
      {
        title: 'Accesible por defecto',
        text: 'Anillos de foco, etiquetas y regiones dinámicas forman parte del contrato de cada componente.',
        accent: 'a11y',
      },
    ],
    systemTitle: 'Cómo está construido el sistema',
    systemLead:
      'Tres capas: primitivos (internos), tokens semánticos en <code>au-tokens.css</code> y estilos de componente que mapean semántica a UI real.',
    systemPoints: [
      'Patrones orientados a WCAG 2.2 en flujos principales',
      'Formularios con signals alineados con <code>formField</code> de Angular 21',
      'Publicado como <code>@aurea-design-system/components</code> en npm',
    ],
    themesLink: 'Explorar temas y tokens',
    previewsTitle: 'Vista previa de componentes',
    previewsLead:
      'Solo componentes estables en producción, cuatro por página — usa las flechas para recorrer el set.',
    previewsAria: 'Galería de vistas previas',
    previewOpenDoc: 'Ver docs',
    carouselAria: 'Carrusel de componentes',
    carouselPrev: 'Página anterior',
    carouselNext: 'Página siguiente',
    carouselPageStatus: (current, total) => `Página ${current} de ${total}`,
    carouselSlideAria: (page) => `Componentes, página ${page}`,
    carouselDotsAria: 'Ir a una página del carrusel',
    carouselGoToPage: (page) => `Ir a la página ${page}`,
    footer:
      'MIT · Aurea en cualquier producto Angular. La referencia técnica también está en Storybook.',
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
      ngAdd: {
        title: 'Schematic (recomendado)',
        intro: 'Añade los estilos globales a angular.json automáticamente:',
        expand: 'Ver comando ng add',
      },
      nextGuides: {
        title: 'Siguiente paso',
        intro:
          'Sigue la guía de adopción: signal forms, patrones, troubleshooting y bundle — o abre la',
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
