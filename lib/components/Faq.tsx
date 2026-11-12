"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { LuMinus, LuPlus } from "react-icons/lu";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" className="relative overflow-x-clip bg-alt py-16 lg:py-[76px]">
      <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-0">
        {/* sengaja sama dengan desain: "Frequently" */}
        <h2 className="text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-black dark:text-white">
          {t("Frequently")}
          <br />
          {t("asked questions")}
        </h2>

        <div className="relative mt-10 lg:mt-12">
          {/* LAPIS 1 — bola teal di kanan, di belakang kaca */}
          <Image src="/images/deco-wave-teal.png" alt="" aria-hidden width={600} height={600} className="pointer-events-none absolute -right-20 -top-14 z-0 w-[170px] sm:w-[210px]" />
          {/* LAPIS 2 — kotak kaca menimpa bola; LAPIS 3 — konten */}
          <div className="glass-wrap relative z-10 grid grid-cols-1 items-stretch gap-5 rounded-[24px] p-4 sm:p-6 lg:grid-cols-[1fr_335px] lg:gap-6">
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const id = `${base}-${i}`;
              return (
                <div key={f.q} className="glass rounded-[14px] px-5 py-5 dark:!border-white/25 dark:!bg-[#2D3643]/80">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : i)} /* hanya 1 FAQ terbuka sekaligus */
                      className="flex w-full items-center justify-between gap-4 text-left text-[16px] font-bold text-black dark:text-white"
                    >
                      {t(f.q)}
                      {isOpen ? <LuMinus size={22} className="shrink-0 font-light" /> : <LuPlus size={22} className="shrink-0" />}
                    </button>
                  </h3>
                  <div
                    id={id}
                    role="region"
                    className={cn("grid transition-all duration-300", isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
                  >
                    <p className="overflow-hidden text-justify text-[13px] leading-[1.7] text-black/90 dark:text-white/75">{t(f.a)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="flex flex-col items-center glass rounded-[14px] px-6 py-10 dark:!border-white/25 dark:!bg-[#2D3643]/80">
            <svg width="58" height="52" viewBox="0 0 58 52" aria-hidden className="mt-4 text-black dark:text-white">
              <path d="M0 0h58v40H16L0 52z" fill="currentColor" />
            </svg>
            <div className="mt-8 w-full lg:px-3">
              <h3 className="max-w-[170px] text-[17px] font-bold leading-[1.35] text-black dark:text-white">{t("Do you have more questions?")}</h3>
              <p className="mt-6 text-justify text-[13.5px] leading-[1.55] text-black/90 dark:text-white/75">
                {t("Let’s discuss how Socindex can help track your brand reputation. Contact us directly for a quick chat.")}
              </p>
            </div>
            <a
              href="mailto:hello@socindex.com"
              className="mt-auto inline-flex h-[38px] items-center rounded-lg bg-[#C62A0F] px-5 text-[13px] font-semibold text-white transition hover:brightness-110 max-lg:mt-10"
            >
              {t("Get in Touch")}
            </a>
          </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
