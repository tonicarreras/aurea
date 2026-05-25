import type { EcosystemMessages } from '../../types/ecosystem';

export const ECOSYSTEM_EN: EcosystemMessages = {
  maturity: {
    title: 'Component maturity',
    lead: 'Matrix synced with the component catalog. Levels match the badges on each docs page.',
    legend:
      'Stable = production-ready · Beta = usable with documented edge cases · Experimental = may change without full deprecation cycle.',
    columns: { component: 'Component', level: 'Level', since: 'Since' },
    rows: [],
  },
  designTokens: {
    title: 'Design tokens (Figma / Penpot)',
    lead: 'JSON for Figma or Penpot. Running apps load au-tokens.css from the npm package.',
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
