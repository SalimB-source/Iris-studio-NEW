import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const VOLUME = 0.6;

export default function DarkModeScore() {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}assets/iris-dark-cinematic.mp3`);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = VOLUME;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (theme !== "dark") {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    const play = () => {
      audio.volume = VOLUME;
      void audio.play().catch(() => undefined);
    };

    play();
    const unlock = () => play();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [theme]);

  return null;
}
