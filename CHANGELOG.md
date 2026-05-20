# Changelog

## 1.4.2 — 2026-05-20

### Changed
- Graph labels actually visible now. The root cause was that SVG text scales with the viewBox, so the previous "13 px" font-size was being rendered at ~9-10 px once the SVG was scaled to fit the card. Fixed by (a) shrinking the viewBox width (600 → 400) so it more closely matches the rendered card width, and (b) bumping the SVG font-sizes to 16/14/13 so they actually read at strip-equivalent sizes. Graph height grew to 150 to make room.
- Data point circles slightly larger (r=3 → r=3.5) to remain visually balanced with the bigger labels.

## 1.4.1 — 2026-05-20

### Changed
- Graph label sizes now match the strip cells: high temperatures 13 px (was 11), low temperatures and time/day labels 11 px (was 10). Padding around the chart grew slightly to keep the bigger labels from clipping or colliding with the curves.

## 1.4.0 — 2026-05-20

### Added
- `forecast_style` config option with three values:
  - `strip` (default, existing behavior) — cells with icons and temperatures
  - `graph` — filled-area temperature chart with smooth curves between high (solid amber line) and low (dashed blue line). Each data point labeled with the high value above and low value below; time/day labels along the bottom
  - `both` — graph rendered above the cell strip
- When the forecast data has no `templow` (typically hourly forecasts), the graph degrades gracefully to a single high line with no area fill.

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
