"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { LuCheck, LuChevronDown, LuGlobe, LuMenu, LuMoon, LuSun, LuX } from "react-icons/lu";
import { Logo } from "@/components/ui";
import { navLight } from "@/lib/content";
import { languages, useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLang();
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
      <span className="dark:hidden">{t("Light")}</span>
      <span className="hidden dark:inline">{t("Dark")}</span>
      <span
        aria-hidden
        className="relative h-[14px] w-[22px] rounded-full border-[1.5px] border-ink"
      >
        <span className="absolute left-[2px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-ink transition-all dark:left-[11px]" />
      </span>
    </button>
  );
}

/** Pilihan bahasa (dropdown kaca). Tambah bahasa baru di lib/i18n.tsx */
function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find((l) => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("Language")}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[34px] items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 text-[13px] font-medium text-ink transition hover:border-brand/50 dark:border-[#4a5160] dark:bg-transparent"
      >
        <LuGlobe className="h-4 w-4" />
        {current.short}
        <LuChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} />
      </button>
      {open && (
        <ul role="listbox" aria-label={t("Language")} className="glass-strong absolute right-0 top-[42px] z-50 min-w-[170px] rounded-xl p-1.5">
          {languages.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition hover:bg-brand/10",
                  l.code === lang ? "font-semibold text-brand" : "text-ink",
                )}
              >
                {l.label}
                {l.code === lang && <LuCheck className="h-4 w-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Menu navigasi; link yang section-nya sedang tampil diberi warna oranye */
function Links({ items, active, onClick, mobile }: { items: { label: string; href: string }[]; active: string; onClick?: () => void; mobile?: boolean }) {
  const { t } = useLang();
  return (
    <>
      {items.map((l) => {
        const on = active === l.href.slice(1);
        return (
          <a
            key={l.label}
            href={l.href}
            onClick={onClick}
            aria-current={on ? "true" : undefined}
            className={cn(
              "relative text-[14px] transition hover:text-brand",
              on ? "font-semibold text-brand" : "text-[#4b5b6e] dark:text-white/90",
              !mobile && "py-1 after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:origin-center after:rounded-full after:bg-brand after:transition-transform after:duration-300",
              !mobile && (on ? "after:scale-x-100" : "after:scale-x-0"),
            )}
          >
            {t(l.label)}
          </a>
        );
      })}
    </>
  );
}

/** Mengembalikan id section nav yang sedang aktif saat scroll */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const line = 120; // garis acuan dari atas layar (tinggi navbar + sedikit)
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // di dasar halaman, aktifkan item terakhir yang masih relevan (FAQ)
      setActive(current);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const active = useActiveSection(navLight.map((l) => l.href.slice(1)));

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/60 backdrop-blur-xl backdrop-saturate-150 dark:border-white/5 dark:bg-[#171c22]/60">
      <div className="mx-auto flex h-[80px] max-w-page items-center justify-between px-4 sm:px-6 lg:px-0">
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex" aria-label="Primary">
          <Links items={navLight} active={active} />
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <ThemeToggle />
          <a
            href="#get-started"
            className="hidden h-[34px] items-center rounded-lg bg-[#BB0C09] px-5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-110 sm:inline-flex dark:bg-[#C0140B]"
          >
            {t("Login")}
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
            <Links items={navLight} active={active} mobile onClick={() => setOpen(false)} />
            <a href="#get-started" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#BB0C09] text-sm font-medium text-white sm:hidden">
              {t("Login")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
