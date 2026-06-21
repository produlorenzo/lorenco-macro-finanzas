"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      aria-label="Cambiar tema"
      className="grid h-9 w-9 shrink-0 place-items-center border border-line bg-transparent text-sm font-bold text-ink transition hover:border-accent hover:text-accent dark:border-white/15 dark:text-paper dark:hover:border-brass dark:hover:text-brass"
      onClick={toggleTheme}
      title="Cambiar tema"
      type="button"
    >
      {isDark ? "☾" : "☼"}
    </button>
  );
}
