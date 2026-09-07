/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Camera, Cpu, Gamepad2 } from "lucide-react";
import {
  getLetsPlayExitDelay,
  getLetsPlayTransitionDuration,
  LETS_PLAY_LOADING_STEP_MS,
} from "./letsPlayTransitionConfig";
import "./LetsPlayLoadingScreen.css";

type LetsPlayLoadingScreenProps = {
  onComplete: () => void;
};

const stages = [
  { id: "game", label: "Gaming", Icon: Gamepad2 },
  { id: "camera", label: "Caméra", Icon: Camera },
  { id: "tech", label: "Tech", Icon: Cpu },
  { id: "logo", label: "Let’s Play", Icon: null },
] as const;

export default function LetsPlayLoadingScreen({ onComplete }: LetsPlayLoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [stage, setStage] = useState(0);
  const [progressMs, setProgressMs] = useState(getLetsPlayTransitionDuration(false));

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = getLetsPlayTransitionDuration(reducedMotion);
    setProgressMs(duration);

    if (reducedMotion) {
      setStage(stages.length - 1);
      const completeTimer = window.setTimeout(onComplete, duration);
      return () => window.clearTimeout(completeTimer);
    }

    const stepTimers = [
      window.setTimeout(() => setStage(1), LETS_PLAY_LOADING_STEP_MS),
      window.setTimeout(() => setStage(2), LETS_PLAY_LOADING_STEP_MS * 2),
      window.setTimeout(() => setStage(3), LETS_PLAY_LOADING_STEP_MS * 3),
    ];
    const exitTimer = window.setTimeout(() => setIsExiting(true), getLetsPlayExitDelay(false));
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
      className={`letsplay-loading-screen${isExiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Ouverture du projet Let’s Play — ${active.label}`}
    >
      <div className="letsplay-loading-grid" aria-hidden="true" />
      <div className="letsplay-loading-beam" aria-hidden="true"><i /><i /><i /></div>
      <div className="letsplay-loading-content">
        <p className="letsplay-loading-kicker">LET’S PLAY × ALGÉRIE TÉLÉCOM</p>

        <div className="letsplay-loading-stage" aria-hidden="true">
          {stages.map((item, index) => {
            const Icon = item.Icon;
            const state = index === stage ? "is-active" : index < stage ? "is-done" : "";
            return (
              <div key={item.id} className={`letsplay-loading-glyph letsplay-loading-glyph--${item.id} ${state}`.trim()}>
                {Icon ? <span className="letsplay-loading-icon"><Icon size={54} strokeWidth={1.6} /></span> : (
                  <img src="assets/lets-play-wordmark.png" alt="" />
                )}
              </div>
            );
          })}
        </div>

        <p className="letsplay-loading-label">{active.label}</p>

        <ol className="letsplay-loading-dots" aria-hidden="true">
          {stages.map((item, index) => (
            <li key={item.id} className={index === stage ? "is-active" : index < stage ? "is-done" : ""} />
          ))}
        </ol>

        <div className="letsplay-loading-bar" aria-hidden="true">
          <i style={{ animationDuration: `${progressMs}ms` }} />
        </div>
        <p className="letsplay-loading-status">Chargement du projet <b>LP / 0{stage + 1}</b></p>
      </div>
    </div>,
    document.body,
  );
}
