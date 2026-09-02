/** Direction « La trajectoire vivante » : routes éditoriales, identité Iris et thème clair/sombre partagé. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import { Redirect, Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import LaunchScreen from "./components/LaunchScreen";
import PageNavigationTransition from "./components/PageNavigationTransition";
import DarkModeScore from "./components/DarkModeScore";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense, useEffect, useState } from "react";
import { isPartnerProjectPath, partnerProjectScrollSettleDelay, scrollPartnerProjectToTop, scrollToPageTop } from "./components/partnerProjectNavigation";

const About = lazy(() => import("@/pages/About"));
const Agency = lazy(() => import("@/pages/Agency"));
const Contact = lazy(() => import("@/pages/Contact"));
const LetsPlay = lazy(() => import("@/pages/LetsPlay"));
const OperationalProjectDetail = lazy(() => import("@/pages/OperationalProjectDetail"));
const Projects = lazy(() => import("@/pages/Projects"));
const SevenArena = lazy(() => import("@/pages/SevenArena"));

function RouteLoadingFallback() {
  return <main className="page-route-loader" aria-live="polite" aria-label="Chargement de la page" />;
}

function RouteScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    const scrollToTop = isPartnerProjectPath(location) ? scrollPartnerProjectToTop : scrollToPageTop;
    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const settle = isPartnerProjectPath(location)
      ? window.setTimeout(scrollPartnerProjectToTop, partnerProjectScrollSettleDelay)
      : undefined;
    return () => {
      window.cancelAnimationFrame(frame);
      if (settle) window.clearTimeout(settle);
    };
  }, [location]);

  return null;
}

function RouteTree() {
  // make sure to consider if you need authentication for certain routes
  return <><RouteScrollRestoration /><Suspense fallback={<RouteLoadingFallback />}><Switch>
    <Route path="/" component={Home} />
    <Route path="/a-propos" component={About} />
    <Route path="/agence" component={Agency} />
    <Route path="/expertises"><Redirect to="/agence#agency-expertises" /></Route>
    <Route path="/projets/lets-play" component={LetsPlay} />
    <Route path="/projets/7ouma-arena" component={SevenArena} />
    <Route path="/projets/:projectId" component={OperationalProjectDetail} />
    <Route path="/projets" component={Projects} />
    <Route path="/contact" component={Contact} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></Suspense></>;
}

function AppShell() {
  const [showLaunch, setShowLaunch] = useState(true);
  return <TooltipProvider><Toaster />{showLaunch && <LaunchScreen onComplete={() => setShowLaunch(false)} />}<PageNavigationTransition /><RouteTree /></TooltipProvider>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}><ErrorBoundary><ThemeProvider defaultTheme="light" switchable><DarkModeScore><AppShell /></DarkModeScore></ThemeProvider></ErrorBoundary></WouterRouter>;
}

export default App;
