/* Import fidèle IRIS Studio : cette feuille ou ce composant conserve le langage éditorial et immersif du dépôt source. */
export type OperationalProject = {
  id: "gbfoods" | "holcim" | "amir-clean" | "djezzy" | "hamoud" | "pmi";
  index: string;
  tag: string;
  title: string;
  accent: string;
  text: string;
  image: string;
  alt: string;
  sourceLabel: string;
  wide: boolean;
};

export const operationalProjects: readonly OperationalProject[] = [
  {
    id: "gbfoods",
    index: "03",
    tag: "Retail execution",
    title: "GBfoods",
    accent: "Algeria",
    text: "Deux années d’accompagnement terrain : suivi des équipes de merchandising et coordination des points de vente pour renforcer la visibilité de la marque.",
    image: "assets/gbfoods-retail-execution_e4762b3b.jpg",
    alt: "Mise en rayon de produits Jumbo par une équipe de merchandising GBfoods, issue d’une publication LinkedIn Iris Studio fournie.",
    sourceLabel: "Archive LinkedIn Iris Studio · capture fournie",
    wide: true,
  },
  {
    id: "holcim",
    index: "04",
    tag: "Événementiel",
    title: "Holcim",
    accent: "/ SITP 2024",
    text: "Conception et réalisation du stand de Holcim El-Djazaïr au Salon International des Travaux Publics.",
    image: "assets/holcim-sitp-stand_cd9587e2.jpg",
    alt: "Stand Holcim El-Djazaïr présenté au Salon International des Travaux Publics 2024, publication LinkedIn Iris Studio fournie.",
    sourceLabel: "Archive LinkedIn Iris Studio · capture fournie",
    wide: false,
  },
  {
    id: "amir-clean",
    index: "05",
    tag: "Merchandising",
    title: "Amir",
    accent: "Clean",
    text: "Pilotage d’un projet merchandising pour accompagner le déploiement d’un nouveau partenaire local en point de vente.",
    image: "assets/amir-clean-merchandising_872ebb2a.jpg",
    alt: "Mise en rayon de produits Amir Clean par une équipe de merchandising, issue d’une publication LinkedIn Iris Studio fournie.",
    sourceLabel: "Archive LinkedIn Iris Studio · capture fournie",
    wide: false,
  },
  {
    id: "djezzy",
    index: "06",
    tag: "Trade marketing",
    title: "Djezzy",
    accent: "/ depuis 2023",
    text: "Activation, coordination des équipes terrain, logistique et suivi de performance pour des opérations déployées à l’échelle nationale.",
    image: "assets/djezzy-trade-activation_1642adb5.jpg",
    alt: "Dispositifs d’activation terrain Djezzy, issus d’une publication LinkedIn Iris Studio fournie.",
    sourceLabel: "Archive LinkedIn Iris Studio · capture fournie",
    wide: true,
  },
  {
    id: "hamoud",
    index: "07",
    tag: "Merchandising",
    title: "Hamoud",
    accent: "Boualem",
    text: "Gondole de marque et mise en rayon pour faire vivre Hamoud Boualem au point de vente, dans le langage visuel de la maison.",
    image: "assets/hamoud-boualem-gondola.jpg",
    alt: "Gondole Hamoud Boualem en magasin, linéaire de boissons mis en scène aux couleurs de la marque.",
    sourceLabel: "Archive terrain Iris Studio · capture fournie",
    wide: false,
  },
  {
    id: "pmi",
    index: "08",
    tag: "Trade marketing",
    title: "Philip Morris",
    accent: "International",
    text: "Meuble digital et merchandising en point de vente pour une présence de marque lisible au contact du commerce.",
    image: "assets/pmi-marlboro-display.jpg",
    alt: "Meuble de merchandising digital Philip Morris International en point de vente, avec écran et linéaire produits.",
    sourceLabel: "Archive terrain Iris Studio · capture fournie",
    wide: false,
  },
];
