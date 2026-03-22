"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemeVariant = "default" | "sunset" | "forest";

type ThemeContextValue = {
  theme: Theme;
  variant: ThemeVariant;
  toggleTheme: () => void;
  setVariant: (variant: ThemeVariant) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  variant: "default",
  toggleTheme: () => {},
  setVariant: () => {},
});

const themePresets: Record<ThemeVariant, { primary: string; primaryHover: string; surface: string }> = {
  default: { primary: "#0d47a1", primaryHover: "#1565c0", surface: "#ffffff" },
  sunset: { primary: "#d97706", primaryHover: "#f59e0b", surface: "#fff7ed" },
  forest: { primary: "#15803d", primaryHover: "#16a34a", surface: "#ecfdf5" },
};

function applyPreset(variant: ThemeVariant) {
  const preset = themePresets[variant];
  document.documentElement.style.setProperty("--primary", preset.primary);
  document.documentElement.style.setProperty("--primary-hover", preset.primaryHover);
  document.documentElement.style.setProperty("--surface", preset.surface);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [variant, setVariantState] = useState<ThemeVariant>("default");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("clb-theme") as Theme) || "light";
    const savedVariant = (localStorage.getItem("clb-theme-variant") as ThemeVariant) || "default";

    setTheme(savedTheme);
    setVariantState(savedVariant);
    applyPreset(savedVariant);

    document.documentElement.dataset.theme = savedTheme;
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("clb-theme", nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      document.body.classList.toggle("dark-mode", nextTheme === "dark");
      return nextTheme;
    });
  };

  const setVariant = (nextVariant: ThemeVariant) => {
    setVariantState(nextVariant);
    localStorage.setItem("clb-theme-variant", nextVariant);
    applyPreset(nextVariant);
  };

  const value = useMemo(() => ({ theme, variant, toggleTheme, setVariant }), [theme, variant]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
