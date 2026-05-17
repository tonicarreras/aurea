import * as button from './button/index';
import * as checkbox from './checkbox/index';
import * as inputNumber from './input-number/index';
import * as inputText from './input-text/index';
import * as radioGroup from './radio-group/index';
import * as select from './select/index';
import * as switchMod from './switch/index';
import * as textarea from './textarea/index';
import * as theme from './theme/index';

describe('library barrel exports', () => {
  it('re-exports all public components', () => {
    expect(button.Button).toBeDefined();
    expect(checkbox.Checkbox).toBeDefined();
    expect(inputNumber.InputNumber).toBeDefined();
    expect(inputText.InputText).toBeDefined();
    expect(radioGroup.RadioGroup).toBeDefined();
    expect(select.Select).toBeDefined();
    expect(switchMod.Switch).toBeDefined();
    expect(textarea.Textarea).toBeDefined();
    expect(theme.AuTheme).toBeDefined();
  });
});
