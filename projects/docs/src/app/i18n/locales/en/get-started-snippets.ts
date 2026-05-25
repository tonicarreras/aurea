/** Copy-paste snippets for the Get started page (English). */
export const GET_STARTED_COMPONENT_SNIPPET = `import { AuButton, AuCheckbox, AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  imports: [AuButton, AuCheckbox, AuFormField, AuInputText],
  template: \`
    <au-form-field label="Email" [required]="true">
      <au-input-text type="email" placeholder="you@example.com" />
    </au-form-field>
    <au-checkbox label="Remember me" />
    <au-button variant="primary">Save</au-button>
  \`,
})
export class ProfileForm {}`;
