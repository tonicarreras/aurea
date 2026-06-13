/** Fragmentos para copiar en la página Empezar (español). */
export const GET_STARTED_COMPONENT_SNIPPET = `import { AuButton, AuCheckbox, AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  imports: [AuButton, AuCheckbox, AuFormField, AuInputText],
  template: \`
    <au-form-field label="Email" [required]="true">
      <input auInputText type="email" placeholder="tu@correo.com" />
    </au-form-field>
    <input type="checkbox" auCheckbox label="Recordarme" />
    <button auButton variant="primary">Guardar</button>
  \`,
})
export class ProfileForm {}`;
