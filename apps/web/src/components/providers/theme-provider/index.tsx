import { useEffect } from "react";
import { useUserPreferencesStore } from "@/store/user-preferences";

// Change to "bp5-dark" if you are on Blueprint v5
const BP_DARK_CLASS = "bp6-dark";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useUserPreferencesStore();

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark: boolean) => {
      root.classList.remove("light", "dark", BP_DARK_CLASS);
      root.classList.add(isDark ? "dark" : "light");

      if (isDark) {
        root.classList.add(BP_DARK_CLASS);
      }
    };

    const isDark =
      theme === "system" ? mediaQuery.matches : theme === "dark";
    applyTheme(isDark);

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return <>{children}</>;
}
