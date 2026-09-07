/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Camera, Cpu, Gamepad2 } from "lucide-react";
import {
  getSevenArenaExitDelay,
  getSevenArenaTransitionDuration,
  SEVEN_ARENA_LOADING_STEP_MS,
} from "./sevenArenaTransitionConfig";
import "./SevenArenaLoadingScreen.css";

type SevenArenaLoadingScreenProps = {
  onComplete: () => void;
};

const stages = [
  { id: "game", label: "Gaming", Icon: Gamepad2 },
  { id: "camera", label: "Caméra", Icon: Camera },
  { id: "tech", label: "Tech", Icon: Cpu },
  { id: "logo", label: "7ouma Arena", Icon: null },
] as const;

export default function SevenArenaLoadingScreen({ onComplete }: SevenArenaLoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [stage, setStage] = useState(0);
  const [progressMs, setProgressMs] = useState(getSevenArenaTransitionDuration(false));

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = getSevenArenaTransitionDuration(reducedMotion);
    setProgressMs(duration);

    if (reducedMotion) {
      setStage(stages.length - 1);
      const completeTimer = window.setTimeout(onComplete, duration);
      return () => window.clearTimeout(completeTimer);
    }

    const stepTimers = [
      window.setTimeout(() => setStage(1), SEVEN_ARENA_LOADING_STEP_MS),
      window.setTimeout(() => setStage(2), SEVEN_ARENA_LOADING_STEP_MS * 2),
      window.setTimeout(() => setStage(3), SEVEN_ARENA_LOADING_STEP_MS * 3),
    ];
    const exitTimer = window.setTimeout(() => setIsExiting(true), getSevenArenaExitDelay(false));
    const completeTimer = window.setTimeout(onComplete, duration);

    return () => {
      stepTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const active = stages[stage];

  return createPortal(
    <div
      className={`sevenarena-loading-screen${isExiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Ouverture du projet 7ouma Arena — ${active.label}`}
    >
      <div className="sevenarena-loading-grid" aria-hidden="true" />
      <div className="sevenarena-loading-radar" aria-hidden="true"><i /></div>
      <div className="sevenarena-loading-content">
        <p className="sevenarena-loading-kicker">7OUMA ARENA × DJEZZY</p>

        <div className="sevenarena-loading-stage" aria-hidden="true">
          {stages.map((item, index) => {
            const Icon = item.Icon;
            const state = index === stage ? "is-active" : index < stage ? "is-done" : "";
            return (
              <div key={item.id} className={`sevenarena-loading-glyph sevenarena-loading-glyph--${item.id} ${state}`.trim()}>
                {Icon ? <span className="sevenarena-loading-icon"><Icon size={54} strokeWidth={1.6} /></span> : (
                  <img src="assets/7ouma-arena-by-djezzy.png" alt="" />
                )}
              </div>
            );
          })}
        </div>

        <p className="sevenarena-loading-label">{active.label}</p>

        <ol className="sevenarena-loading-dots" aria-hidden="true">
          {stages.map((item, index) => (
            <li key={item.id} className={index === stage ? "is-active" : index < stage ? "is-done" : ""} />
          ))}
        </ol>

        <div className="sevenarena-loading-bar" aria-hidden="true">
          <i style={{ animationDuration: `${progressMs}ms` }} />
        </div>
        <p className="sevenarena-loading-status">Chargement du projet <b>07 / 0{stage + 1}</b></p>
      </div>
    </div>,
    document.body,
  );
}
