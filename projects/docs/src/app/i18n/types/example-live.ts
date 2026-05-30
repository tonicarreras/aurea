/** Live demo UI strings (component doc examples), keyed by component slug. */
export interface ExampleLiveMessages {
  autocomplete: {
    basic: { label: string; placeholder: string };
    error: { label: string; placeholder: string; errorMessage: string };
    hint: { label: string; placeholder: string; hint: string };
  };
  button: {
    primary: string;
    secondary: string;
    outline: string;
    ghost: string;
    loading: string;
    disabled: string;
    sizeSm: string;
    sizeMd: string;
    sizeLg: string;
  };
  card: {
    elevatedTitle: string;
    elevatedBody: string;
    outlinedTitle: string;
    outlinedBody: string;
    footerTitle: string;
    footerBody: string;
    footerAction: string;
  };
  checkbox: {
    terms: string;
    newsletter: string;
    selectAll: string;
  };
  chip: {
    removable: string;
  };
  chipGroup: {
    ariaLabel: string;
    draft: string;
    published: string;
    archived: string;
  };
  dialog: {
    confirmOpen: string;
    confirmTitle: string;
    confirmBody: string;
    cancel: string;
    delete: string;
    formOpen: string;
    formTitle: string;
    nameLabel: string;
    nameError: string;
    namePlaceholder: string;
    emailLabel: string;
    emailError: string;
    emailPlaceholder: string;
    save: string;
  };
  divider: {
    above: string;
    below: string;
    label: string;
  };
  formField: {
    emailLabel: string;
    emailPlaceholder: string;
    userLabel: string;
    userHint: string;
    userPlaceholder: string;
    emailErrorLabel: string;
    emailError: string;
    emailErrorPlaceholder: string;
  };
  inputDate: {
    basicLabel: string;
    errorLabel: string;
    errorMessage: string;
    hintLabel: string;
    hint: string;
  };
  inputNumber: {
    basicLabel: string;
    errorLabel: string;
    errorMessage: string;
    hintLabel: string;
    hint: string;
  };
  inputText: {
    emailLabel: string;
    emailPlaceholder: string;
    userLabel: string;
    userHint: string;
    userPlaceholder: string;
    emailErrorLabel: string;
    emailError: string;
    emailErrorPlaceholder: string;
  };
  list: {
    chipsAria: string;
    tagsHeading: string;
    labelledByChip: string;
  };
  message: {
    successTitle: string;
    successBody: string;
    errorBody: string;
    infoBody: string;
  };
  radioGroup: {
    basicLabel: string;
    errorLabel: string;
    errorMessage: string;
    hintLabel: string;
    hint: string;
  };
  select: {
    basicLabel: string;
    placeholder: string;
    errorLabel: string;
    errorMessage: string;
    hintLabel: string;
    hint: string;
  };
  snackbar: {
    showSuccess: string;
    successMessage: string;
    showError: string;
    errorMessage: string;
  };
  steps: {
    tabsAria: string;
    overview: string;
    api: string;
    overviewPanel: string;
    apiPanel: string;
    sectionsAria: string;
    intro: string;
    usage: string;
    introPanel: string;
    usagePanel: string;
  };
  switch: {
    push: string;
    airplane: string;
    errorMessage: string;
    privacy: string;
  };
  tabs: {
    ariaLabel: string;
    profile: string;
    security: string;
    profilePanel: string;
    securityPanel: string;
  };
  textarea: {
    commentLabel: string;
    commentPlaceholder: string;
    bioLabel: string;
    bioHint: string;
    bioPlaceholder: string;
    errorLabel: string;
    errorMessage: string;
  };
  tooltip: {
    topText: string;
    topButton: string;
    endText: string;
    endButton: string;
  };
  table: {
    caption: string;
    colName: string;
    colRole: string;
    colScore: string;
    colStatus: string;
    row1Name: string;
    row1Role: string;
    row2Name: string;
    row2Role: string;
    row3Name: string;
    row3Role: string;
    statusActive: string;
    statusAway: string;
    singleSelect: { title: string; description: string };
    multipleSelect: { title: string; description: string };
    customCell: { title: string; description: string };
    loading: { title: string; description: string; message: string };
  };
}
