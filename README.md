# Yet Another Weather Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/YOUR_GITHUB_USERNAME/yet-another-weather-card.svg)](https://github.com/YOUR_GITHUB_USERNAME/yet-another-weather-card/releases)
[![License](https://img.shields.io/github/license/YOUR_GITHUB_USERNAME/yet-another-weather-card.svg)](LICENSE)

Yes, the world needed another one. A custom weather card for Home Assistant with animated SVG icons, toggleable hourly/daily forecast, and support for custom temperature, humidity, and pressure sensor entities.

<img width="507" height="516" alt="image" src="https://github.com/user-attachments/assets/398de63d-e99d-4fca-bbf9-b2c9b65093ef" />


## Features

- **Visual editor** — full GUI configuration, no YAML required
- **Animated SVG icons** — rotating sun, drifting clouds, falling rain, tumbling snow, flickering lightning, shifting fog
- **Live forecast** — uses the modern `weather/subscribe_forecast` WebSocket API (HA 2024+), no polling
- **Hourly ⇄ Daily toggle** — automatically appears when both forecast types are available
- **Custom sensor entities** — override the weather entity's temperature, humidity, and pressure readings with your own sensors (e.g. an Ecowitt GW3000)
- **Theme-aware** — uses Home Assistant CSS variables, looks correct in both light and dark mode
- **Reduced-motion friendly** — respects `prefers-reduced-motion: reduce`

## Installation via HACS

### 1. Add this repository as a custom repository

1. In Home Assistant, open **HACS**
2. Click the three-dots menu in the top right → **Custom repositories**
3. Add:
   - **Repository**: `https://github.com/YOUR_GITHUB_USERNAME/yet-another-weather-card`
   - **Type**: `Dashboard`
4. Click **Add**

### 2. Install

1. Search for **Yet Another Weather Card** in HACS
2. Click **Download**, then **Download** again to confirm
3. **Hard-refresh** your browser (Ctrl/Cmd + Shift + R)

HACS adds the resource automatically. If for some reason it doesn't, add it manually under **Settings → Dashboards → Resources**:

- URL: `/hacsfiles/yet-another-weather-card/yet-another-weather-card.js`
- Type: **JavaScript Module**

### 3. Add the card to your dashboard

```yaml
type: custom:yet-another-weather-card
entity: weather.your_weather_entity
```

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | **required** | A `weather.*` entity |
| `name` | string | friendly name | Title shown above the temperature |
| `temperature_entity` | string | — | Custom sensor for current temperature (falls back to weather attribute) |
| `humidity_entity` | string | — | Custom sensor for humidity |
| `pressure_entity` | string | — | Custom sensor for pressure |
| `default_mode` | `hourly` \| `daily` | `hourly` | Which forecast tab is active initially |
| `forecast_items` | number | `7` | Number of forecast cells to show |
| `forecast_style` | `strip` \| `graph` \| `both` | `strip` | How to display the forecast — cells with icons, a temperature graph, or both |
| `language` | `en` \| `de` \| `hu` | Home Assistant locale | UI language for condition names and labels |
| `show_current` | boolean | `true` | Show top block (temp + icon + condition) |
| `show_stats` | boolean | `true` | Show humidity / pressure / wind row |
| `show_forecast` | boolean | `true` | Show forecast strip |

## Example configurations

**Minimal**

```yaml
type: custom:yet-another-weather-card
entity: weather.home
```

**With custom sensors**

```yaml
type: custom:yet-another-weather-card
entity: weather.met_no
name: Home
temperature_entity: sensor.outdoor_temperature
humidity_entity: sensor.outdoor_humidity
pressure_entity: sensor.outdoor_pressure
default_mode: hourly
forecast_items: 7
```

## Supported weather conditions

`sunny`, `clear`, `clear-night`, `partlycloudy`, `cloudy`, `fog`, `rainy`, `pouring`, `snowy`, `snowy-rainy`, `lightning`, `lightning-rainy`, `windy`, `windy-variant`, `hail`, `exceptional`. Unknown conditions render a generic cloud.

## License

MIT
