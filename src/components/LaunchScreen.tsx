/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/** Écran de lancement Iris : une icône d’objectif accompagne l’apparition du logo avant le contenu. */
import { useEffect, useState } from "react";
import "./LaunchScreen.css";

type LaunchScreenProps = { onComplete: () => void };

export default function LaunchScreen({ onComplete }: LaunchScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTimer = window.setTimeout(() => setExiting(true), reducedMotion ? 120 : 980);
    const completeTimer = window.setTimeout(onComplete, reducedMotion ? 180 : 1500);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return <div className={`launch-screen${exiting ? " is-exiting" : ""}`} role="status" aria-label="Chargement d’Iris Studio">
    <div className="launch-orbit" aria-hidden="true"><i /></div>
    <div className="launch-content">
      <p className="launch-kicker">IRIS STUDIO / ALGER</p>
      <div className="launch-lens-icon" aria-hidden="true"><i /><b /></div>
      <div className="launch-logo-reveal">
        <img src="assets/iris-nav-logo-light-static-provided.png" alt="Iris Studio" />
      </div>
      <div className="launch-progress" aria-hidden="true"><i /></div>
      <p className="launch-status">Préparation du terrain <span>01</span></p>
    </div>
  </div>;
}
