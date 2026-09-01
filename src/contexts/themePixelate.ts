const FILTER_ID = "iris-theme-pixelate";
const FLOOD_ID = "iris-pixel-flood";
const TILE_ID = "iris-pixel-tile";
const MORPH_ID = "iris-pixel-morph";

const DURATION_IN = 280;
const DURATION_OUT = 720;

function peakCell() {
  return Math.round(Math.min(24, Math.max(12, window.innerWidth / 80)));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInCubic(t: number) {
  return t * t * t;
}

function filterUrl() {
  const page = window.location.href.split("#")[0];
  return `url("${page}#${FILTER_ID}")`;
}

function ensureFilter() {
  if (document.getElementById(FILTER_ID)) return;

  const parsed = new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg" class="iris-theme-pixelate-svg" aria-hidden="true" focusable="false" width="0" height="0">
      <filter id="${FILTER_ID}" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
        <feFlood id="${FLOOD_ID}" x="8" y="8" width="1" height="1" flood-color="#ffffff" flood-opacity="1" />
        <feComposite id="${TILE_ID}" width="16" height="16" />
        <feTile result="irisPixelTiles" />
        <feComposite in="SourceGraphic" in2="irisPixelTiles" operator="in" />
        <feMorphology id="${MORPH_ID}" operator="dilate" radius="8" />
      </filter>
    </svg>`,
    "image/svg+xml",
  ).documentElement;

  document.body.appendChild(document.importNode(parsed, true));
}

function setCellSize(cell: number) {
  const root = document.getElementById("root");
  const flood = document.getElementById(FLOOD_ID);
  const tile = document.getElementById(TILE_ID);
  const morph = document.getElementById(MORPH_ID);
  if (!root || !flood || !tile || !morph) return;

  const size = Math.max(1, cell);
  if (size <= 1.35) {
    root.style.removeProperty("filter");
    return;
  }

  const sample = Math.max(0.5, size * 0.5);
  flood.setAttribute("x", String(sample));
  flood.setAttribute("y", String(sample));
  tile.setAttribute("width", String(size));
  tile.setAttribute("height", String(size));
  morph.setAttribute("radius", String(Math.max(0.5, size * 0.5)));
  root.style.filter = filterUrl();
}

export function runThemePixelate(onPeak: () => void, onDone: () => void) {
  ensureFilter();

  const rootHtml = document.documentElement;
  const peak = peakCell();
  rootHtml.classList.add("is-theme-pixelating");
  setCellSize(2);

  let flipped = false;
  let frame = 0;
  const started = performance.now();

  const stop = () => {
    window.cancelAnimationFrame(frame);
    setCellSize(1);
    rootHtml.classList.remove("is-theme-pixelating");
  };

  const step = (now: number) => {
    const elapsed = now - started;

    if (elapsed < DURATION_IN) {
      const progress = easeOutCubic(elapsed / DURATION_IN);
      setCellSize(1 + (peak - 1) * progress);
      frame = window.requestAnimationFrame(step);
      return;
    }

    if (!flipped) {
      flipped = true;
      setCellSize(peak);
      onPeak();
    }

    const outElapsed = elapsed - DURATION_IN;
    if (outElapsed < DURATION_OUT) {
      const progress = easeInCubic(outElapsed / DURATION_OUT);
      setCellSize(1 + (peak - 1) * (1 - progress));
      frame = window.requestAnimationFrame(step);
      return;
    }

    stop();
    onDone();
  };

  frame = window.requestAnimationFrame(step);
  return stop;
}

export const themePixelateDuration = DURATION_IN + DURATION_OUT;
