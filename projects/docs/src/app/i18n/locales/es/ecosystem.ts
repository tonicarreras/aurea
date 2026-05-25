import type { EcosystemMessages } from '../../types/ecosystem';

export const ECOSYSTEM_ES: EcosystemMessages = {
  maturity: {
    title: 'Madurez de componentes',
    lead: 'Matriz alineada con el catálogo. Los niveles coinciden con las badges de cada página.',
    legend:
      'Estable = listo para producción · Beta = usable con casos límite documentados · Experimental = puede cambiar sin deprecación completa.',
    columns: { component: 'Componente', level: 'Nivel', since: 'Desde' },
    rows: [],
  },
  designTokens: {
    title: 'Tokens de diseño (Figma / Penpot)',
    lead: 'JSON para Figma o Penpot. En la app se cargan los tokens desde au-tokens.css del paquete npm.',
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
