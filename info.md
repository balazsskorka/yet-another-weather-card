## Yet Another Weather Card

Yes, the world needed another one. A custom weather card with animated SVG icons, toggleable hourly/daily forecast, location-based weather via GPS or device tracker, and support for custom temperature/humidity/pressure sensors.

**Features**
- Full visual editor — no YAML required
- Animated SVG icons (sun, clouds, rain, snow, lightning, fog, wind, hail) — optionally disabled
- Hourly ⇄ Daily forecast toggle (live via WebSocket)
- **Location-based weather** — fetch weather for any GPS coordinate or track a `device_tracker` / `person` entity (powered by [Open-Meteo](https://open-meteo.com/), free, no API key)
- Custom sensor entities override weather entity attributes
- Multi-language: English, Deutsch, Français, Magyar
- Theme-aware (light & dark mode)
- Respects `prefers-reduced-motion`

**Entity mode (existing behaviour)**

```yaml
type: custom:yet-another-weather-card
entity: weather.home
```

**Location mode — fixed coordinates**

```yaml
type: custom:yet-another-weather-card
latitude: 48.8566
longitude: 2.3522
name: Paris
```

**Location mode — device tracker**

```yaml
type: custom:yet-another-weather-card
location_entity: person.john
name: John's Weather
```

See the README for full configuration options.
