import type { ComponentDocOverview } from '../../../core/component-doc-overview';

export const OVERVIEWS_ES: Record<string, ComponentDocOverview> = {
  button: {
    intro: [
      'Botón de acción con variantes primary, secondary, outline y ghost. El contenido proyectado es la etiqueta visible; usa `label` si solo muestras un icono.',
      'El foco distingue teclado (anillo exterior) y ratón (anillo interior) mediante `tabFocusState`, alineado con el resto de controles Aurea.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Acciones principales o secundarias en formularios, diálogos y barras de herramientas.',
        'Estados de carga con `loading` sin cambiar el layout.',
        'Envío de formularios con `type="submit"`.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Navegación entre vistas → enlaces (`<a>`) o tabs.',
        'Conmutar un ajuste on/off → `au-switch`.',
      ],
    },
    anatomy: [
      { region: 'Host `au-button`', detail: 'Atributos `data-au-variant` y `data-au-size`.' },
      { region: 'Botón nativo', detail: 'Proyección de contenido; `aria-busy` cuando `loading`.' },
    ],
    accessibility: [
      'Anillo de foco visible al tabular (`--au-color-focus-ring`).',
      '`loading` activa `aria-busy` y bloquea el click.',
      'Tamaño `lg` respeta `--au-touch-target-min` (44px).',
    ],
    keyboard: [
      'Enter y Space activan el botón nativo.',
      'Tab enfoca el control; foco restaurado tras cerrar diálogos.',
    ],
  },
  'form-field': {
    intro: [
      'Cromado compartido de etiqueta, hint y error alrededor de un control proyectado (`au-input-text`, `au-select`, `au-radio-group`, etc.).',
      'Expone `AU_FORM_FIELD` por DI para que el hijo comparta `controlId`, `hintId` y `errorId` en ARIA.',
      'Checkbox y switch mantienen `label` inline en el control; usa `au-form-field` solo para hint y error.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Campos estándar con etiqueta/hint/error alineados al design system.',
        'Signal forms: `errors` / `invalid` del hijo alimentan la región de error del wrapper.',
        'Ids estables con `[controlIdInput]` opcional.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Checkbox solo con etiqueta inline y sin hint/error → `au-checkbox` sin wrapper.',
        'Layout que no es formulario → no envolver.',
      ],
    },
    anatomy: [
      { region: 'Etiqueta', detail: '`<label for>` enlazado al `controlId` del hijo.' },
      { region: 'Control proyectado', detail: 'Un solo control enfocable en el slot por defecto.' },
      {
        region: 'Hint / error',
        detail: 'Hint en `<p>`; error `role="alert"` con estilos compartidos.',
      },
    ],
    accessibility: [
      'El hijo recibe `aria-describedby` / `aria-errormessage` desde los ids del contexto.',
      'El asterisco de obligatorio es decorativo con texto para lectores de pantalla.',
    ],
    relatedExports: ['AU_FORM_FIELD', 'AuFormFieldContext'],
  },
  'input-text': {
    intro: [
      'Control de una línea proyectado dentro de `au-form-field` para etiqueta, hint y error.',
      'Implementa `FormValueControl<string | null>`: enlaza `[formField]` en signal forms o `[(value)]` en modo manual. Un campo vacío se representa como `null`, no como cadena vacía.',
      'Ejemplo completo con `form()`: README del paquete `@aurea-design-system/components` → *Signal forms* (no hay página aparte en Storybook).',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Texto, email, URL, teléfono, búsqueda o contraseña con la misma cromática que el resto de campos.',
        'Validación con signal forms o `errorMessage` / `invalid` manuales.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Texto multilínea → `au-textarea`.',
        'Elección en lista → `au-select` o `au-autocomplete`.',
      ],
    },
    anatomy: [
      { region: '`au-form-field`', detail: 'Etiqueta, hint y error fuera del control.' },
      { region: 'Shell', detail: 'Borde, fondo y anillos de foco/error en la fila del input.' },
      {
        region: 'Input nativo',
        detail: '`aria-invalid`, `aria-errormessage`, `aria-describedby` vía contexto.',
      },
      { region: 'Toggle contraseña', detail: 'Solo con `type="password"` y `showPasswordToggle`.' },
    ],
    accessibility: [
      'Nombre accesible vía etiqueta visible o `aria-label` externo.',
      'Errores enlazados con `aria-errormessage`; hints con `aria-describedby`.',
      'Toggle de contraseña con `aria-pressed` y etiquetas Mostrar/Ocultar.',
    ],
    keyboard: [
      'Tab entra al campo con anillo exterior (`--from-tab`); clic usa anillo interior.',
      'Space en el toggle de contraseña alterna visibilidad.',
    ],
  },
  textarea: {
    intro: [
      'Control multilínea proyectado dentro de `au-form-field`; mismos tamaños sm/md/lg que el resto de campos.',
      'Altura mínima controlada por `--au-textarea-min-h-*`; `resize` configurable.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Comentarios, descripciones largas, notas.',
        'Contenido que no cabe en una sola línea.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Una sola línea → `au-input-text`.', 'Editor rico → componente de terceros.'],
    },
    anatomy: [
      { region: 'Shell', detail: 'Igual que campos de una línea.' },
      { region: '`<textarea>`', detail: 'Padding vertical `--au-textarea-pad-y`.' },
    ],
    accessibility: [
      'Misma semántica de label, error y hint que input-text.',
      'Contraste de placeholder y hint en tokens de texto terciario.',
    ],
  },
  checkbox: {
    intro: [
      'Casilla booleana con etiqueta y descripción opcional. Soporta `indeterminate` para selección parcial.',
      'Implementa `FormCheckboxControl` para signal forms con `[(checked)]` o `[formField]`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Aceptar términos, permisos múltiples independientes.',
        'Patrón «seleccionar todo» con estado indeterminado en el padre.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Un solo on/off de configuración → `au-switch`.',
        'Elección única en lista → `au-radio-group`.',
      ],
    },
    anatomy: [
      { region: 'Input nativo', detail: 'Checkbox real; estado indeterminado nativo.' },
      { region: 'Etiqueta / descripción', detail: 'Texto principal y secundario.' },
    ],
    accessibility: [
      'Asociación label/input con `id`/`for`.',
      'Indeterminado vía propiedad nativa (no `aria-checked` inventado).',
      'Anillo de foco diferenciado teclado vs puntero.',
    ],
  },
  switch: {
    intro: [
      'Interruptor on/off con `role="switch"` sobre checkbox nativo estilizado.',
      'Comparte shell de campo (borde, error, hint) con el resto de formularios.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Preferencias inmediatas (notificaciones, modo oscuro).',
        'Activar/desactivar una función del sistema.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Varias opciones excluyentes → `au-radio-group`.', 'Aceptar legal → `au-checkbox`.'],
    },
    anatomy: [
      { region: 'Pista y thumb', detail: 'Tokens `--au-color-switch-track-*` y thumb.' },
      { region: 'Label / hint', detail: 'Misma estructura que otros campos.' },
    ],
    accessibility: [
      '`role="switch"` y estado `aria-checked`.',
      'Contraste pista/thumb documentado en tokens (WCAG UI components).',
    ],
  },
  select: {
    intro: [
      'Desplegable tipo combobox: botón trigger + listbox en portal con teclado completo (flechas, Home/End, Escape).',
      'Opciones tipadas `AuSelectOption[]`; valor del modelo = `value` de la opción, no el label.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Listas cerradas de 4–20 ítems donde el usuario conoce las opciones.',
        'Formularios que deben enviar un `name` estable en POST.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Búsqueda con filtrado → `au-autocomplete`.',
        'Solo 2–3 opciones visibles → `au-radio-group`.',
      ],
    },
    anatomy: [
      { region: 'Trigger', detail: 'Muestra label de la opción seleccionada.' },
      { region: 'Listbox portal', detail: 'Highlight vs selected con tokens distintos.' },
    ],
    accessibility: [
      'Patrón combobox ARIA (`aria-expanded`, `aria-controls`, `listbox`/`option`).',
      'Opciones deshabilitadas respetan `disabled` en `AuSelectOption`.',
    ],
    keyboard: ['Space/Enter abre; flechas mueven highlight; Enter selecciona; Escape cierra.'],
    relatedExports: ['AuSelectOption'],
  },
  autocomplete: {
    intro: [
      'Campo de búsqueda que filtra `AuAutocompleteOption[]` al escribir (insensible a mayúsculas por defecto).',
      'Misma superficie y listbox que `au-select`; `strictSelection` evita valores libres al perder foco.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Catálogos largos (ciudades, usuarios, SKU).',
        'Cuando el usuario conoce parte del texto a buscar.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Lista corta fija → `au-select`.', 'Texto libre sin lista → `au-input-text`.'],
    },
    anatomy: [
      { region: 'Input de búsqueda', detail: 'Combobox con query en tiempo real.' },
      { region: 'Panel de sugerencias', detail: '`noResultsText` cuando el filtro no coincide.' },
    ],
    accessibility: ['Combobox con listbox; estado abierto en `data-au-listbox-open`.'],
    keyboard: ['Igual que select; escritura filtra opciones.'],
    relatedExports: ['AuAutocompleteOption'],
  },
  'radio-group': {
    intro: [
      'Grupo de botones radio nativos dentro de un shell con leyenda. Una sola selección por `name`.',
      'Valor del modelo = `value` de la `AuRadioOption` activa.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        '2–5 opciones mutuamente excluyentes visibles sin desplegar.',
        'Planes, métodos de pago, tipo de cuenta.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Muchas opciones → `au-select`.', 'Booleano → checkbox o switch.'],
    },
    anatomy: [
      { region: 'Leyenda', detail: 'Label del grupo.' },
      { region: 'Opciones', detail: 'Cada radio con label propio.' },
    ],
    accessibility: ['Leyenda asociada; navegación por flechas entre radios del mismo nombre.'],
    relatedExports: ['AuRadioOption'],
  },
  'input-number': {
    intro: [
      'Entrada numérica con `min`, `max` y `step`; vacío ↔ `null`.',
      'Botones de incremento/decremento estilizados en el mismo shell de campo.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: ['Cantidades, edad, porcentajes con límites conocidos.'],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Formato moneda con máscara → capa de dominio sobre input-text.',
        'Rango continuo → slider dedicado.',
      ],
    },
    anatomy: [
      { region: 'Input `type="number"`', detail: 'Parsing a número finito o `null`.' },
      { region: 'Steppers', detail: 'Respetan min/max nativos.' },
    ],
    accessibility: ['Label, error y foco como el resto de campos.'],
  },
  'input-date': {
    intro: [
      'Selector de fecha nativo (`<input type="date">`) con tokens Aurea en icono y popup del SO.',
      'Valor en formato ISO `YYYY-MM-DD` o `null`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Fechas de calendario con picker del sistema operativo.',
        'Filtros de rango con `minDate` / `maxDate`.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Calendario inline personalizado → componente compuesto o librería externa.'],
    },
    anatomy: [
      { region: 'Input nativo', detail: 'Tokens `--au-color-date-picker-*` para icono y acento.' },
    ],
    accessibility: [
      'Label y mensajes de error enlazados; comportamiento nativo del SO para el picker.',
    ],
  },
  dialog: {
    intro: [
      'Modal sobre `<dialog>` nativo: backdrop, trampa de foco, cierre por Escape y clic fuera (configurable).',
      'Proyecta cuerpo libre y pie opcional con `auDialogFooter`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Confirmaciones destructivas o flujos que requieren decisión explícita.',
        'Formularios cortos que no merecen una ruta nueva.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Confirmación ligera → `au-snackbar` con acción.',
        'Panel lateral persistente → layout propio.',
      ],
    },
    anatomy: [
      { region: 'Backdrop', detail: 'Mezcla `--au-color-surface-inverted`.' },
      { region: 'Panel', detail: 'Cabecera, cuerpo, pie (`auDialogFooter`).' },
    ],
    accessibility: [
      '`aria-labelledby` con `title` o `aria-label`.',
      'Foco inicial dentro del panel; restauración al elemento disparador al cerrar.',
      'Tab cicla dentro del diálogo.',
    ],
    keyboard: ['Escape cierra si `closeOnEscape`.', 'Tab / Shift+Tab atrapados en el panel.'],
    relatedExports: ['AuDialogFooter'],
  },
  card: {
    intro: [
      'Superficie agrupada con variantes elevated, outlined y filled. Proyección por regiones: media, cabecera, cuerpo y pie.',
      'El host es un `<article>`: incluye un heading en `auCardHeader` para el outline del documento.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: ['Resúmenes de entidad, tiles de dashboard, bloques de configuración.'],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Solo separar contenido → `au-divider` o espaciado.',
        'Overlay bloqueante → `au-dialog`.',
      ],
    },
    anatomy: [
      { region: 'auCardMedia', detail: 'A sangre, fuera del padding interior.' },
      {
        region: 'auCardHeader / auCardBody',
        detail: 'Título y contenido con gap `--au-card-main-gap`.',
      },
      { region: 'auCardFooter', detail: 'Acciones alineadas tras borde superior.' },
    ],
    accessibility: [
      'Usa heading en cabecera para jerarquía.',
      'Acciones en footer con botones reales (`au-button`).',
    ],
    relatedExports: ['AuCardFooter'],
  },
  tabs: {
    intro: [
      'Pestañas WAI-ARIA: `tablist`, `tab` y `tabpanel`. Solo la pestaña activa está en orden de tabulación (`tabindex="0"`).',
      'Variantes `line` (subrayado) y `contained` (segmented).',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Alternar entre paneles relacionados en la misma página (cuenta, ajustes).',
        'Cuando el usuario no debe navegar a otra URL.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Navegación global de la app → router y menú.',
        'Pasos secuenciales con validación → `au-steps`.',
      ],
    },
    anatomy: [
      { region: 'button[auTab]', detail: 'Disparadores en el tablist.' },
      { region: '[auTabPanel]', detail: 'Contenido; `hidden` cuando inactivo.' },
    ],
    accessibility: [
      '`aria-selected`, `aria-controls`, ids emparejados tab/panel.',
      'Orientación expuesta en el tablist.',
    ],
    keyboard: [
      'Flechas cambian pestaña activa (horizontal o vertical según `orientation`).',
      'Home/End al primer/último tab.',
    ],
    relatedExports: ['AuTab', 'AuTabPanel'],
  },
  chip: {
    intro: [
      'Etiqueta compacta en tres modos: estática, seleccionable (`selectable` + `aria-pressed`) o removible (`removed`).',
      'Variantes filled, outline y accent (resaltado tipo filtro activo).',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Tags, filtros activos, metadatos de ítem.',
        'Selección múltiple de categorías en toolbar.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Acción principal → `au-button`.',
        'Navegación principal → tabs o enlaces.',
        'Filtros seleccionables → `au-chip-group`.',
        'Lista de tags removibles → `au-list`.',
      ],
    },
    anatomy: [
      { region: 'Superficie', detail: 'Proyección o `label` input.' },
      { region: 'Botón quitar', detail: 'Solo si `removable`; etiqueta `removeLabel` opcional.' },
    ],
    accessibility: [
      'Chip removible: botón con nombre accesible.',
      'Selectable: `aria-pressed` sincronizado con `selected`.',
    ],
  },
  snackbar: {
    intro: [
      'Mensaje breve no modal con auto-cierre (`durationMs`), acción opcional y posición en pantalla.',
      'Se teleporta al `body` para no quedar recortado por `overflow`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Confirmar guardado, error recuperable, aviso sin bloquear la UI.',
        'Feedback tras una acción donde un diálogo sería pesado.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Decisión obligatoria → `au-dialog`.',
        'Error de formulario en campo → `errorMessage` del campo.',
      ],
    },
    anatomy: [
      { region: 'Mensaje', detail: 'Input `message` o contenido proyectado.' },
      { region: 'Acción / cerrar', detail: 'Botones opcionales.' },
    ],
    accessibility: [
      '`role="status"` o `role="alert"` según variant (warning/error = alert).',
      '`aria-live` acorde; botón cerrar con `closeAriaLabel`.',
    ],
  },
  'chip-group': {
    intro: [
      'Contenedor accesible (`role="group"`) para chips de filtro seleccionables.',
      'Combina con `au-chip` `[selectable]`; no uses listas de tags removibles aquí.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: ['Filtros en toolbar (estado, categoría).', 'Toggles independientes en una fila.'],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Tags removibles → `au-list` + chips `removable`.',
        'Un solo chip → `au-chip` suelto.',
      ],
    },
    anatomy: [{ region: 'Grupo', detail: 'Requiere `ariaLabel` o `ariaLabelledBy`.' }],
    accessibility: ['Grupo nombrado; chips con `aria-pressed` si son seleccionables.'],
  },
  list: {
    intro: [
      'Lista accesible (`role="list"`) para chips removibles o filas con `auListItem`.',
      'Los chips hijos pasan a `listitem` salvo que sean `selectable`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Tags seleccionados que el usuario puede quitar.',
        'Filas horizontales con semántica de lista.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Filtros toggle → `au-chip-group`.', 'Navegación → tabs o enlaces.'],
    },
    anatomy: [
      { region: 'Host lista', detail: '`au-list` en fila flex.' },
      { region: 'Ítems', detail: 'Chips `removable` o `<div auListItem>`.' },
    ],
    accessibility: ['Indica `ariaLabel` o `ariaLabelledBy`.'],
    relatedExports: ['AuListItem'],
  },
  message: {
    intro: [
      'Aviso inline para estado de página, resumen de validación o ayuda contextual.',
      'Variantes semánticas con tokens; icono `au-icon` opcional.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Errores de formulario a nivel de página.',
        'Éxito tras guardar, avisos de política, advertencias no bloqueantes.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Toast → `au-snackbar`.', 'Error de campo → `errorMessage` en `au-form-field`.'],
    },
    anatomy: [
      { region: 'Icono', detail: 'Glifo de variante si `showIcon` (no en default).' },
      { region: 'Título / cuerpo', detail: '`title` + `message` o slot.' },
      { region: 'Cerrar', detail: 'Botón opcional.' },
    ],
    accessibility: ['Error/warning: `role="alert"`.', 'Resto: `role="status"`.'],
  },
  icon: {
    intro: [
      'Glifos SVG compartidos (check, warning, error, info, close, spinner) en sm/md/lg.',
      'Decorativos por defecto — el control padre lleva el nombre accesible.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Dentro de `au-message`, chips removibles, botones en carga.',
        'Iconografía coherente en el DS.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Iconos de marca → SVG propio.', 'Botón solo icono → `label` en `au-button`.'],
    },
    anatomy: [{ region: 'SVG', detail: '`data-au-icon` y `data-au-size` en el host.' }],
    accessibility: ['Host con `aria-hidden="true"`.'],
    relatedExports: ['AuIconName', 'AuIconSize'],
  },
  skeleton: {
    intro: [
      'Placeholders de carga: líneas, círculos (avatar), bloques y barra de botón.',
      'Animación pulse o wave; el padre debe marcar `aria-busy` mientras carga.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: ['Estados de carga en tarjetas o listas.', 'Cabecera de perfil provisional.'],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Spinner en botón → `au-icon` spinner.', 'Estado vacío → texto visible.'],
    },
    anatomy: [{ region: 'Host', detail: '`role="presentation"`; tamaño por variant + `size`.' }],
    accessibility: ['Solo decorativo; combina con `aria-busy` en la región de carga.'],
  },
  steps: {
    intro: [
      'Navegación horizontal por secciones: `button[auStep]` + `[auStepPanel]`.',
      '`layout="tabs"` muestra un panel; `layout="sections"` hace scroll a secciones visibles.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Sitios de documentación (Overview / API / Examples).',
        'Páginas largas con claves de sección.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Nav principal de app → `au-tabs`.',
        'Wizard estricto con pasos completados → stepper dedicado.',
      ],
    },
    anatomy: [
      { region: 'Lista de pasos', detail: 'Botones horizontales con indicador activo.' },
      { region: 'Paneles', detail: 'Tab panels o regiones siempre visibles.' },
    ],
    accessibility: [
      'Layout tabs: tablist + tab + tabpanel.',
      'Layout sections: `aria-current` en el paso activo.',
    ],
    keyboard: ['Flechas, Home y End entre pasos habilitados.'],
    relatedExports: ['AuStep', 'AuStepPanel', 'AuStepsLayout'],
  },
  divider: {
    intro: [
      'Separador semántico `role="separator"` horizontal o vertical, con inset y etiqueta opcional centrada.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Separar secciones de contenido o ítems de lista.',
        'Separador vertical entre grupos en flex.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Solo espacio → utilidades de spacing.', 'Borde de tarjeta → variant del `au-card`.'],
    },
    anatomy: [
      { region: 'Regla', detail: 'Línea `--au-color-border-subtle`.' },
      { region: 'Label', detail: 'Solo horizontal; texto entre dos mitades de línea.' },
    ],
    accessibility: ['`aria-orientation` según `orientation`.'],
  },
  badge: {
    intro: [
      'Etiqueta compacta de estado o contador. Las variantes usan tokens semánticos; el modo punto para indicadores sin texto legible.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Contadores no leídos, píldoras de estado o categorías junto a títulos o filas.',
        'Punto indicador cuando el significado está claro en el contexto (p. ej. en línea).',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Etiquetas removibles o filtros seleccionables → `au-chip` / `au-chip-group`.',
        'Frases completas o alertas descartables → `au-message`.',
      ],
    },
    anatomy: [
      { region: 'Host `au-badge`', detail: '`data-au-variant`; `data-au-dot` opcional.' },
      { region: 'Label', detail: 'Texto vía `label`; oculto visualmente en modo solo punto.' },
    ],
    accessibility: [
      'Combina badges solo-punto con texto visible o nombre accesible en un padre.',
      'Contadores que cambian en vivo: considera `aria-live` en la región padre.',
    ],
  },
  breadcrumb: {
    intro: [
      'Ruta jerárquica con `role="navigation"` y `aria-label="Breadcrumb"`.',
      'Los ítems pueden enlazar (`href`) o representar la página actual como texto.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Jerarquías profundas donde el usuario necesita contexto y navegación hacia arriba.',
        'Ajustes o documentación con más de dos niveles.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Apps planas de un nivel → omitir breadcrumbs.',
        'Navegación principal → tabs o menú lateral del router.',
      ],
    },
    anatomy: [
      { region: 'Lista', detail: 'Ruta ordenada con separadores entre ítems.' },
      { region: 'Ítem enlace', detail: 'Tokens de enlace; anillo de foco con teclado.' },
      { region: 'Página actual', detail: 'Último segmento sin `href`; texto enfatizado.' },
    ],
    accessibility: [
      'Landmark `navigation` con `aria-label` por defecto.',
      'La página actual es texto, no enlace — evita auto-enlace redundante.',
    ],
    keyboard: ['Tab recorre segmentos enlazados; la página actual no está en el orden de tabulación.'],
  },
  link: {
    intro: [
      'Enlace inline con tokens Aurea en `<a auLink>` o `<au-link>`.',
      'Variantes default y subtle; `external` añade `target="_blank"` y `rel="noopener noreferrer"`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Navegación inline en párrafos, tablas o mensajes.',
        'Referencias externas con `rel` seguro cuando `external` es true.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Acciones principales → `au-button`.',
        'Ruta de migas → ítems de `au-breadcrumb` con `href`.',
      ],
    },
    anatomy: [
      { region: 'Ancla', detail: 'Host `au-link` con `data-au-variant`.' },
      { region: 'Contenido proyectado', detail: 'Texto del enlace en el slot por defecto.' },
    ],
    accessibility: [
      'Anillo de foco visible (`--au-shadow-focus-ring`) con teclado.',
      'Enlaces externos abren contexto nuevo con `noopener`.',
    ],
    keyboard: ['Enter activa el enlace nativo; Tab sigue el orden del documento.'],
  },
  menu: {
    intro: [
      'Menú desplegable con panel en portal anclado a `auMenuTrigger`.',
      'Usa `[(open)]` para estado controlado; los ítems `au-menu-item` cierran al seleccionar.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Acciones de fila o barra que no requieren un diálogo completo.',
        'Listas de comandos desde un único disparador.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Filtros o formularios compactos no modales → `au-popover`.',
        'Confirmación bloqueante → `au-dialog`.',
      ],
    },
    anatomy: [
      { region: 'Disparador', detail: '`auMenuTrigger`; `aria-haspopup="menu"` y `aria-expanded`.' },
      { region: 'Panel', detail: '`.au-floating-panel` en portal; posicionado por overlay.' },
      { region: 'Ítems', detail: 'Botones `au-menu-item`; `select` cierra el menú.' },
    ],
    accessibility: [
      'El disparador expone estado expandido mientras está abierto.',
      'Cierra con Escape o clic fuera; devuelve foco según el patrón del overlay.',
    ],
    keyboard: [
      'Disparador: Enter/Espacio alterna; Escape cierra.',
      'Ítems: activación por clic; extiende con tabindex roving si añades patrones compuestos.',
    ],
    relatedExports: ['AuMenu', 'AuMenuItem', 'AuMenuTrigger', 'AU_MENU'],
  },
  popover: {
    intro: [
      'Panel anclado ligero para filtros, ayuda o formularios compactos. Mismo modelo de overlay que `au-menu`.',
      'Disparador `auPopoverTrigger` con `aria-haspopup="dialog"`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Filtros o ajustes inline cerca del disparador.',
        'Contenido breve que no es un modal completo.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Ayuda al hover → `auTooltip`.',
        'Flujos destructivos o bloqueantes → `au-dialog`.',
        'Listas de acciones → `au-menu`.',
      ],
    },
    anatomy: [
      { region: 'Disparador', detail: '`auPopoverTrigger` alterna `[(open)]`.' },
      { region: 'Panel', detail: 'Contenido proyectado en `.au-floating-panel` portaled.' },
    ],
    accessibility: [
      '`aria-expanded` del disparador refleja el estado abierto.',
      'Gestiona foco explícitamente si el panel contiene controles de formulario.',
      'Escape y clic fuera cierran.',
    ],
    keyboard: ['El disparador alterna con Enter/Espacio; Escape cierra el panel.'],
    relatedExports: ['AuPopover', 'AuPopoverTrigger', 'AU_POPOVER'],
  },
  pagination: {
    intro: [
      'Navegación por páginas para tablas y listas. Las páginas son **base 1**; emite `pageChange` al elegir.',
      'Colapsa rangos largos con elipsis cuando `pageCount` > 7.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Tablas o rejillas paginadas en servidor o cliente.',
        'Cuando el usuario necesita saltar a páginas numeradas.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Feeds con scroll infinito → patrón load-more.',
        'Listas muy pequeñas → mostrar todas las filas.',
      ],
    },
    anatomy: [
      { region: 'Nav', detail: '`role="navigation"` con `aria-label="Pagination"`.' },
      { region: 'Anterior / siguiente', detail: 'Controles `au-button` ghost.' },
      { region: 'Botones de página', detail: 'Páginas numeradas; la actual con estilo activo.' },
    ],
    accessibility: [
      'Landmark de navegación con nombre accesible por defecto.',
      'La página actual debe distinguirse visualmente; `aria-current="page"` en la app si personalizas botones.',
    ],
    keyboard: ['Tab por anterior, números y siguiente; Espacio/Enter activan botones.'],
  },
  progress: {
    intro: [
      'Barra de progreso determinada o indeterminada con `role="progressbar"`.',
      'Modo determinado: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`; `label` opcional para `aria-valuetext`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Subidas, tareas multi-paso o porcentaje conocido.',
        'Esperas indeterminadas cuando la duración es desconocida.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Placeholders de contenido → `au-skeleton`.',
        'Estado de botón en vuelo → `au-button` `loading`.',
      ],
    },
    anatomy: [
      { region: 'Pista', detail: 'Superficie hundida con radio pill.' },
      { region: 'Barra', detail: 'Ancho desde `value`/`max` o animación indeterminada.' },
    ],
    accessibility: [
      '`aria-valuetext` desde `label` o porcentaje redondeado.',
      'Modo indeterminado omite min/max/now según práctica ARIA.',
    ],
  },
  table: {
    intro: [
      'Envoltorio semántico alrededor de `<table>` nativo. Modos opcionales `striped` y `compact`.',
      'Columnas ordenables con `th[auTableSortHeader]`, `aria-sort` y ciclo none → asc → desc.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Datos tabulares con cabeceras y filas.',
        'Columnas ordenables cuando el padre posee el estado de orden.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Rejillas solo de maquetación → CSS grid, no tablas.',
        'Listas muy anchas responsive → patrones de tarjetas.',
      ],
    },
    anatomy: [
      { region: 'Host `au-table`', detail: 'Envuelve `<table>` proyectada; atributos de modo.' },
      { region: 'Cabecera ordenable', detail: 'Botón en `<th>` con `aria-sort` e icono.' },
    ],
    accessibility: [
      'Conserva semántica nativa (`thead`, `tbody`, `th scope`).',
      'Botones de orden son botones reales con `aria-sort` según dirección.',
    ],
    keyboard: ['Tab a botones de orden; Enter/Espacio alternan el ciclo de orden.'],
    relatedExports: ['AuTable', 'AuTableSortHeader'],
  },
  tooltip: {
    intro: [
      'Ayuda contextual en portal al hacer hover o foco en el disparador. Retardos configurables para evitar parpadeos.',
      'No sustituye a una etiqueta visible: el disparador debe tener nombre accesible propio.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: ['Iconos de acción sin texto visible.', 'Aclarar un control ya etiquetado.'],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Información esencial → texto visible o `hint` en el campo.',
        'Contenido largo o interactivo → popover o diálogo.',
      ],
    },
    anatomy: [
      { region: 'Disparador', detail: 'Elemento con `auTooltip` (p. ej. `au-button`).' },
      { region: 'Globo', detail: 'Clase `.au-tooltip` en `document.body`.' },
    ],
    accessibility: [
      '`role="tooltip"` y `aria-describedby` en el host mientras está abierto.',
      'No contiene foco interactivo.',
    ],
  },
};
