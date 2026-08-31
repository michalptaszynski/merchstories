# merchstories

Static site, served as-is from the repo root (GitHub Pages).

## Editing pages

`index.html` and `product.html` at the repo root are **generated** — they
start with a `GENERATED FILE` comment and shouldn't be hand-edited.

The real source lives in:

- `src/pages/` — one template per page
- `src/partials/` — shared fragments (nav header, password gate, logo mark,
  `<head>` links), pulled into templates via
  `<!--#include file="name.html" KEY="value" -->`. Includes can nest and
  take simple `{{KEY}}` string params (see `logo-mark.html`'s `MASK_ID`).

After editing anything in `src/`, rebuild the root pages:

```
node build.js
```

(or `npm run build`). Commit both the `src/` change and the regenerated
`index.html` / `product.html` — GitHub Pages serves the root files
directly, there's no CI build step.

## Design tokens

All colors, spacing, radii, shadows, motion durations/easing, and z-index
layers are defined once in `tokens.css` and consumed via `var(--token)` in
`base.css` / `components.css`. Don't hand-roll a hex color, shadow, or
duration in a component rule — add or reuse a token instead. Breakpoints
(560 / 700 / 900 / 1180px) can't be custom properties inside `@media`, so
they're documented at the bottom of `tokens.css` and used as literals.
