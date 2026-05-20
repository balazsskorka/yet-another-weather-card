# Changelog

## 1.3.0 — 2026-05-20

### Added
- `language` option supporting `en`, `de`, `hu`. Defaults to your Home Assistant UI language; falls back to English. All condition names and UI labels (Hourly/Daily/Now/Today/Humidity/Pressure/Wind) are translated. Weekday and time formatting also follows the chosen language.

### Fixed
- Condition text no longer renders as one-word jumbles like "Partlycloudy" or "Snowyrainy" — now properly displayed as "Partly cloudy", "Snowy, rainy", etc.

## 1.2.0 — 2026-05-20

### Changed
- Icons enlarged ~50%: header icon 88 → 132 px, forecast icons 36 → 54 px.

## 1.1.0 — 2026-05-20

### Fixed
- **Icons now render correctly.** SVG-child content is now tagged with lit-html's `svg` template literal instead of `html`, which the previous version incorrectly used. The HTML parser was discarding `<circle>`, `<rect>`, `<g>` and similar SVG elements because they weren't being placed in the SVG namespace, leaving icons invisible.
- Lit is now loaded from `cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js` (Lit 3, the same major version Home Assistant uses internally) instead of `unpkg.com/lit-element@2.5.1`. This is more reliable and includes the `svg` export needed for the fix above.

### Added
- Visual editor (`getConfigElement`) — full GUI configuration via `ha-form`. Entity pickers, dropdowns, toggles, all themed correctly.
- Card picker preview thumbnail (`preview: true`).

## 1.0.0
Initial release.
