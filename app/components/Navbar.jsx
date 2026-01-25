"use client";

import React from "react";
import useDarkMode from "@/app/hooks/useDarkMode";

const Navbar = () => {
  const { isDark, toggleTheme, mounted } = useDarkMode();

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4
    bg-white/70 dark:bg-[#020617]/80 backdrop-blur-xl
    border-b border-gray-200 dark:border-gray-700">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Saurabh<span className="text-pink-500">.</span>
      </h1>

      {/* Navigation */}
      <ul className="hidden md:flex items-center gap-8 bg-white dark:bg-slate-800
      rounded-full px-8 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
        {["Home", "About me", "Services", "My work", "Contact me"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.split(" ")[0].toLowerCase()}`}
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600
          hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDark ? "🌙" : "☀️"}
        </button>

        <a
          href="#contact"
          className="px-5 py-2 border border-gray-400 dark:border-gray-600
          rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition
          text-gray-700 dark:text-gray-300 font-medium"
        >
          Connect →
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
