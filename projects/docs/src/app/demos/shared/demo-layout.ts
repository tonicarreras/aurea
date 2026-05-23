/** Anchura estándar de controles en previews (ver también `demo-preview.css`). */
export const DEMO_PREVIEW_FIELD_WIDTH = '18rem';

/** Shared layout styles for docs demo components. */
export const DEMO_ROW = `
  .docs-demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--au-space-3);
    align-items: center;
    justify-content: center;
  }
`;

export const DEMO_STACK = `
  .docs-demo-stack {
    display: flex;
    flex-direction: column;
    gap: var(--au-space-3);
    width: 100%;
  }
`;

export const DEMO_ROW_TIGHT = `
  .docs-demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--au-space-2);
    justify-content: center;
    align-items: center;
  }
`;
