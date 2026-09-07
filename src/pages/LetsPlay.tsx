/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/**
 * Direction Let’s Play : une scène violet gaming épurée, à forte lisibilité, sans ornement parasite autour des archives officielles.
 * Chaque média conserve sa provenance publique, sa légende et un repère de campagne clair.
 */
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowLeft, ArrowUpRight, Brush, Clapperboard, Instagram, Linkedin, LoaderCircle, Mic2, PenLine, Play, type LucideIcon, UserRound, UsersRound, Youtube } from "lucide-react";
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
  letsPlayDossiers,
  letsPlayFeaturedScreening,
  letsPlayTeam,
  letsPlayInstagramVisuals,
  letsPlayScreenings,
  letsPlayTclReview,
} from "./letsPlayContent";
import "./LetsPlayTclReview.css";
import "./LetsPlayGamingHero.css";
import "./About.css";
import "./AboutRefinement.css";
import "./AboutPortraitPlaceholders.css";
import "./AboutLetsPlayLayout.css";
import "./AboutTeamCardSystem.css";
import "./AboutLetsPlayGaming.css";
import { paintLetsPlayTeamViolet } from "./paintLetsPlayTeamViolet";

const letsPlayRoleIcons: Record<string, LucideIcon> = {
  editorial: PenLine,
  community: UsersRound,
  graphicDesign: Brush,
  videoEditing: Clapperboard,
  presentation: Mic2,
};

function RoleGlyph({ icon }: { icon: string }) {
  const Icon = letsPlayRoleIcons[icon] ?? UsersRound;
  return <Icon size={16} strokeWidth={1.7} aria-hidden="true" />;
}

function PersonPlaceholder({ name }: { name: string }) {
  return <div className="about-person-placeholder" role="img" aria-label={`Portrait de ${name} à venir`}><UserRound size={32} strokeWidth={1.5} aria-hidden="true" /><span>Portrait à venir</span></div>;
}

function PersonMedia({ name, portrait, alt }: { name: string; portrait?: string; alt?: string }) {
  if (!portrait) return <PersonPlaceholder name={name} />;
  return (
    <div className="about-letsplay-member-portrait">
      <img src={portrait} alt={alt ?? `Portrait public de ${name}`} loading="lazy" decoding="async" />
    </div>
  );
}

function LetsPlayMemberCard({
  person,
  index,
  loadingEpisodeUrl,
  onEpisodeClick,
}: {
  person: (typeof letsPlayTeam)[number];
  index: number;
  loadingEpisodeUrl: string | null;
  onEpisodeClick: (event: ReactMouseEvent<HTMLAnchorElement>, url: string) => void;
}) {
  return (
    <article className="about-letsplay-member">
      <div className="about-letsplay-member-top">
        <span>ÉQUIPE / 0{index + 1}</span>
        <div aria-hidden="true" className="about-letsplay-member-mark"><RoleGlyph icon={person.roleIcon} /></div>
      </div>
      <PersonMedia
        name={person.name}
        portrait={"portrait" in person ? person.portrait : undefined}
        alt={"portraitAlt" in person ? person.portraitAlt : undefined}
      />
      <p className="about-role-badge"><RoleGlyph icon={person.roleIcon} /><span>{person.role}</span></p>
      <h3>{person.name}</h3>
      <small>{person.text}</small>
      {"episodeFormat" in person && person.episodeFormat ? (
        <div className="about-letsplay-member-format">
          <span>Format d’un épisode</span>
          <p>{person.episodeFormat}</p>
        </div>
      ) : null}
      <div className="about-letsplay-member-actions">
        {"episode" in person && person.episode ? (() => {
          const isEpisodeLoading = loadingEpisodeUrl === person.episode.url;
          return (
            <a href={person.episode.url} target="_blank" rel="noreferrer" className="about-letsplay-member-episode-link" aria-label={`${person.episode.label} sur la chaîne YouTube officielle Let’s Play`} aria-busy={isEpisodeLoading} data-loading={isEpisodeLoading || undefined} onClick={(event) => onEpisodeClick(event, person.episode.url)}>
              {isEpisodeLoading ? <LoaderCircle className="about-letsplay-member-episode-spinner" size={13} aria-hidden="true" /> : <Play size={13} fill="currentColor" aria-hidden="true" />}
              <span aria-live="polite">{isEpisodeLoading ? "Ouverture…" : person.episode.label}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          );
        })() : null}
        {person.source ? (
          <a href={person.source} target="_blank" rel="noreferrer" className="about-letsplay-member-link">
            {person.sourceLabel ?? "Voir le profil"} {"linkedin" in person && person.linkedin ? <Linkedin size={14} /> : <ArrowUpRight size={14} />} <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="about-letsplay-member-pending">Profil professionnel non associé publiquement</span>
        )}
      </div>
    </article>
  );
}

function LetsPlayInstagramCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

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

  return (
    <Carousel
      className="letsplay-instagram-carousel"
      opts={{ align: "start", loop: true, duration: 30 }}
      setApi={setApi}
      aria-label="Carrousel des publications Instagram Let’s Play"
    >
      <CarouselContent className="letsplay-instagram-carousel-track">
        {letsPlayInstagramVisuals.map((visual, index) => (
          <CarouselItem className="letsplay-instagram-carousel-item" data-active={index === activeSlide} key={visual.id}>
            <a href={visual.href} target="_blank" rel="noreferrer" aria-label={`Ouvrir ${visual.title} sur Instagram`}>
              <figure>
                <img src={visual.image} alt={visual.alt} />
                <figcaption>
                  <span>{visual.category}</span>
                  <strong>{visual.title}</strong>
                </figcaption>
              </figure>
              <div>
                <p>0{index + 1} / 0{letsPlayInstagramVisuals.length}</p>
                <span>{visual.detail}</span>
                <ArrowUpRight size={18} />
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <p className="carousel-swipe-status" aria-live="polite">
        <span aria-hidden="true">←</span>
        <span>Balayez pour explorer</span>
        <strong>{String(activeSlide + 1).padStart(2, "0")} / {String(letsPlayInstagramVisuals.length).padStart(2, "0")}</strong>
        <span aria-hidden="true">→</span>
      </p>
      <div className="letsplay-instagram-carousel-nav">
        <CarouselPrevious aria-label="Publication Instagram précédente" />
        <div className="letsplay-instagram-carousel-dots" aria-label="Choisir une publication Instagram">
          {letsPlayInstagramVisuals.map((visual, index) => (
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
        <CarouselNext aria-label="Publication Instagram suivante" />
      </div>
    </Carousel>
  );
}

export default function LetsPlay() {
  const brand = partnerProjectBranding.letsPlay;
  const [loadingEpisodeUrl, setLoadingEpisodeUrl] = useState<string | null>(null);
  const letsPlayTeamRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    paintLetsPlayTeamViolet(letsPlayTeamRef.current);
  }, []);

  const handleEpisodeClick = (event: ReactMouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault();
    if (loadingEpisodeUrl) return;

    const videoWindow = window.open("about:blank", "_blank");
    if (videoWindow) videoWindow.opener = null;

    setLoadingEpisodeUrl(url);
    window.setTimeout(() => {
      if (videoWindow) {
        videoWindow.location.href = url;
      } else {
        window.location.assign(url);
      }
      setLoadingEpisodeUrl(null);
    }, 320);
  };

  return <div className="page-shell project-detail letsplay-detail"><SiteHeader /><main>
    <section className="detail-hero detail-hero--letsplay-surface" aria-labelledby="letsplay-title"><div className="detail-hero-copy"><Link className="back-link" href="/projets"><ArrowLeft size={16} /> Tous les projets</Link><p>01 / Let’s Play × Algérie Télécom</p><h1 id="letsplay-title">La pop culture<br />se joue aussi <em>sur le terrain.</em></h1><span>GAMING · TECH · E-SPORT · CINÉMA</span></div><div className="detail-project-brand detail-project-brand--letsplay"><img src={brand.logo} alt={brand.alt} /></div><div className="detail-stamp">LP<i>IRIS / 01</i></div></section>
    <section id="letsplay-overview" className="detail-overview section-pad project-progress-target"><div><p className="eyebrow">Le projet</p><h2 className="display-title">Une émission qui<br /><em>parle communautés.</em></h2></div><p>Let’s Play est une émission dédiée au gaming et à la pop culture, en partenariat avec Algérie Télécom. Jeux vidéo, technologie, e-sport, cinéma et nouveaux usages y alimentent une conversation pensée pour celles et ceux qui vivent ces univers au quotidien.</p></section>
    <section id="letsplay-terrain" className="detail-framework section-pad project-progress-target"><figure className="detail-framework-image letsplay-launch-image"><span className="detail-archive-index">ARCHIVE / 01</span><img src="assets/letsplay-launch-visual.jpg" alt="Visuel de lancement Let’s Play par IRIS Studio et Algérie Télécom" /><figcaption>Visuel de lancement / Let’s Play × Algérie Télécom</figcaption></figure><div className="detail-framework-copy"><p className="eyebrow">Le terrain éditorial</p><h2 className="display-title">Des passions qui deviennent <em>conversation.</em></h2><div className="detail-pillars"><span>Gaming</span><span>Pop culture</span><span>Tech & IA</span><span>E-sport</span></div><p>Le format rassemble des univers en mouvement dans un langage accessible, utile et proche de ses communautés.</p></div></section>
    <section id="letsplay-tcl-review" className="letsplay-tcl-review section-pad project-progress-target" aria-labelledby="letsplay-tcl-title"><div className="letsplay-tcl-review-intro"><div><p className="eyebrow">{letsPlayTclReview.category}</p><h2 className="display-title" id="letsplay-tcl-title">Quand le gaming <em>passe à l’écran.</em></h2></div><p>Let’s Play met en lumière sa review TCL au sein d’un format pensé pour les communautés qui suivent la technologie au plus près.</p><div className="letsplay-tcl-review-specs" aria-label="Informations sur la review"><span>{letsPlayTclReview.index}</span><span>{letsPlayTclReview.duration}</span><span>CHAÎNE OFFICIELLE</span></div></div><a className="letsplay-tcl-review-card" href={letsPlayTclReview.href} target="_blank" rel="noreferrer" aria-label="Regarder la review TCL de Let’s Play sur YouTube"><figure><img src={letsPlayTclReview.image} alt={letsPlayTclReview.imageAlt} /><span className="letsplay-tcl-review-play" aria-hidden="true"><Play size={22} fill="currentColor" /></span><figcaption>{letsPlayTclReview.duration}</figcaption></figure><div><p>{letsPlayTclReview.index}</p><h3>{letsPlayTclReview.title}</h3><span>{letsPlayTclReview.summary}</span><strong>Regarder la review <ArrowUpRight size={18} /></strong></div></a></section>
    <section id="letsplay-archives" className="letsplay-archive section-pad project-progress-target" aria-labelledby="letsplay-archive-title"><div className="letsplay-archive-heading"><div><p className="eyebrow">Au-delà du plateau</p><h2 className="display-title" id="letsplay-archive-title">Des formats qui donnent <em>une scène</em> à la communauté.</h2></div><p>Deux réalisations documentées par les publications officielles de Let’s Play : une présence média annoncée au GCCDZ 2026 et un concours de court métrage relayé par la chaîne.</p></div><div className="letsplay-dossier-grid">{letsPlayDossiers.map((dossier) => <article className="letsplay-dossier" key={dossier.id}><div className="letsplay-dossier-top"><span>{dossier.index}</span><b>{dossier.eyebrow}</b></div>{"image" in dossier && dossier.image ? <figure className="letsplay-dossier-brand"><img src={dossier.image} alt={dossier.imageAlt} /></figure> : null}<h3>{dossier.title}</h3><p>{dossier.description}</p><a href={dossier.sourceHref} target="_blank" rel="noreferrer"><span>{dossier.source}</span><strong>{dossier.actionLabel}</strong><ArrowUpRight size={17} /></a></article>)}</div></section>
    <section id="letsplay-focus" className="letsplay-featured-screening section-pad project-progress-target" aria-labelledby="letsplay-featured-title"><div className="letsplay-featured-heading"><p className="eyebrow">Focus principal</p><span>ARCHIVE VIDÉO / 01</span></div><a className="letsplay-featured-card" href={letsPlayFeaturedScreening.href} target="_blank" rel="noreferrer"><figure><img src={letsPlayFeaturedScreening.image} alt={`Miniature officielle : ${letsPlayFeaturedScreening.title}`} /><span className="letsplay-featured-play" aria-hidden="true"><Play size={30} fill="currentColor" /></span><figcaption>{letsPlayFeaturedScreening.category}</figcaption></figure><div><p>{letsPlayFeaturedScreening.detail}</p><h2 className="display-title" id="letsplay-featured-title">Un terrain,<br /><em>une histoire à vivre.</em></h2><h3>{letsPlayFeaturedScreening.title}</h3><span>Regarder le reportage <ArrowUpRight size={18} /></span></div></a></section>
    <section id="letsplay-instagram" className="letsplay-instagram section-pad project-progress-target" aria-labelledby="letsplay-instagram-title"><div className="letsplay-instagram-heading"><div><p className="eyebrow">Publications Instagram</p><h2 className="display-title" id="letsplay-instagram-title">La pop culture<br /><em>en pleine partie.</em></h2></div><p>Une sélection de visuels Let’s Play fournis pour ce site, reliés au compte Instagram officiel du projet.</p></div><LetsPlayInstagramCarousel /></section>
    <section className="letsplay-screenings section-pad" aria-labelledby="letsplay-screenings-title"><div className="letsplay-screenings-heading"><div><p className="eyebrow">Sélection d’épisodes</p><h2 className="display-title" id="letsplay-screenings-title">Des sujets qui font<br /><em>vivre la partie.</em></h2></div><p>Sept épisodes de la chaîne officielle Let’s Play, entre gaming, technologie, création et pop culture. Chaque miniature ouvre directement la vidéo associée sur YouTube.</p></div><div className="letsplay-screening-grid">{letsPlayScreenings.map((screening) => <a className="letsplay-screening-card" href={screening.href} target="_blank" rel="noreferrer" key={screening.id} aria-label={`Regarder ${screening.title} sur YouTube`}><figure><img src={screening.image} alt={`Miniature officielle : ${screening.title}`} loading="lazy" decoding="async" width="1280" height="720" /><span className="letsplay-play-mark" aria-hidden="true"><Play size={19} fill="currentColor" /></span><figcaption>{screening.category}</figcaption></figure><div><p>{screening.detail}</p><h3>{screening.title}</h3><p className="letsplay-screening-summary">{screening.summary}</p><span>Regarder sur YouTube <ArrowUpRight size={16} /></span></div></a>)}</div></section>
    <div className="about-page" id="letsplay-members">
      <section className="about-letsplay-team section-pad" aria-labelledby="letsplay-members-title">
        <div className="about-letsplay-gamepad" aria-hidden="true">
          <span className="is-triangle" />
          <span className="is-circle" />
          <span className="is-square" />
          <span className="is-cross" />
          <span className="is-triangle" />
          <span className="is-circle" />
          <span className="is-square" />
          <span className="is-cross" />
          <span className="is-triangle" />
          <span className="is-circle" />
          <span className="is-square" />
          <span className="is-cross" />
        </div>
        <div className="about-letsplay-team-route" aria-hidden="true"><span>08</span><i /><b>CRÉDITS DE FABRICATION</b></div>
        <div className="about-letsplay-brand-stamp">
          <img src={brand.logo} alt={brand.alt} />
        </div>
        <div className="about-letsplay-team-heading">
          <p className="eyebrow">Let’s Play × Algérie Télécom</p>
          <h2 id="letsplay-members-title" className="display-title">Une émission se construit<br />à plusieurs <em>regards.</em></h2>
          <p>
            Cette sélection réunit des membres de l’équipe Let’s Play communiqués par Iris Studio. Les cartes distinguent les fonctions visibles dans les sources publiques des contributions d’équipe confirmées par le studio.
          </p>
        </div>
        <div className="about-letsplay-team-grid">
          {letsPlayTeam.map((person, index) => (
            <LetsPlayMemberCard person={person} index={index} key={person.name} loadingEpisodeUrl={loadingEpisodeUrl} onEpisodeClick={handleEpisodeClick} />
          ))}
        </div>
        <p className="about-letsplay-source-note">
          Crédits d’équipe complétés à partir d’informations communiquées directement par Iris Studio et de profils professionnels publics consultés en août 2026. Les liens LinkedIn peuvent rediriger vers une page de connexion selon la session.
        </p>
      </section>
    </div>
    <section className="detail-links section-pad"><p className="eyebrow">Suivre Let’s Play</p><div><a href="https://www.youtube.com/@letsplay.officiel" target="_blank" rel="noreferrer"><Youtube size={23} /><span>Voir la chaîne<br /><strong>YouTube</strong></span><ArrowUpRight size={21} /></a><a href="https://www.instagram.com/letsplay.officiel/" target="_blank" rel="noreferrer"><Instagram size={23} /><span>Suivre les actus<br /><strong>Instagram</strong></span><ArrowUpRight size={21} /></a></div></section>
  </main><SiteFooter /></div>;
}
