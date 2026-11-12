"use client";

import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import { HeroDashboard } from "@/components/HeroDashboard";
import { useLang } from "@/lib/i18n";

const avatars = ["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg", "/images/avatar-4.jpg"];

export function Hero() {
  const { t } = useLang();
  return (
    <section id="home" className="hero-bg relative overflow-hidden">
      {/* dekorasi latar: lingkaran gelap redup di kiri-bawah (dark mode) */}
      <div aria-hidden className="pointer-events-none absolute -bottom-[330px] -left-[210px] hidden h-[620px] w-[620px] rounded-full bg-[#262024] dark:block" />
      {/* kabut peach lembut di kiri-bawah (light mode) */}
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[520px] rounded-full bg-[#FBE3D6]/60 blur-3xl dark:hidden" />

      <div className="relative mx-auto grid grid-cols-1 max-w-page items-center gap-12 px-4 py-16 sm:px-6 lg:min-h-[806px] lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)] lg:gap-0 lg:px-0 lg:py-0">
        {/* kolom teks */}
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide text-brand shadow-sm dark:border-transparent dark:bg-[#2c1f22]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {t("Social Media Analytics")}
          </span>

          <h1 className="mt-6 text-[clamp(2.6rem,6vw,3.9rem)] font-light leading-[1.05] tracking-[-0.02em] text-navy-ink dark:text-white">
            {t("Turn Social Media Data")} <span className="text-brand">{t("Into Actionable Insights")}</span>
          </h1>

          <p className="mt-7 max-w-[450px] text-[16px] leading-[1.5] text-[#66758a] dark:text-white/70">
            {t("Monitor your brand reputation, analyze social media performance, and uncover meaningful insights with Socindex’s AI-powered analytics platform.")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#get-started"
              className="inline-flex h-[44px] items-center gap-2 rounded-lg bg-[#F4483A] px-6 text-[16px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(244,72,58,.7)] transition hover:brightness-105 dark:bg-[#B3281B] dark:shadow-none"
            >
              {t("Start Free Trial")} <LuArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-[44px] items-center rounded-lg border border-[#E7D5CF] bg-white px-6 text-[16px] font-medium text-[#2b3445] transition hover:bg-[#FFF3EE] dark:border-transparent dark:bg-[#E5E8F1] dark:hover:bg-white"
            >
              {t("See how it works")}
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                  style={{ zIndex: 4 - i }}
                />
              ))}
            </div>
            <div className="text-[12px] leading-snug text-[#66758a] dark:text-white/50">
              <div className="text-[13px] tracking-[2px] text-brand">★★★★★</div>
              {t("Trusted by 500+ media professionals")}
              <br />
              {t("in Indonesia")}
            </div>
          </div>
        </div>

        {/* kolom visual */}
        <div className="relative flex justify-center lg:justify-end lg:pr-0">
          {/* dekorasi dari file desain: bola gelombang pink (belakang dashboard) & lingkaran emas */}
          <Image src="/images/deco-wave-pink.png" alt="" aria-hidden width={600} height={600} className="pointer-events-none absolute -top-[8%] right-[7%] w-[26%] max-w-[190px]" />
          <Image src="/images/deco-gold.png" alt="" aria-hidden width={400} height={400} className="pointer-events-none absolute -bottom-[9%] left-[3%] w-[22%] max-w-[140px]" />
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
