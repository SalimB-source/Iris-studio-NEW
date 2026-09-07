import { useEffect } from "react";
import { useLocation } from "wouter";
import "./SiteParallax.css";

type ParallaxNode = {
  node: HTMLElement;
  strength: number;
};

const SKIP_CLOSEST = [
  "header",
  "footer",
  ".site-header",
  ".site-footer",
  ".mobile-menu",
  ".launch-screen",
  ".letsplay-loading",
  ".seven-arena-loading",
  ".art-brand-marquee",
  ".agency-trust-marquee",
  "form",
  "input",
  "textarea",
  "select",
  "button",
  ".theme-toggle",
].join(", ");

const SKIP_SELF = [
  ".site-header",
  ".site-footer",
  ".page-hero-shade",
  ".art-hero-image",
  ".art-brand-marquee",
  ".agency-trust-marquee",
  ".iris-hero-bats",
  ".operation-record",
  ".expertise-row",
  ".project-case",
  ".field-gallery-card",
  ".about-studio-member",
  ".about-person-card",
  ".about-letsplay-member",
  ".art-project",
  ".art-button",
  ".header-cta",
].join(", ");

const LAYERS: { selector: string; strength: number }[] = [
  { selector: "main .page-hero-photo, main .page-hero-ray, main .iris-eye-orbit, main .iris-route-line, main .art-hero-orbit, main .art-proof-line, main .art-episodes-orbit, main .art-contact-orbit", strength: 28 },
  { selector: "main figure, main picture, main img, main video", strength: 18 },
  { selector: "main h1, main h2, main .display-title", strength: 12 },
  { selector: "main h3, main .eyebrow, main .art-kicker, main .light-eyebrow", strength: 8 },
  { selector: "main .large-copy, main figcaption, main .agency-fmcg-stat, main .agency-fmcg-partners li", strength: 9 },
  { selector: "main p, main li, main small", strength: 5 },
];

function isSkipped(node: HTMLElement) {
  if (node.closest(SKIP_CLOSEST)) return true;
  if (node.matches(SKIP_SELF)) return true;
  if (node.dataset.noParallax !== undefined) return true;
  return false;
}

function collectNodes(): ParallaxNode[] {
  const seen = new Set<HTMLElement>();
  const collected: ParallaxNode[] = [];

  document.querySelectorAll<HTMLElement>("[data-iris-parallax]").forEach((node) => {
    if (seen.has(node) || isSkipped(node)) return;
    seen.add(node);
    collected.push({ node, strength: Number(node.dataset.irisParallax ?? 0) });
  });

  LAYERS.forEach(({ selector, strength }) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
      if (seen.has(node) || isSkipped(node)) return;
      seen.add(node);
      collected.push({ node, strength });
    });
  });

  collected.forEach(({ node }) => {
    const wired = node.hasAttribute("data-iris-parallax") || node.classList.contains("art-parallax-layer");
    if (!wired) node.classList.add("iris-parallax");
  });

  return collected;
}

function clearParallax(nodes: ParallaxNode[]) {
  nodes.forEach(({ node }) => {
    node.style.setProperty("--iris-parallax-y", "0px");
  });
}

export default function SiteParallax() {
  const [location] = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nodes = collectNodes();
    let frame = 0;
    let collectTimer = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        clearParallax(nodes);
        return;
      }
      const viewport = window.innerHeight || 1;
      const middle = viewport / 2;
      const mobileScale = window.innerWidth < 760 ? 0.45 : 1;
      nodes.forEach(({ node, strength }) => {
        const bounds = node.getBoundingClientRect();
        if (bounds.bottom < -160 || bounds.top > viewport + 160) return;
        const progress = Math.max(-1, Math.min(1, (bounds.top + bounds.height / 2 - middle) / viewport));
        node.style.setProperty("--iris-parallax-y", `${(-progress * strength * mobileScale).toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const recapture = () => {
      clearParallax(nodes);
      nodes = collectNodes();
      requestUpdate();
    };

    requestUpdate();
    collectTimer = window.setTimeout(recapture, 420);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      window.clearTimeout(collectTimer);
      if (frame) window.cancelAnimationFrame(frame);
      clearParallax(nodes);
    };
  }, [location]);

  return null;
}
