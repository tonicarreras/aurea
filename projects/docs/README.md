# Aurea — documentación oficial

App Angular que consume la librería desde el monorepo (`@aurea-ds/aurea` → `projects/components/src`).

## Comandos

```bash
# Desde la raíz del repo
bun run docs
bun run build:docs
```

- **Dev:** [http://127.0.0.1:4200](http://127.0.0.1:4200)
- **Build:** `dist/docs/browser`

## Contenido

| Ruta | Descripción |
|------|-------------|
| `/` | Introducción |
| `/empezar` | Instalación y primer uso |
| `/temas` | Tokens y modo claro/oscuro |
| `/componentes` | Índice de componentes |
| `/componentes/:slug` | Vista previa + snippet por componente |

Storybook (`bun run storybook`) sigue siendo el entorno de desarrollo del DS; esta app es la documentación orientada a quien integra el paquete.
