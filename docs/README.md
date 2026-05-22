# Documentación del monorepo Aurea

Índice de guías de **gobernanza, producto y diseño** del repositorio. Lo que debe quedar en la raíz por convención de GitHub/npm está en el [README](../README.md) del repo.

## En la raíz del repositorio

| Archivo | Motivo |
|---------|--------|
| [README.md](../README.md) | Entrada del proyecto |
| [CHANGELOG.md](../CHANGELOG.md) | Historial de versiones (Keep a Changelog) |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | GitHub muestra esta ruta a contribuidores |
| [SECURITY.md](../SECURITY.md) | Política de seguridad (GitHub Security tab) |

## En este directorio (`docs/`)

| Tema | Archivo |
|------|---------|
| Visión de diseño y tokens | [DESIGN.md](./DESIGN.md) |
| Plan público y fases | [ROADMAP.md](./ROADMAP.md) |
| Semver y releases | [VERSIONING.md](./VERSIONING.md) · [RELEASE.md](./RELEASE.md) |
| Criterios 1.0.0 | [V1_CRITERIA.md](./V1_CRITERIA.md) |
| Deprecaciones | [DEPRECATION.md](./DEPRECATION.md) |
| Angular soportado | [ANGULAR_COMPATIBILITY.md](./ANGULAR_COMPATIBILITY.md) |
| Primeras contribuciones | [GOOD_FIRST_ISSUES.md](./GOOD_FIRST_ISSUES.md) |

## En `projects/` (por convención de cada paquete)

| Paquete | Documentación |
|---------|----------------|
| Librería | [projects/components/README.md](../projects/components/README.md) |
| | [COMPONENT_DONE.md](../projects/components/COMPONENT_DONE.md) · [A11Y_AUDIT.md](../projects/components/A11Y_AUDIT.md) · [BUNDLE.md](../projects/components/BUNDLE.md) · [PERFORMANCE.md](../projects/components/PERFORMANCE.md) |
| Sitio docs | [projects/docs/README.md](../projects/docs/README.md) |
| Tokens Figma | [projects/design-tokens/README.md](../projects/design-tokens/README.md) |

La documentación **pública** para consumidores vive en [aurea-ds.netlify.app](https://aurea-ds.netlify.app/) y [Storybook](https://aurea-ds-storybook.netlify.app/).
