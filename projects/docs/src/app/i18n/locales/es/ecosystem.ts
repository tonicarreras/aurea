import type { EcosystemMessages } from '../../types/ecosystem';

export const ECOSYSTEM_ES: EcosystemMessages = {
  roadmap: {
    title: 'Roadmap',
    lead: 'Plan público de Aurea. Las fases 0–4 están entregadas; 1.0.0 depende del checklist V1.',
    phasesHeading: 'Fases',
    versionsHeading: 'Objetivos de versión',
    table: { phase: 'Fase', focus: 'Enfoque', status: 'Estado' },
    phases: [
      { name: 'Fase 0', focus: 'Gobernanza, madurez, guías, auditoría a11y', status: 'Hecho' },
      { name: 'Fase 1', focus: 'Tokens v2, densidad, ng add, patrones', status: 'Hecho' },
      {
        name: 'Fase 2',
        focus: 'Menú, popover, paginación, tabla, badge, breadcrumb, progress, link',
        status: 'Hecho',
      },
      { name: 'Fase 3', focus: 'axe stable, visual CI, audit, plantillas issue', status: 'Hecho' },
      {
        name: 'Fase 4',
        focus: 'Tokens Figma, migraciones, demo CRUD, criterios v1',
        status: 'Hecho',
      },
    ],
    versionTargets: [
      { version: '0.4.x', focus: 'Componentes core de aplicación' },
      { version: '0.5.x', focus: 'Accordion, empty state, layout formulario' },
      { version: '0.9.x', focus: 'Candidato a congelar API' },
      { version: '1.0.0', focus: 'Core estable + app referencia (ver docs/V1_CRITERIA.md)' },
    ],
    githubLink: 'Roadmap completo en GitHub',
  },
  maturity: {
    title: 'Madurez de componentes',
    lead: 'Matriz viva alineada con el catálogo. Estable = producción; beta puede ganar APIs opcionales.',
    legend:
      'Estable = listo para producción · Beta = usable con casos límite documentados · Experimental = puede cambiar sin deprecación completa.',
    columns: { component: 'Componente', level: 'Nivel', since: 'Desde' },
    rows: [],
  },
  migrateMaterial: {
    title: 'Migrar desde Angular Material',
    lead: 'Mapea patrones Material a primitivas Aurea. No hay API compatible — sustituye de forma gradual.',
    sections: [
      {
        heading: 'Instalación y tema',
        body: 'Retira el tema Material poco a poco. Añade tokens Aurea y <code>data-au-theme</code> en el shell.',
        code: `bun add @aurea-design-system/components
ng add @aurea-design-system/components`,
        codeLanguage: 'bash',
        expandLabel: 'Ver instalación',
      },
      {
        heading: 'Campos',
        body: 'Sustituye <code>mat-form-field</code> + <code>matInput</code> por <code>au-form-field</code> y controles Aurea con <code>form()</code> + <code>[formField]</code>.',
        code: `<au-form-field label="Email" [required]="true">
  <au-input-text type="email" [formField]="form.email" />
</au-form-field>`,
        codeLanguage: 'html',
        expandLabel: 'Ver campo',
      },
      {
        heading: 'Botones y diálogos',
        body: '<code>mat-button</code> → <code>au-button</code>. <code>MatDialog</code> → <code>au-dialog</code>.',
      },
      {
        heading: 'Tablas y paginador',
        body: '<code>mat-table</code> + <code>matColumnDef</code> → <code>au-table</code> + <code>au-table-column</code> + <code>au-pagination</code>.',
      },
    ],
  },
  migrateCdk: {
    title: 'Migrar desde Angular CDK',
    lead: 'Los overlays Aurea (menú, popover, tooltip, diálogo) cubren muchos casos del CDK overlay.',
    sections: [
      {
        heading: 'Overlay',
        body: 'Para paneles posicionados usa <code>au-menu</code>, <code>au-popover</code> o <code>au-tooltip</code> con portal en <code>body</code>.',
      },
      {
        heading: 'Focus trap',
        body: '<code>au-dialog</code> usa <code>&lt;dialog&gt;</code> nativo. Elimina FocusTrap manual donde aplique.',
      },
      {
        heading: 'Cuándo mantener CDK',
        body: 'Virtual scroll, drag-drop o stepper pueden quedarse en CDK; estiliza con tokens Aurea.',
      },
    ],
  },
  designTokens: {
    title: 'Tokens de diseño (Figma / Penpot)',
    lead: 'Importa tokens semánticos en diseño. En código sigue mandando au-tokens.css del paquete npm.',
    downloadLight: 'JSON claro',
    downloadDark: 'JSON oscuro',
    sections: [
      {
        heading: 'Archivos',
        body: 'Ruta: <code>projects/design-tokens/</code>. Tras cambiar CSS ejecuta <code>node scripts/validate-design-tokens.mjs</code>.',
      },
      {
        heading: 'Figma',
        body: 'Importa JSON con Tokens Studio. Enlaza <code>color.surface.raised</code> a fondos y textos a <code>color.text.primary</code>.',
      },
      {
        heading: 'Hand-off',
        body: 'En desarrollo usa <code>--au-color-surface-raised</code>, no hex sueltos salvo nuevo token documentado.',
      },
    ],
  },
  crudDemo: {
    title: 'Demo de referencia CRUD',
    lead: 'Ejemplo en vivo: listado con tabla, paginación, filtros, menú por fila, diálogo de confirmación y formulario con signal forms.',
    filterLabel: 'Buscar',
    filterPlaceholder: 'Filtrar por nombre…',
    colName: 'Nombre',
    colRole: 'Rol',
    colActions: 'Acciones',
    newPerson: 'Añadir persona',
    edit: 'Editar',
    delete: 'Eliminar',
    editTitle: 'Editar persona',
    deleteTitle: '¿Eliminar persona?',
    deleteBody: 'Se quita la fila de la lista en memoria. Confirma para continuar.',
    cancel: 'Cancelar',
    save: 'Guardar',
    snackbarSaved: 'Persona guardada',
    snackbarDeleted: 'Persona eliminada',
  },
};
