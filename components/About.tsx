"use client";

import Image from "next/image";
import { Pill } from "@/components/ui";
import { aboutStats } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="relative overflow-hidden bg-page py-16 lg:py-[100px]">
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-24 h-[620px] w-[620px] dark:bg-[#211e25]" />
      <div className="relative mx-auto grid grid-cols-1 max-w-page items-center gap-12 px-4 sm:px-6 lg:grid-cols-[538fr_570fr] lg:gap-[75px] lg:px-0">
        <div className="mx-auto w-full max-w-[538px] overflow-hidden">
          <Image
            src="/images/about-light.png"
            alt="Socindex team in Jakarta reviewing analytics dashboard"
            width={1080}
            height={930}
            className="h-auto w-full dark:hidden"
          />
          <Image
            src="/images/about-dark.png"
            alt=""
            aria-hidden
            width={1080}
            height={930}
            className="hidden h-auto w-full dark:block"
          />
        </div>

        <div>
          <Pill>{t("About Us")}</Pill>
          <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy-ink dark:text-white">
            {t("Building Smarter Social Media Intelligences")}
          </h2>
          <p className="mt-5 max-w-[540px] text-[14.5px] leading-[1.6] text-[#7a8798] dark:text-white/55 font-normal">
            {t("Socindex is a BIG DATA MONITORING tools. Designed to help organizations and businesses analyze social media data with advanced AI and machine learning technology.")}
          </p>

          <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
            {aboutStats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-[14px] p-3.5 dark:ring-white/10 sm:p-4 sm:pb-8"
              >
                <div className="text-[22px] font-normal leading-none text-navy-ink dark:text-white sm:text-[26px]">{s.value}</div>
                <div className="mt-3 text-[10.5px] text-[#4b5b6e] dark:text-white/65">{t(s.label)}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <a href="#get-started" className="inline-flex h-[40px] items-center rounded-lg bg-[#F4483A] px-6 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105 dark:bg-[#B3281B]">
              {t("Learn More")}
            </a>
            <ul className="flex gap-4 text-[10px] text-[#9aa5b3] dark:text-white/50">
              {["Clarity", "Accuracy", "Speed"].map((w) => (
                <li key={w} className="flex items-center gap-1.5"><i className="h-1 w-1 bg-brand" />{t(w)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
