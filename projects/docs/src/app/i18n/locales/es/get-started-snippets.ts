/** Fragmentos para copiar en la página Empezar (español). */
export const GET_STARTED_COMPONENT_SNIPPET = `import { AuButton, AuCheckbox, AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  imports: [AuButton, AuCheckbox, AuFormField, AuInputText],
  template: \`
    <au-form-field label="Email" [required]="true">
      <au-input-text type="email" placeholder="tu@correo.com" />
    </au-form-field>
    <au-checkbox label="Recordarme" />
    <au-button variant="primary">Guardar</au-button>
  \`,
})
export class ProfileForm {}`;
