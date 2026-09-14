"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

/**
 * Reads the theme the inline script in app/layout.js already applied, so the
 * first client render matches the server HTML and nothing flashes.
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        /* storage unavailable (private mode) — theme still applies for this visit */
      }
      return next;
    });
  }, []);

  return { isDark, toggleTheme, mounted };
}
