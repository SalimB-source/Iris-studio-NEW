/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
export const LETS_PLAY_PROJECT_PATH = "/projets/lets-play";

export const LETS_PLAY_LOADING_STEP_MS = 720;
export const LETS_PLAY_LOADING_LOGO_MS = 1180;

export function getLetsPlayTransitionDuration(reducedMotion: boolean) {
  if (reducedMotion) return 180;
  return LETS_PLAY_LOADING_STEP_MS * 3 + LETS_PLAY_LOADING_LOGO_MS + 220;
}

export function getLetsPlayExitDelay(reducedMotion: boolean) {
  if (reducedMotion) return 180;
  return LETS_PLAY_LOADING_STEP_MS * 3 + LETS_PLAY_LOADING_LOGO_MS - 80;
}
