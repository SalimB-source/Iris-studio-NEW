/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
/** Version vitrine : les prises de contact passent par les réseaux officiels, sans serveur ni collecte locale. */
import { ArrowUpRight, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./ContactForm.css";

function ContactSpreeForm() {
  return (
    <form action="https://formspree.io/f/mkjnvbvp" method="POST" className="contact-form" aria-label="Formulaire de contact">
      <div className="contact-form-index">
        <strong>FORM</strong>
        <b>07</b>
      </div>

      <div className="contact-form-grid">
        <label>
          <span>Nom</span>
          <input type="text" name="name" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" required />
        </label>
        <label className="contact-form-full">
          <span>Sujet</span>
          <input type="text" name="_subject" />
        </label>
        <label className="contact-form-full">
          <span>Message</span>
          <textarea name="message" required />
        </label>
      </div>

      <input type="hidden" name="_language" value="fr" />
      <div className="contact-honeypot" aria-hidden="true">
        <label>Do not fill <input type="text" name="_gotcha" /></label>
      </div>

      <div className="contact-submit-wrap">
        <button type="submit" className="contact-submit">Envoyer</button>
      </div>
    </form>
  );
}


export default function Contact() {
  return <div className="page-shell"><SiteHeader /><main>
    <section className="contact-page-hero" aria-labelledby="contact-title"><div className="contact-page-prism" aria-hidden="true" /><div className="iris-eye-orbit iris-eye-contact" aria-hidden="true"><i /><i /><i /></div><div><p className="eyebrow light-eyebrow">04 / Contact</p><h1 id="contact-title">La prochaine idée<br />mérite son <em>terrain.</em></h1><p>Vous avez un projet, un défi commercial ou une ambition à faire avancer ? Retrouvons-nous pour imaginer la suite.</p></div><span className="contact-page-coordinate">IRIS STUDIO · ALGER · MARKETING</span></section>
    <section className="contact-message-section section-pad" aria-labelledby="contact-form-title"><div className="contact-form-intro"><div className="section-marker"><span>07</span><i /></div><p className="eyebrow">Entrer en conversation</p><h2 id="contact-form-title" className="display-title">Racontez-nous<br /><em>le prochain mouvement.</em></h2><p>Pour une demande, utilisez le formulaire ci‑dessous, contactez directement l’équipe par e‑mail ou via ses canaux publics.</p><div className="contact-route-list contact-email-route"><a href="mailto:Commercial@iris-dz.com?subject=Demande%20commerciale%20%7C%20Iris%20Studio"><Mail size={22} /><div><span>Échanges commerciaux</span><strong>Commercial@iris-dz.com</strong></div><ArrowUpRight size={20} /></a></div><nav className="static-contact-socials" aria-label="Réseaux sociaux Iris Studio"><p>Suivre Iris Studio</p><div className="static-contact-social-list"><a href="https://www.linkedin.com/company/iris-studio-alger/" target="_blank" rel="noreferrer"><Linkedin size={16} /><span>LinkedIn</span><ArrowUpRight size={14} /></a><a href="https://www.instagram.com/iris_studio_marketing/" target="_blank" rel="noreferrer"><Instagram size={16} /><span>Instagram</span><ArrowUpRight size={14} /></a><a href="https://www.youtube.com/@letsplay.officiel" target="_blank" rel="noreferrer"><Youtube size={16} /><span>YouTube</span><ArrowUpRight size={14} /></a></div></nav><ContactSpreeForm /></div>
      <aside className="contact-direct-card" aria-label="Localisation Iris Studio">
        <div className="contact-direct-content">
          <div>
            <p className="eyebrow">Localisation</p>
            <h3>IRIS Studio · El Biar</h3>
            <p style={{ marginTop: '0.6rem' }}>36.7702907, 3.0348169 — <a href="https://www.google.com/maps/place/IRIS+Studio+El+biar/@36.7702907,3.0348169,17z/data=!3m1!4b1!4m6!3m5!1s0x128fb3001779d72f:0xd7df234865da361c!8m2!3d36.7702907!4d3.0373918!16s%2Fg%2F11zdc5k4yw?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Voir sur Google Maps</a></p>
          </div>
          <div>
            <div className="contact-map-preview">
              <iframe
                title="IRIS Studio location"
                src="https://www.google.com/maps?q=36.7702907,3.0348169&z=17&output=embed"
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </aside>
    </section>
    <section className="contact-note section-pad"><div><p>IRIS / UNE AGENCE AU CONTACT DU RÉEL</p><h2>Une conversation claire<br />est déjà <em>un mouvement.</em></h2></div><Link className="button button-orange" href="/projets">Voir nos projets <ArrowUpRight size={17} /></Link></section>
  </main><SiteFooter /></div>;
}
