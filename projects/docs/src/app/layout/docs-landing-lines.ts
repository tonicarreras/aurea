import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Fondo decorativo de la landing: pocas líneas suaves que cruzan la pantalla.
 */
@Component({
  selector: 'docs-landing-lines',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="docs-landing-lines"
      aria-hidden="true"
    >
      <svg
        class="docs-landing-lines__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- diagonal principal: esquina sup. izq. → inf. der. -->
        <line
          class="docs-landing-lines__stroke"
          x1="-12"
          y1="8"
          x2="112"
          y2="92"
        />
        <!-- cruce suave por el centro -->
        <line
          class="docs-landing-lines__stroke docs-landing-lines__stroke--soft"
          x1="95"
          y1="-8"
          x2="5"
          y2="58"
        />
        <!-- horizonte alto, casi paralelo al hero -->
        <line
          class="docs-landing-lines__stroke docs-landing-lines__stroke--faint"
          x1="-10"
          y1="24"
          x2="110"
          y2="36"
        />
        <!-- ligera pendiente en la zona del carrusel -->
        <line
          class="docs-landing-lines__stroke docs-landing-lines__stroke--soft"
          x1="-6"
          y1="62"
          x2="106"
          y2="54"
        />
      </svg>
    </div>
  `,
  styles: `
    :host {
      display: block;
      pointer-events: none;
    }

    .docs-landing-lines {
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: hidden;
    }

    .docs-landing-lines__svg {
      width: 100%;
      height: 100%;
      color: var(--au-color-action-primary);
    }

    .docs-landing-lines__stroke {
      stroke: currentColor;
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      opacity: 0.07;
    }

    .docs-landing-lines__stroke--soft {
      opacity: 0.05;
    }

    .docs-landing-lines__stroke--faint {
      opacity: 0.035;
    }

    :host-context([data-au-theme='dark']) .docs-landing-lines__stroke {
      opacity: 0.1;
    }

    :host-context([data-au-theme='dark']) .docs-landing-lines__stroke--soft {
      opacity: 0.07;
    }

    :host-context([data-au-theme='dark']) .docs-landing-lines__stroke--faint {
      opacity: 0.045;
    }

    @media (prefers-reduced-motion: reduce) {
      .docs-landing-lines__stroke {
        opacity: 0.04;
      }
    }
  `,
})
export class DocsLandingLines {}
