"use client";
import { useCallback, useEffect, useState } from "react";
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      let saved; try { saved = localStorage.getItem("portfolio-theme"); } catch {}
      const dark = saved ? saved === "dark" : media.matches;
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#080808" : "#fafafa");
      setIsDark(dark);
    };
    read(); media.addEventListener("change", read); window.addEventListener("storage", read);
    return () => { media.removeEventListener("change", read); window.removeEventListener("storage", read); };
  }, []);
  const toggleTheme = useCallback(() => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#080808" : "#fafafa");
    try { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); } catch {}
    setIsDark(dark);
  }, []);
  return { isDark, toggleTheme };
}
