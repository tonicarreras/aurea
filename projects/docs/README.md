# Aurea — documentación oficial

App Angular que consume la librería desde el monorepo (`@aurea-design-system/components` → `projects/components/src`).

## Comandos

```bash
# Desde la raíz del repo
bun run docs
bun run build:docs
```

- **Dev:** [http://127.0.0.1:4200](http://127.0.0.1:4200)
- **Build:** `dist/docs/browser`

## Rutas

Todas las URLs llevan prefijo de idioma (`es` o `en`):

| Ruta | Descripción |
|------|-------------|
| `/es`, `/en` | Inicio |
| `/es/get-started`, `/en/get-started` | Instalación y primer uso |
| `/es/themes`, `/en/themes` | Tokens y modo claro/oscuro |
| `/es/components`, `/en/components` | Índice de componentes |
| `/es/components/:slug`, `/en/components/:slug` | Vista previa + documentación por componente |

`/` redirige a `/es`.

Storybook (`bun run storybook`) sigue siendo el entorno de desarrollo del DS; esta app es la documentación orientada a quien integra el paquete.
