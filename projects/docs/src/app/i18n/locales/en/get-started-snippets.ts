/** Copy-paste snippets for the Get started page (English). */
export const GET_STARTED_COMPONENT_SNIPPET = `import { AuButton, AuCheckbox, AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  imports: [AuButton, AuCheckbox, AuFormField, AuInputText],
  template: \`
    <au-form-field label="Email" [required]="true">
      <input auInputText type="email" placeholder="you@example.com" />
    </au-form-field>
    <input type="checkbox" auCheckbox label="Remember me" />
    <button auButton variant="primary">Save</button>
  \`,
})
export class ProfileForm {}`;
