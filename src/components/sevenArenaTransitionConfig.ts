/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
export const SEVEN_ARENA_PROJECT_PATH = "/projets/7ouma-arena";

export const SEVEN_ARENA_LOADING_STEP_MS = 720;
export const SEVEN_ARENA_LOADING_LOGO_MS = 1180;

export function getSevenArenaTransitionDuration(reducedMotion: boolean) {
  if (reducedMotion) return 180;
  return SEVEN_ARENA_LOADING_STEP_MS * 3 + SEVEN_ARENA_LOADING_LOGO_MS + 220;
}

export function getSevenArenaExitDelay(reducedMotion: boolean) {
  if (reducedMotion) return 180;
  return SEVEN_ARENA_LOADING_STEP_MS * 3 + SEVEN_ARENA_LOADING_LOGO_MS - 80;
}
