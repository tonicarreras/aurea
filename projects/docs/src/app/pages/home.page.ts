import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuDivider } from '@aurea-design-system/components';

import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, RouterLink, AuButton, AuDivider],
  template: `
    <docs-page
      title="Aurea Design System"
      lead="Sistema de diseño para Angular 21: componentes accesibles, tokens semánticos y formularios con signals."
    >
      <p>
        Esta aplicación es la <strong>documentación oficial</strong> del paquete
        <code>@aurea-design-system/components</code>. Aquí encontrarás guías de instalación, temas y ejemplos
        interactivos de cada componente.
      </p>

      <au-divider />

      <h2>Explorar</h2>
      <ul>
        <li><a routerLink="/empezar">Empezar</a> — instalar y configurar en tu app.</li>
        <li><a routerLink="/temas">Temas y tokens</a> — modo claro/oscuro y variables CSS.</li>
        <li><a routerLink="/componentes">Componentes</a> — API, vistas previas y fragmentos de código.</li>
      </ul>

      <div class="docs-home-cta">
        <a routerLink="/componentes/button">
          <au-button variant="primary">Ver componentes</au-button>
        </a>
        <a routerLink="/empezar">
          <au-button variant="outline">Guía de instalación</au-button>
        </a>
      </div>
    </docs-page>
  `,
  styles: [
    `
      .docs-home-cta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--au-space-3);
        margin-top: var(--au-space-4);
      }

      .docs-home-cta a {
        text-decoration: none;
      }
    `,
  ],
})
export class HomePage {}
