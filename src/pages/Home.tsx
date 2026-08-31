/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/**
 * Direction « La trajectoire vivante » : un scrollytelling éditorial où les mots, repères et images progressent sur trois profondeurs.
 * Les mouvements sont décoratifs, limités et désactivés lorsque la réduction des animations est demandée.
 */
import { useEffect } from "react";
import { ArrowDown, ArrowUpRight, Instagram, Linkedin, MoveRight, Play } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import LetsPlayProjectLink from "@/components/LetsPlayProjectLink";
import SevenArenaProjectLink from "@/components/SevenArenaProjectLink";
import { brandPartners } from "@/components/brandPartners";
import { partnerProjectBranding } from "@/components/partnerProjectBranding";
import { featuredEpisodes } from "./homeContent";
import "./HomeArtistic.css";
import "./HomeArtisticResponsive.css";
import "./HomeBrandMarquee.css";
import "./HomeHeroCinematic.css";
import "./HomeProofFigures.css";

const heroVisuals = {
  day: "assets/iris-hero-director-day-windowed.webp",
  night: "assets/iris-hero-director-night-windowed.webp",
  alt: "Portrait de Rebai Chentli depuis un bureau panoramique, face à une skyline côtière",
};

const trajectoryImages = {
  atelier: "assets/iris-team-documentary_eceff224.jpg",
  field: {
    compact: "assets/iris-home-field-960.webp",
    large: "assets/iris-home-field-1440.webp",
  },
};

const homeProjectThumbnails = {
  letsPlay: {
    compact: "assets/iris-home-letsplay-thumbnail-960.webp",
    large: "assets/iris-home-letsplay-thumbnail-1440.webp",
  },
  sevenArena: {
    compact: "assets/iris-home-7ouma-thumbnail-960.webp",
    large: "assets/iris-home-7ouma-thumbnail-1440.webp",
  },
};

const irisPublishedFigures = [
  { index: "01", value: "3", label: "directions" },
  { index: "02", value: "268", label: "employés" },
  { index: "03", value: "180", label: "véhicules" },
  { index: "04", value: "+25", label: "clients" },
  { index: "05", value: "+38", label: "wilayas" },
  { index: "06", value: "4", label: "missions" },
] as const;

function useParallaxTrajectory() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-iris-parallax]"));
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      if (reducedMotion.matches || window.innerWidth < 760) {
        nodes.forEach((node) => node.style.setProperty("--iris-parallax-y", "0px"));
        return;
      }
      const viewportMiddle = window.innerHeight / 2;
      nodes.forEach((node) => {
        const bounds = node.getBoundingClientRect();
        const strength = Number(node.dataset.irisParallax ?? 0);
        const progress = Math.max(-1, Math.min(1, (bounds.top + bounds.height / 2 - viewportMiddle) / window.innerHeight));
        node.style.setProperty("--iris-parallax-y", `${-progress * strength}px`);
      });
    };
    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);
}

function useImpactReveals() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-impact-reveal]"));
    if (!nodes.length) return;

    const reveal = (node: HTMLElement) => {
      node.classList.add("impact-reveal-armed", "is-impact-revealed");
    };
    const revealAll = () => nodes.forEach(reveal);
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    nodes.forEach((node) => {
      const bounds = node.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.86) reveal(node);
      else {
        node.classList.add("impact-reveal-armed");
        observer.observe(node);
      }
    });

    const handleReducedMotion = () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        revealAll();
      }
    };
    reducedMotion.addEventListener("change", handleReducedMotion);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleReducedMotion);
    };
  }, []);
}

export default function Home() {
  useParallaxTrajectory();
  useImpactReveals();

  return (
    <div className="page-shell art-home">
      <SiteHeader />
      <main className="art-main">
        <div className="art-trajectory-mark" aria-hidden="true"><i /><i /><i /><b>IRIS / EN MOUVEMENT</b></div>
        <section className="art-hero art-hero--cinematic" aria-labelledby="home-title">
          <span className="art-hero-coordinate" data-iris-parallax="14">IRIS STUDIO / ALGER — 36.75° N</span>
          <div className="art-hero-copy">
            <p className="art-kicker art-hero-kicker"><span>01</span> COMMUNICATION AUTREMENT</p>
            <p className="art-hero-manifesto">[ LE TERRAIN, SANS RACCOURCI ]</p>
            <h1 id="home-title" className="impact-title-lines" data-impact-reveal data-impact-stage="1"><span>Les idées</span><span>prennent <em>le terrain.</em></span></h1>
            <p className="art-hero-intro">Stratégies, campagnes et formats de marque conçus pour devenir des expériences vécues — dans les lieux, les usages et les communautés qui comptent.</p>
            <div className="art-hero-actions"><Link className="art-button art-button-main" href="/contact">Ouvrir un projet <ArrowUpRight size={17} /></Link><Link className="art-text-link" href="/agence">Entrer dans le studio <MoveRight size={18} /></Link></div>
            <nav className="art-hero-socials" aria-label="Réseaux sociaux Iris Studio"><span>IRIS / EN LIGNE</span><a href="https://www.instagram.com/iris_studio_marketing/" target="_blank" rel="noreferrer" aria-label="Suivre Iris Studio sur Instagram"><Instagram size={15} aria-hidden="true" /></a><a href="https://www.linkedin.com/company/iris-studio-alger/" target="_blank" rel="noreferrer" aria-label="Suivre Iris Studio sur LinkedIn"><Linkedin size={15} aria-hidden="true" /></a></nav>
          </div>
          <figure className="art-hero-visual art-parallax-layer" data-iris-parallax="-10">
            <img className="art-hero-image art-hero-image--day" src={heroVisuals.day} alt={heroVisuals.alt} decoding="async" fetchPriority="high" />
            <img className="art-hero-image art-hero-image--night" src={heroVisuals.night} alt="" aria-hidden="true" decoding="async" />
            <figcaption><span>SCÈNE / 01</span><b>De l’intuition à l’action.</b></figcaption>
          </figure>
          <div className="art-hero-orbit art-parallax-layer" data-iris-parallax="22" aria-hidden="true"><i /><i /><i /><b /></div>
          <div className="art-hero-protocol" aria-hidden="true"><span>CAPTER</span><i /><span>FAIRE VIVRE</span><b>01 / 06</b></div>
          <a className="art-scroll-cue" href="#trajectory" aria-label="Découvrir la trajectoire Iris"><span>Défiler</span><ArrowDown size={18} /></a>
        </section>

        <section className="art-brand-marquee" aria-labelledby="home-brands-title">
          <div className="art-brand-marquee-intro">
            <p id="home-brands-title">Marques partenaires</p>
            <span>Un écosystème qui prend le terrain</span>
          </div>
          <div className="art-brand-marquee-window">
            <div className="art-brand-marquee-track">
              {[0, 1].map((setIndex) => (
                <div className="art-brand-marquee-set" aria-hidden={setIndex === 1} key={setIndex}>
                  {brandPartners.map((client) => (
                    <span className={client.name === "EGOR" ? "is-egor-logo" : undefined} key={`${client.name}-${setIndex}`}><img className="mon-logo" src={client.logo} alt={setIndex === 0 ? `Logo ${client.name}` : ""} loading="lazy" decoding="async" /></span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="trajectory" className="art-manifesto" aria-labelledby="intro-title">
          <div className="art-manifesto-rail" aria-hidden="true"><span>02</span><i /><b>TRAJECTOIRE</b></div>
          <div className="art-manifesto-word art-parallax-layer" data-iris-parallax="-14" aria-hidden="true">RENCONTRER</div>
          <div className="art-manifesto-copy">
            <p className="art-kicker"><span>02</span> UNE PRATIQUE DU RÉEL</p>
            <h2 id="intro-title" className="impact-reveal" data-impact-reveal data-impact-stage="1">Une stratégie n’existe<br />vraiment que lorsqu’elle<br /><em>rencontre son monde.</em></h2>
            <p>Nous réunissons attention stratégique, précision d’exécution et lecture des communautés pour aider les marques à prendre une place juste, visible et durable.</p>
            <Link className="art-text-link" href="/agence">Voir la méthode Iris <MoveRight size={18} /></Link>
          </div>
          <figure className="art-manifesto-image art-parallax-layer" data-iris-parallax="20">
            <img src={trajectoryImages.atelier} alt="Scène documentaire d’équipe dans un environnement de travail Iris Studio" loading="lazy" decoding="async" />
            <figcaption><span>ARCHIVE / 02 · ÉQUIPE &amp; MÉTHODE</span><b>Une intention cherche sa forme.</b></figcaption>
          </figure>
        </section>

        <section className="art-proof" aria-labelledby="proof-title">
          <div className="art-proof-sticky">
            <p className="art-kicker"><span>03</span> REPÈRES PUBLIÉS / VISION 2025</p>
            <h2 id="proof-title" className="impact-reveal" data-impact-reveal data-impact-stage="1">Une présence qui<br />se lit <em>sur le terrain.</em></h2>
            <p className="art-proof-intro">Un instantané de l’organisation et de ses opérations, tel que présenté dans la publication institutionnelle « Vision 2025 ».</p>
          </div>
          <div className="art-proof-numbers">
            {irisPublishedFigures.map((figure, index) => <article className="impact-reveal" data-impact-reveal data-impact-stage={String(index + 1)} key={figure.label}><span>{figure.index} / REPÈRE</span><strong>{figure.value}</strong><p>{figure.label}</p></article>)}
          </div>
          <div className="art-proof-line art-parallax-layer" data-iris-parallax="28" aria-hidden="true"><i /><i /></div>
        </section>

        <section className="art-field" aria-labelledby="field-title">
          <div className="art-field-oversize art-parallax-layer" data-iris-parallax="-22" aria-hidden="true">FAIRE</div>
          <figure className="art-field-image art-parallax-layer" data-iris-parallax="10">
            <picture><source type="image/webp" srcSet={`${trajectoryImages.field.compact} 960w, ${trajectoryImages.field.large} 1440w`} sizes="(max-width: 760px) 100vw, 50vw" /><img src={trajectoryImages.field.large} alt="Scène de préparation stratégique et de travail d’équipe autour de supports de campagne" loading="lazy" decoding="async" width="1440" height="810" /></picture>
            <figcaption><span>ARCHIVE / 04 · STRATÉGIE &amp; TERRAIN</span><b>Les idées changent d’échelle au contact du terrain.</b></figcaption>
          </figure>
          <div className="art-field-copy">
            <p className="art-kicker"><span>04</span> DE LA VISION À L’EXPÉRIENCE</p>
            <h2 id="field-title" className="impact-reveal" data-impact-reveal data-impact-stage="1">Ce qui compte ne reste jamais <em>sur la table.</em></h2>
            <p>Une réponse créative devient utile lorsqu’elle circule, active un lieu, une équipe ou une conversation. C’est là que le studio mesure la justesse d’un dispositif.</p>
            <Link className="art-text-link" href="/agence#agency-expertises">Explorer nos expertises <MoveRight size={18} /></Link>
          </div>
        </section>

        <section className="art-projects" aria-labelledby="home-projects-title">
          <div className="art-projects-heading"><p className="art-kicker"><span>05</span> PROJETS QUI PRENNENT VIE</p><h2 id="home-projects-title" className="impact-reveal" data-impact-reveal data-impact-stage="1">Quand une communauté<br />devient <em>la scène.</em></h2><Link className="art-text-link" href="/projets">Voir tous les projets <MoveRight size={18} /></Link></div>
          <div className="art-projects-list">
            <LetsPlayProjectLink className="art-project art-project-primary"><div className="art-project-media art-project-media-bare art-project-media-thumbnail"><picture><source type="image/webp" srcSet={`${homeProjectThumbnails.letsPlay.compact} 960w, ${homeProjectThumbnails.letsPlay.large} 1440w`} sizes="(max-width: 760px) 100vw, 50vw" /><img src={homeProjectThumbnails.letsPlay.large} alt={partnerProjectBranding.letsPlay.thumbnailAlt} loading="lazy" decoding="async" width="1440" height="1080" /></picture></div><div><p>LET’S PLAY × ALGÉRIE TÉLÉCOM</p><h3>Une émission qui fait dialoguer gaming, culture et technologie.</h3><em>Gaming · Pop culture · Tech</em><b>Découvrir <ArrowUpRight size={17} /></b></div></LetsPlayProjectLink>
            <SevenArenaProjectLink className="art-project art-project-secondary"><div className="art-project-media art-project-media-bare art-project-media-thumbnail"><picture><source type="image/webp" srcSet={`${homeProjectThumbnails.sevenArena.compact} 960w, ${homeProjectThumbnails.sevenArena.large} 1440w`} sizes="(max-width: 760px) 100vw, 50vw" /><img src={homeProjectThumbnails.sevenArena.large} alt={partnerProjectBranding.sevenArena.thumbnailAlt} loading="lazy" decoding="async" width="1440" height="1080" /></picture></div><div><p>7OUMA ARENA × DJEZZY</p><h3>Une scène compétitive pensée avec et pour sa communauté.</h3><em>E-sport · Mobile gaming · Tournois</em><b>Découvrir <ArrowUpRight size={17} /></b></div></SevenArenaProjectLink>
          </div>
        </section>

        <section className="art-episodes" aria-labelledby="episodes-title">
          <div className="art-episodes-orbit art-parallax-layer" data-iris-parallax="18" aria-hidden="true"><i /><i /><b /></div>
          <div className="art-episodes-heading">
            <p className="art-kicker"><span>06</span> À L’IMAGE / FORMATS QUI CIRCULENT</p>
            <h2 id="episodes-title" className="impact-reveal" data-impact-reveal data-impact-stage="1">Deux rendez-vous,<br />une même <em>impulsion.</em></h2>
            <p>Des formats portés par leurs communautés, et regardés depuis leurs canaux officiels. Les compteurs ci-dessous sont des repères observés lors de notre sélection.</p>
          </div>
          <div className="art-episodes-list">
            {featuredEpisodes.map((episode, index) => (
              <a className={`art-episode-card ${index === 1 ? "art-episode-card-offset" : ""}`} href={episode.href} key={episode.index} target="_blank" rel="noreferrer" aria-label={`Regarder l’épisode ${episode.title} sur YouTube`}>
                <figure className="art-episode-media">
                  <img src={episode.image} alt={episode.imageAlt} loading="lazy" />
                  <span className="art-episode-play" aria-hidden="true"><Play size={17} fill="currentColor" /><span>Lecture</span></span>
                  <span className="art-episode-index">{episode.index}</span>
                  <span className="art-episode-duration">{episode.duration}</span>
                  <figcaption>{episode.source}</figcaption>
                </figure>
                <div className="art-episode-copy">
                  <p>{episode.partner}</p>
                  <h3 lang={index === 1 ? "ar" : undefined} dir={index === 1 ? "rtl" : undefined}>{episode.title}</h3>
                  <span className="art-episode-metrics"><b>{episode.views}</b><i /> <b>{episode.duration}</b></span>
                  <em>{episode.description}</em>
                  <strong>{episode.actionLabel} <ArrowUpRight size={17} /></strong>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="art-contact" aria-labelledby="home-cta-title"><div className="iris-import-atmosphere" aria-hidden="true"><img className="iris-import-architecture" src="assets/iris-studio-abstract-light-architecture.webp" alt="" loading="lazy" decoding="async" /><img className="iris-import-motion" src="assets/iris-studio-editorial-motion.webp" alt="" loading="lazy" decoding="async" /><img className="iris-import-lens" src="assets/iris-studio-blue-lens.webp" alt="" loading="lazy" decoding="async" /></div><div className="art-contact-orbit art-parallax-layer" data-iris-parallax="-16" aria-hidden="true"><i /><i /><b /></div><p className="art-kicker"><span>07</span> PROCHAIN MOUVEMENT</p><h2 id="home-cta-title" className="impact-reveal" data-impact-reveal data-impact-stage="1">Une intention mérite<br />d’aller <em>plus loin.</em></h2><Link className="art-button art-button-light" href="/contact">Construire la suite <ArrowUpRight size={18} /></Link></section>
      </main>
      <SiteFooter />
    </div>
  );
}
