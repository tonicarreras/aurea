# Aurea — documentación oficial

App Angular que consume la librería desde el monorepo (`@aurea-design-system/components` → `projects/components/src`).

## Comandos

```bash
# Desde la raíz del repo
bun run docs
bun run build:docs
```

- **Producción:** [https://aurea-ds.netlify.app/](https://aurea-ds.netlify.app/)
- **Dev:** [http://127.0.0.1:4200](http://127.0.0.1:4200)
- **Build:** `dist/docs/browser`

## Rutas

Todas las URLs llevan prefijo de idioma (`es` o `en`):

| Ruta | Descripción |
|------|-------------|
| `/es`, `/en` | **Landing de diseño** (sin sidebar): principios, sistema, previews |
| `/es/components`, … | **Documentación** (con sidebar): índice, API, ejemplos |
| `/es/get-started`, … | Instalación |
| `/es/themes`, … | Tokens y temas |
| `/es/components/:slug`, … | Página por componente |

`/` redirige a `/es`. El botón **Documentación** en la landing abre el catálogo (`/components`).

Storybook: [https://aurea-ds-storybook.netlify.app/](https://aurea-ds-storybook.netlify.app/) — referencia técnica interactiva.
