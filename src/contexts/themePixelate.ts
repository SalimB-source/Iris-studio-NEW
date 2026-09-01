const DURATION_IN = 360;
const DURATION_OUT = 820;
const BAT_COUNT = 36;

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
  const wingY = beat * 12;
  const span = 42 + beat * 9;

  ctx.beginPath();
  ctx.moveTo(0, -3);
  ctx.lineTo(5.8, -20);
  ctx.lineTo(1.9, -11.5);
  ctx.lineTo(0, -14);
  ctx.lineTo(-1.9, -11.5);
  ctx.lineTo(-5.8, -20);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, -2, 5.6, 6.3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, 10.5, 3.6, 10.8, 0, 0, Math.PI * 2);
  ctx.fill();

  const wing = (dir: number) => {
    ctx.beginPath();
    ctx.moveTo(dir * 3.1, 0.4);
    ctx.bezierCurveTo(dir * 15, -19 + wingY, dir * (span - 5), -12 + wingY, dir * span, 5 + wingY);
    ctx.quadraticCurveTo(dir * span * 0.74, 8.5 + wingY * 0.35, dir * span * 0.6, 15);
    ctx.quadraticCurveTo(dir * span * 0.46, 5.4, dir * span * 0.34, 12.8);
    ctx.quadraticCurveTo(dir * 16, 4.1, dir * 3.1, 6.8);
    ctx.closePath();
    ctx.fill();
  };
  wing(1);
  wing(-1);
}

function makeBats(originX: number, originY: number, count: number): Bat[] {
  const bats: Bat[] = [];
  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    const angle = t * Math.PI * 2 + (Math.random() - 0.5) * 0.7;
    const radius = 70 + t * 160 + Math.random() * 220;
    const speed = 2.4 + Math.random() * 6.8;
    bats.push({
      x: originX + Math.cos(angle) * radius,
      y: originY + Math.sin(angle) * radius,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.35,
      size: 1.15 + Math.random() * 2.05,
      rot: angle,
      flap: Math.random() * Math.PI * 2,
      flapSpeed: 0.35 + Math.random() * 0.55,
      delay: t * 260 + Math.random() * 220,
      spin: (Math.random() - 0.5) * 0.08,
    });
  }
  return bats;
}

function pigeonAsset(file: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}assets/${file}`;
}

function playClip(file: string, volume: number, delayMs: number, rate: number) {
  const audio = new Audio(pigeonAsset(file));
  audio.preload = "auto";
  audio.playbackRate = rate;
  audio.volume = 0;
  let startTimer = 0;
  const start = () => {
    audio.currentTime = 0;
    audio.volume = volume;
    void audio.play().catch(() => undefined);
  };
  if (delayMs <= 0) start();
  else startTimer = window.setTimeout(start, delayMs);
  return { audio, startTimer };
}

function playWingFlaps(durationMs: number) {
  const voices = [
    playClip("iris-pigeon-takeoff.mp3", 0.78, 0, 1),
    playClip("iris-pigeon-takeoff.mp3", 0.46, 90, 1.07),
    playClip("iris-pigeon-takeoff.mp3", 0.4, 170, 0.93),
    playClip("iris-pigeon-flock.mp3", 0.32, 40, 1),
  ];

  const fadeTimer = window.setTimeout(() => {
    const from = voices.map(({ audio }) => audio.volume);
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 280);
      voices.forEach(({ audio }, index) => {
        audio.volume = Math.max(0, from[index] * (1 - t));
      });
      if (t < 1) window.requestAnimationFrame(tick);
      else voices.forEach(({ audio }) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
    window.requestAnimationFrame(tick);
  }, Math.max(180, durationMs - 280));

  return () => {
    window.clearTimeout(fadeTimer);
    voices.forEach(({ audio, startTimer }) => {
      window.clearTimeout(startTimer);
      audio.pause();
      audio.currentTime = 0;
    });
  };
}

function ensureCanvas() {
  document.querySelectorAll(".iris-theme-bats").forEach((node) => node.remove());
  const canvas = document.createElement("canvas");
  canvas.className = "iris-theme-bats";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  return canvas;
}

function fitCanvas(canvas: HTMLCanvasElement) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
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

  const canvas = ensureCanvas();
  let { ctx, width, height } = fitCanvas(canvas);
  if (!ctx) {
    rootHtml.classList.remove("is-theme-swarming");
    onPeak();
    onDone();
    return () => undefined;
  }

  const heroBox = host.getBoundingClientRect();
  const originX = heroBox.left + heroBox.width * 0.62;
  const originY = heroBox.top + heroBox.height * 0.44;
  const bats = makeBats(originX, originY, BAT_COUNT);
  let flipped = false;
  let frame = 0;
  const started = performance.now();
  const stopSound = playWingFlaps(DURATION_IN + DURATION_OUT);

  const stop = () => {
    window.cancelAnimationFrame(frame);
    canvas.remove();
    stopSound();
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
