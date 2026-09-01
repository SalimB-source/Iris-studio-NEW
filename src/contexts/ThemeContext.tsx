import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { runThemePixelate, themePixelateDuration } from "./themePixelate";
import "./themePixelate.css";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

function applyThemeClass(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const previewTheme = new URLSearchParams(window.location.search).get("theme");
      if (previewTheme === "light" || previewTheme === "dark") return previewTheme;
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });
  const cancelPixelate = useRef<(() => void) | null>(null);
  const safetyTimer = useRef<number>(0);

  useEffect(() => {
    applyThemeClass(theme);
    if (switchable) localStorage.setItem("theme", theme);
  }, [theme, switchable]);

  useEffect(() => () => {
    cancelPixelate.current?.();
    window.clearTimeout(safetyTimer.current);
  }, []);

  const toggleTheme = switchable
    ? () => {
        const root = document.documentElement;
        if (root.classList.contains("is-theme-switching")) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        root.classList.add("is-theme-switching");

        const flip = () => {
          setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            applyThemeClass(next);
            return next;
          });
        };

        const finish = (cancelRunning = false) => {
          window.clearTimeout(safetyTimer.current);
          if (cancelRunning) cancelPixelate.current?.();
          cancelPixelate.current = null;
          root.classList.remove("is-theme-switching");
          root.classList.remove("is-theme-pixelating");
          root.classList.remove("is-theme-swarming");
          document.querySelectorAll(".iris-theme-bats").forEach((node) => node.remove());
          document.querySelectorAll<HTMLElement>(".art-hero-image").forEach((el) => el.style.removeProperty("filter"));
          document.getElementById("root")?.style.removeProperty("filter");
        };

        if (reducedMotion) {
          flip();
          root.classList.remove("is-theme-switching");
          return;
        }

        cancelPixelate.current = runThemePixelate(flip, () => finish(false));
        safetyTimer.current = window.setTimeout(() => finish(true), themePixelateDuration + 120);
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
