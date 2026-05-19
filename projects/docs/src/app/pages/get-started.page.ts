import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CodeBlock } from '../shared/code-block';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, CodeBlock],
  template: `
    <docs-page
      title="Empezar"
      lead="Instala el paquete publicado y conecta tokens y componentes en tu aplicación Angular 21."
    >
      <h2>Requisitos</h2>
      <ul>
        <li>Angular 21.2+</li>
        <li>Node 20.19+ en el toolchain del proyecto</li>
      </ul>

      <h2>Instalación</h2>
      <docs-code-block [code]="installSnippet" />

      <h2>Tokens globales</h2>
      <p>Importa los estilos semánticos en <code>angular.json</code> o en tu hoja global:</p>
      <docs-code-block [code]="stylesSnippet" />

      <h2>Primer componente</h2>
      <docs-code-block [code]="componentSnippet" />

      <h2>Desarrollo en este monorepo</h2>
      <p>
        La app de documentación consume la librería desde el código fuente del workspace
        (<code>projects/components</code>). Para trabajar en el design system:
      </p>
      <docs-code-block [code]="monorepoSnippet" />
    </docs-page>
  `,
})
export class GetStartedPage {
  readonly installSnippet = `bun add @aurea
# o
npm install @aurea`;

  readonly stylesSnippet = `@import '@aurea/styles/au-tokens.css';
@import '@aurea/styles/au-field-error.css';
@import '@aurea/styles/au-field-listbox.css';`;

  readonly componentSnippet = `import { AuButton, AuCheckbox } from '@aurea';

@Component({
  imports: [AuButton, AuCheckbox],
  template: \`
    <au-button variant="primary">Guardar</au-button>
    <au-checkbox label="Recordarme" />
  \`,
})
export class ProfileForm {}`;

  readonly monorepoSnippet = `bun install
bun run docs          # documentación oficial (esta app)
bun run storybook     # catálogo interactivo + pruebas`;
}
