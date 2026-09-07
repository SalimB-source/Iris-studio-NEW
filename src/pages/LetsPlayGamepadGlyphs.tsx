/* Fond gaming Let’s Play : triangle, rond, carré, croix façon boutons de manette. */

function GlyphTriangle() {
  return (
    <svg className="is-triangle" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.4 21.6 20.6H2.4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function GlyphCircle() {
  return (
    <svg className="is-circle" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlyphSquare() {
  return (
    <svg className="is-square" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="1.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlyphCross() {
  return (
    <svg className="is-cross" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.6 6.6 17.4 17.4 M17.4 6.6 6.6 17.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function LetsPlayGamepadGlyphs() {
  return (
    <div className="about-letsplay-gamepad" aria-hidden="true">
      <div className="about-letsplay-gamepad-cluster">
        <GlyphTriangle />
        <GlyphSquare />
        <GlyphCircle />
        <GlyphCross />
      </div>
      <GlyphTriangle />
      <GlyphCircle />
      <GlyphSquare />
      <GlyphCross />
      <GlyphTriangle />
      <GlyphCircle />
      <GlyphSquare />
      <GlyphCross />
    </div>
  );
}
