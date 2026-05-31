/** Opens the browser-native date/time picker when {@link HTMLInputElement.showPicker} is available. */
export function openNativePicker(input: HTMLInputElement): void {
  if (typeof input.showPicker === 'function') {
    try {
      input.showPicker();
      return;
    } catch {
      /* showPicker may throw outside a user gesture or in unsupported states */
    }
  }
  input.focus();
}
