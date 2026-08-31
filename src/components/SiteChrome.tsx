/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/**
 * Direction « La trajectoire vivante » : en-tête léger au-dessus du scrollytelling Iris.
 * Le logotype fourni par Iris Studio, le CTA et le panneau mobile restent lisibles tandis que les tableaux défilent en profondeur.
 */
import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, Linkedin, Menu, Moon, Sun, X, Youtube } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import LetsPlayProjectLink from "@/components/LetsPlayProjectLink";
import "./SiteChromeRefinement.css";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/agence", label: "L’agence" },
  { href: "/projets/lets-play", label: "Let’s Play", className: "is-letsplay-link" },
  { href: "/projets", label: "Projets" },
  { href: "/contact", label: "Contact" },
];

const IRIS_NAV_LOGO = "assets/iris-nav-logo-light-static-provided.png";
const IRIS_LOGO_PROVIDED = "assets/iris-studio-logo-provided.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const hasCinematicHomeHero = location === "/" && !scrolled;
  const usesWhiteLogo = theme === "dark" || hasCinematicHomeHero;
  const logo = usesWhiteLogo ? IRIS_LOGO_PROVIDED : IRIS_NAV_LOGO;
  const logoClassName = `brand-logo${usesWhiteLogo ? " brand-logo--white" : ""}`;

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const isActive = (href: string) => location === href || (href !== "/" && location.startsWith(`${href}/`));
  const close = () => setOpen(false);
  const renderNavigationLink = (item: (typeof navigation)[number], onNavigate?: () => void) => {
    const className = [isActive(item.href) ? "is-active" : "", item.className].filter(Boolean).join(" ");
    return item.href === "/projets/lets-play"
      ? <LetsPlayProjectLink key={item.href} className={className} onNavigate={onNavigate}>{item.label}</LetsPlayProjectLink>
      : <Link key={item.href} className={className} href={item.href} onClick={onNavigate}>{item.label}</Link>;
  };

  return (
    <>
      <header className={`site-header page-site-header ${scrolled ? "is-scrolled" : ""} ${hasCinematicHomeHero ? "is-cinematic-hero" : ""}`}>
        <Link className="brand-lockup" href="/" aria-label="Iris Studio — accueil" onClick={close}>
          <span className="brand-logo-wrap"><img className={logoClassName} src={logo} alt="Iris Studio" /></span>
          <span className="brand-coordinate" aria-hidden="true">ALGER / 36.75°</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => renderNavigationLink(item))}
        </nav>
        <div className="header-actions"><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"} aria-pressed={theme === "dark"} title={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}><span className="theme-toggle-glyphs" aria-hidden="true"><Moon className="theme-toggle-glyph theme-toggle-glyph--moon" size={16} /><Sun className="theme-toggle-glyph theme-toggle-glyph--sun" size={16} /></span></button></div>
        <button className="mobile-toggle profile-menu-button" type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span>{open ? "Fermer" : "Menu"}</span>{open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <p className="menu-kicker">Trajectoire Iris</p>
        {navigation.map((item) => item.href === "/projets/lets-play" ? <LetsPlayProjectLink key={item.href} className={item.className} onNavigate={close}><span>{item.label}</span><ArrowUpRight size={22} /></LetsPlayProjectLink> : <Link key={item.href} className={item.className} href={item.href} onClick={close}><span>{item.label}</span><ArrowUpRight size={22} /></Link>)}
      </div>
    </>
  );
}

export function SiteFooter() {
  const logo = IRIS_LOGO_PROVIDED;
  return (
    <footer className="site-footer page-footer">
      <div className="footer-top">
        <Link className="footer-brand" href="/"><span className="footer-logo-wrap"><img src={logo} alt="Iris Studio" /></span></Link>
        <p>La communication autrement.<br />Ancrée dans l’humain, pensée pour le terrain.</p>
        <div className="footer-socials" aria-label="Réseaux sociaux Iris Studio">
          <a href="https://www.linkedin.com/company/iris-studio-alger/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="https://www.instagram.com/iris_studio_marketing/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="https://www.youtube.com/@letsplay.officiel" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Iris Studio — Alger</span><Link href="/contact">Construire la suite <ArrowUpRight size={14} /></Link></div>
    </footer>
  );
}
