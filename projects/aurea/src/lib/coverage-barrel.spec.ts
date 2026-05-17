import * as button from './button/index';
import * as checkbox from './checkbox/index';
import * as inputText from './input-text/index';
import * as select from './select/index';
import * as textarea from './textarea/index';
import * as theme from './theme/index';

describe('library barrel exports', () => {
  it('re-exports all public components', () => {
    expect(button.Button).toBeDefined();
    expect(checkbox.Checkbox).toBeDefined();
    expect(inputText.InputText).toBeDefined();
    expect(select.Select).toBeDefined();
    expect(textarea.Textarea).toBeDefined();
    expect(theme.AuTheme).toBeDefined();
  });
});
