"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { LuMenu, LuMoon, LuSun, LuX } from "react-icons/lu";
import { Logo } from "@/components/ui";
import { navLight } from "@/lib/content";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle light / dark mode"
      className="flex h-[34px] items-center gap-2 rounded-lg border border-line bg-surface px-3 text-[13px] font-medium text-ink transition hover:border-brand/50 dark:bg-transparent dark:border-[#4a5160]"
    >
      <LuSun className="h-4 w-4 dark:hidden" />
      <LuMoon className="hidden h-4 w-4 dark:block" />
      <span className="dark:hidden">Light</span>
      <span className="hidden dark:inline">Dark</span>
      <span
        aria-hidden
        className="relative h-[14px] w-[22px] rounded-full border-[1.5px] border-ink"
      >
        <span className="absolute left-[2px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-ink transition-all dark:left-[11px]" />
      </span>
    </button>
  );
}

function Links({ items, onClick }: { items: { label: string; href: string }[]; onClick?: () => void }) {
  return (
    <>
      {items.map((l) => (
        <a
          key={l.label}
          href={l.href}
          onClick={onClick}
          className="text-[14px] text-[#4b5b6e] transition hover:text-brand dark:text-white/90 dark:hover:text-brand"
        >
          {l.label}
        </a>
      ))}
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/60 backdrop-blur-xl backdrop-saturate-150 dark:border-white/5 dark:bg-[#171c22]/60">
      <div className="mx-auto flex h-[80px] max-w-page items-center justify-between px-4 sm:px-6 lg:px-0">
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex" aria-label="Primary">
          <Links items={navLight} />
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#get-started"
            className="hidden h-[34px] items-center rounded-lg bg-[#BB0C09] px-5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-110 sm:inline-flex dark:bg-[#C0140B]"
          >
            Login
          </a>
          <button
            type="button"
            className="grid h-[34px] w-[34px] place-items-center rounded-lg border border-line text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-strong mx-3 mb-3 rounded-2xl md:hidden">
          <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-5 sm:px-6">
            <Links items={navLight} onClick={() => setOpen(false)} />
            <a href="#get-started" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#BB0C09] text-sm font-medium text-white sm:hidden">
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
