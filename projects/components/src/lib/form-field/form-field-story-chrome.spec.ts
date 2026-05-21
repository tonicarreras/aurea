import { AuFormField } from './form-field';
import { AuInputText } from '../input-text/input-text';
import {
  defaultFieldChromeArgs,
  formFieldControlRender,
  formFieldHintOnlyRender,
} from './form-field-story-chrome';

describe('formFieldControlRender', () => {
  it('returns au-form-field template with chrome bindings', () => {
    const args = { ...defaultFieldChromeArgs, label: 'Email' };
    const result = formFieldControlRender(
      [AuFormField, AuInputText],
      args,
      '<au-input-text />',
    );

    expect(result.props).toBe(args);
    expect(result.moduleMetadata.imports).toEqual([AuFormField, AuInputText]);
    expect(result.template).toContain('[label]="label"');
    expect(result.template).toContain('[controlIdInput]="controlIdInput"');
    expect(result.template).toContain('<au-input-text />');
  });
});

describe('formFieldHintOnlyRender', () => {
  it('omits label binding on au-form-field', () => {
    const args = {
      hint: 'Hint',
      errorMessage: '',
      invalid: false,
      required: false,
      controlIdInput: 'x',
    };
    const result = formFieldHintOnlyRender([AuFormField], args, '<au-switch />');

    expect(result.template).not.toContain('[label]="label"');
    expect(result.template).toContain('[hint]="hint"');
    expect(result.template).toContain('<au-switch />');
  });
});
