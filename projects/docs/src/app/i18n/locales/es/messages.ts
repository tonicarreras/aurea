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
    eyebrow: 'Aurea · Sistema de diseño · Angular 22',
    title: 'Sistema de diseño',
    titleAccent: 'para Angular 22',
    lead: 'Librería npm open source (MIT): tokens CSS semánticos, componentes standalone y signal forms de Angular. Guía de instalación, referencia de componentes y Storybook.',
    ctaDocs: 'Documentación',
    ctaStorybook: 'Storybook',
    ctaCrudDemo: 'Demo CRUD',
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
      'Cinco capas en <code>au-tokens.css</code>: primitivos (internos) → semánticos → roles → dominio → alto contraste; el CSS de componente mapea roles a la UI. Directivas de layout y <code>provideAurea()</code> están en Composición.',
    systemPoints: [
      'Notas de accesibilidad y teclado en la documentación de cada componente',
      'Signal forms con <code>formField</code> de Angular 22',
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
    lead: 'Instala el paquete publicado y conecta tokens y componentes en tu aplicación Angular 22.',
    componentSnippet: GET_STARTED_COMPONENT_SNIPPET,
    steps: {
      requirements: {
        title: 'Requisitos',
        intro: 'Versiones mínimas en el toolchain del proyecto:',
      },
      install: { title: 'Instalación', expand: 'Ver instalación' },
      tokens: {
        title: 'Estilos globales',
        intro:
          'Importa <code>au-tokens.css</code> (variables) y <code>aurea-global.css</code> (cromado de campos, directivas de layout <code>[auStack]</code> / <code>[auCluster]</code> / …, listbox, description list, shells proyectados del acordeón) en angular.json o tu hoja global. Cada componente aporta su <code>styleUrl</code> al importarlo — no dupliques CSS de componente en tu app.',
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
        crudCardEyebrow: 'Escaparate',
        crudCardTitle: 'Demo CRUD de referencia',
        crudCardLead:
          'La forma más rápida de ver Aurea en acción: listado, edición, confirmaciones y patrones de producto en una sola pantalla.',
        crudCardCta: 'Abrir demo CRUD',
        adoptionCardTitle: 'Guía de adopción',
        adoptionCardLead:
          'Índice de guías: convenciones de API, floating UI, composición, recetas, signal forms y temas.',
        adoptionCardCta: 'Leer la guía',
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
      'Coloca <code>data-au-theme</code> en un ancestro (por ejemplo <code>&lt;html&gt;</code> o el shell de la app). Valores: <code>light</code>, <code>dark</code>, <code>high-contrast</code>, <code>high-contrast-dark</code>.',
    attrExpand: 'Ver HTML',
    globalStylesHeading: 'aurea-global.css',
    globalStylesBody:
      'Cárgalo <strong>después</strong> de <code>au-tokens.css</code>. CSS transversal: utilidades, directivas de layout (<code>auStack</code>, <code>auCluster</code>, <code>auSplit</code>, <code>auSection</code>), chrome de paneles flotantes, primitivos de campo nativos, cromado/errores de campos, listbox en portal (acople flush con <code>--au-field-listbox-gap</code>), description list y acordeón proyectado. Los tokens de dominio en <code>[data-au-theme]</code> hacen que overlays portaled hereden el tema del ancla. Hosts en portal como <code>au-snackbar</code> siguen enviando CSS en el bundle del componente. Criterio: <code>projects/components/src/lib/styles/README.md</code>.',
    globalStylesExpand: 'Ver imports CSS globales',
    directiveHeading: 'Directiva AuTheme',
    directiveBody:
      'Alternativa reactiva con <code>system</code> para seguir <code>prefers-color-scheme</code>:',
    directiveExpand: 'Ver TypeScript',
    previewHeading: 'Vista previa',
    previewCardTitle: 'Superficie de ejemplo',
    previewCardBody: 'Los colores siguen el tema del contenedor.',
    previewLight: 'Claro',
    previewDark: 'Oscuro',
    previewThemeLabel: 'Apariencia',
    previewHighContrast: 'Alto contraste (a11y)',
    previewHighContrastHint:
      'Combina con la apariencia: claro → high-contrast, oscuro → high-contrast-dark.',
    previewDensityLabel: 'Densidad',
    previewDensityCompact: 'Compacto',
    previewDensityComfortable: 'Cómodo',
    previewDensitySpacious: 'Espacioso',
    densityHeading: 'Densidad (v2)',
    densityBody:
      'Define <code>data-au-density</code> en el shell: <code>compact</code>, <code>comfortable</code> (por defecto) o <code>spacious</code>. Usa la directiva <code>auDensity</code> para enlazarlo de forma reactiva.',
    densityExpand: 'Ver HTML de densidad',
    highContrastHeading: 'Alto contraste',
    highContrastBody:
      'Independiente de la apariencia: bordes, anillos de foco y colores semánticos reforzados para accesibilidad. Cuando el usuario lo active, mapea la apariencia a <code>high-contrast</code> (claro) o <code>high-contrast-dark</code> (oscuro) con <code>data-au-theme</code> o <code>[auTheme]</code>. Las paletas forman parte del conjunto estable de tokens en <code>au-tokens.css</code>.',
    highContrastExpand: 'Ver HTML alto contraste',
    brandHeading: 'Personalizar marca',
    brandBody:
      'Crea una hoja de estilos pequeña cargada <strong>después</strong> de <code>au-tokens.css</code>. Sobrescribe tokens semánticos en <code>:root</code> y por tema — sin fork de la librería. Alternativa: <code>provideAurea({ theme })</code> en bootstrap (ver snippet).',
    brandExpand: 'Ver CSS de marca',
    provideAureaHeading: 'provideAurea() (runtime)',
    provideAureaBody:
      'Escribe variables semánticas en <code>:root</code> en el navegador. Complementa <code>[auTheme]</code> para claro/oscuro/HC.',
    provideAureaExpand: 'Ver provideAurea()',
    brandExampleHeading: 'Ejemplo de marca personalizada',
    brandExampleBody:
      'Por defecto se muestra la <strong>marca personalizada</strong> (naranja coral). Usa el conmutador para comparar con Aurea por defecto — el mismo patrón que un <code>theme-brand.css</code> global cargado después de <code>au-tokens.css</code>. Cambia claro/oscuro en la vista previa de arriba para ver ambas paletas.',
    brandExampleToggleLabel: 'Preset de marca',
    brandExampleDefault: 'Aurea por defecto',
    brandExampleCustom: 'Marca personalizada',
    brandExamplePrimary: 'Acción principal',
    brandExampleOutline: 'Secundario',
    brandExampleLink: 'Saber más',
    brandExampleFieldLabel: 'Correo',
    brandExampleFieldPlaceholder: 'tu@empresa.com',
    brandExampleCssExpand: 'Ver CSS de este ejemplo',
    overrideLevelsHeading: 'Tres niveles de override',
    overrideLevelsBody:
      'Elige el nivel más acotado que resuelva tu caso. Prefiere tokens antes que clases internas.',
    overrideGlobalTitle: '1. Global (recomendado para marca)',
    overrideGlobalBody:
      'Define <code>--au-color-*</code>, <code>--au-elevation-*</code>, <code>--au-focus-*</code> y <code>--au-font-sans</code> en <code>:root</code> o <code>[data-au-theme]</code>. Reserva las primitivas <code>--au-shadow-*</code> para theming interno — en apps usa tokens de rol.',
    overrideHostTitle: '2. Por componente (host)',
    overrideHostBody:
      'Define <code>--au-card-padding</code>, <code>--au-table-row-hover</code>, <code>--au-textarea-min-h-md</code>, etc. en el host (<code>au-card</code>, <code>textarea.au-textarea</code>, …). Funciona en componentes con <code>ViewEncapsulation.None</code> y primitivos nativos estilizados vía CSS global.',
    overrideAvoidTitle: '3. Evitar en apps de producto',
    overrideAvoidBody:
      'No dependas de clases BEM internas (<code>.au-button__content</code>, <code>.au-switch__track</code>, …) ni <code>::ng-deep</code>. No forman parte de la API pública y pueden cambiar en minor releases.',
    hostOverrideHeading: 'Overrides en host (referencia)',
    hostOverrideBody:
      'Variables habituales por host. La pestaña <strong>Styling</strong> de cada componente lista todos los tokens que consume.',
    hostOverrideColHost: 'Host',
    hostOverrideColToken: 'Token',
    hostOverrideColDescription: 'Descripción',
    globalHeading: 'Catálogo global de tokens',
    globalBody:
      'Referencia completa abajo. Los tokens por componente (p. ej. <code>--au-card-padding</code>) están en la página de ese componente —',
    globalLink: 'índice de componentes',
    ruleHeading: 'Regla de uso',
    ruleBody:
      'En producto, usa solo variables <code>--au-*</code> documentadas. Reserva nombres primitivos para capas internas del tema. Fuente de verdad:',
  },
  componentsIndex: {
    title: 'Componentes',
    lead: 'Catálogo de primitivos. Cada página incluye vista previa, badge de madurez y ejemplo de importación.',
    crudSpotlightEyebrow: 'Escaparate',
    crudSpotlightTitle: '¿Cómo se ven juntos?',
    crudSpotlightLead:
      'Abre la demo CRUD: tabla, formularios, overlays y feedback en un flujo de producto completo antes de ir componente a componente.',
    crudSpotlightCta: 'Ver demo CRUD',
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
