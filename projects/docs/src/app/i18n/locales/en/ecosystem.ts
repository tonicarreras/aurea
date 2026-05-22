import type { EcosystemMessages } from '../../types/ecosystem';

export const ECOSYSTEM_EN: EcosystemMessages = {
  roadmap: {
    title: 'Roadmap',
    lead: 'Public plan for Aurea. Phases 0–4 are delivered; 1.0.0 follows the V1 criteria checklist.',
    phasesHeading: 'Phases',
    versionsHeading: 'Version targets',
    table: { phase: 'Phase', focus: 'Focus', status: 'Status' },
    phases: [
      {
        name: 'Phase 0',
        focus: 'Governance, maturity, adoption guides, a11y audit',
        status: 'Done',
      },
      { name: 'Phase 1', focus: 'Tokens v2, density, ng add, patterns', status: 'Done' },
      {
        name: 'Phase 2',
        focus: 'Menu, popover, pagination, table, badge, breadcrumb, progress, link',
        status: 'Done',
      },
      { name: 'Phase 3', focus: 'axe stable, visual CI, audit, issue templates', status: 'Done' },
      {
        name: 'Phase 4',
        focus: 'Figma tokens, migrations, CRUD demo, v1 criteria',
        status: 'Done',
      },
    ],
    versionTargets: [
      { version: '0.4.x', focus: 'Application core components' },
      { version: '0.5.x', focus: 'Accordion, empty state, form layout' },
      { version: '0.9.x', focus: 'API freeze candidate' },
      { version: '1.0.0', focus: 'Stable core + reference app (see docs/V1_CRITERIA.md)' },
    ],
    githubLink: 'Full roadmap on GitHub',
  },
  maturity: {
    title: 'Component maturity',
    lead: 'Live matrix synced with the library catalog. Stable components are safe for production; beta may still gain optional APIs.',
    legend:
      'Stable = production-ready · Beta = usable with documented edge cases · Experimental = may change without full deprecation cycle.',
    columns: { component: 'Component', level: 'Level', since: 'Since' },
    rows: [],
  },
  migrateMaterial: {
    title: 'Migrate from Angular Material',
    lead: 'Map Material patterns to Aurea primitives. Aurea does not ship Material-compatible APIs — plan a gradual replacement.',
    sections: [
      {
        heading: 'Install and theme',
        body: 'Remove Material theme CSS gradually. Add Aurea tokens globally and set <code>data-au-theme</code> on your shell.',
        code: `bun add @aurea-design-system/components
ng add @aurea-design-system/components`,
        codeLanguage: 'bash',
        expandLabel: 'Show install',
      },
      {
        heading: 'Form fields',
        body: 'Replace <code>mat-form-field</code> + <code>matInput</code> with <code>au-form-field</code> and Aurea controls. Use signal <code>form()</code> + <code>[formField]</code> instead of reactive FormControl where possible.',
        code: `<au-form-field label="Email" [required]="true">
  <au-input-text type="email" [formField]="form.email" />
</au-form-field>`,
        codeLanguage: 'html',
        expandLabel: 'Show field',
      },
      {
        heading: 'Buttons and dialogs',
        body: '<code>mat-button</code> → <code>au-button</code>. <code>MatDialog</code> → <code>au-dialog</code> with projected header/footer directives.',
      },
      {
        heading: 'Tables and paginator',
        body: '<code>mat-table</code> + <code>mat-paginator</code> → semantic table inside <code>au-table</code> + <code>au-pagination</code>. Wire sort headers with <code>auTableSortHeader</code>.',
      },
    ],
  },
  migrateCdk: {
    title: 'Migrate from Angular CDK',
    lead: 'Aurea overlays (menu, popover, tooltip, dialog) replace many CDK overlay use cases without importing CDK.',
    sections: [
      {
        heading: 'Overlay module',
        body: 'If you only used CDK for positioned panels, prefer <code>au-menu</code>, <code>au-popover</code>, or <code>au-tooltip</code>. They portal to <code>document.body</code> with collision handling.',
      },
      {
        heading: 'Focus trap',
        body: '<code>au-dialog</code> uses native <code>&lt;dialog&gt;</code> with built-in focus management. Drop custom FocusTrap where the dialog wraps your flow.',
      },
      {
        heading: 'Keep CDK when needed',
        body: 'Virtual scroll, drag-drop, or stepper logic can stay on CDK alongside Aurea visuals. Style CDK surfaces with Aurea tokens for consistency.',
      },
    ],
  },
  designTokens: {
    title: 'Design tokens (Figma / Penpot)',
    lead: 'Import semantic tokens into design tools. Production apps still consume au-tokens.css from npm.',
    downloadLight: 'Light JSON',
    downloadDark: 'Dark JSON',
    sections: [
      {
        heading: 'Files',
        body: 'Repository path: <code>projects/design-tokens/</code>. Run <code>node scripts/validate-design-tokens.mjs</code> after CSS changes.',
      },
      {
        heading: 'Figma',
        body: 'Import JSON via Tokens Studio (or similar). Map <code>color.surface.raised</code> to frame fills and bind text styles to <code>color.text.primary</code>.',
      },
      {
        heading: 'Hand-off to code',
        body: 'Developers use CSS variables: <code>--au-color-surface-raised</code>, not raw hex from Figma, unless adding a new documented token.',
      },
    ],
  },
  crudDemo: {
    title: 'CRUD reference demo',
    lead: 'Live example: list with table, pagination, filters, row menu, confirm dialog, and signal-form editor — built only with Aurea components.',
    filterLabel: 'Search',
    filterPlaceholder: 'Filter by name…',
    colName: 'Name',
    colRole: 'Role',
    colActions: 'Actions',
    newPerson: 'Add person',
    edit: 'Edit',
    delete: 'Delete',
    editTitle: 'Edit person',
    deleteTitle: 'Delete person?',
    deleteBody: 'This removes the row from the in-memory list. Confirm to continue.',
    cancel: 'Cancel',
    save: 'Save',
    snackbarSaved: 'Person saved',
    snackbarDeleted: 'Person deleted',
  },
};
