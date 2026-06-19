# Composition philosophy

How Aurea primitives, tokens, and application CSS divide responsibility. Inspired by disciplined DS composition (see ng-brutalism’s three-layer model), adapted for Aurea’s CSS-token architecture — **no Tailwind required**.

## Three layers

| Layer | Owns | Examples |
| ----- | ---- | -------- |
| **Aurea primitives** | Visual grammar, anatomy, a11y, interaction | `variant`, `size`, `[auStack] gap`, `au-form-field`, overlays |
| **Design tokens** | Theme, density, semantic color, elevation roles | `--au-color-*`, `--au-elevation-*`, `--au-gap-stack` |
| **Application CSS** | Page layout, max-width, breakpoints, one-off art direction | `max-width`, `grid-template-columns`, marketing geometry |

> Use Aurea inputs for **common design decisions**.  
> Use `--au-{component}-*` variables for **local art direction**.  
> Use app CSS for **layout escape hatches**.

## Layout grammar

Prefer layout directives over ad-hoc flex in examples:

```html
<au-card>
  <div auSection padding="lg" divider="bottom">
    <div auStack gap="md">
      <h3 auCardHeader>Settings</h3>
      <p auCardBody>Manage your account.</p>
    </div>
  </div>
  <div auCardFooter>
    <div auCluster gap="sm" justify="end">
      <button auButton variant="ghost">Cancel</button>
      <button auButton>Save</button>
    </div>
  </div>
</au-card>
```

## Button vs typography

The button owns density, variant, focus, and loading. Label typography comes from content or app styles — do not add `fontSize` / `weight` inputs to `auButton`.

```html
<!-- Default: token typography inside button -->
<button auButton>Subscribe</button>

<!-- Expressive label: wrap in styled span in the app layer -->
<button auButton variant="outline">
  <span class="marketing-cta">Listen now</span>
</button>
```

## Forms

- **Shell:** `au-form-field` (label, hint, error, listbox anchor).
- **Control:** native directive (`auInputText`, `auSelect`, …).
- **State:** `[formField]` on signal forms, or `[(value)]` + manual invalid.

Do not duplicate `label` on the inner control when `au-form-field` already provides one.

## Recipes, not domain components

Ship **recipes** in docs (filter bar, settings row, dashboard card) composed from primitives. Avoid `au-job-card`-style domain widgets in the core library.

See the docs guide `/guides/recipes`.

## When to add a new input

Add an input when:

- The decision appears in **≥3** recipes or components with the same semantics.
- It maps cleanly to an existing token or capability.

Reach for CSS variables or app layout when:

- The tweak is **page-specific** (hero width, asymmetric grid).
- It would duplicate Tailwind-like arbitrary geometry in the DS API.
