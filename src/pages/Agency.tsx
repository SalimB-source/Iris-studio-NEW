/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/**
 * Direction « Logo Iris Studio » : l’agence est un chapitre documentaire clair, structuré par le rouge Iris et l’œil-prisme.
 * Les photographies de travail dialoguent avec les repères de méthode, les chiffres d’archive et les rayons rouge-orangé directionnels.
 */
import { ArrowUpRight, CalendarDays, Clapperboard, Gift, Linkedin, Map, Megaphone, Palette, type LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { brandPartners } from "@/components/brandPartners";
import "./Operations.css";
import "./AgencyPartnerMarquee.css";
import "./AgencyHeroCorporate.css";
import "./AgencyFmcg.css";
import "./AgencyExpertises.css";
import "@/components/BrandMarquee.css";

const values = [
  ["01", "Écouter", "Commencer par le contexte, les équipes et les usages qui font réellement bouger une décision."],
  ["02", "Orchestrer", "Relier les bons talents, les bons moyens et les bons moments autour d’un cap clair."],
  ["03", "Agir", "Faire exister la stratégie au contact du terrain plutôt que la laisser dans une présentation."],
];

const areas: Array<{ number: string; eyebrow: string; title: string; copy: string; tags: string[]; icon: LucideIcon }> = [
  { number: "01", eyebrow: "Diagnostiquer", title: "Route To Market", copy: "Lire le marché, clarifier le potentiel et transformer une ambition en plan d’action mesurable, jusqu’au trade marketing.", tags: ["Trade marketing", "Business plan", "Audit de terrain"], icon: Map },
  { number: "02", eyebrow: "Rassembler", title: "Évènementiel", copy: "Concevoir et animer des expériences qui réunissent les publics autour d’un moment juste et mémorable.", tags: ["Stands d’exposition", "Team building", "Conférences"], icon: CalendarDays },
  { number: "03", eyebrow: "Orienter", title: "Stratégie de communication", copy: "Simplifier les enjeux de communication avec une approche organique, éclectique et pragmatique.", tags: ["Positionnement", "Créativité", "Accompagnement personnalisé"], icon: Megaphone },
  { number: "04", eyebrow: "Raconter", title: "Audiovisuel", copy: "Faire passer une idée par l’image, de l’écriture à la production, la post-production et la mise en scène.", tags: ["Spots publicitaires", "Émissions", "VFX & casting"], icon: Clapperboard },
  { number: "05", eyebrow: "Donner forme", title: "Design", copy: "Développer une identité et des concepts de mise en marché qui répondent au besoin réel de la marque.", tags: ["Concept", "Direction artistique", "Réalisation"], icon: Palette },
  { number: "06", eyebrow: "Prolonger", title: "Goodies", copy: "Choisir et faire vivre l’objet publicitaire qui prolonge la marque avec précision, cohérence et sens du détail.", tags: ["Objet de marque", "Sélection", "Finition"], icon: Gift },
];

const irisFigures = [["3", "directions"], ["268", "employés"], ["180", "véhicules"], ["+25", "clients"], ["+38", "wilayas"], ["4", "missions"]];
const fmcgLeaders = brandPartners.filter((client) =>
  client.name === "Philip Morris International" || client.name === "Djezzy" || client.name === "Amir Clean"
);
const fmcgFigures = [
  { figure: "41 844", label: "Audits / POS census" },
  { figure: "341 542", label: "Visites / an" },
  { figure: "1 872", label: "Jours d’opération trade" },
  { figure: "+188", label: "Auditeurs merchandiser" },
  { figure: "+432", label: "Opérations sur 6 ans" },
];
const agencyHeroImage = "assets/iris-agency-corporate-hero-1600.webp";
const agencyHeroImageSmall = "assets/iris-agency-corporate-hero-960.webp";

export default function Agency() {
  return <div className="page-shell"><SiteHeader /><main>
    <section className="page-hero page-hero-agency" aria-labelledby="agency-title"><img className="page-hero-photo" src={agencyHeroImage} srcSet={`${agencyHeroImageSmall} 960w, ${agencyHeroImage} 1600w`} sizes="100vw" alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" /><div className="page-hero-shade" /><div className="page-hero-ray" /><div className="iris-eye-orbit iris-eye-hero" aria-hidden="true"><i /><i /><i /></div><div className="page-hero-inner"><p className="eyebrow light-eyebrow">01 / L’agence</p><h1 id="agency-title">Les bonnes idées<br />ont besoin de <em>présence.</em></h1><p>Depuis Alger, Iris Studio accompagne les marques depuis plus de dix ans, au moment où la réflexion doit devenir une action tangible.</p></div><div className="page-hero-index">AGENCE / 36.75°</div><div className="agency-hero-dossier">Cadre de méthode<br /><span>Illustration éditoriale / 01</span></div></section>
    <section className="agency-manifesto section-pad"><div className="agency-manifesto-side"><div className="section-marker"><span>02</span><i /></div><p className="eyebrow">Notre posture</p><p>Une agence qui propose des solutions sur mesure, tournée vers l’humain, qui construit avec les équipes et jamais à distance du contexte.</p></div><div><h2 className="display-title">Comprendre avant<br /><em>de faire.</em></h2><p className="large-copy">Notre pratique associe stratégie, écoute et déploiement. L’objectif n’est pas de produire plus de communication, mais d’installer une idée là où elle peut réellement compter.</p><div className="agency-manifesto-links"><Link className="arrow-link" href="#agency-expertises">Découvrir nos expertises <ArrowUpRight size={17} /></Link><a className="arrow-link agency-member-link" href="https://www.linkedin.com/in/naoufel-amokrane-329a35257?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">Naoufel Amokrane · LinkedIn <Linkedin size={16} /></a></div></div></section>
    <section className="values-section section-pad"><div className="values-image"><img src="assets/iris-team-documentary_eceff224.jpg" alt="Illustration éditoriale d’une réunion de travail" /><span>CADRE DE MÉTHODE / ILLUSTRATION</span></div><div className="values-list">{values.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section id="agency-expertises" aria-labelledby="agency-expertises-title"><div className="section-pad"><p className="eyebrow">03 / Nos expertises</p><h2 id="agency-expertises-title" className="display-title">La stratégie est le départ.<br /><em>L’impact est la mesure.</em></h2><p className="large-copy">Une lecture ambitieuse et concrète, du premier diagnostic jusqu’à la réalisation, au plus près des usages.</p><div className="expertise-list">{areas.map((area) => <article className="expertise-row" key={area.number}><div className="expertise-card-top"><div className="expertise-row-index">{area.number}</div><div className="expertise-row-icon" aria-hidden="true"><area.icon size={20} strokeWidth={1.7} /></div></div><p className="expertise-card-kicker">{area.eyebrow}</p><h2>{area.title}</h2><p className="expertise-row-copy">{area.copy}</p><div className="expertise-tags">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>
    <section className="expertise-field section-pad"><div className="field-copy"><p className="eyebrow">Un système, pas une addition</p><h2 className="display-title">Observer. Orchestrer.<br /><em>Activer. Apprendre.</em></h2><p>Chaque mission se construit comme un parcours lisible : le besoin est compris, la réponse prend forme, les équipes s’alignent, puis le terrain permet d’ajuster la suite.</p><Link className="arrow-link" href="/contact">Parler d’un besoin <ArrowUpRight size={17} /></Link></div><figure><img src="assets/iris-field-documentary_b5c5419c.webp" alt="Activation de marque en point de vente" /><figcaption>CE QUI COMPTE : LE CONTEXTE, L’USAGE, LA DÉCISION.</figcaption></figure></section>
    <section className="iris-figures section-pad" aria-labelledby="figures-title"><div className="iris-figures-header"><div><p className="eyebrow">Iris en chiffres</p><h2 id="figures-title" className="display-title">Une présence qui<br />se lit <em>sur le terrain.</em></h2></div><p>Ces repères reprennent la publication institutionnelle « Vision 2025 » d’Iris Studio. Ils donnent une lecture d’échelle de l’organisation et de ses opérations.</p></div><div className="iris-figures-grid">{irisFigures.map(([figure, label]) => <article key={label}><strong>{figure}</strong><span>{label}</span></article>)}</div><p className="iris-figures-note">Repères publiés dans l’archive Iris Studio #Vision2025 ; ils sont présentés comme un instantané de communication, non comme des données mises à jour en temps réel.</p></section>
    <section className="agency-fmcg section-pad" aria-labelledby="agency-fmcg-title">
      <div className="agency-fmcg-heading">
        <div>
          <p className="eyebrow">Présentation de l’agence</p>
          <h2 id="agency-fmcg-title" className="display-title">Le Top 3 FMCG,<br />lu <em>sur le terrain.</em></h2>
        </div>
        <p>Plus de dix ans de partenariat avec les leaders du FMCG. Un palmarès qui se lit dans les points de vente, auprès des marques qui structurent le quotidien du commerce.</p>
      </div>
      <ul className="agency-fmcg-partners" aria-label="Top 3 partenaires FMCG">
        {fmcgLeaders.map((client, index) => (
          <li key={client.name}>
            <span className="agency-fmcg-partner-index">0{index + 1}</span>
            <img className="mon-logo" src={client.logo} alt="" loading="lazy" decoding="async" />
            <strong>{client.name}</strong>
          </li>
        ))}
      </ul>
      <div className="agency-fmcg-stats">
        {fmcgFigures.map((item) => (
          <article key={item.label} className="agency-fmcg-stat">
            <strong>{item.figure}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
    <section className="proof-section agency-trust-marquee" aria-labelledby="agency-trust-title"><div className="agency-trust-marquee-heading section-pad"><div><p className="eyebrow">Trajectoires partagées</p><h2 id="agency-trust-title" className="display-title">Des marques qui nous font <em>confiance.</em></h2></div><p>Des collaborations qui prolongent les idées sur le terrain, auprès de publics et de contextes différents.</p></div><div className="agency-trust-marquee-window"><div className="agency-trust-marquee-track">{[0, 1].map((setIndex) => <div className="agency-trust-marquee-set" aria-hidden={setIndex === 1} key={setIndex}>{brandPartners.map((client) => <span className={`agency-trust-logo agency-trust-logo--${client.name.toLowerCase().replaceAll(" ", "-")}${client.name === "EGOR" ? " is-egor-logo" : ""}`} key={`${client.name}-${setIndex}`}><img className="mon-logo" src={client.logo} alt={setIndex === 0 ? `Logo ${client.name}` : ""} loading="lazy" decoding="async" /></span>)}</div>)}</div></div></section>
    <section className="page-next section-pad"><p>Prochaine étape / 04</p><Link href="/projets"><span>Voir les formats<br /><em>en mouvement.</em></span><ArrowUpRight size={34} /></Link></section>
  </main><SiteFooter /></div>;
}
