"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LuBrain,
  LuChartNoAxesCombined,
  LuLayoutDashboard,
  LuMonitorSmartphone,
  LuRadioTower,
  LuEye,
} from "react-icons/lu";
import { Pill } from "@/components/ui";
import { features } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";

const icons = {
  radio: LuRadioTower,
  brain: LuBrain,
  chart: LuChartNoAxesCombined,
  devices: LuMonitorSmartphone,
  layout: LuLayoutDashboard,
  eye: LuEye,
} as const;

export function Features() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  return (
    <div id="features" className="relative scroll-mt-20">
      {/* 3 lapis: (1) bola di belakang → (2) kaca menimpa bola → (3) konten di atas kaca */}
      <Image src="/images/deco-sphere.svg" alt="" aria-hidden width={400} height={400} className="pointer-events-none absolute -right-6 -top-6 z-0 w-[90px]" />
      <Image src="/images/deco-wave-teal.png" alt="" aria-hidden width={600} height={600} className="pointer-events-none absolute -bottom-24 -left-24 z-0 w-[280px]" />
      <div className="glass-wrap relative z-10 rounded-[28px] p-5 sm:p-8 lg:p-[28px]">
      <Pill>{t("Features & Benefits")}</Pill>
      <h2 className="mt-5 max-w-[660px] text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy-ink dark:text-white">
        {t("Powerful Features for Smarter Decisions")}
      </h2>
      <p className="mt-4 max-w-[650px] text-[14px] leading-[1.6] text-[#7a8798] dark:text-white/45 font-normal">
        {t("Everything you need to monitor, analyze, and understand your social media presence all in one dashboard.")}
      </p>

      <div className="relative z-10 mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = icons[f.icon];
          const on = active === i;
          return (
            <article
              key={f.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className={cn(
                "flex min-h-[153px] cursor-default flex-col justify-between rounded-3xl p-[22px] outline-none transition-all duration-300",
                on
                  ? "bg-[#FF6A57] text-white shadow-[0_18px_30px_-14px_rgba(255,106,87,.7)] dark:bg-[#2D3643] dark:shadow-card"
                  : "glass text-navy-ink dark:bg-[#3A4453]/70 dark:text-white",
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid h-[42px] w-[42px] place-items-center rounded-xl transition-colors",
                    on
                      ? "bg-white/90 text-[#FF6A57] dark:bg-[#0F2A4E] dark:text-[#FF7A66]"
                      : "bg-[#FFEEE8] text-brand dark:bg-[#1A1E24] dark:text-[#FF7A66]",
                  )}
                >
                  <Icon size={20} />
                </span>
                <span className={cn("text-[11px] font-bold", on ? "text-white/85" : "text-[#9aa5b3] dark:text-white/50")}>
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-[19px] font-bold leading-tight">{t(f.title)}</h3>
                <p className={cn("mt-2 text-[12.5px]", on ? "text-white/80 dark:text-white" : "text-[#7a8798] dark:text-white/35")}>{t(f.desc)}</p>
              </div>
            </article>
          );
        })}
      </div>
      </div>
    </div>
  );
}
