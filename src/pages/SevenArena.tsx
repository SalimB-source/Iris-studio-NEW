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
  sevenArenaProLeague,
  sevenArenaProLeagueVisuals,
  sevenArenaScreenings,
  sevenArenaVisualFilters,
  sevenArenaVisuals,
  sevenArenaVoices,
} from "./sevenArenaContent";
import "./ArenaVoiceRoster.css";
import "./ArenaFeaturedEpisode.css";
import "./SevenArenaHeroVideo.css";
import "./ArenaProLeague.css";

function ArenaVisualCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState<(typeof sevenArenaVisualFilters)[number]["id"]>("tout");
  const filteredVisuals = activeFilter === "tout" ? sevenArenaVisuals : sevenArenaVisuals.filter((visual) => visual.kind === activeFilter);
  useEffect(() => { if (!api) return; const updateActiveSlide = () => setActiveSlide(api.selectedScrollSnap()); updateActiveSlide(); api.on("select", updateActiveSlide); api.on("reInit", updateActiveSlide); return () => { api.off("select", updateActiveSlide); api.off("reInit", updateActiveSlide); }; }, [api]);
  const selectFilter = (filter: (typeof sevenArenaVisualFilters)[number]["id"]) => { setActiveFilter(filter); setActiveSlide(0); };
  return <div className="arena-visual-carousel-wrap"><div className="arena-visual-filters" role="toolbar" aria-label="Filtrer les créations graphiques 7ouma Arena">{sevenArenaVisualFilters.map((filter) => <button type="button" key={filter.id} className={activeFilter === filter.id ? "is-active" : ""} aria-pressed={activeFilter === filter.id} onClick={() => selectFilter(filter.id)}>{filter.label}</button>)}</div><Carousel key={activeFilter} className="arena-visual-carousel" opts={{ align: "start", loop: true, duration: 30 }} setApi={setApi} aria-label="Carrousel des créations graphiques 7ouma Arena"><CarouselContent className="arena-visual-carousel-track">{filteredVisuals.map((visual, index) => <CarouselItem className="arena-visual-carousel-item" data-active={index === activeSlide} key={visual.id}><a href={visual.href} target="_blank" rel="noreferrer" aria-label={`Ouvrir ${visual.title} dans sa source officielle`}><figure><img src={visual.image} alt={visual.alt} /><figcaption><span>{visual.category}</span><strong>{visual.title}</strong></figcaption></figure><div><p>0{index + 1} / 0{filteredVisuals.length}</p><div className="arena-visual-copy"><span>{visual.detail}</span><small>Période · {visual.campaignPeriod}</small></div><ArrowUpRight size={18} /></div></a></CarouselItem>)}</CarouselContent><p className="carousel-swipe-status" aria-live="polite"><span aria-hidden="true">←</span><span>Balayez pour explorer</span><strong>{String(activeSlide + 1).padStart(2, "0")} / {String(filteredVisuals.length).padStart(2, "0")}</strong><span aria-hidden="true">→</span></p><div className="arena-visual-carousel-nav"><CarouselPrevious aria-label="Création précédente" /><div className="arena-visual-carousel-dots" aria-label="Choisir une création">{filteredVisuals.map((visual, index) => <button type="button" onClick={() => api?.scrollTo(index)} className={index === activeSlide ? "is-active" : ""} aria-label={`Afficher ${visual.title}`} aria-current={index === activeSlide ? "true" : undefined} key={visual.id} />)}</div><CarouselNext aria-label="Création suivante" /></div></Carousel></div>;
}

function ArenaProLeagueCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => { if (!api) return; const updateActiveSlide = () => setActiveSlide(api.selectedScrollSnap()); updateActiveSlide(); api.on("select", updateActiveSlide); api.on("reInit", updateActiveSlide); return () => { api.off("select", updateActiveSlide); api.off("reInit", updateActiveSlide); }; }, [api]);
  return <Carousel className="arena-pro-league-carousel" opts={{ align: "start", loop: true, duration: 30 }} setApi={setApi} aria-label="Carrousel FF Pro League"><CarouselContent className="arena-pro-league-carousel-track">{sevenArenaProLeagueVisuals.map((visual, index) => <CarouselItem className="arena-pro-league-carousel-item" data-active={index === activeSlide} data-wide={visual.id === "grand-final" ? "true" : undefined} key={visual.id}><a href={sevenArenaProLeague.href} target="_blank" rel="noreferrer" aria-label={`Ouvrir ${visual.title} sur Instagram`}><figure><img src={visual.image} alt={visual.alt} /><figcaption><span>{visual.category}</span><strong>{visual.title}</strong></figcaption></figure></a></CarouselItem>)}</CarouselContent><p className="carousel-swipe-status" aria-live="polite"><span aria-hidden="true">←</span><span>Balayez pour explorer</span><strong>{String(activeSlide + 1).padStart(2, "0")} / {String(sevenArenaProLeagueVisuals.length).padStart(2, "0")}</strong><span aria-hidden="true">→</span></p><div className="arena-pro-league-nav"><CarouselPrevious aria-label="Visuel précédent" /><div className="arena-pro-league-dots" aria-label="Choisir un visuel">{sevenArenaProLeagueVisuals.map((visual, index) => <button type="button" onClick={() => api?.scrollTo(index)} className={index === activeSlide ? "is-active" : ""} aria-label={`Afficher ${visual.title}`} aria-current={index === activeSlide ? "true" : undefined} key={visual.id} />)}</div><CarouselNext aria-label="Visuel suivant" /></div></Carousel>;
}

export default function SevenArena() {
  const brand = partnerProjectBranding.sevenArena;
  const voicesGridRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => { const iframe = trailerRef.current; if (!iframe) return; const command = (func: string) => iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*"); const kick = () => { command("mute"); command("playVideo"); }; const onMessage = (event: MessageEvent) => { let payload: unknown = event.data; if (typeof payload === "string") { try { payload = JSON.parse(payload); } catch { return; } } if (!payload || typeof payload !== "object") return; const data = payload as { event?: string; info?: number }; if (data.event === "onStateChange" && (data.info === 0 || data.info === 2)) kick(); }; iframe.addEventListener("load", kick); window.addEventListener("message", onMessage); const pulse = window.setInterval(kick, 2500); kick(); return () => { iframe.removeEventListener("load", kick); window.removeEventListener("message", onMessage); window.clearInterval(pulse); }; }, []);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const cards = Array.from(voicesGridRef.current?.querySelectorAll<HTMLElement>(".arena-voice") ?? []); if (!cards.length) return; cards.forEach((card) => card.classList.add("is-scroll-reveal-ready")); if (!("IntersectionObserver" in window)) { cards.forEach((card) => card.classList.add("is-revealed")); return; } const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }); }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }); cards.forEach((card) => observer.observe(card)); return () => observer.disconnect(); }, []);
  return <div className="page-shell project-detail arena-detail"><SiteHeader /><main><section className="detail-hero detail-hero--arena-surface" aria-labelledby="arena-title"><div className="arena-hero-video" aria-hidden="true" data-no-parallax><iframe ref={trailerRef} src={`${sevenArenaHeroTrailer.embedSrc}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${sevenArenaHeroTrailer.videoId}&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`} title={sevenArenaHeroTrailer.title} allow="autoplay; encrypted-media" referrerPolicy="origin" tabIndex={-1} /></div><div className="arena-hero-video-veil" aria-hidden="true" /><div className="detail-hero-overlay" /><span className="detail-hero-texture" aria-hidden="true" /><div className="detail-hero-copy"><Link className="back-link" href="/projets"><ArrowLeft size={16} /> Tous les projets</Link><p>02 / 7ouma Arena × Djezzy</p><h1 id="arena-title">L’arène est<br />dans <em>la 7ouma.</em></h1><span>E-SPORT · MOBILE GAMING · COMPÉTITION · COMMUNAUTÉ</span></div></section>
        <section id="arena-overview" className="detail-overview section-pad project-progress-target"><div><p className="eyebrow">Le projet</p><h2 className="display-title">La maison de l’e-sport<br /><em>en Algérie.</em></h2></div><p>7ouma Arena est un projet e-sport en partenariat avec Djezzy. À travers le gaming mobile, les compétitions, les créateurs et les formats communautaires, il rassemble les joueurs là où se construit réellement la culture compétitive.</p></section>
        <section className="arena-pro-league section-pad" aria-labelledby="arena-pro-league-title">
          <div className="arena-pro-league-heading">
            <div>
              <p className="eyebrow">{sevenArenaProLeague.eyebrow}</p>
              <h2 id="arena-pro-league-title" className="display-title">{sevenArenaProLeague.titleLead}<br /><em>{sevenArenaProLeague.titleAccent}</em></h2>
            </div>
            <p>{sevenArenaProLeague.description}</p>
          </div>
          <dl className="arena-pro-league-stats" aria-label="La FF Pro League en chiffres">
            {sevenArenaProLeague.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <ol className="arena-pro-league-format" aria-label="Le parcours de la saison">
            {sevenArenaProLeague.format.map((item) => (
              <li key={item.step}>
                <span aria-hidden="true">{item.step}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="arena-pro-league-cards">
            <article className="arena-pro-league-card" aria-label={sevenArenaProLeague.casters.title}>
              <p className="eyebrow">{sevenArenaProLeague.casters.title}</p>
              <strong>{sevenArenaProLeague.casters.names}</strong>
              <p>{sevenArenaProLeague.casters.text}</p>
            </article>
            <article className="arena-pro-league-card" aria-label={sevenArenaProLeague.invited.title}>
              <p className="eyebrow">{sevenArenaProLeague.invited.title}</p>
              <ul>
                {sevenArenaProLeague.invited.teams.map((team) => (
                  <li key={team}>{team}</li>
                ))}
              </ul>
              <p>{sevenArenaProLeague.invited.note}</p>
            </article>
          </div>
          <div className="arena-pro-league-meta">
            <div>
              <p className="arena-pro-league-finalists-title">{sevenArenaProLeague.finalistsTitle}</p>
              <ul className="arena-pro-league-finalists" aria-label={sevenArenaProLeague.finalistsTitle}>
                {sevenArenaProLeague.finalists.map((team) => (
                  <li key={team}>{team}</li>
                ))}
              </ul>
            </div>
            <a className="arena-pro-league-source" href={sevenArenaProLeague.href} target="_blank" rel="noreferrer">{sevenArenaProLeague.sourceLabel} <ArrowUpRight size={16} /></a>
          </div>
          <p className="arena-pro-league-editorial">{sevenArenaProLeague.editorial}</p>
          <p className="arena-pro-league-note">{sevenArenaProLeague.note}</p>
          <ArenaProLeagueCarousel />
        </section>
        <section className="arena-featured-episode section-pad" aria-labelledby="arena-featured-title"><div className="arena-featured-episode-heading"><div><p className="eyebrow">{sevenArenaFeaturedEpisode.eyebrow}</p><h2 id="arena-featured-title" className="display-title">L’épisode final,<br /><em>à l’écran.</em></h2></div><p>{sevenArenaFeaturedEpisode.description}</p></div><div className="arena-featured-player" data-no-parallax><div className="arena-featured-player-frame"><iframe src={`${sevenArenaFeaturedEpisode.embedSrc}?rel=0`} title={sevenArenaFeaturedEpisode.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div><div className="arena-featured-player-meta"><div><p>{sevenArenaFeaturedEpisode.category} · {sevenArenaFeaturedEpisode.duration}</p><strong>{sevenArenaFeaturedEpisode.title}</strong></div><a href={sevenArenaFeaturedEpisode.href} target="_blank" rel="noreferrer">Ouvrir sur YouTube <ArrowUpRight size={16} /></a></div></div></section>
      </main><SiteFooter /></div>;
}
