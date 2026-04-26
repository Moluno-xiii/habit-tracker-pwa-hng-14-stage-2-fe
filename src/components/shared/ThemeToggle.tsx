"use client";

import { useSyncExternalStore } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

type Theme = "light" | "dark";
const STORAGE_KEY = "habit-tracker-theme";

const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

const getClientSnapshot = (): Theme => {
  const attr = document.documentElement.getAttribute(
    "data-theme",
  ) as Theme | null;
  if (attr) return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getServerSnapshot = (): Theme => "light";

const ThemeToggle = () => {
  const theme = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="text-ink hover:text-vermillion inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center"
    >
      {isDark ? (
        <HiOutlineSun className="h-5 w-5 transition-all duration-200 hover:rotate-180" />
      ) : (
        <HiOutlineMoon className="h-5 w-5 transition-all duration-200 hover:rotate-180" />
      )}
    </button>
  );
};

export default ThemeToggle;
