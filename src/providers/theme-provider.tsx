"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  initialTheme?: Theme;
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = "theme";

export function ThemeProvider({
  children,
  initialTheme = "light",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.cookie = `${THEME_STORAGE_KEY}=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return (
    {
      theme: context.theme,
      setTheme: (nextTheme: Theme) => context.setTheme(nextTheme),
    }
  );
}
