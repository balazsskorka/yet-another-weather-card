/**
 * Yet Another Weather Card
 * ───────────────────
 * A beautiful Home Assistant Lovelace card with animated SVG weather icons,
 * toggleable hourly/daily forecast, and support for custom temperature,
 * humidity, and pressure sensor entities.
 *
 * Version: 1.4.2
 * Author:  Balazs Skorka
 *
 * Installation (manual, easiest):
 *   1. Copy this file to /config/www/yet-another-weather-card.js
 *   2. Settings → Dashboards → Resources → Add Resource
 *        URL : /local/yet-another-weather-card.js
 *        Type: JavaScript Module
 *   3. Hard refresh your browser (Ctrl/Cmd + Shift + R).
 *   4. Add a card to your dashboard:
 *        type: custom:yet-another-weather-card
 *        entity: weather.your_weather_entity
 *
 * Installation (HACS):
 *   HACS → Frontend → ⋮ → Custom repositories → add your GitHub repo URL
 *   as a "Lovelace" category, then install from the list.
 */

// Lit imports. We use lit v3 from jsdelivr (HA itself uses lit 3 internally).
// CRITICAL: we must import `svg` as well as `html`/`css` because SVG-child
// content (everything inside <svg>...</svg>) must be tagged with svg`...`
// rather than html`...` to be parsed in the correct namespace.
import {
  LitElement,
  html,
  css,
  svg,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js";

class YetAnotherWeatherCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _forecastHourly: { type: Array },
      _forecastDaily: { type: Array },
      _mode: { type: String },
    };
  }

  constructor() {
    super();
    this._forecastHourly = [];
    this._forecastDaily = [];
    this._mode = "hourly";
    this._unsubHourly = null;
    this._unsubDaily = null;
    this._subscribed = false;
  }

  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("You need to define a weather entity");
    }
    if (!config.entity.startsWith("weather.")) {
      throw new Error("entity must be a weather.* entity");
    }
    this._config = {
      default_mode: "hourly",
      show_current: true,
      show_forecast: true,
      show_stats: true,
      forecast_items: 7,
      forecast_style: "strip",
      ...config,
    };
    this._mode = this._config.default_mode;
  }

  set hass(value) {
    this._hass = value;
    if (!this._subscribed && value) {
      this._subscribed = true;
      this._subscribeForecasts();
    }
    this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeForecasts();
    this._subscribed = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._hass && !this._subscribed) {
      this._subscribed = true;
      this._subscribeForecasts();
    }
  }

  // ── Forecast subscriptions (modern HA WebSocket API) ─────
  async _subscribeForecasts() {
    if (!this._hass || !this._config) return;
    this._unsubscribeForecasts();

    const tryType = async (type) => {
      try {
        return await this._hass.connection.subscribeMessage(
          (msg) => {
            if (type === "hourly") this._forecastHourly = msg.forecast || [];
            else this._forecastDaily = msg.forecast || [];
            this.requestUpdate();
          },
          {
            type: "weather/subscribe_forecast",
            forecast_type: type,
            entity_id: this._config.entity,
          }
        );
      } catch (e) {
        // This forecast_type is not supported by the integration
        return null;
      }
    };

    this._unsubHourly = await tryType("hourly");
    this._unsubDaily = await tryType("daily");
  }

  _unsubscribeForecasts() {
    if (this._unsubHourly) {
      try { this._unsubHourly(); } catch (e) {}
      this._unsubHourly = null;
    }
    if (this._unsubDaily) {
      try { this._unsubDaily(); } catch (e) {}
      this._unsubDaily = null;
    }
  }

  // ── Value resolver: custom sensor wins, weather attr is fallback
  _resolveValue(customEntity, weatherAttr, defaultUnit) {
    const weather = this._hass.states[this._config.entity];
    if (customEntity && this._hass.states[customEntity]) {
      const s = this._hass.states[customEntity];
      const num = parseFloat(s.state);
      return {
        value: isNaN(num) ? s.state : num,
        unit: s.attributes.unit_of_measurement || defaultUnit || "",
      };
    }
    if (weather && weather.attributes[weatherAttr] != null) {
      return {
        value: weather.attributes[weatherAttr],
        unit:
          weather.attributes[`${weatherAttr}_unit`] ||
          defaultUnit ||
          "",
      };
    }
    return null;
  }

  _fmt(v, decimals = 1) {
    if (v == null || v === "") return "—";
    if (typeof v !== "number") return v;
    return decimals === 0 ? Math.round(v).toString() : v.toFixed(decimals);
  }

  _isDay(dt) {
    if (!dt) {
      const sun = this._hass.states["sun.sun"];
      return !sun || sun.state === "above_horizon";
    }
    const h = new Date(dt).getHours();
    return h >= 6 && h < 20;
  }

  _formatTime(dt) {
    return new Date(dt).toLocaleTimeString(
      this._lang() || this._hass.locale?.language || "en",
      { hour: "2-digit", minute: "2-digit", hour12: false }
    );
  }

  _formatDay(dt) {
    const d = new Date(dt);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return this._t("today");
    return d.toLocaleDateString(
      this._lang() || this._hass.locale?.language || "en",
      { weekday: "short" }
    );
  }

  // ── Translations ─────────────────────────────────────────
  //
  // Strings used by the card, translated for en/de/hu. The keys for weather
  // conditions match Home Assistant's canonical condition strings:
  // https://www.home-assistant.io/integrations/weather/#condition-mapping
  //
  // _lang() resolves the active language: explicit config option wins, then
  // the user's HA UI locale, then English as the ultimate fallback.
  static get translations() {
    return {
      en: {
        // Conditions
        "clear-night": "Clear night",
        cloudy: "Cloudy",
        exceptional: "Exceptional",
        fog: "Fog",
        hail: "Hail",
        lightning: "Lightning",
        "lightning-rainy": "Lightning, rainy",
        partlycloudy: "Partly cloudy",
        pouring: "Pouring",
        rainy: "Rainy",
        snowy: "Snowy",
        "snowy-rainy": "Snowy, rainy",
        sunny: "Sunny",
        windy: "Windy",
        "windy-variant": "Windy",
        // UI labels
        hourly: "Hourly",
        daily: "Daily",
        now: "Now",
        today: "Today",
        humidity: "Humidity",
        pressure: "Pressure",
        wind: "Wind",
        not_found: "Weather entity not found",
      },
      de: {
        "clear-night": "Klare Nacht",
        cloudy: "Bewölkt",
        exceptional: "Außergewöhnlich",
        fog: "Nebel",
        hail: "Hagel",
        lightning: "Gewitter",
        "lightning-rainy": "Gewitter, Regen",
        partlycloudy: "Teilweise bewölkt",
        pouring: "Starkregen",
        rainy: "Regnerisch",
        snowy: "Schneefall",
        "snowy-rainy": "Schneeregen",
        sunny: "Sonnig",
        windy: "Windig",
        "windy-variant": "Windig",
        hourly: "Stündlich",
        daily: "Täglich",
        now: "Jetzt",
        today: "Heute",
        humidity: "Luftfeuchte",
        pressure: "Luftdruck",
        wind: "Wind",
        not_found: "Wetter-Entität nicht gefunden",
      },
      hu: {
        "clear-night": "Tiszta éjszaka",
        cloudy: "Felhős",
        exceptional: "Rendkívüli",
        fog: "Köd",
        hail: "Jégeső",
        lightning: "Villámlás",
        "lightning-rainy": "Villámlás, eső",
        partlycloudy: "Részben felhős",
        pouring: "Zuhogó eső",
        rainy: "Esős",
        snowy: "Havazás",
        "snowy-rainy": "Havas eső",
        sunny: "Napos",
        windy: "Szeles",
        "windy-variant": "Szeles",
        hourly: "Óránként",
        daily: "Naponta",
        now: "Most",
        today: "Ma",
        humidity: "Páratartalom",
        pressure: "Légnyomás",
        wind: "Szél",
        not_found: "Időjárás entitás nem található",
      },
    };
  }

  _lang() {
    const supported = ["en", "de", "hu"];
    // Explicit config option wins
    if (this._config?.language && supported.includes(this._config.language)) {
      return this._config.language;
    }
    // Then HA's UI language. hass.locale.language is like "en", "de-CH", "hu".
    const ha = this._hass?.locale?.language || this._hass?.language || "";
    const base = ha.toLowerCase().split("-")[0];
    if (supported.includes(base)) return base;
    return "en";
  }

  _t(key) {
    const lang = this._lang();
    const t = YetAnotherWeatherCard.translations;
    return t[lang]?.[key] || t.en[key] || key;
  }

  _prettyCondition(c) {
    if (!c) return "";
    const translated = this._t(c);
    // If the key isn't in any translation table, _t returns the key itself —
    // fall back to a sentence-cased version of the raw condition.
    if (translated === c) {
      return c.replace(/[-_]/g, " ").replace(/^./, (ch) => ch.toUpperCase());
    }
    return translated;
  }

  // ── Animated icon factory ────────────────────────────────
  //
  // CRITICAL: Everything between <svg>...</svg> must be tagged with svg`...`
  // (not html`...`). When lit-html sees <circle>, <rect>, <g>, etc. via the
  // html tag, it parses them in HTML namespace where they have zero meaning
  // and render as empty inline elements. svg`...` parses them in the SVG
  // namespace so they actually render as shapes.
  _icon(condition, size = 88, isDay = true) {
    const c = (condition || "").toLowerCase();

    const sun = (cx = 50, cy = 38, r = 13, ray = 8) => svg`
      <g transform="translate(${cx} ${cy})">
        <g class="sun-rays" fill="#EF9F27">
          <rect x="-1.5" y="${-r - ray - 4}" width="3" height="${ray}" rx="1.5"/>
          <rect x="-1.5" y="${r + 4}" width="3" height="${ray}" rx="1.5"/>
          <rect x="${-r - ray - 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
          <rect x="${r + 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
          <g transform="rotate(45)">
            <rect x="-1.5" y="${-r - ray - 4}" width="3" height="${ray}" rx="1.5"/>
            <rect x="-1.5" y="${r + 4}" width="3" height="${ray}" rx="1.5"/>
            <rect x="${-r - ray - 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
            <rect x="${r + 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
          </g>
        </g>
        <circle r="${r}" fill="#EF9F27"/>
      </g>`;

    const moon = (cx = 50, cy = 40, r = 16) => svg`
      <g transform="translate(${cx} ${cy})">
        <circle r="${r}" fill="#D3D1C7"/>
        <circle cx="${r * 0.4}" cy="${-r * 0.2}" r="${r}"
                fill="var(--card-background-color, var(--ha-card-background, #1c1c1e))"/>
      </g>`;

    const cloud = (cx, cy, scale = 1, color = "#888780", cls = "cloud") => svg`
      <g class="${cls}" transform="translate(${cx} ${cy}) scale(${scale})">
        <ellipse cx="20" cy="8" rx="22" ry="11" fill="${color}"/>
        <circle cx="10" cy="4" r="9" fill="${color}"/>
        <circle cx="28" cy="2" r="11" fill="${color}"/>
      </g>`;

    const drops = (x, y, n = 3, color = "#378ADD") =>
      Array.from({ length: n }).map(
        (_, i) => svg`
          <line class="raindrop" style="animation-delay:${i * 0.3}s"
                x1="${x + i * 7}" y1="${y}" x2="${x + i * 7}" y2="${y + 5}"
                stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>`
      );

    const flakes = (x, y, n = 3) =>
      Array.from({ length: n }).map(
        (_, i) => svg`
          <circle class="snowflake" style="animation-delay:${i * 0.4}s"
                  cx="${x + i * 7}" cy="${y}" r="1.6" fill="#85B7EB"/>`
      );

    let body;
    if (c === "sunny" || c === "clear") body = sun();
    else if (c === "clear-night") body = moon();
    else if (c === "partlycloudy" || c === "partly-cloudy")
      body = svg`${isDay ? sun(38, 30, 11, 6) : moon(38, 32, 13)}
                 ${cloud(36, 50, 0.9)}`;
    else if (c === "cloudy")
      body = svg`${cloud(20, 38, 1.1, "#B4B2A9", "cloud")}
                 ${cloud(35, 56, 0.9, "#888780", "cloud2")}`;
    else if (c === "fog")
      body = svg`
        <g class="fog">
          <rect x="18" y="38" width="64" height="3" rx="1.5" fill="#B4B2A9"/>
          <rect x="22" y="50" width="56" height="3" rx="1.5" fill="#888780"/>
          <rect x="14" y="62" width="64" height="3" rx="1.5" fill="#B4B2A9"/>
          <rect x="20" y="74" width="60" height="3" rx="1.5" fill="#888780"/>
        </g>`;
    else if (c === "rainy" || c === "pouring")
      body = svg`${cloud(20, 28, 1.2, "#5F5E5A")}
                 ${drops(28, 62, c === "pouring" ? 5 : 3)}`;
    else if (c === "snowy" || c === "snowy-rainy")
      body = svg`${cloud(20, 28, 1.2, "#B4B2A9")}
                 ${c === "snowy-rainy" ? drops(28, 62, 2) : ""}
                 ${flakes(c === "snowy-rainy" ? 50 : 28, 64, 3)}`;
    else if (c === "lightning" || c === "lightning-rainy")
      body = svg`${cloud(20, 28, 1.2, "#5F5E5A")}
                 <path class="bolt" d="M48 56 L42 72 L50 72 L46 86 L60 66 L52 66 L56 56 Z"
                       fill="#EF9F27"/>
                 ${c === "lightning-rainy" ? drops(28, 78, 3) : ""}`;
    else if (c === "windy" || c === "windy-variant")
      body = svg`
        <g class="wind">
          <path d="M20 35 Q40 30 60 35 Q70 37 65 42 Q60 45 55 42"
                fill="none" stroke="#888780" stroke-width="3" stroke-linecap="round"/>
          <path d="M15 55 Q45 50 75 55 Q85 57 80 62 Q75 65 70 62"
                fill="none" stroke="#B4B2A9" stroke-width="3" stroke-linecap="round"/>
          <path d="M20 75 Q40 70 60 75" fill="none" stroke="#888780"
                stroke-width="3" stroke-linecap="round"/>
        </g>`;
    else if (c === "hail")
      body = svg`${cloud(20, 28, 1.2, "#5F5E5A")}
                 <circle class="hailstone" cx="32" cy="66" r="2.5" fill="#85B7EB"/>
                 <circle class="hailstone" style="animation-delay:.3s" cx="42" cy="66" r="2.5" fill="#85B7EB"/>
                 <circle class="hailstone" style="animation-delay:.6s" cx="52" cy="66" r="2.5" fill="#85B7EB"/>`;
    else if (c === "exceptional")
      body = svg`${cloud(20, 28, 1.2, "#993C1D")}
                 <text x="50" y="80" text-anchor="middle" font-size="22"
                       font-weight="700" fill="#993C1D">!</text>`;
    else body = cloud(28, 40, 1.1, "#B4B2A9");

    // The outer <svg> tag itself is in HTML context (it's a child of a div),
    // so it's wrapped with html`...`. Its inner content (`body`) is already
    // an svg template result, which lit-html composes correctly.
    return html`
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
        ${body}
      </svg>`;
  }

  // ── Forecast graph ───────────────────────────────────────
  //
  // Filled-area chart between the high and low temperature series.
  // When low is unavailable for any item, falls back to a single line on
  // high only (no area band). Time/day labels sit along the bottom; the
  // high value labels float above each data point, lows sit below.
  //
  // Width is fluid (viewBox-based, preserveAspectRatio="none" on the area
  // path so the curve stretches; the labels and points are in absolute SVG
  // coords for crisp rendering).
  _renderGraph(items) {
    if (!items || items.length < 2) return "";

    // viewBox dimensions. Because the SVG renders at width:100% of the card
    // (~430-460px typical) but the viewBox is what defines the internal
    // coordinate space, picking a viewBox width close to the actual rendered
    // width keeps font-size units displaying at roughly true pixel size.
    // With W=400, fonts will display at ~95-115% of their nominal size.
    const W = 400;
    const H = 150;          // total height including label space
    const padX = 16;        // left/right padding
    const padTop = 32;      // headroom for hi labels
    const padBot = 48;      // space for time labels + lo labels
    const plotW = W - 2 * padX;
    const plotH = H - padTop - padBot;

    const n = items.length;
    const highs = items.map((f) => f.temperature);
    const lows = items.map((f) =>
      f.templow != null ? f.templow : null
    );
    const hasLows = lows.some((v) => v != null);

    // Y-axis range: pad by 2° on each side so labels don't clip
    const allVals = highs.concat(hasLows ? lows.filter((v) => v != null) : []);
    let yMin = Math.min(...allVals) - 2;
    let yMax = Math.max(...allVals) + 2;
    if (yMax - yMin < 4) {
      // Avoid a flat line when all values are nearly equal
      const mid = (yMax + yMin) / 2;
      yMin = mid - 2;
      yMax = mid + 2;
    }

    const xOf = (i) =>
      n === 1 ? padX + plotW / 2 : padX + (i / (n - 1)) * plotW;
    const yOf = (v) =>
      padTop + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    // Catmull-Rom → cubic Bezier for a smooth curve through the points.
    const smoothPath = (points) => {
      if (points.length < 2) return "";
      let d = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
      }
      return d;
    };

    const hiPts = highs.map((v, i) => [xOf(i), yOf(v)]);
    const hiPath = smoothPath(hiPts);

    // Build area path: when lows are partially missing, treat null as
    // equal to the matching high to keep the band continuous but degenerate
    // at that point — visually this just pinches the band.
    let areaPath = "";
    if (hasLows) {
      const loPts = lows.map((v, i) =>
        v != null ? [xOf(i), yOf(v)] : [xOf(i), yOf(highs[i])]
      );
      // Stitch: high curve forward, then connect down to last lo point,
      // then reverse-walk the lo points back with the same smoothing.
      areaPath =
        hiPath +
        ` L ${loPts[loPts.length - 1][0]} ${loPts[loPts.length - 1][1]}`;
      const loRev = [...loPts].reverse();
      for (let i = 0; i < loRev.length - 1; i++) {
        const p0 = loRev[i - 1] || loRev[i];
        const p1 = loRev[i];
        const p2 = loRev[i + 1];
        const p3 = loRev[i + 2] || p2;
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        areaPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
      }
      areaPath += " Z";
    }

    const accent = "#EF9F27"; // amber — warm, matches sun icon
    const accentLow = "#378ADD"; // blue — cooler tone for low
    const labelEvery = n > 12 ? 2 : 1; // skip labels on dense hourly forecasts

    return html`
      <div class="graph-wrap">
        <svg
          class="graph"
          viewBox="0 0 ${W} ${H}"
          aria-hidden="true">
          ${hasLows
            ? svg`<path d="${areaPath}" fill="${accent}" fill-opacity="0.15" stroke="none"/>`
            : ""}
          <path d="${hiPath}"
                fill="none"
                stroke="${accent}"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
          ${hasLows
            ? svg`
              <path d="${smoothPath(
                lows.map((v, i) =>
                  v != null ? [xOf(i), yOf(v)] : [xOf(i), yOf(highs[i])]
                )
              )}"
                fill="none"
                stroke="${accentLow}"
                stroke-width="1.5"
                stroke-dasharray="3 3"
                stroke-linecap="round"
                stroke-linejoin="round"/>`
            : ""}
          ${hiPts.map(
            (p, i) => svg`
              <circle cx="${p[0]}" cy="${p[1]}" r="3.5"
                      fill="var(--card-background-color, var(--ha-card-background, #fff))"
                      stroke="${accent}" stroke-width="2"/>`
          )}
          ${highs.map((v, i) =>
            i % labelEvery === 0
              ? svg`<text x="${xOf(i)}" y="${yOf(v) - 10}"
                          text-anchor="middle"
                          font-size="16" font-weight="500"
                          fill="var(--primary-text-color)">${this._fmt(v, 0)}°</text>`
              : ""
          )}
          ${hasLows
            ? lows.map((v, i) =>
                v != null && i % labelEvery === 0
                  ? svg`<text x="${xOf(i)}" y="${yOf(v) + 18}"
                              text-anchor="middle"
                              font-size="14"
                              fill="var(--secondary-text-color)">${this._fmt(v, 0)}°</text>`
                  : ""
              )
            : ""}
          ${items.map((f, i) =>
            i % labelEvery === 0
              ? svg`<text x="${xOf(i)}" y="${H - 8}"
                          text-anchor="middle"
                          font-size="13"
                          fill="var(--secondary-text-color)">${
                            this._mode === "hourly"
                              ? i === 0 ? this._t("now") : this._formatTime(f.datetime)
                              : this._formatDay(f.datetime)
                          }</text>`
              : ""
          )}
        </svg>
      </div>
    `;
  }

  // ── Render ───────────────────────────────────────────────
  render() {
    if (!this._hass || !this._config) return html``;
    const w = this._hass.states[this._config.entity];
    if (!w) {
      return html`<ha-card>
        <div class="error">Weather entity '${this._config.entity}' not found</div>
      </ha-card>`;
    }

    const condition = w.state;
    const friendly =
      this._config.name || w.attributes.friendly_name || this._config.entity;

    const tempData = this._resolveValue(
      this._config.temperature_entity,
      "temperature",
      "°C"
    );
    const tempUnit = tempData?.unit || w.attributes.temperature_unit || "°C";
    const humidityData = this._resolveValue(
      this._config.humidity_entity,
      "humidity",
      "%"
    );
    const pressureData = this._resolveValue(
      this._config.pressure_entity,
      "pressure",
      "hPa"
    );

    const fc =
      this._mode === "hourly" ? this._forecastHourly : this._forecastDaily;
    const fcItems = (fc || []).slice(0, this._config.forecast_items);
    const hasHourly = this._forecastHourly && this._forecastHourly.length > 0;
    const hasDaily = this._forecastDaily && this._forecastDaily.length > 0;

    return html`
      <ha-card>
        <div class="card">
          ${this._config.show_current
            ? html`
                <div class="top">
                  <div class="left">
                    <div class="loc">${friendly}</div>
                    <div class="temp">
                      ${this._fmt(tempData?.value, 1)}<span class="unit">${tempUnit}</span>
                    </div>
                    <div class="cond">${this._prettyCondition(condition)}</div>
                  </div>
                  <div class="icon-wrap">${this._icon(condition, 132, this._isDay())}</div>
                </div>`
            : ""}

          ${this._config.show_stats && (humidityData || pressureData || w.attributes.wind_speed != null)
            ? html`
                <div class="stats">
                  ${humidityData
                    ? html`<div class="stat">
                        <div class="stat-label">${this._t("humidity")}</div>
                        <div class="stat-val">${this._fmt(humidityData.value, 0)}${humidityData.unit || "%"}</div>
                      </div>`
                    : ""}
                  ${pressureData
                    ? html`<div class="stat">
                        <div class="stat-label">${this._t("pressure")}</div>
                        <div class="stat-val">${this._fmt(pressureData.value, 0)} ${pressureData.unit || "hPa"}</div>
                      </div>`
                    : ""}
                  ${w.attributes.wind_speed != null
                    ? html`<div class="stat">
                        <div class="stat-label">${this._t("wind")}</div>
                        <div class="stat-val">${this._fmt(w.attributes.wind_speed, 0)} ${w.attributes.wind_speed_unit || "km/h"}</div>
                      </div>`
                    : ""}
                </div>`
            : ""}

          ${this._config.show_forecast && (hasHourly || hasDaily)
            ? html`
                ${hasHourly && hasDaily
                  ? html`
                      <div class="toggle">
                        <div class="tab ${this._mode === "hourly" ? "active" : ""}"
                             @click=${() => { this._mode = "hourly"; this.requestUpdate(); }}>
                          ${this._t("hourly")}
                        </div>
                        <div class="tab ${this._mode === "daily" ? "active" : ""}"
                             @click=${() => { this._mode = "daily"; this.requestUpdate(); }}>
                          ${this._t("daily")}
                        </div>
                      </div>`
                  : ""}
                ${this._config.forecast_style === "graph" ||
                this._config.forecast_style === "both"
                  ? this._renderGraph(fcItems)
                  : ""}
                ${this._config.forecast_style === "strip" ||
                this._config.forecast_style === "both" ||
                !this._config.forecast_style
                  ? html`
                      <div class="forecast">
                        ${fcItems.map((f, i) => html`
                          <div class="fc-item">
                            <div class="fc-label">
                              ${this._mode === "hourly"
                                ? i === 0 ? this._t("now") : this._formatTime(f.datetime)
                                : this._formatDay(f.datetime)}
                            </div>
                            <div class="fc-icon">${this._icon(f.condition, 54, this._isDay(f.datetime))}</div>
                            <div class="fc-hi">${this._fmt(f.temperature, 0)}°</div>
                            ${this._mode === "daily" && f.templow != null
                              ? html`<div class="fc-lo">${this._fmt(f.templow, 0)}°</div>`
                              : ""}
                            ${f.precipitation_probability != null && f.precipitation_probability > 0
                              ? html`<div class="fc-pop">${this._fmt(f.precipitation_probability, 0)}%</div>`
                              : ""}
                          </div>`)}
                      </div>`
                  : ""}`
            : ""}
        </div>
      </ha-card>`;
  }

  static get styles() {
    return css`
      :host { display: block; }
      ha-card { overflow: hidden; }
      .card { padding: 20px 22px; }
      .error { padding: 20px; color: var(--error-color, #db4437); }

      .top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 16px;
        gap: 12px;
      }
      .loc { font-size: 13px; color: var(--secondary-text-color); margin-bottom: 4px; }
      .temp {
        font-size: 54px;
        font-weight: 500;
        letter-spacing: -2px;
        line-height: 1;
        color: var(--primary-text-color);
      }
      .temp .unit {
        font-size: 22px;
        color: var(--secondary-text-color);
        font-weight: 400;
        vertical-align: super;
        margin-left: 2px;
      }
      .cond {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
        margin-top: 8px;
      }
      .icon-wrap { flex-shrink: 0; }

      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
        gap: 8px;
        padding: 12px 0;
        margin-bottom: 14px;
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
      }
      .stat { text-align: center; }
      .stat-label {
        font-size: 10px;
        color: var(--secondary-text-color);
        margin-bottom: 2px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .stat-val { font-size: 15px; font-weight: 500; color: var(--primary-text-color); }

      .toggle {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 8px;
        padding: 3px;
        margin-bottom: 12px;
        gap: 2px;
      }
      .tab {
        flex: 1;
        text-align: center;
        font-size: 12px;
        padding: 6px;
        border-radius: 6px;
        cursor: pointer;
        color: var(--secondary-text-color);
        transition: background 0.2s, color 0.2s;
        user-select: none;
      }
      .tab.active {
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        font-weight: 500;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
      }

      .graph-wrap {
        margin: 4px 0 12px;
        width: 100%;
      }
      .graph {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
      }

      .forecast {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 4px;
      }
      .fc-item {
        text-align: center;
        padding: 8px 2px;
        border-radius: 8px;
        transition: background 0.15s;
      }
      .fc-item:hover { background: var(--secondary-background-color); }
      .fc-label { font-size: 11px; color: var(--secondary-text-color); margin-bottom: 4px; }
      .fc-icon { display: flex; justify-content: center; margin-bottom: 2px; }
      .fc-hi { font-size: 13px; font-weight: 500; color: var(--primary-text-color); }
      .fc-lo { font-size: 11px; color: var(--secondary-text-color); }
      .fc-pop { font-size: 10px; color: var(--info-color, #378add); margin-top: 2px; }

      /* ── Animations ── */
      @keyframes spin     { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      @keyframes drift    { 0%,100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
      @keyframes drift2   { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-3px); } }
      @keyframes drop     { 0% { transform: translateY(-3px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
      @keyframes fall     { 0% { transform: translateY(-3px) rotate(0); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(14px) rotate(180deg); opacity: 0; } }
      @keyframes flicker  { 0%,60%,100% { opacity: 1; } 65%,75% { opacity: 0.2; } }
      @keyframes sway     { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
      @keyframes fogShift { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
      @keyframes hailFall { 0% { transform: translateY(-2px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }

      .sun-rays  { transform-origin: center; animation: spin 20s linear infinite; }
      .cloud     { animation: drift 4s ease-in-out infinite; transform-origin: center; }
      .cloud2    { animation: drift2 5s ease-in-out infinite; transform-origin: center; }
      .raindrop  { animation: drop 1.2s ease-in infinite; }
      .snowflake { animation: fall 2.5s ease-in infinite; transform-origin: center; }
      .bolt      { animation: flicker 2s ease-in-out infinite; }
      .wind      { animation: sway 3s ease-in-out infinite; transform-origin: center; }
      .fog       { animation: fogShift 4s ease-in-out infinite; }
      .hailstone { animation: hailFall 1s ease-in infinite; }

      @media (prefers-reduced-motion: reduce) {
        .sun-rays, .cloud, .cloud2, .raindrop, .snowflake,
        .bolt, .wind, .fog, .hailstone { animation: none; }
      }
    `;
  }

  static getConfigElement() {
    return document.createElement("yet-another-weather-card-editor");
  }

  static getStubConfig(hass) {
    const weatherEntity = hass
      ? Object.keys(hass.states).find((id) => id.startsWith("weather."))
      : null;
    return {
      entity: weatherEntity || "weather.home",
      default_mode: "hourly",
      show_current: true,
      show_forecast: true,
      show_stats: true,
      forecast_items: 7,
      forecast_style: "strip",
    };
  }

  getCardSize() {
    return 5;
  }
}

// ─────────────────────────────────────────────────────────
//  Visual Editor
// ─────────────────────────────────────────────────────────
class YetAnotherWeatherCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = config;
  }

  // Schema drives the form. ha-form renders the correct widget per selector:
  //   - entity selector with domain filters
  //   - boolean → toggle
  //   - number → slider/input
  //   - select → dropdown
  _schema() {
    return [
      {
        name: "entity",
        required: true,
        selector: { entity: { domain: "weather" } },
      },
      {
        name: "name",
        selector: { text: {} },
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "default_mode",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "hourly", label: "Hourly" },
                  { value: "daily", label: "Daily" },
                ],
              },
            },
          },
          {
            name: "forecast_items",
            selector: {
              number: { min: 1, max: 24, step: 1, mode: "box" },
            },
          },
          {
            name: "language",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "", label: "Auto (Home Assistant)" },
                  { value: "en", label: "English" },
                  { value: "de", label: "Deutsch" },
                  { value: "hu", label: "Magyar" },
                ],
              },
            },
          },
          {
            name: "forecast_style",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "strip", label: "Strip" },
                  { value: "graph", label: "Graph" },
                  { value: "both", label: "Both" },
                ],
              },
            },
          },
        ],
      },
      {
        name: "temperature_entity",
        selector: {
          entity: { domain: ["sensor", "input_number", "number"] },
        },
      },
      {
        name: "humidity_entity",
        selector: {
          entity: { domain: ["sensor", "input_number", "number"] },
        },
      },
      {
        name: "pressure_entity",
        selector: {
          entity: { domain: ["sensor", "input_number", "number"] },
        },
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_current", selector: { boolean: {} } },
          { name: "show_stats", selector: { boolean: {} } },
          { name: "show_forecast", selector: { boolean: {} } },
        ],
      },
    ];
  }

  // Pretty labels & helper text for ha-form. Falls back to the field name if omitted.
  _computeLabel = (schema) => {
    const labels = {
      entity: "Weather entity (required)",
      name: "Display name",
      default_mode: "Default forecast view",
      forecast_items: "Forecast items",
      language: "Language",
      forecast_style: "Forecast display",
      temperature_entity: "Temperature sensor (optional)",
      humidity_entity: "Humidity sensor (optional)",
      pressure_entity: "Pressure sensor (optional)",
      show_current: "Show current",
      show_stats: "Show stats",
      show_forecast: "Show forecast",
    };
    return labels[schema.name] ?? schema.name;
  };

  _computeHelper = (schema) => {
    const helpers = {
      temperature_entity: "Overrides the weather entity's temperature",
      humidity_entity: "Overrides the weather entity's humidity",
      pressure_entity: "Overrides the weather entity's pressure",
      forecast_items: "Number of forecast cells (1–24)",
      language: "Leave Auto to follow your Home Assistant language",
      forecast_style: "Strip = cells with icons, Graph = filled area chart, Both = chart above cells",
    };
    return helpers[schema.name];
  };

  _valueChanged(ev) {
    if (!this._config) return;
    const newConfig = { ...ev.detail.value };

    // Strip empty-string optional fields so YAML stays clean
    for (const key of [
      "name",
      "temperature_entity",
      "humidity_entity",
      "pressure_entity",
      "language",
    ]) {
      if (newConfig[key] === "" || newConfig[key] == null) {
        delete newConfig[key];
      }
    }

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.hass || !this._config) return html``;

    // Provide sensible defaults to ha-form so toggles show correct state
    const data = {
      default_mode: "hourly",
      forecast_items: 7,
      forecast_style: "strip",
      show_current: true,
      show_stats: true,
      show_forecast: true,
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      ha-form {
        display: block;
      }
    `;
  }
}

customElements.define(
  "yet-another-weather-card-editor",
  YetAnotherWeatherCardEditor
);

customElements.define("yet-another-weather-card", YetAnotherWeatherCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "yet-another-weather-card",
  name: "Yet Another Weather Card",
  description: "Beautiful weather card with animated icons, forecast toggle, and custom sensor support",
  preview: true,
});

console.info(
  "%c YET-ANOTHER-WEATHER-CARD %c v1.4.2 ",
  "color: white; background: #185FA5; font-weight: 700; padding: 2px 6px; border-radius: 3px 0 0 3px;",
  "color: #185FA5; background: white; font-weight: 700; padding: 2px 6px; border: 1px solid #185FA5; border-radius: 0 3px 3px 0;"
);
