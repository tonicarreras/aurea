# AGENTS.md — Aurea Design System

Repo: **`aurea`** / npm `@aurea-design-system/components`. Consumido por **mirea-web**.

## Antes de codificar

1. Skill de proyecto: `.agents/skills/aurea-ds` (obligatoria en este repo).
2. Angular genérico: skill global `angular-developer` (`~/.agents/skills/` o `~/.cursor/skills/`) — no hay copia en el repo.
3. Tooling de agentes: **Cursor** (`.cursor/` si existe; skills de producto en `.agents/skills/`, gitignored).

## Skills locales (`.agents/skills/`)

| Skill                       | Cuándo                                              |
| --------------------------- | --------------------------------------------------- |
| `aurea-ds`                  | Componentes, Storybook, exports, tokens, schematics |
| `vitest`                    | Unit tests de la librería                           |
| `playwright-best-practices` | Visual / docs E2E Playwright                        |
| `bun`                       | Tooling Bun                                         |
| `accessibility`             | WCAG en componentes                                 |

`skills-lock.json` fija hashes de las skills vendor instaladas vía autoskills.

## Reglas de oro

- Prefijo `au-` en componentes; primitivas nativas como attribute directives (`button[auButton]`, etc.).
- `input()` / `output()` / `model()`; `OnPush`; sin `standalone: true` redundante.
- WCAG 2.2 AA en flujos primarios.
- Engram del DS: proyecto `aurea-ds` (separado de `mirea`).

## Comandos útiles

```bash
bun install
bun run storybook
bun run docs
bun run test
bun run test:visual
bun run ci:fast
```
