const DURATION_IN = 360;
const DURATION_OUT = 820;
const BAT_COUNT = 72;

type Bat = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  flap: number;
  flapSpeed: number;
  delay: number;
  spin: number;
};

function drawBat(ctx: CanvasRenderingContext2D, flap: number) {
  const beat = Math.sin(flap);
  const wingY = beat * 7;
  const span = 23 + beat * 5;

  ctx.beginPath();
  ctx.moveTo(0, -2);
  ctx.lineTo(3.4, -12);
  ctx.lineTo(1.1, -6.8);
  ctx.lineTo(0, -8.2);
  ctx.lineTo(-1.1, -6.8);
  ctx.lineTo(-3.4, -12);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, -1.2, 3.3, 3.7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, 6.2, 2.15, 6.4, 0, 0, Math.PI * 2);
  ctx.fill();

  const wing = (dir: number) => {
    ctx.beginPath();
    ctx.moveTo(dir * 1.8, 0.2);
    ctx.bezierCurveTo(dir * 9, -11 + wingY, dir * (span - 3), -7 + wingY, dir * span, 3 + wingY);
    ctx.quadraticCurveTo(dir * span * 0.74, 5 + wingY * 0.35, dir * span * 0.6, 9);
    ctx.quadraticCurveTo(dir * span * 0.46, 3.2, dir * span * 0.34, 7.5);
    ctx.quadraticCurveTo(dir * 9.5, 2.4, dir * 1.8, 4);
    ctx.closePath();
    ctx.fill();
  };
  wing(1);
  wing(-1);
}

function makeBats(originX: number, originY: number, count: number): Bat[] {
  const bats: Bat[] = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (-Math.PI * 0.15) + Math.random() * Math.PI * 1.3 + (i / count) * Math.PI * 0.2;
    const speed = 1.6 + Math.random() * 4.8;
    bats.push({
      x: originX + (Math.random() - 0.5) * 28,
      y: originY + (Math.random() - 0.5) * 36,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.8,
      size: 0.55 + Math.random() * 1.35,
      rot: angle,
      flap: Math.random() * Math.PI * 2,
      flapSpeed: 0.35 + Math.random() * 0.55,
      delay: Math.random() * 180,
      spin: (Math.random() - 0.5) * 0.08,
    });
  }
  return bats;
}

function ensureCanvas(host: HTMLElement) {
  document.querySelectorAll(".iris-theme-bats").forEach((node) => node.remove());
  const canvas = document.createElement("canvas");
  canvas.className = "iris-theme-bats";
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  return canvas;
}

function fitCanvas(canvas: HTMLCanvasElement, host: HTMLElement) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = host.clientWidth;
  const height = host.clientHeight;
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

export function runThemePixelate(onPeak: () => void, onDone: () => void) {
  const host = document.querySelector<HTMLElement>(".art-hero--cinematic");
  if (!host) {
    onPeak();
    onDone();
    return () => undefined;
  }

  const rootHtml = document.documentElement;
  rootHtml.classList.add("is-theme-swarming");

  const canvas = ensureCanvas(host);
  let { ctx, width, height } = fitCanvas(canvas, host);
  if (!ctx) {
    rootHtml.classList.remove("is-theme-swarming");
    onPeak();
    onDone();
    return () => undefined;
  }

  const originX = width * 0.62;
  const originY = height * 0.44;
  const bats = makeBats(originX, originY, BAT_COUNT);
  let flipped = false;
  let frame = 0;
  const started = performance.now();

  const stop = () => {
    window.cancelAnimationFrame(frame);
    canvas.remove();
    rootHtml.classList.remove("is-theme-swarming");
  };

  const step = (now: number) => {
    const elapsed = now - started;
    const surface = canvas.getContext("2d");
    if (!surface) {
      stop();
      onDone();
      return;
    }
    ctx = surface;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0b0b0d";

    for (const bat of bats) {
      if (elapsed < bat.delay) continue;
      const local = elapsed - bat.delay;
      bat.flap += bat.flapSpeed;
      bat.vx *= 1.012;
      bat.vy = bat.vy * 1.01 - 0.035;
      bat.x += bat.vx;
      bat.y += bat.vy;
      bat.rot += bat.spin;
      const fadeIn = Math.min(1, local / 90);
      const fadeOut = elapsed > DURATION_IN + 280
        ? Math.max(0, 1 - (elapsed - DURATION_IN - 280) / (DURATION_OUT - 280))
        : 1;
      const alpha = fadeIn * fadeOut;
      if (alpha <= 0.02) continue;

      ctx.save();
      ctx.translate(bat.x, bat.y);
      ctx.rotate(bat.rot + Math.atan2(bat.vy, bat.vx) * 0.25);
      ctx.scale(bat.size * (0.7 + fadeIn * 0.3), bat.size * (0.7 + fadeIn * 0.3));
      ctx.globalAlpha = alpha;
      drawBat(ctx, bat.flap);
      ctx.restore();
    }

    if (!flipped && elapsed >= DURATION_IN) {
      flipped = true;
      onPeak();
    }

    if (elapsed < DURATION_IN + DURATION_OUT) {
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
