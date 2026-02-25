/**
 * mapbox.js — Mapbox GL JS wrapper
 *
 * Requires mapbox-gl.js and mapbox-gl.css to be loaded from the Mapbox CDN
 * (added by default.hbs when the post carries tag "geo").
 *
 * Declarative usage in posts:
 *   <div data-map="calgary" style="height:500px;"></div>
 *   <div data-map="custom" data-center="-113.5,51.0" data-zoom="10" style="height:400px;"></div>
 *
 * Access token: set window.MAPBOX_TOKEN before this module loads, or pass
 * data-token on the element, or set it via Ghost Code Injection.
 */

// ── Preset locations ──────────────────────────────────────────────────────────

const PRESETS = {
  calgary:   { center: [-114.0719, 51.0447], zoom: 11 },
  edmonton:  { center: [-113.4938, 53.5461], zoom: 11 },
  vancouver: { center: [-123.1207, 49.2827], zoom: 11 },
  toronto:   { center:  [-79.3832, 43.6532], zoom: 11 },
  world:     { center: [0, 20],              zoom: 1.5 },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseCenter(str) {
  if (!str) return null;
  const parts = str.split(',').map(Number);
  if (parts.length === 2 && parts.every(Number.isFinite)) return parts;
  return null;
}

function showError(el, message) {
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.background = 'var(--bg3, #EEECEA)';
  el.style.borderRadius = 'var(--radius, 12px)';
  el.innerHTML = `<p style="color:var(--text-3,#9C9890);font-size:0.875rem;padding:16px;text-align:center;">${message}</p>`;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Initialise a Mapbox map inside `el`.
 *
 * Config precedence (highest first):
 *   1. data-* attributes on the element
 *   2. `config` argument
 *   3. Named preset from PRESETS
 *   4. Fallback defaults
 *
 * @param {HTMLElement} el
 * @param {object} config  Optional overrides: { center, zoom, style }
 * @returns {object|null}  Mapbox Map instance or null on failure
 */
export function renderMap(el, config = {}) {
  const mapboxgl = window.mapboxgl;
  if (!mapboxgl) return null;

  // Ensure the container has a height
  if (!el.style.height && el.offsetHeight === 0) {
    el.style.height = '400px';
  }

  // Resolve access token
  const token =
    el.dataset.token ||
    window.MAPBOX_TOKEN ||
    null;

  if (!token) {
    showError(
      el,
      'Map unavailable: no Mapbox access token found.<br>' +
      'Set <code>window.MAPBOX_TOKEN</code> in Ghost → Settings → Code Injection.'
    );
    return null;
  }

  mapboxgl.accessToken = token;

  // Resolve location / camera
  const locationKey = el.dataset.map;
  const preset = PRESETS[locationKey] ?? {};

  const center =
    parseCenter(el.dataset.center) ??
    config.center ??
    preset.center ??
    [0, 0];

  const zoom =
    (el.dataset.zoom ? parseFloat(el.dataset.zoom) : null) ??
    config.zoom ??
    preset.zoom ??
    2;

  const isDark = document.documentElement.dataset.theme === 'dark';
  const style =
    el.dataset.style ??
    config.style ??
    (isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11');

  let map;
  try {
    map = new mapboxgl.Map({ container: el, style, center, zoom });
  } catch (err) {
    showError(el, 'Map failed to initialise. Check the browser console for details.');
    return null;
  }

  // Keep map sized correctly when the container resizes
  const observer = new ResizeObserver(() => map.resize());
  observer.observe(el);

  return map;
}
