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
        'Conmutar un ajuste on/off → `button[auSwitch]`.',
      ],
    },
    anatomy: [
      {
        region: 'Host `button[auButton]`',
        detail: 'Atributos `data-au-variant` y `data-au-size`.',
      },
      { region: 'Botón nativo', detail: 'Proyección de contenido; `aria-busy` cuando `loading`.' },
    ],
    accessibility: [
      'Foco visible al tabular (`--au-focus-tab`); el foco puntero usa `--au-focus-tactile`.',
      '`loading` activa `aria-busy`, muestra un `au-spinner` decorativo y bloquea el click.',
      'Tamaño `lg` respeta `--au-touch-target-min` (44px).',
    ],
    keyboard: [
      'Enter y Space activan el botón nativo.',
      'Tab enfoca el control; foco restaurado tras cerrar diálogos.',
    ],
  },
  'button-group': {
    intro: [
      'Contenedor de layout que agrupa acciones `button[auButton]` relacionadas con `role="group"`.',
      'Por defecto **`attached`** une bordes entre botones; `[attached]="false"` los separa.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Acciones Guardar / Cancelar / secundarias en formularios y diálogos.',
        'Toolbars compactas de botones independientes.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Elección exclusiva en formulario → `au-radio-group` o `au-tabs` `variant="contained"`.',
        'Filtros multi-selección → `au-chip-group`.',
        'Una sola acción → `button[auButton]` suelto.',
      ],
    },
    anatomy: [
      { region: 'Grupo', detail: '`role="group"` con `ariaLabel` o `ariaLabelledBy`.' },
      {
        region: '`button[auButton]`',
        detail: 'Hijos proyectados; variantes y clics en cada botón.',
      },
    ],
    accessibility: [
      'Nombra el grupo cuando hay más de un botón.',
      'Cada `button[auButton]` conserva su nombre accesible y teclado propio.',
    ],
    keyboard: ['Tab recorre los botones en orden de documento.'],
    relatedExports: ['type AuButtonGroupOrientation'],
  },
  'form-field': {
    intro: [
      'Cromado compartido de etiqueta, hint y error alrededor de un control proyectado (`input[auInputText]`, `au-select`, `au-radio-group`, etc.).',
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
        'Checkbox solo con etiqueta inline y sin hint/error → `input[type=checkbox][auCheckbox]` sin wrapper.',
        'Layout que no es formulario → no envolver.',
      ],
    },
    anatomy: [
      { region: 'Etiqueta', detail: '`<label for>` enlazado al `controlId` del hijo.' },
      { region: 'Hint', detail: '`<p>` opcional bajo la etiqueta, encima del control.' },
      { region: 'Control proyectado', detail: 'Un solo control enfocable en el slot por defecto.' },
      { region: 'Error', detail: 'Mensaje `role="alert"` bajo el control cuando es inválido.' },
    ],
    accessibility: [
      'El hijo recibe `aria-describedby` / `aria-errormessage` desde los ids del contexto.',
      'El asterisco de obligatorio es decorativo con texto para lectores de pantalla.',
    ],
    relatedExports: ['AU_FORM_FIELD', 'AuFormFieldContext'],
  },
  fieldset: {
    intro: [
      'Agrupa controles relacionados con un `<fieldset>` nativo, `<legend>` opcional y descripción de apoyo.',
      'Usa `[disabled]="true"` para deshabilitar todos los controles anidados de una vez.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Bloques de dirección, secciones de pago o filtros que pertenecen juntos semánticamente.',
        'Formularios donde una leyenda compartida nombra la región para tecnología asistiva.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Solo agrupación visual → card o divider.',
        'Un solo campo → `au-form-field` suelto.',
      ],
    },
    anatomy: [
      { region: 'Leyenda', detail: 'Se omite cuando `legend` está vacío.' },
      { region: 'Descripción', detail: 'Texto de ayuda opcional bajo la leyenda.' },
      { region: 'Slot de contenido', detail: 'Proyecta filas `au-form-field` u otros controles.' },
    ],
    accessibility: [
      'Semántica nativa `fieldset`/`legend` propagada a inputs anidados.',
      'El estado disabled deshabilita todos los descendientes sin cableado extra.',
    ],
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
        'Texto, email, URL, teléfono o búsqueda con la misma cromática que el resto de campos.',
        'Validación con signal forms o `errorMessage` / `invalid` manuales.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Texto multilínea → `textarea[auTextarea]`.',
        'Contraseña → `input[auInputPassword]`.',
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
    ],
    accessibility: [
      'Nombre accesible vía etiqueta visible o `aria-label` externo.',
      'Errores enlazados con `aria-errormessage`; hints con `aria-describedby`.',
    ],
    keyboard: ['Tab entra al campo con anillo exterior (`--from-tab`); clic usa anillo interior.'],
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
      items: ['Una sola línea → `input[auInputText]`.', 'Editor rico → componente de terceros.'],
    },
    anatomy: [
      { region: 'Shell', detail: 'Igual que campos de una línea.' },
      {
        region: '`<textarea>`',
        detail:
          'Padding `--au-textarea-pad-block` / `--au-textarea-pad-inline` (o presets por `size`).',
      },
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
        'Un solo on/off de configuración → `button[auSwitch]`.',
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
      'Interruptor on/off con `role="switch"` en un `<button type="button">` nativo.',
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
      items: [
        'Varias opciones excluyentes → `au-radio-group`.',
        'Aceptar legal → `input[type=checkbox][auCheckbox]`.',
      ],
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
      items: ['Lista corta fija → `au-select`.', 'Texto libre sin lista → `input[auInputText]`.'],
    },
    anatomy: [
      { region: 'Input de búsqueda', detail: 'Combobox con query en tiempo real.' },
      { region: 'Panel de sugerencias', detail: '`noResultsText` cuando el filtro no coincide.' },
    ],
    accessibility: ['Combobox con listbox; estado abierto en `data-au-listbox-open`.'],
    keyboard: ['Igual que select; escritura filtra opciones.'],
    relatedExports: ['AuAutocompleteOption'],
  },
  avatar: {
    intro: [
      'Muestra una foto de usuario o iniciales derivadas de `name` cuando no hay imagen.',
      'Tamaños xs–xl; `circle` (por defecto, circular) o `square` (cuadrado con esquinas redondeadas).',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Cabeceras de perfil, autores de comentarios o asignados en listas.',
        'Iniciales cuando no hay URL de foto.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Placeholder de carga → `au-skeleton` variante circular.',
        'Marca decorativa sin persona → `au-icon` o SVG propio.',
      ],
    },
    anatomy: [
      { region: 'Imagen', detail: '`<img>` con `src`; requiere `alt`.' },
      { region: 'Iniciales', detail: 'Dos letras desde la primera/última palabra de `name`.' },
    ],
    accessibility: [
      'Con imagen: nombre accesible en `alt`.',
      'Solo iniciales: host `role="img"` y `aria-label` desde `name`.',
      'Usa `decorative` cuando la fila padre expone el nombre.',
    ],
  },
  accordion: {
    intro: [
      'Secciones plegables con patrón WAI-ARIA accordion: `button[auAccordionItem]` y `au-accordion-panel` comparten una clave string.',
      'Enlaza `[(value)]` a la lista de claves expandidas; `[multiple]="false"` para expansión exclusiva.',
      '`variant="contained"` añade superficie elevada (como una tarjeta); `plain` (por defecto) solo usa separadores.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'FAQ, paneles de ajustes o filtros donde solo parte del contenido debe estar visible.',
        'Formularios largos divididos en secciones escaneables en una página.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Vistas mutuamente excluyentes con chrome de pestañas → `au-tabs`.',
        'Asistente secuencial con validación → `au-steps`.',
      ],
    },
    anatomy: [
      {
        region: 'Host',
        detail: '`variant="plain"` (separadores) o `contained` (superficie elevada).',
      },
      { region: '`.au-accordion__item`', detail: 'Envuelve cada par trigger + panel.' },
      {
        region: '`button[auAccordionItem]`',
        detail: 'Disparador con `aria-expanded` y `aria-controls`.',
      },
      {
        region: '`au-accordion-panel`',
        detail: 'Región con transición de altura; `aria-hidden` e `inert` al colapsar.',
      },
    ],
    accessibility: [
      'Raíz `role="region"` con `aria-label` o labelledby.',
      'Los triggers permanecen en el orden de tabulación; los paneles exponen `aria-labelledby`.',
    ],
    keyboard: [
      'Flecha abajo/arriba mueven el foco entre triggers habilitados.',
      'Home/End saltan al primero/último; Enter/Espacio alternan en el botón.',
    ],
    relatedExports: ['AuAccordionItem', 'AuAccordionPanel'],
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
  slider: {
    intro: [
      'Input nativo `type="range"` estilizado con tokens Aurea y salida de valor opcional.',
      'Implementa `FormValueControl<number>`; proyecta dentro de `au-form-field` para label, hint y errores.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Volumen, opacidad o cualquier valor continuo acotado donde arrastrar es más rápido que escribir.',
        'Ajustes con min/max visibles y pasos gruesos.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Entrada numérica exacta → `input[auInputNumber]`.',
        'Opciones discretas → radio group o select.',
      ],
    },
    anatomy: [
      { region: 'Pista', detail: 'Relleno según el valor entre min y max.' },
      { region: 'Thumb', detail: 'Control nativo con anillo de foco.' },
      {
        region: 'Valor visible',
        detail: 'Región opcional `showValue` enlazada vía `aria-describedby`.',
      },
    ],
    accessibility: [
      'Ids de label y error desde `au-form-field`.',
      'El valor se anuncia cuando `showValue` está activo.',
    ],
    keyboard: ['Las flechas ajustan el valor según el comportamiento nativo del range.'],
  },
  'input-date': {
    intro: [
      'Selector de fecha con calendario Aurea (`<input type="date">` + panel mensual propio).',
      'Valor en formato ISO `YYYY-MM-DD` o `null`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Fechas de calendario con rejilla mensual accesible y coherente entre navegadores.',
        'Filtros de rango con `minDate` / `maxDate`.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Selección de rango de fechas (inicio/fin) → dos campos o componente compuesto.',
        'Calendario inline siempre visible → layout personalizado encima de este control.',
      ],
    },
    anatomy: [
      { region: 'Input nativo', detail: 'Entrada manual ISO; icono de calendario abre el panel.' },
      {
        region: 'Panel `.au-date-calendar`',
        detail: 'Rejilla mensual (lunes primero), navegación por mes y teclado.',
      },
    ],
    accessibility: [
      'Label y mensajes de error enlazados; panel con `role="dialog"` y rejilla `role="grid"`.',
      'Input con `aria-haspopup="dialog"` y `aria-expanded`; al cerrar, el foco vuelve al campo.',
      'Teclado: flechas, Home/End, PageUp/PageDown, Enter/Espacio y Escape.',
      'Abierto, rueda/touch en la página se bloquea (`installPageScrollPrevention`); scroll fuera cierra el panel.',
    ],
  },
  'input-time': {
    intro: [
      'Selector de hora con panel Aurea (`<input type="time">` + columnas hora/minuto).',
      'Valor en formato 24h `HH:mm` o `null`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Horas del reloj con columnas accesibles y coherentes entre navegadores.',
        'Filtros de horario laboral con `minTime` / `maxTime`.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Steppers de duración personalizados → componente compuesto o librería externa.'],
    },
    anatomy: [
      { region: 'Input nativo', detail: 'Entrada manual `HH:mm`; icono de reloj abre el panel.' },
      {
        region: 'Panel `.au-time-picker`',
        detail: 'Columnas desplazables de horas (0–23) y minutos (0–59).',
      },
    ],
    accessibility: [
      'Label, hint y errores enlazados; panel con `role="dialog"` y listas `role="listbox"`.',
      'Input con `aria-haspopup="dialog"` y `aria-expanded`; al cerrar, el foco vuelve al campo.',
      'Teclado: flechas, Home/End, PageUp/PageDown (columnas), Enter/Espacio y Escape.',
      'Abierto, rueda/touch en la página se bloquea; scroll fuera cierra el panel.',
    ],
  },
  'input-password': {
    intro: [
      'Campo de contraseña dedicado con toggle de revelar opcional y cromado Aurea compartido.',
      'Implementa `FormValueControl<string | null>`; vacío ↔ `null`. Localiza `revealLabelShow` / `revealLabelHide`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Formularios de inicio de sesión, registro y cambio de contraseña.',
        'Cuando el usuario puede necesitar verificar lo escrito (`showRevealToggle`).',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['OTP o PIN de longitud fija → patrón de input especializado.'],
    },
    anatomy: [
      { region: 'Input nativo', detail: 'Alterna `type="password"` / `type="text"` al revelar.' },
      {
        region: 'Control revelar',
        detail: 'Botón icono opcional con `aria-pressed` y etiqueta localizada.',
      },
    ],
    accessibility: [
      'Label, hint y errores enlazados vía `au-form-field`.',
      'El botón de revelar es accesible por teclado; no envía el formulario.',
    ],
  },
  'file-upload': {
    intro: [
      'Zona drag-and-drop con `input[type="file"]` oculto, botón de explorar y lista de archivos removibles.',
      'Implementa `FormValueControl<File[]>`; selección vacía = `[]`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Adjuntos, importaciones o subida de medios en formularios.',
        'Cuando conviene soltar archivos sobre un objetivo grande.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Solo captura de cámara → input nativo sin chrome de dropzone.',
        'Selector en la nube → integra el UI de tu proveedor.',
      ],
    },
    anatomy: [
      { region: 'Dropzone', detail: 'Texto, botón explorar e input file oculto.' },
      { region: 'Lista', detail: 'Nombre, tamaño y quitar por archivo.' },
    ],
    accessibility: [
      'El botón explorar es alcanzable por teclado; la dropzone respeta `aria-disabled`.',
      'Los botones quitar exponen `aria-label` por archivo.',
      'La lista usa `aria-live="polite"`.',
    ],
    keyboard: ['Tab al explorar; Enter/Espacio activan el botón.'],
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
  drawer: {
    intro: [
      'Panel lateral sobre `<dialog>` nativo: entra desde `start` o `end`, con trampa de foco; el scroll lo gestiona `showModal()`.',
      'Proyecta contenido y pie opcional con `[auDrawerFooter]`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Navegación móvil, filtros o detalle sin cambiar de ruta.',
        'Flujos secundarios que necesitan más ancho que un popover.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Confirmación centrada → `au-dialog`.', 'Panel contextual no modal → `au-popover`.'],
    },
    anatomy: [
      { region: 'Backdrop', detail: 'Overlay atenuado; clic cierra si está habilitado.' },
      { region: 'Panel', detail: 'Cabecera, cuerpo con scroll, pie opcional.' },
    ],
    accessibility: [
      '`aria-labelledby` con `title` o `aria-label`.',
      'El foco entra al panel al abrir; se restaura al cerrar.',
    ],
    keyboard: ['Escape cierra con `closeOnEscape`.', 'Tab atrapado dentro del panel.'],
    relatedExports: ['AuDialogFooter'],
  },
  card: {
    intro: [
      'Superficie agrupada con variantes elevated, outlined y filled. Proyección por regiones: media, cabecera, cuerpo y pie.',
      'El host es un `<article>`: incluye un heading en `auCardHeader` para el outline del documento.',
      'Usa `[interactive]="true"` solo cuando toda la tarjeta sea enlace o destino de clic (refuerzo de borde al hover en elevated).',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Resúmenes de entidad, tiles de dashboard, bloques de configuración.',
        'Tiles clicables con `interactive` y un patrón real de enlace o botón.',
      ],
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
      'Acciones en footer con botones reales (`button[auButton]`).',
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
  'tag-input': {
    intro: [
      'Campo de texto multi-valor que muestra los valores introducidos como chips removibles.',
      'Implementa `FormValueControl<string[]>`; confirma con Enter, coma o blur.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Habilidades, temas, destinatarios de correo o tokens de filtro en formularios.',
        'Cuando cada valor debe permanecer visible y eliminarse individualmente.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Un solo valor de texto libre → `input[auInputText]` o `textarea[auTextarea]`.',
        'Filtros predefinidos → `au-chip-group`.',
        'Lista removible sin teclear → `au-list` + `au-chip`.',
      ],
    },
    anatomy: [
      { region: 'Chips', detail: 'Etiquetas removibles con botón de quitar por chip.' },
      { region: 'Input borrador', detail: 'Campo inline para la siguiente etiqueta.' },
    ],
    accessibility: [
      'Los botones de quitar exponen `aria-label` vía `removeTagLabel`.',
      '`readOnly` mantiene el control nativo legible sin `disabled` (sigue en el orden de tabulación).',
      'Backspace con borrador vacío elimina la última etiqueta.',
    ],
    keyboard: [
      'Enter o coma confirman el borrador como etiqueta.',
      'Backspace con input vacío elimina la última etiqueta.',
    ],
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
        'Acción principal → `button[auButton]`.',
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
      'Aviso inline (`layout="inline"`) o banner a ancho completo (`layout="banner"`) para estado y avisos.',
      'Variantes semánticas con tokens; icono `au-icon` opcional.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Errores de formulario encima de campos (`inline`).',
        'Mantenimiento global, facturación o políticas (`banner`).',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: ['Toast → `au-snackbar`.', 'Error de campo → `errorMessage` en `au-form-field`.'],
    },
    anatomy: [
      { region: 'Icono', detail: 'Glifo de variante si `showIcon` (no en default).' },
      { region: 'Título / cuerpo', detail: '`title` + `message` o slot.' },
      { region: 'Acciones', detail: '`actionLabel` opcional y botón cerrar.' },
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
      items: [
        'Iconos de marca → SVG propio.',
        'Botón solo icono → `label` en `button[auButton]`.',
        'Carga standalone → `au-spinner`.',
      ],
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
      items: [
        'Spinner en botón → `button[auButton]` `loading`.',
        'Indicador inline → `au-spinner`.',
        'Estado vacío → texto visible.',
      ],
    },
    anatomy: [{ region: 'Host', detail: '`role="presentation"`; tamaño por variant + `size`.' }],
    accessibility: ['Solo decorativo; combina con `aria-busy` en la región de carga.'],
  },
  spinner: {
    intro: [
      'Indicador de carga inline con `role="status"` y `aria-busy="true"`.',
      'SVG de doble anillo: pista tenue y arco animado (~0,9 s). El glifo usa `--au-color-action-primary` por defecto.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Filas o paneles mientras llegan datos.',
        'Copy de estado visible con `label` cuando hace falta contexto.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Estado de botón en vuelo → `button[auButton]` `loading`.',
        'Porcentaje conocido → `au-progress`.',
        'Placeholders de contenido → `au-skeleton`.',
      ],
    },
    anatomy: [
      {
        region: 'Host `au-spinner`',
        detail: '`role="status"`; `data-au-size` define la escala sm/md/lg.',
      },
      {
        region: 'Anillos',
        detail: 'SVG decorativo con pista + arco animado (`aria-hidden`).',
      },
      {
        region: 'Label',
        detail: 'Copy visible opcional cuando se define `label` (`aria-labelledby`).',
      },
    ],
    accessibility: [
      'Omite `label` para esperas solo con glifo (`aria-label="Loading"`).',
      'Define `label` para mostrar copy visible y nombrar la región viva.',
      'Usa `decorative` dentro de botones u otros controles que ya exponen estado busy.',
    ],
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
  'description-list': {
    intro: [
      'Contenedor semántico de lista de descripción (`<dl>`) para pares clave–valor.',
      'Compón con `au-description-item` (`term` + descripción proyectada); `<dt>` / `<dd>` nativos para markup avanzado.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Resúmenes de perfil, detalle de factura, paneles de metadatos.',
        'Detalle de solo lectura junto a formularios o en barras laterales de ajustes.',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Campos editables → controles de formulario dentro de `au-form-field`.',
        'Datos tabulares ordenables → `au-table`.',
        'Etiquetas apiladas simples → utilidades tipográficas.',
      ],
    },
    anatomy: [
      { region: 'Shell `dl`', detail: 'Rejilla CSS según `layout` y `columns`.' },
      {
        region: '`au-description-item`',
        detail: 'Renderiza `<dt>` y `<dd>`; host con `display: contents`.',
      },
      { region: '`dt` / `dd` nativos', detail: 'Proyección opcional para descripciones ricas.' },
    ],
    accessibility: [
      'Preserva la semántica nativa de lista para lectores de pantalla.',
      'Cada `dt` debe ir seguido de su `dd` en orden del documento.',
    ],
  },
  'empty-state': {
    intro: [
      'Placeholder centrado cuando una lista, tabla, panel o búsqueda no tiene datos.',
      'Compón con `title`, `description` opcional, media (`icon`, `imageSrc` o `[auEmptyStateMedia]` proyectado) y acciones proyectadas.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Tabla o lista vacía tras aplicar filtros.',
        'Paneles de primer uso con acción principal (crear, importar, conectar).',
      ],
    },
    whenNotToUse: {
      title: 'Alternativas',
      items: [
        'Carga → `au-skeleton`.',
        'Estado inline o errores → `au-message`.',
        'Espera en botón o fila → `au-spinner`.',
      ],
    },
    anatomy: [
      {
        region: 'Media',
        detail:
          'Ilustración opcional: icono preset, `imageSrc` o markup custom con `[auEmptyStateMedia]` (gana el primero).',
      },
      { region: 'Título', detail: 'Encabezado (`headingLevel` 2–4) que nombra la región.' },
      { region: 'Descripción', detail: 'Texto de apoyo bajo el título.' },
      { region: 'Acciones', detail: 'Proyecta botones o enlaces; oculto si está vacío.' },
    ],
    accessibility: [
      '`role="region"` con `aria-labelledby` en el título.',
      'Elige `headingLevel` según el outline de la página.',
    ],
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
    keyboard: [
      'Tab recorre segmentos enlazados; la página actual no está en el orden de tabulación.',
    ],
  },
  link: {
    intro: [
      'Enlace inline con tokens Aurea en `<a auLink>` o `<a auLink>`.',
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
        'Acciones principales → `button[auButton]`.',
        'Ruta de migas → ítems de `au-breadcrumb` con `href`.',
      ],
    },
    anatomy: [
      { region: 'Ancla', detail: 'Host `a[auLink]` con `data-au-variant`.' },
      { region: 'Texto del enlace', detail: 'Contenido nativo del ancla entre las etiquetas.' },
    ],
    accessibility: [
      'Anillo de foco visible (`--au-focus-inset`) con teclado.',
      'Enlaces externos abren contexto nuevo con `noopener`.',
    ],
    keyboard: ['Enter activa el enlace nativo; Tab sigue el orden del documento.'],
  },
  menu: {
    intro: [
      'Menú desplegable con panel en portal anclado a `auMenuTrigger`.',
      'Usa `[(open)]` para estado controlado; los ítems `au-menu-item` cierran al seleccionar.',
      'Abierto, el scroll de rueda/touch en la página se bloquea sin ocultar la barra (`installPageScrollPrevention`); contenedores con scroll anidado siguen cerrando el panel.',
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
      {
        region: 'Disparador',
        detail: '`auMenuTrigger`; `aria-haspopup="menu"` y `aria-expanded`.',
      },
      { region: 'Panel', detail: '`.au-floating-panel` en portal; posicionado por overlay.' },
      { region: 'Ítems', detail: 'Botones `au-menu-item`; `select` cierra el menú.' },
    ],
    accessibility: [
      'El disparador expone estado expandido mientras está abierto.',
      'Cierra con Escape o clic fuera; devuelve foco según el patrón del overlay.',
    ],
    keyboard: [
      'Disparador: Enter/Espacio alterna; Escape cierra.',
      'Ítems: flechas ciclan; Inicio/Fin saltan; typeahead por primera letra; Enter/Espacio activan.',
    ],
    relatedExports: [
      'AuMenu',
      'AuMenuItem',
      'AuMenuTrigger',
      'AU_MENU',
      'installPageScrollPrevention',
      'lockPageScroll / unlockPageScroll',
    ],
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
      { region: 'Anterior / siguiente', detail: 'Controles `button[auButton]` ghost.' },
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
        'Estado de botón en vuelo → `button[auButton]` `loading`.',
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
      'Tabla estilo Material: `[data]` + columnas `au-table-column`. Opcional `title`, `description`, `striped`, `compact`, `stickyHeader` y `loading`.',
      'Orden con columnas `sortable`, `[(sort)]` y `clientSort`. Los iconos de orden usan `au-icon` (`sort-asc`, `sort-desc`, `sort-neutral`).',
      'Selección de filas: `selectionMode` (`none` | `single` | `multiple`) con `[(selection)]`, select-all en cabecera (multiple) y clic en fila — checkboxes con `input[type=checkbox][auCheckbox]`.',
      'Celdas custom: `ng-template[auTableCell] let-row` en la columna para badges, menús o acciones.',
      'Datos vacíos: proyecta `au-empty-state` como hijo (`size="sm"`, `headingLevel="3"`); si no, se muestra `emptyMessage`.',
    ],
    whenToUse: {
      title: 'Cuándo usarlo',
      items: [
        'Datos tabulares con cabeceras y filas.',
        'Columnas ordenables cuando el padre posee o delega el estado de orden.',
        'Elegir una o varias filas para acciones masivas, paneles de detalle o comparación.',
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
      {
        region: '`au-table`',
        detail:
          'Shell, cabecera, `<table>`, cuerpo, filas loading/vacío. Host: `data-au-striped`, `data-au-compact`, `data-au-sticky-header`, `data-au-loading`, `data-au-selection`.',
      },
      {
        region: 'Columna de selección',
        detail:
          'Se antepone si `selectionMode` ≠ `none`: checkbox en cabecera (multiple) o etiqueta sr-only (single), checkboxes por fila, `aria-selected` en filas.',
      },
      {
        region: '`au-table-column`',
        detail: 'Define `name`, `header`, `sortable`, `align`, `cellVariant`, `accessor` opcional.',
      },
      { region: '`auTableCell`', detail: 'Plantilla opcional para celdas ricas (badges, menús).' },
      {
        region: 'Fila vacía',
        detail:
          'Con `data` vacío, proyecta `au-empty-state` para placeholders ricos; si no, `emptyMessage`.',
      },
    ],
    accessibility: [
      'Conserva semántica nativa (`thead`, `tbody`, `th scope`).',
      'Botones de orden reales con `aria-sort` e iconos `au-icon`.',
      'Checkboxes con `selectAllLabel` / `selectRowLabel`; filas con `aria-selected`.',
      'Loading pone `aria-busy` en el host; la fila usa `au-spinner` con `loadingMessage` como `label`.',
    ],
    keyboard: [
      'Tab a botones de orden; Enter/Espacio alternan el ciclo.',
      'Tab a checkboxes de fila; Espacio alterna selección. Clic en fila también alterna si hay selección.',
    ],
    relatedExports: ['AuTable', 'AuTableColumn', 'AuTableCellDef', 'AuEmptyState'],
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
      { region: 'Disparador', detail: 'Elemento con `auTooltip` (p. ej. `button[auButton]`).' },
      { region: 'Globo', detail: 'Clase `.au-tooltip` en `document.body`.' },
    ],
    accessibility: [
      '`role="tooltip"` y `aria-describedby` en el host mientras está abierto.',
      'No contiene foco interactivo.',
    ],
  },
};
