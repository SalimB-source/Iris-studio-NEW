/** Force le violet Let’s Play même si un aplat papier arrive après le CSS. */
export function paintLetsPlayTeamViolet(node: HTMLElement | null) {
  if (!node) return;

  node.style.setProperty("background", "#281347", "important");
  node.style.setProperty("background-color", "#281347", "important");
  node.style.setProperty("color", "#fff", "important");

  const stamp = node.querySelector<HTMLElement>(".about-letsplay-brand-stamp");
  if (stamp) {
    stamp.style.setProperty("width", "clamp(7.25rem, 13vw, 9.5rem)", "important");
  }

  const img = node.querySelector<HTMLImageElement>(".about-letsplay-brand-stamp img");
  if (!img) return;
  img.style.setProperty("width", "clamp(7.25rem, 13vw, 9.5rem)", "important");
  img.style.setProperty("max-width", "9.5rem", "important");
  img.style.setProperty("height", "auto", "important");
  img.style.setProperty("max-height", "none", "important");
}
