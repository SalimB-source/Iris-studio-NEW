import { Volume2, VolumeX } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "@/contexts/ThemeContext";
import "./DarkModeScore.css";

const DEFAULT_VOLUME = 0.6;

type ScoreApi = {
  muted: boolean;
  volume: number;
  toggleMuted: () => void;
  setVolume: (value: number) => void;
};

const ScoreContext = createContext<ScoreApi | null>(null);

function clampVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function DarkModeScore({ children }: { children?: ReactNode }) {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

  const applyGain = useCallback((audio: HTMLAudioElement) => {
    audio.muted = mutedRef.current;
    audio.volume = volumeRef.current;
  }, []);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}assets/iris-dark-cinematic.mp3`);
    audio.loop = true;
    audio.preload = "auto";
    applyGain(audio);
    audioRef.current = audio;
    // Expose audio for manual testing and add debug listeners
    try {
      (window as any).__irisDarkAudio = audio;
    } catch (e) {
      // ignore in non-browser environments
    }
    audio.addEventListener('play', () => console.debug('[DarkModeScore] audio play event'));
    audio.addEventListener('pause', () => console.debug('[DarkModeScore] audio paused'));
    audio.addEventListener('error', (ev) => console.warn('[DarkModeScore] audio error', ev));
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
      try { delete (window as any).__irisDarkAudio; } catch (e) {}
    };
  }, [applyGain]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    applyGain(audio);

    if (theme !== "dark") {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    const play = () => {
      applyGain(audio);
      void audio.play().catch(() => undefined);
    };

    play();
    const unlock = () => play();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [applyGain, theme]);

  const toggleMuted = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    const audio = audioRef.current;
    if (audio) {
      applyGain(audio);
      if (document.documentElement.classList.contains("dark")) {
        void audio.play().catch(() => undefined);
      }
    }
  }, [applyGain]);

  const setVolume = useCallback((value: number) => {
    const next = clampVolume(value);
    volumeRef.current = next;
    setVolumeState(next);
    if (next > 0 && mutedRef.current) {
      mutedRef.current = false;
      setMuted(false);
    }
    const audio = audioRef.current;
    if (audio) {
      applyGain(audio);
      if (document.documentElement.classList.contains("dark")) {
        void audio.play().catch(() => undefined);
      }
    }
  }, [applyGain]);

  return (
    <ScoreContext.Provider value={{ muted, volume, toggleMuted, setVolume }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function DarkModeScoreControls() {
  const { theme } = useTheme();
  const score = useContext(ScoreContext);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const volumeWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (theme !== "dark") setVolumeOpen(false);
  }, [theme]);

  useEffect(() => {
    if (!volumeOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!volumeWrapRef.current?.contains(event.target as Node)) setVolumeOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVolumeOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [volumeOpen]);

  if (theme !== "dark" || !score) return null;

  const volumePercent = Math.round(score.volume * 100);

  return (
    <div className="score-controls" role="group" aria-label="Musique du thème sombre">
      <button
        className="theme-toggle score-btn"
        type="button"
        onClick={score.toggleMuted}
        aria-label={score.muted ? "Activer le son" : "Couper le son"}
        aria-pressed={score.muted}
        title={score.muted ? "Activer le son" : "Couper le son"}
      >
        {score.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <div className="score-volume" ref={volumeWrapRef}>
        <button
          className="theme-toggle score-btn"
          type="button"
          onClick={() => setVolumeOpen((open) => !open)}
          aria-label="Régler le volume"
          aria-expanded={volumeOpen}
          aria-controls="iris-score-volume"
          title="Volume"
        >
          <span className="score-volume-label" aria-hidden="true">{volumePercent}</span>
        </button>
        {volumeOpen ? (
          <div className="score-volume-panel" id="iris-score-volume">
            <label className="visually-hidden" htmlFor="iris-score-volume-slider">Volume</label>
            <input
              id="iris-score-volume-slider"
              type="range"
              min={0}
              max={100}
              step={1}
              value={volumePercent}
              onChange={(event) => score.setVolume(Number(event.target.value) / 100)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
