/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/**
 * Direction « Portfolio Iris » : page À propos blanche, rouge Iris et orange signal.
 * La narration emploie les faits institutionnels vérifiables, présente la direction avec portraits publics
 * crédite Let’s Play séparément et présente l’équipe Iris Studio avec des fonctions et portraits publics attribués avec prudence.
 */
import { useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowUpRight, BarChart3, BriefcaseBusiness, Brush, Calculator, Clapperboard, Linkedin, LoaderCircle, Mic2, PenLine, Play, UserCog, UserRound, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { partnerProjectBranding } from "@/components/partnerProjectBranding";
import { brandPartners } from "@/components/brandPartners";
import { letsPlayTeam } from "./letsPlayContent";
import { paintLetsPlayTeamViolet } from "./paintLetsPlayTeamViolet";
import LetsPlayGamepadGlyphs from "./LetsPlayGamepadGlyphs";
import "./About.css";
import "./AboutRefinement.css";
import "./AboutPortraitPlaceholders.css";
import "./AboutLetsPlayLayout.css";
import "./AboutTeamCardSystem.css";
import "./AboutLetsPlayGaming.css";

const roleIcons = {
  direction: BriefcaseBusiness,
  editorial: PenLine,
  community: UsersRound,
  graphicDesign: Brush,
  videoEditing: Clapperboard,
  projectManagement: BriefcaseBusiness,
  data: BarChart3,
  presentation: Mic2,
  finance: Calculator,
  hr: UserCog,
} as const;

type RoleIcon = keyof typeof roleIcons;

function RoleGlyph({ icon }: { icon: RoleIcon }) {
  const Icon = roleIcons[icon] ?? UserRound;
  return <Icon size={16} strokeWidth={1.7} aria-hidden="true" />;
}

function RoleBadge({ icon, label, className = "" }: { icon: RoleIcon; label: string; className?: string }) {
  return <p className={`about-role-badge ${className}`}><RoleGlyph icon={icon} /><span>{label}</span></p>;
}

function PersonPlaceholder({ name }: { name: string }) {
  return <div className="about-person-placeholder" role="img" aria-label={`Portrait de ${name} à venir`}><UserRound size={32} strokeWidth={1.5} aria-hidden="true" /><span>Portrait à venir</span></div>;
}

type PersonMediaVariant = "person" | "letsplay" | "studio";

function PersonMedia({ name, portrait, alt, variant = "person" }: { name: string; portrait?: string; alt?: string; variant?: PersonMediaVariant }) {
  if (!portrait) return <PersonPlaceholder name={name} />;

  const className = variant === "letsplay"
    ? "about-letsplay-member-portrait"
    : variant === "studio"
      ? "about-studio-member-portrait"
      : "about-person-portrait";

  return (
    <div className={className}>
      <img src={portrait} alt={alt ?? `Portrait public de ${name}`} loading="lazy" decoding="async" />
    </div>
  );
}

export const leadership = [
  {
    name: "Rebai Chentli",
    role: "Directeur général",
    text: "Fonction associée publiquement à la direction générale d’Iris Studio.",
    portrait: "assets/rebai-chentli_80c004cc.jpg",
    profile: "https://dz.linkedin.com/in/rebai-chentli-160a5332",
    alt: "Portrait public de Rebai Chentli",
    roleIcon: "direction" as const,
  },
  {
    name: "Abdelhak Bestandji",
    role: "Directeur associé",
    text: "Fonction associée publiquement à la direction de la SARL Iris Studio.",
    portrait: "assets/abdelhak-bestandji-provided_76fb39f0.jpg",
    profile: "https://dz.linkedin.com/in/abdelhak-bestandji-9b65918a",
    alt: "Portrait public d’Abdelhak Bestandji",
    roleIcon: "direction" as const,
  },
  {
    name: "Hadjer Mezhoud",
    role: "Responsable administratif et financier",
    text: "Responsable administratif et financier d’Iris Studio, selon l’intitulé professionnel communiqué pour cette fiche.",
    portrait: "assets/hadjer-mezhoud.jpg",
    alt: "Portrait public de Hadjer Mezhoud",
    profile: "https://www.linkedin.com/in/hadjer-mezhoud-a95b9969",
    roleIcon: "direction" as const,
  },
];

type StudioCategoryId =
  | "chef-projet"
  | "data"
  | "trade"
  | "commercial"
  | "admin";

export const studioTeamCategories: { id: StudioCategoryId; label: string }[] = [
  { id: "chef-projet", label: "Chef de projet" },
  { id: "data", label: "Données" },
  { id: "trade", label: "Marketing trade" },
  { id: "commercial", label: "Commercial et partenariats" },
  { id: "admin", label: "Administratif" },
];

export const studioTeam = [
  {
    name: "Chakib Taleb",
    role: "Chef de projet · Iris Studio",
    text: "Chef de projet chez Iris Studio. Il accompagne le pilotage de projets et la coordination de leurs étapes de production.",
    portrait: "assets/chakib-taleb.jpg",
    profile: "https://dz.linkedin.com/in/chakib-taleb-716abb179",
    alt: "Portrait de Chakib Taleb",
    roleIcon: "projectManagement" as const,
    category: "chef-projet" as const,
  },
  {
    name: "Hammou Mohamed Riad",
    role: "Chef de projet · Iris Studio",
    text: "Chef de projet chez Iris Studio, pilotage de programmes et coordination transverse.",
    portrait: undefined,
    profile: undefined,
    alt: "Portrait de Hammou Mohamed Riad à venir",
    roleIcon: "projectManagement" as const,
    category: "chef-projet" as const,
  },
  {
    name: "Amine Ladjal",
    role: "Chef de projet · Iris Studio",
    text: "Chef de projet chez Iris Studio. Il contribue à la coordination et au suivi des projets au sein de l’agence.",
    portrait: "assets/amine-ladjal.jpg",
    profile: "https://dz.linkedin.com/in/amine-ladjal-2796611a2",
    alt: "Portrait d’Amine Ladjal",
    roleIcon: "projectManagement" as const,
    category: "chef-projet" as const,
  },
  {
    name: "Farouk Lakehal",
    role: "Chef de projet · Iris Studio",
    text: "Chef de projet chez Iris Studio. Il participe à l’organisation et à l’avancement des opérations portées par le studio.",
    portrait: "assets/farouk-lakehal.jpg",
    profile: "https://dz.linkedin.com/in/farouk-lakehal-464666289",
    alt: "Portrait de Farouk Lakehal",
    roleIcon: "projectManagement" as const,
    category: "chef-projet" as const,
  },
  {
    name: "Rania Bradai",
    role: "Chef de projet · Iris Studio",
    text: "Chef de projet chez Iris Studio. Elle contribue à la coordination et au suivi des projets au sein de l’agence.",
    portrait: "assets/rania-bradai.jpg",
    profile: "https://www.linkedin.com/in/rania-b-ba098b194/",
    alt: "Portrait de Rania Bradai",
    roleIcon: "projectManagement" as const,
    category: "chef-projet" as const,
  },
  {
    name: "Ayoub Toukal",
    role: "Ingénieur data · Scientifique des données · Analyste big data",
    text: "Profil data chez Iris Studio, avec une expertise en ingénierie data, science des données et analyse big data.",
    portrait: "assets/ayoub-toukal.jpg",
    profile: "https://dz.linkedin.com/in/toukal-ayoub-664429298",
    alt: "Portrait d’Ayoub Toukal",
    roleIcon: "data" as const,
    category: "data" as const,
  },
  {
    name: "Imen Derradji",
    role: "Spécialiste marketing trade · Iris Studio",
    text: "Spécialiste marketing trade chez Iris Studio. Elle accompagne les dispositifs de marque au contact du point de vente et des équipes commerciales.",
    portrait: "assets/imen-derradji.jpg",
    profile: "https://dz.linkedin.com/in/imen-derradji-9b5980221",
    alt: "Portrait d’Imen Derradji",
    roleIcon: "projectManagement" as const,
    category: "trade" as const,
  },
  {
    name: "Brahiti Lilya Rihane",
    role: "Assistante commerciale · Responsable du club de tennis Ace Academy",
    text: "Assistante commerciale et responsable du club de tennis Ace Academy, en charge des relations clients et des partenariats sportifs.",
    portrait: "assets/brahiti-lilya-rihane.jpg",
    profile: undefined,
    alt: "Portrait de Brahiti Lilya Rihane",
    roleIcon: "community" as const,
    category: "commercial" as const,
  },
  {
    name: "Lyes Seffari",
    role: "Comptable et spécialiste paie",
    text: "Comptable et spécialiste paie chez Iris Studio. Il assure la comptabilité et la gestion de la paie au sein de l’agence.",
    portrait: "assets/lyes-seffari.jpg",
    profile: "https://www.linkedin.com/in/lyes-seffari-16ba0a258/",
    alt: "Portrait de Lyes Seffari",
    roleIcon: "finance" as const,
    category: "admin" as const,
  },
  {
    name: "Bouchra Kahlouche",
    role: "Généraliste RH",
    text: "Généraliste RH chez Iris Studio. Elle intervient sur le recrutement, l’administration RH et la formation des équipes.",
    portrait: undefined,
    profile: "https://www.linkedin.com/in/bouchra-kahlouche/",
    alt: "Portrait de Bouchra Kahlouche à venir",
    roleIcon: "hr" as const,
    category: "admin" as const,
  },
  {
    name: "Nabil Fettal",
    role: "Chargé des relations administratives",
    text: "Chargé des relations administratives chez Iris Studio. Il assure le suivi administratif et les relations avec les interlocuteurs de l’agence.",
    portrait: undefined,
    profile: "https://www.linkedin.com/in/nabil-fettal-4582ab332/",
    alt: "Portrait de Nabil Fettal à venir",
    roleIcon: "hr" as const,
    category: "admin" as const,
  },
];

export default function About() {
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

  return (
    <div className="site-shell about-page">
      <SiteHeader />
      <main>
        <section className="about-hero section-pad" aria-labelledby="about-title">
          <div className="about-hero-line" aria-hidden="true"><i /><i /><i /></div>
          <div className="about-hero-meta">
            <p className="eyebrow">L’équipe / Iris Studio</p>
            <p>Alger, Algérie<br />Une communication qui part du réel.</p>
          </div>
          <div className="about-hero-main">
            <span className="about-section-index">00 / ORIGINE</span>
            <h1 id="about-title">Le studio commence<br />par <em>la rencontre.</em></h1>
            <p>
              Iris Studio accompagne les marques au plus près de leurs enjeux. Une idée ne suffit pas : elle doit trouver son langage, son équipe et son terrain.
            </p>
          </div>
          <div className="about-hero-eye" aria-hidden="true"><i /><i /><i /><b /></div>
        </section>

        <section className="about-origin section-pad" aria-labelledby="origin-title">
          <div className="about-origin-label">
            <span>01</span>
            <p>NOTRE HISTOIRE<br />EN MOUVEMENT</p>
          </div>
          <div className="about-origin-copy">
            <p className="eyebrow">Une agence qui s’adapte</p>
            <h2 id="origin-title" className="display-title">Partir d’un besoin.<br /><em>Faire émerger une réponse.</em></h2>
            <div className="about-story-columns">
              <p>
                Iris Studio est né d’une volonté : offrir des solutions sur mesure aux marques qui cherchent à faire évoluer leur communication. L’agence aborde chaque projet comme une rencontre, entre une ambition, un métier, un public et une réalité de marché.
              </p>
              <p>
                Forte de plus d’une décennie d’expérience, elle se redéfinit avec son époque et ses enjeux. Sa créativité et sa réactivité servent un objectif concret : simplifier les problématiques de communication et créer des dispositifs qui produisent un impact juste.
              </p>
            </div>
          </div>
          <aside className="about-experience-note">
            <strong>10<span>+</span></strong>
            <p>années d’expérience<br />au contact des marques<br />et du terrain.</p>
          </aside>
        </section>

        <section className="about-leadership section-pad" aria-labelledby="leadership-title">
          <div className="about-leadership-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="about-leadership-route" aria-hidden="true"><span>02 / REGARD</span><i /><b /></div>
          <div className="about-leadership-heading">
            <p className="eyebrow">Direction associée à l’histoire du studio</p>
            <h2 id="leadership-title" className="display-title">Trois parcours publics<br />qui portent <em>la direction.</em></h2>
            <p>
              Iris Studio avance grâce à un collectif de métiers. Les fonctions ci-dessous sont reprises d’informations professionnelles publiques afin de présenter la direction avec transparence.
            </p>
            <span className="about-direction-source">Dossier / portraits publics &amp; profils professionnels</span>
          </div>
          <div className="about-leadership-cards">
            {leadership.map((person, index) => (
              <article key={person.name} className="about-person-card">
                <span className="about-person-archive">FICHE / 0{index + 1}</span>
                <PersonMedia name={person.name} portrait={"portrait" in person ? person.portrait : undefined} alt={"portrait" in person ? person.alt : undefined} />
                <RoleBadge icon={person.roleIcon} label={person.role} />
                <h3>{person.name}</h3>
                <span className="about-person-line" aria-hidden="true" />
                <small>{person.text}</small>
                <a className="about-person-link" href={person.profile} target="_blank" rel="noreferrer">Voir le profil LinkedIn <Linkedin size={14} /><ArrowUpRight size={14} /></a>
              </article>
            ))}
          </div>
          <p className="about-source-note">Fonctions et portraits issus de résultats publics liés aux profils LinkedIn, consultés en août 2026. Chaque carte renvoie vers le profil professionnel correspondant ; les biographies détaillées et l’attribution formelle du statut de fondateur pourront être complétées après validation d’Iris Studio.</p>
        </section>

        <section ref={letsPlayTeamRef} className="about-letsplay-team section-pad" aria-labelledby="letsplay-team-title">
          <LetsPlayGamepadGlyphs />
          <div className="about-letsplay-team-route" aria-hidden="true"><span>03</span><i /><b>CRÉDITS DE FABRICATION</b></div>
          <div className="about-letsplay-brand-stamp">
            <img src={partnerProjectBranding.letsPlay.logo} alt={partnerProjectBranding.letsPlay.alt} />
          </div>
          <div className="about-letsplay-team-heading">
            <p className="eyebrow">Let’s Play × Algérie Télécom</p>
            <h2 id="letsplay-team-title" className="display-title">Une émission se construit<br />à plusieurs <em>regards.</em></h2>
            <p>
              Cette sélection réunit des membres de l’équipe Let’s Play communiqués par Iris Studio. Les cartes distinguent les fonctions visibles dans les sources publiques des contributions d’équipe confirmées par le studio.
            </p>
          </div>
          <div className="about-letsplay-team-grid">
            {letsPlayTeam.map((person, index) => (
              <article key={person.name} className="about-letsplay-member">
                <div className="about-letsplay-member-top">
                  <span>ÉQUIPE / 0{index + 1}</span>
                  <div aria-hidden="true" className="about-letsplay-member-mark"><RoleGlyph icon={person.roleIcon} /></div>
                </div>
                <PersonMedia
                  name={person.name}
                  portrait={"portrait" in person ? person.portrait : undefined}
                  alt={"portraitAlt" in person ? person.portraitAlt : undefined}
                  variant="letsplay"
                />
                <RoleBadge icon={person.roleIcon} label={person.role} />
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
                    <a href={person.episode.url} target="_blank" rel="noreferrer" className="about-letsplay-member-episode-link" aria-label={`${person.episode.label} sur la chaîne YouTube officielle Let’s Play`} aria-busy={isEpisodeLoading} data-loading={isEpisodeLoading || undefined} onClick={(event) => handleEpisodeClick(event, person.episode.url)}>
                      {isEpisodeLoading ? <LoaderCircle className="about-letsplay-member-episode-spinner" size={13} aria-hidden="true" /> : <Play size={13} fill="currentColor" aria-hidden="true" />}
                      <span aria-live="polite">{isEpisodeLoading ? "Ouverture…" : person.episode.label}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                    );
                  })() : null}
                  {person.source ? (
                    <a href={person.source} target="_blank" rel="noreferrer" className="about-letsplay-member-link">
                      {person.sourceLabel} {person.linkedin ? <Linkedin size={14} /> : <ArrowUpRight size={14} />} <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="about-letsplay-member-pending">Profil professionnel non associé publiquement</span>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="about-letsplay-source-note">
            Crédits d’équipe complétés à partir d’informations communiquées directement par Iris Studio et de profils professionnels publics consultés en août 2026. Les liens LinkedIn peuvent rediriger vers une page de connexion selon la session.
          </p>
        </section>

        <section className="about-studio-team section-pad" aria-labelledby="studio-team-title">
          <div className="about-studio-team-route" aria-hidden="true"><span>04</span><i /><b>COLLECTIF IRIS</b></div>
          <div className="about-studio-team-heading">
            <p className="eyebrow">Équipe Iris Studio</p>
            <h2 id="studio-team-title" className="display-title">Les métiers qui font<br /><em>avancer le studio.</em></h2>
          </div>
          <div className="about-studio-team-grid">
            {studioTeamCategories.flatMap((category) =>
              studioTeam
                .filter((person) => person.category === category.id)
                .map((person) => (
                  <article key={person.name} className="about-studio-member">
                    <span className="about-studio-member-index">{category.label}</span>
                    <PersonMedia name={person.name} portrait={person.portrait} alt={person.alt} variant="studio" />
                    <h3>{person.name}</h3>
                    <RoleBadge icon={person.roleIcon} label={person.role} />
                    {person.profile ? (
                      <a className="about-studio-member-link" href={person.profile} target="_blank" rel="noreferrer" aria-label={`Profil LinkedIn de ${person.name}`}>
                        LinkedIn <Linkedin size={13} />
                      </a>
                    ) : null}
                  </article>
                )),
            )}
          </div>
        </section>

        <section className="about-ecosystem section-pad" aria-labelledby="ecosystem-title">
          <div className="about-ecosystem-route" aria-hidden="true"><span>05</span><i /><b>MARQUES</b></div>
          <div className="about-ecosystem-heading">
            <p className="eyebrow">Un écosystème de confiance</p>
            <h2 id="ecosystem-title" className="display-title">Des marques rencontrées<br />sur le <em>terrain.</em></h2>
            <p>La présence publique d’Iris Studio relie des annonceurs nationaux et internationaux. Leurs logos sont présentés ici en vrac, chacun dans ses couleurs de marque.</p>
          </div>
          <ul className="about-brand-scatter" aria-label="Logos des marques citées par Iris Studio">
            {brandPartners.map((client) => (
              <li key={client.name} className={client.name === "EGOR" ? "about-brand-scatter-item is-egor-logo" : "about-brand-scatter-item"}>
                <img className="mon-logo" src={client.logo} alt={`Logo ${client.name}`} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
          <p className="about-ecosystem-note">Dossier / logos officiels des marques citées par la présentation publique d’Iris Studio. Couleurs de marque conservées.</p>
        </section>

        <section className="about-contact section-pad" aria-labelledby="about-contact-title">
          <div className="about-contact-eye" aria-hidden="true"><i /><i /></div>
          <div><p className="eyebrow">La suite s’écrit ensemble</p><h2 id="about-contact-title">Un projet commence<br />toujours par <em>une conversation.</em></h2></div>
          <Link className="about-contact-link" href="/contact">Parlons de votre besoin <ArrowUpRight size={21} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
