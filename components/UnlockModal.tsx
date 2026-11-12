"use client";

import { useEffect, useRef } from "react";
import { LuArrowRight, LuCheck, LuLock } from "react-icons/lu";

const bars: [number, string][] = [[38, "pos"], [58, "pos"], [44, "neu"], [76, "pos"], [64, "neu"], [84, "pos"], [72, "neg"], [96, "pos"], [70, "neu"], [60, "pos"], [80, "neg"], [100, "pos"]];
const col = { pos: "#72ACC1", neu: "#697687", neg: "#DC3D4B" } as const;

/** Notifikasi "Unlock content" (light & dark mode). Dipakai di Try It Out → Data Source → View All. */
export function UnlockModal({ topic, onClose }: { topic: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4 backdrop-blur-[2px]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="unlock-title"
        className="max-h-[92vh] w-full max-w-[560px] animate-fadeUp overflow-y-auto rounded-[28px] border border-[#E3E8EE] bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#1E2530] sm:p-8"
      >
        <div className="relative flex h-[130px] items-end justify-center gap-[3.5%] overflow-hidden rounded-[18px] bg-[#EEF1F6] px-[4%] dark:bg-[#2A313C]" aria-hidden>
          {bars.map(([h, c], i) => (<i key={i} className="w-[5.2%] rounded-t-lg" style={{ height: `${h * 0.78}%`, background: col[c as keyof typeof col] }} />))}
          <span className="absolute left-1/2 top-[8%] grid h-[56px] w-[56px] -translate-x-1/2 place-items-center rounded-full border-[4px] border-white bg-[#D63A20] text-white dark:border-[#1E2530]"><LuLock size={22} /></span>
        </div>

        <p className="mt-6 text-[12px] uppercase tracking-wide text-[#B3281B] dark:text-[#FF7A66]">Data Source · Locked</p>
        <h3 id="unlock-title" className="mt-2 text-[26px] font-bold leading-tight text-[#1B2433] dark:text-white sm:text-[30px]">Unlock the full data source Analysis</h3>
        <p className="mt-3 text-[14.5px] leading-[1.6] text-[#5B667A] dark:text-white/60">
          You are viewing the free overview. Subscribe to Socindex to open the deeper analysis for “{topic}”.
        </p>

        <ul className="mt-5 space-y-3 text-[15px] text-[#1B2433] dark:text-white">
          {["Sentiment per platform over time", "Top accounts on every platform", "Open the original posts"].map((t) => (
            <li key={t} className="flex items-center gap-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FBE5E0] text-[#B3281B] dark:bg-[#3A211F] dark:text-[#FF7A66]"><LuCheck size={14} /></span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {/* Subscribe -> menuju form Request Demo. (apply api) nanti arahkan ke halaman langganan dashboard. */}
          <a href="#get-started" onClick={onClose} className="inline-flex h-[54px] w-full shrink-0 sm:w-auto sm:flex-1 items-center justify-center gap-3 rounded-full bg-[#D63A20] text-[15px] font-bold text-white transition hover:brightness-110">
            Subscribe to Socindex <LuArrowRight size={18} />
          </a>
          <button type="button" onClick={onClose} className="h-[54px] w-full shrink-0 rounded-full bg-[#EEF1F6] px-7 sm:w-auto text-[15px] font-bold text-[#1B2433] transition hover:brightness-95 dark:bg-white/10 dark:text-white">Maybe later</button>
        </div>
        <p className="mt-5 text-center text-[14px] text-[#5B667A] dark:text-white/60">
          Already a subscriber?{" "}
          {/* (apply api) ganti href dengan URL login dashboard */}
          <a href="#" className="font-bold text-[#1B2433] underline dark:text-white">Sign in</a>
        </p>
      </div>
    </div>
  );
}
