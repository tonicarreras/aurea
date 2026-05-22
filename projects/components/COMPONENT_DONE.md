# Definition of Done — componente Aurea

Checklist obligatorio antes de marcar un componente como **stable** o publicar una versión MINOR que lo promueva.

## 1. Código y API

- [ ] Selector `au-*` estable y documentado.
- [ ] Inputs/outputs con signals (`input`, `model`, `output`).
- [ ] Export en `public-api.ts`.
- [ ] Entrada en `COMPONENT_MATURITY` (`component-maturity.ts`).
- [ ] Sin dependencias circulares ni estilos con colores literales (solo `--au-*`).

## 2. Pruebas

- [ ] `*.spec.ts` con casos de render, estados disabled/invalid, y eventos principales.
- [ ] Si aplica `ControlValueAccessor` o `FormValueControl`: prueba de integración mínima con formularios.

## 3. Storybook

- [ ] Story por variante visual relevante.
- [ ] Story **signal forms** si el control implementa `FormValueControl`.
- [ ] Autodocs con descripción de inputs públicos.

## 4. Documentación (sitio docs + Storybook)

- [ ] Entrada en `component-docs.registry.ts` con slug, summary, snippet, demo.
- [ ] Overview en `i18n/locales/{en,es}/overview.ts` (intro, cuándo usar, anatomía, accesibilidad, teclado si aplica).
- [ ] API en `i18n/locales/{en,es}/api.ts` (imports, inputs/outputs por sección).
- [ ] Tokens en `i18n/locales/{en,es}/styling.ts` (o justificación de `DEFAULT_COMPONENT_STYLING`).
- [ ] Storybook: `buildStoryDocsOverview` + `argTypes` con `table.category` + `extractArgTypes: () => ({})`.
- [ ] Preview en carrusel landing si es componente “hero” (opcional).

## 5. Accesibilidad

- [ ] Foco visible (`--au-shadow-focus-ring`).
- [ ] Etiquetas asociadas vía `au-form-field` o `aria-*` documentados.
- [ ] Contraste AA en light y dark (y high-contrast si aplica).
- [ ] Sin regresiones listadas en `A11Y_AUDIT.md` para este selector.

## 6. Temas y densidad

- [ ] Funciona con `data-au-theme` light/dark.
- [ ] Alturas de campo respetan `--au-size-field-h-*` (densidad `data-au-density`).

## 7. Publicación

- [ ] `CHANGELOG.md` actualizado.
- [ ] Si breaking: entrada en [docs/VERSIONING.md](../../docs/VERSIONING.md) / nota de migración.

## Niveles de madurez

| Nivel            | Requisito mínimo                           |
| ---------------- | ------------------------------------------ |
| **experimental** | API pública + story básica                 |
| **beta**         | DoD §1–3 completo; a11y revisada           |
| **stable**       | DoD completo + cobertura a11y en auditoría |
