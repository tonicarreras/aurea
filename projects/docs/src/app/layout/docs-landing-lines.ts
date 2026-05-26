import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Fondo decorativo de la landing: espiral áurea (Fibonacci) derivada de `public/aurea.svg`.
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
        viewBox="0 0 570 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(10, 10)">
          <rect
            class="docs-landing-lines__box"
            x="0"
            y="0"
            width="340"
            height="340"
          />
          <rect
            class="docs-landing-lines__box"
            x="340"
            y="0"
            width="210"
            height="210"
          />
          <rect
            class="docs-landing-lines__box"
            x="420"
            y="210"
            width="130"
            height="130"
          />
          <rect
            class="docs-landing-lines__box"
            x="340"
            y="260"
            width="80"
            height="80"
          />
          <rect
            class="docs-landing-lines__box"
            x="340"
            y="210"
            width="50"
            height="50"
          />
          <rect
            class="docs-landing-lines__box"
            x="390"
            y="210"
            width="30"
            height="30"
          />
          <rect
            class="docs-landing-lines__box"
            x="400"
            y="240"
            width="20"
            height="20"
          />
          <rect
            class="docs-landing-lines__box"
            x="390"
            y="250"
            width="10"
            height="10"
          />
          <rect
            class="docs-landing-lines__box"
            x="390"
            y="240"
            width="10"
            height="10"
          />
          <path
            class="docs-landing-lines__spiral"
            d="M 0 340
               A 340 340 0 0 1 340 0
               A 210 210 0 0 1 550 210
               A 130 130 0 0 1 420 340
               A 80 80 0 0 1 340 260
               A 50 50 0 0 1 390 210
               A 30 30 0 0 1 420 240
               A 20 20 0 0 1 400 260
               A 10 10 0 0 1 390 250
               A 10 10 0 0 1 400 240"
          />
        </g>
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
      position: absolute;
      width: min(172vmin, 76rem);
      height: auto;
      top: clamp(-5rem, 0vh, 0);
      left: clamp(40%, 56vw, 64%);
      right: auto;
      transform: translateX(-22%);
      opacity: 1;
    }

    .docs-landing-lines__box {
      fill: none;
      stroke: var(--docs-aurea-box-stroke);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .docs-landing-lines__spiral {
      fill: none;
      stroke: var(--docs-aurea-spiral-stroke);
      stroke-width: 1.15;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }

    :host-context([data-au-theme='dark']) .docs-landing-lines__box {
      stroke-width: 1.05;
    }

    @media (max-width: 48rem) {
      .docs-landing-lines__svg {
        width: min(176vmin, 50rem);
        top: -2.5rem;
        left: 64%;
        transform: translateX(-36%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .docs-landing-lines__svg {
        opacity: 0.72;
      }
    }
  `,
})
export class DocsLandingLines {}
