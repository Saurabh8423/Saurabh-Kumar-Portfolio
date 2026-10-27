"use client";

import { useCallback, useState } from "react";

// Each page load starts dark; light mode is an explicit choice for this visit.
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#0c0d18" : "#f7f7fc");
    setIsDark(next);
  }, []);

  return { isDark, toggleTheme };
}
