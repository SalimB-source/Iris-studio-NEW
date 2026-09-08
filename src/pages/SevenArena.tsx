/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/**
 * Direction « Portfolio Iris » : 7ouma Arena est présenté comme une étude de cas,
 * avec des archives officielles cadrées par Iris. Chaque média conserve sa provenance
 * publique, sa légende et un repère de campagne clair.
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Instagram, Play, Youtube } from "lucide-react";
import { Link } from "wouter";
import { partnerProjectBranding } from "@/components/partnerProjectBranding";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  sevenArenaCredits,
  sevenArenaDossiers,
  sevenArenaEcosystem,
  sevenArenaFeaturedEpisode,
  sevenArenaHeroTrailer,
  sevenArenaScreenings,
  sevenArenaVisualFilters,
  sevenArenaVisuals,
  sevenArenaVoices,
} from "./sevenArenaContent";
import "./ArenaVoiceRoster.css";
import "./ArenaFeaturedEpisode.css";
import "./SevenArenaHeroVideo.css";

function ArenaVisualCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState<(typeof sevenArenaVisualFilters)[number]["id"]>("tout");
  const filteredVisuals =
    activeFilter === "tout"
      ? sevenArenaVisuals
      : sevenArenaVisuals.filter((visual) => visual.kind === activeFilter);

  useEffect(() => {
    if (!api) return;

    const updateActiveSlide = () => setActiveSlide(api.selectedScrollSnap());
    updateActiveSlide();
    api.on("select", updateActiveSlide);
    api.on("reInit", updateActiveSlide);

    return () => {
      api.off("select", updateActiveSlide);
      api.off("reInit", updateActiveSlide);
    };
  }, [api]);

  const selectFilter = (filter: (typeof sevenArenaVisualFilters)[number]["id"]) => {
    setActiveFilter(filter);
    setActiveSlide(0);
  };

  return (
    <div className="arena-visual-carousel-wrap">
      <div className="arena-visual-filters" role="toolbar" aria-label="Filtrer les créations graphiques">
        {sevenArenaVisualFilters.map((filter) => (
          <button
            type="button"
            key={filter.id}
            className={activeFilter === filter.id ? "is-active" : ""}
            aria-pressed={activeFilter === filter.id}
            onClick={() => selectFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <Carousel
        key={activeFilter}
        className="arena-visual-carousel"
        opts={{ align: "start", loop: true, duration: 30 }}
        setApi={setApi}
        aria-label="Carrousel des créations graphiques 7ouma Arena"
      >
        <CarouselContent className="arena-visual-carousel-track">
          {filteredVisuals.map((visual, index) => (
            <CarouselItem className="arena-visual-carousel-item" data-active={index === activeSlide} key={visual.id}>
              <a
                href={visual.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ouvrir ${visual.title} dans sa source officielle`}
              >
                <figure>
                  <img src={visual.image} alt={visual.alt} />
                  <figcaption>
                    <span>{visual.category}</span>
                    <strong>{visual.title}</strong>
                  </figcaption>
                </figure>
                <div>
                  <p>
                    0{index + 1} / 0{filteredVisuals.length}
                  </p>
                  <div className="arena-visual-copy">
                    <span>{visual.detail}</span>
                    <small>Période · {visual.campaignPeriod}</small>
                  </div>
                  <ArrowUpRight size={18} />
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <p className="carousel-swipe-status" aria-live="polite">
          <span aria-hidden="true">←</span>
          <span>Balayez pour explorer</span>
          <strong>{String(activeSlide + 1).padStart(2, "0")} / {String(filteredVisuals.length).padStart(2, "0")}</strong>
          <span aria-hidden="true">→</span>
        </p>
        <div className="arena-visual-carousel-nav">
          <CarouselPrevious aria-label="Création précédente" />
          <div className="arena-visual-carousel-dots" aria-label="Choisir une création">
            {filteredVisuals.map((visual, index) => (
              <button
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={index === activeSlide ? "is-active" : ""}
                aria-label={`Afficher ${visual.title}`}
                aria-current={index === activeSlide ? "true" : undefined}
                key={visual.id}
              />
            ))}
          </div>
          <CarouselNext aria-label="Création suivante" />
        </div>
      </Carousel>
    </div>
  );
}

export default function SevenArena() {
  const brand = partnerProjectBranding.sevenArena;
  const voicesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(voicesGridRef.current?.querySelectorAll<HTMLElement>(".arena-voice") ?? []);
    if (!cards.length) return;

    cards.forEach((card) => card.classList.add("is-scroll-reveal-ready"));

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell project-detail arena-detail">
      <SiteHeader />
      <main>
        <section className="detail-hero detail-hero--arena-surface" aria-labelledby="arena-title">
          <div className="arena-hero-video" aria-hidden="true">
            <iframe
              src={`${sevenArenaHeroTrailer.embedSrc}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${sevenArenaHeroTrailer.videoId}&disablekb=1&fs=0&iv_load_policy=3`}
              title={sevenArenaHeroTrailer.title}
              allow="autoplay; encrypted-media"
              tabIndex={-1}
            />
          </div>
          <div className="arena-hero-video-veil" aria-hidden="true" />
          <div className="detail-hero-overlay" />
          <span className="detail-hero-texture" aria-hidden="true" />
          <div className="detail-hero-copy">
            <Link className="back-link" href="/projets">
              <ArrowLeft size={16} /> Tous les projets
            </Link>
            <p>02 / 7ouma Arena × Djezzy</p>
            <h1 id="arena-title">
              L’arène est<br />dans <em>la 7ouma.</em>
            </h1>
            <span>E-SPORT · MOBILE GAMING · COMPÉTITION · COMMUNAUTÉ</span>
          </div>
          <div className="detail-project-brand detail-project-brand--arena">
            <img src={brand.logo} alt={brand.alt} />
          </div>
        </section>

        <section id="arena-overview" className="detail-overview section-pad project-progress-target">
          <div>
            <p className="eyebrow">Le projet</p>
            <h2 className="display-title">
              La maison de l’e-sport<br />
              <em>en Algérie.</em>
            </h2>
          </div>
          <p>
            7ouma Arena est un projet e-sport en partenariat avec Djezzy. À travers le gaming mobile,
            les compétitions, les créateurs et les formats communautaires, il rassemble les joueurs là où
            se construit réellement la culture compétitive.
          </p>
        </section>

        <section className="arena-featured-episode section-pad" aria-labelledby="arena-featured-title">
          <div className="arena-featured-episode-heading">
            <div>
              <p className="eyebrow">{sevenArenaFeaturedEpisode.eyebrow}</p>
              <h2 id="arena-featured-title" className="display-title">
                L’épisode final,<br />
                <em>à l’écran.</em>
              </h2>
            </div>
            <p>{sevenArenaFeaturedEpisode.description}</p>
          </div>
          <div className="arena-featured-player" data-no-parallax>
            <div className="arena-featured-player-frame">
              <iframe
                src={`${sevenArenaFeaturedEpisode.embedSrc}?rel=0`}
                title={sevenArenaFeaturedEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="arena-featured-player-meta">
              <div>
                <p>{sevenArenaFeaturedEpisode.category} · {sevenArenaFeaturedEpisode.duration}</p>
                <strong>{sevenArenaFeaturedEpisode.title}</strong>
              </div>
              <a href={sevenArenaFeaturedEpisode.href} target="_blank" rel="noreferrer">
                Ouvrir sur YouTube <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="arena-attribution" className="arena-attribution section-pad project-progress-target" aria-labelledby="arena-attribution-title">
          <div className="arena-attribution-signal" aria-hidden="true">
            <img src="assets/Djezzy_Logo_2015_1b45af1e.svg" alt="" />
          </div>

          <div className="arena-attribution-main">
            <p className="eyebrow arena-attribution-eyebrow">{sevenArenaCredits.eyebrow}</p>
            <h2 className="display-title" id="arena-attribution-title" style={{color: '#ffffff'}}>
              {sevenArenaCredits.title}
            </h2>
            <p>{sevenArenaCredits.description}</p>
            <blockquote>{sevenArenaCredits.studio}</blockquote>
          </div>

          <dl className="arena-attribution-pills">
            {sevenArenaCredits.pillars.map((pillar, index) => (
              <div key={pillar.value}>
                <dt>
                  0{index + 1} / {pillar.label}
                </dt>
                <dd>{pillar.value}</dd>
              </div>
            ))}
          </dl>

          <div className="arena-attribution-active" aria-label="Participants actifs de l’émission">
            <div className="arena-attribution-active-heading">
              <p>Participants actifs</p>
              <span>Présentation · production · communauté</span>
            </div>
            <div className="arena-attribution-active-grid">
              {sevenArenaCredits.activeParticipants.map((participant, index) => (
                <article key={participant.name}>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{participant.name}</strong>
                    <b>{participant.role}</b>
                    <p>{participant.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="arena-visuals" className="arena-visuals section-pad project-progress-target" aria-labelledby="arena-visuals-title">
          <div className="arena-visuals-heading">
            <div>
              <p className="eyebrow">Publications Instagram</p>
              <h2 className="display-title" id="arena-visuals-title">
                Les visuels de<br />
                <em>la communauté.</em>
              </h2>
            </div>
            <p>
              Une sélection de créations visuelles issues du compte Instagram officiel de 7ouma Arena,
              retenues pour leur identité de campagne et leur ancrage communautaire.
            </p>
          </div>
          <ArenaVisualCarousel />
          <p className="arena-visuals-credit">
            Créations graphiques créditées à <strong>Salim Benmokhtar</strong> dans le manifeste de
            production de l’émission.
          </p>
        </section>

        <section className="arena-ecosystem section-pad" aria-labelledby="arena-ecosystem-title">
          <div className="arena-ecosystem-index">
            03
            <br />
            <span>LINK</span>
          </div>
          <div className="arena-ecosystem-copy">
            <p className="eyebrow">{sevenArenaEcosystem.eyebrow}</p>
            <span>{sevenArenaEcosystem.label}</span>
            <h2 className="display-title" id="arena-ecosystem-title">
              {sevenArenaEcosystem.title}
            </h2>
            <p>{sevenArenaEcosystem.description}</p>
            <small>{sevenArenaEcosystem.note}</small>
            <div>
              <a href={sevenArenaEcosystem.platformHref} target="_blank" rel="noreferrer">
                Découvrir Egor Gaming <ArrowUpRight size={17} />
              </a>
              <a href={sevenArenaEcosystem.profileHref} target="_blank" rel="noreferrer">
                Voir le profil de Samy Charif <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <aside className="arena-ecosystem-partnership" aria-label="Collaboration entre Egor Gaming et 7ouma Arena">
            <figure className="arena-egor-logo">
              <img src="assets/egor-logo-provided_7f6b1b02.png" alt="Logo EGOR Gaming" />
            </figure>
            <span aria-hidden="true">×</span>
            <strong aria-hidden="true">7A</strong>
          </aside>
        </section>

        <section className="detail-framework section-pad">
          <figure className="detail-framework-image">
            <span className="detail-archive-index">ARCHIVE / 02</span>
            <img src="assets/7ouma-free-fire_695c5d6f.jpg" alt="Free Fire Hangout, publication 7ouma Arena" />
            <figcaption>Preuve terrain / 7ouma Arena — Free Fire Hangout</figcaption>
          </figure>
          <div className="detail-framework-copy">
            <p className="eyebrow">Le terrain compétitif</p>
            <h2 className="display-title">
              Du match à la<br />
              <em>communauté.</em>
            </h2>
            <div className="detail-pillars">
              <span>E-sport</span>
              <span>Free Fire</span>
              <span>Gaming mobile</span>
              <span>Tournois</span>
            </div>
            <p>Une présence qui relie l’intensité du jeu, l’énergie des communautés et l’expérience proposée par Djezzy.</p>
          </div>
        </section>

        <section id="arena-archive" className="arena-archive section-pad project-progress-target" aria-labelledby="arena-archive-title">
          <div className="arena-archive-heading">
            <div>
              <p className="eyebrow">Au cœur du tournoi</p>
              <h2 className="display-title" id="arena-archive-title">
                La Pro League, <em>du match au titre.</em>
              </h2>
            </div>
            <p>
              Une archive éditoriale de la FF Pro League : des qualifications aux finales, avec Team Alliance mise à l’honneur par la chaîne officielle 7ouma Arena by Djezzy.
            </p>
          </div>
          <div className="arena-dossier-grid">
            {sevenArenaDossiers.map((dossier) => (
              <article className="arena-dossier" key={dossier.id}>
                <div className="arena-dossier-top">
                  <span>{dossier.index}</span>
                  <b>{dossier.eyebrow}</b>
                </div>
                <h3>{dossier.title}</h3>
                <p>{dossier.description}</p>
                <a href={dossier.sourceHref} target="_blank" rel="noreferrer">
                  <span>{dossier.source}</span>
                  <strong>{dossier.actionLabel}</strong>
                  <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="arena-screenings section-pad" aria-labelledby="arena-screenings-title">
          <div className="arena-screenings-heading">
            <div>
              <p className="eyebrow">Sélection de la chaîne</p>
              <h2 className="display-title" id="arena-screenings-title">
                Trois rendez-vous,<br />
                <em>une même arène.</em>
              </h2>
            </div>
            <p>
              Une sélection officielle pour suivre l’élan de la compétition, découvrir ses champions et retrouver les moments de Free Fire qui ont rythmé le format.
            </p>
          </div>
          <div className="arena-screening-grid">
            {sevenArenaScreenings.map((screening) => (
              <a className="arena-screening-card" href={screening.href} target="_blank" rel="noreferrer" key={screening.id}>
                <figure>
                  <img src={screening.image} alt={`Miniature officielle : ${screening.title}`} />
                  <span className="arena-play-mark" aria-hidden="true">
                    <Play size={19} fill="currentColor" />
                  </span>
                  <figcaption>{screening.category}</figcaption>
                </figure>
                <div>
                  <p>{screening.detail}</p>
                  <h3>{screening.title}</h3>
                  <span>
                    Regarder sur YouTube <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="arena-voices" className="arena-voices section-pad project-progress-target" aria-labelledby="arena-voices-title">
          <div className="arena-voices-heading">
            <div>
              <p className="eyebrow">Les voix de la 7ouma</p>
              <h2 className="display-title" id="arena-voices-title">
                Créateurs, joueurs et <em>invités à l’écran.</em>
              </h2>
            </div>
            <p>
              Créateurs, joueurs, casters et invités réunis dans une même galerie. Chaque carte s’appuie sur un portrait ou un visuel public attribuable aux contenus de 7ouma Arena.
            </p>
          </div>
          <div className="arena-voices-roster-note" aria-label={`${sevenArenaVoices.length} profils dans la galerie`}>
            <span>ROSTER / {String(sevenArenaVoices.length).padStart(2, "0")} PROFILS</span>
            <p>Une sélection visuelle pensée comme un mur de jeu : chaque voix est maintenant visible au même niveau que le format qu’elle anime.</p>
          </div>
          <div className="arena-voices-grid" ref={voicesGridRef}>
            {sevenArenaVoices.map((voice, index) => (
              <a
                className={`arena-voice arena-voice--${voice.id}`}
                href={voice.href}
                target="_blank"
                rel="noreferrer"
                key={voice.id}
                aria-label={`Consulter la source publique de ${voice.name}`}
                style={{ "--arena-reveal-delay": `${Math.min(index, 7) * 60}ms` } as CSSProperties}
              >
                <figure
                  style={{
                    display: "block",
                    alignSelf: "flex-start",
                    flex: "0 0 4.5rem",
                    width: "4.5rem",
                    height: "4.5rem",
                    minHeight: "4.5rem",
                    margin: "1rem 0",
                    borderRadius: "50%",
                    overflow: "hidden",
                    gridColumn: "auto",
                    gridRow: "auto",
                  }}
                >
                  <img src={voice.image} alt={voice.imageAlt} />
                  <figcaption>{voice.imageNote}</figcaption>
                </figure>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="arena-voice-copy">
                  <strong>{voice.name}</strong>
                  <p>{voice.role}</p>
                </div>
                <ArrowUpRight size={18} />
              </a>
              ))}
            </div>
          </section>

        <section className="detail-links section-pad">
          <p className="eyebrow">Suivre 7ouma Arena</p>
          <div>
            <a href="https://www.youtube.com/@7ouma.Arena.official" target="_blank" rel="noreferrer">
              <Youtube size={23} />
              <span>
                Voir la chaîne<br />
                <strong>YouTube</strong>
              </span>
              <ArrowUpRight size={21} />
            </a>
            <a href="https://www.instagram.com/7ouma.arena/" target="_blank" rel="noreferrer">
              <Instagram size={23} />
              <span>
                Suivre les actus<br />
                <strong>Instagram</strong>
              </span>
              <ArrowUpRight size={21} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
