"use client";

import { useState } from "react";
import { LuCheck, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Pill } from "@/components/ui";
import { benefitSlides, issues } from "@/lib/content";
import { cn } from "@/lib/cn";

const badge = {
  positive: "bg-[#E3F6EA] text-[#12a150] dark:bg-[#12a150]/20",
  neutral: "bg-[#E8EBF0] text-[#566274] dark:bg-white/10 dark:text-white/70",
  negative: "bg-[#FDE3E1] text-[#e2453c] dark:bg-[#e2453c]/20",
} as const;

const deltaColor = (d: string) => (d.startsWith("-") ? "bg-[#FDE3E1] text-[#e2453c] dark:bg-[#e2453c]/20" : "bg-[#E3F6EA] text-[#12a150] dark:bg-[#12a150]/20");

export function IssuePreview() {
  const [slide, setSlide] = useState(0);
  const s = benefitSlides[slide];
  const total = benefitSlides.length;
  const go = (d: number) => setSlide((v) => (v + d + total) % total);

  return (
    <div className="glass-wrap relative rounded-[28px] p-5 sm:p-8 lg:p-10">
      {/* DATA DUMMY: lihat `issues` & `benefitSlides` di lib/content.ts. (apply api) nanti ganti dengan API dashboard. */}
      <Pill>Analytics Features</Pill>
      <h2 className="mt-5 text-[clamp(1.8rem,3.4vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy-ink dark:text-white">
        Identify the most important issues.
        <br />
        Determine your next steps.
      </h2>
      <p className="mt-4 text-[13.5px] text-[#7a8798] dark:text-white/45">
        Find the most relevant conversations, understand the sentiment, and prioritize your team&apos;s response.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[780fr_383fr]">
        {/* Top Issue Preview */}
        <div className="glass rounded-[28px] p-6 sm:p-[22px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[24px] font-semibold text-navy-ink dark:text-white">Top Issue Preview</h3>
              <p className="mt-1 text-[12px] text-[#7a8798] dark:text-white/45">Dummy data • Top issues by conversation volume • Last 7 days</p>
            </div>
            <span className="rounded-full bg-[#FFEEE6] px-3 py-1.5 text-[10px] font-bold text-brand dark:bg-[#3A211F]">DATA</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Tile label="Total Volume" value="2.23M">
              <Chip className="bg-[#E3F6EA] text-[#12a150] dark:bg-[#12a150]/20">+12.4%</Chip>
              <span className="text-[11px] text-[#9aa5b3] dark:text-white/40">vs 7 days ago</span>
            </Tile>
            <Tile label="Average Sentiment" value="Netral">
              <Chip className="bg-[#EEF0F4] text-[#566274] dark:bg-white/10 dark:text-white/70">Stable</Chip>
              <span className="text-[11px] text-[#9aa5b3] dark:text-white/40">Stable Trend</span>
            </Tile>
            <Tile label="Top Platform" value="Twitter">
              <Chip className="bg-[#E4EDFF] text-[#2b5fd9] dark:bg-[#2b5fd9]/20 dark:text-[#7fa3ff]">Dominan</Chip>
              <span className="text-[11px] text-[#9aa5b3] dark:text-white/40">64% share</span>
            </Tile>
          </div>

          <ul className="mt-4 space-y-2">
            {issues.map((i) => (
              <li key={i.rank} className="flex items-center gap-4 glass-soft rounded-xl px-4 py-3">
                <span className="w-3 text-[13px] font-bold text-navy-ink dark:text-white">{i.rank}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-semibold text-navy-ink dark:text-white">{i.title}</div>
                  <div className="text-[11px] text-[#7a8798] dark:text-white/45">{i.meta}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[13px] font-bold text-navy-ink dark:text-white">{i.volume}</span>
                  <Chip className={deltaColor(i.delta)}>{i.delta}</Chip>
                </div>
                <span className={cn("hidden w-[70px] justify-center rounded-full px-2.5 py-1 text-center text-[9px] font-bold uppercase sm:inline-flex", badge[i.sentiment])}>
                  {i.sentiment === "neutral" ? "Netral" : i.sentiment}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefit carousel */}
        <div key={slide} className="glass flex animate-fadeUp flex-col rounded-[28px] p-6">
          <span className="self-start rounded-full bg-[#FFEEE6] px-3 py-1.5 text-[9.5px] font-bold uppercase text-brand dark:bg-[#3A211F]">{s.tag}</span>
          <h3 className="mt-3 text-[23px] font-bold leading-[1.15] text-navy-ink dark:text-white">{s.title}</h3>
          <p className="mt-2 text-[12.5px] leading-[1.5] text-[#7a8798] dark:text-white/45">{s.desc}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {s.stats.map((x) => (
              <div key={x.label} className="glass-soft rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand"><LuCheck size={13} /> {x.label}</div>
                <div className="mt-1.5 text-[28px] font-bold leading-none text-navy-ink dark:text-white">{x.value}</div>
                <div className="mt-2 text-[10.5px] text-[#7a8798] dark:text-white/45">{x.note}</div>
              </div>
            ))}
          </div>

          <ol className="mt-3 space-y-2">
            {s.steps.map((t, i) => (
              <li key={t} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2 text-[13px] text-navy-ink dark:border-white/10 dark:text-white">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFEEE6] text-[11px] font-bold text-brand dark:bg-[#3A211F]">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>

          {/* Kontrol slide: titik indikator + panah (gaya sama dengan Trusted) */}
          <div className="mt-auto flex items-center justify-between px-1 pt-6">
            <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
              {Array.from({ length: total }).map((_, d) => (
                <button
                  key={d}
                  type="button"
                  role="tab"
                  aria-selected={d === slide}
                  aria-label={`Slide ${d + 1}`}
                  onClick={() => go(d - slide)}
                  className={cn("h-[7px] rounded-full transition-all", d === slide ? "w-[22px] bg-brand" : "w-[7px] bg-[#F5C3B8] dark:bg-white/25")}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid h-9 w-9 place-items-center rounded-full text-navy-ink dark:text-white"><LuChevronLeft size={18} /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid h-[37px] w-[37px] place-items-center rounded-full bg-navy text-white dark:bg-[#1b2a36] dark:ring-1 dark:ring-white/20"><LuChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="glass-soft rounded-2xl p-4">
      <div className="text-[12px] text-[#6b7a8c] dark:text-white/55">{label}</div>
      <div className="mt-1 text-[28px] font-bold leading-tight text-navy-ink dark:text-white">{value}</div>
      <div className="mt-2 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function Chip({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold", className)}>{children}</span>;
}
