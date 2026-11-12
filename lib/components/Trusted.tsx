"use client";

import { useState } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuQuote, LuUsers } from "react-icons/lu";
import { Pill } from "@/components/ui";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";

export function Trusted() {
  const { t: tr } = useLang();
  const [i, setI] = useState(0);
  const total = testimonials.length;
  const t = testimonials[i];
  const go = (d: number) => setI((v) => (v + d + total) % total);
  const dots = total;

  return (
    <section className="relative overflow-hidden bg-page py-16 lg:py-[70px]">
      <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-0">
        <div className="text-center">
          <Pill>{tr("Trusted by leading organizations")}</Pill>
          <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-navy-ink dark:text-white">
            {tr("Trusted by Agency, Government & Company")}
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[14px] text-[#7a8798] dark:text-white/45">
            {tr("More than 500+ Agency and companies already use Socindex to manage their social media intelligence")}
          </p>
        </div>

        {/* strip logo (GIF animasi) */}
        <div className="relative mt-8 overflow-hidden rounded-[18px] bg-[#F6F7F9] dark:bg-white/[.04]">
          <Image src="/motion/logos-light.gif" alt="Astra International, Bank Indonesia, Pertamina, Telkom Indonesia, Komdigi" width={1134} height={102} unoptimized className="relative left-1/2 mx-auto h-auto w-full min-w-[760px] max-w-[1142px] -translate-x-1/2 dark:hidden" />
          <Image src="/motion/logos-dark.gif" alt="" aria-hidden width={1134} height={102} unoptimized className="relative left-1/2 mx-auto hidden h-auto w-full min-w-[760px] max-w-[1142px] -translate-x-1/2 dark:block" />
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[873fr_357fr]">
          {/* bola gelombang pink di belakang kartu testimoni (z-0), kartu kaca menimpanya */}
          <Image src="/images/deco-wave-pink.png" alt="" aria-hidden width={500} height={500} className="pointer-events-none absolute -left-14 -top-3 z-0 hidden w-[130px] sm:block dark:opacity-80" />
          <figure key={i} className="relative z-10 flex animate-fadeUp flex-col glass rounded-[28px] p-7 sm:p-9 lg:min-h-[372px]">
            <span className="grid h-[53px] w-[53px] place-items-center rounded-full bg-[#FFEEE8] text-brand dark:bg-[#3A211F]"><LuQuote size={22} fill="currentColor" /></span>
            <blockquote className="my-5 text-justify text-[16px] font-semibold leading-[1.6] text-navy-ink dark:text-white sm:text-[17px]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src={t.avatar} alt={t.name} width={42} height={42} className="h-[42px] w-[42px] rounded-full object-cover" />
                <div>
                  <div className="text-[13px] font-bold text-navy-ink dark:text-white">{t.name}</div>
                  <div className="text-[11px] text-[#7a8798] dark:text-white/45">{t.org}</div>
                </div>
              </div>
              <div className="text-[15px] tracking-[2px] text-brand" aria-label={`${t.rating} out of 5 stars`}>{"★".repeat(t.rating)}</div>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4">
            <div className="rounded-[28px] bg-navy p-6 text-white dark:bg-[#1b2a36]">
              <div className="flex items-start justify-between text-[12px] text-white/80">
                {tr("Active users")} <LuUsers className="text-brand" size={18} />
              </div>
              <div className="mt-3 text-[40px] font-normal leading-none">85+</div>
              <p className="mt-9 text-[10.5px] text-white/60">{tr("Media professionals and organizations across Indonesia.")}</p>
            </div>
            <div className="flex items-start justify-between rounded-[28px] bg-brand px-6 py-5 text-white dark:bg-[#c52a0e]">
              <div><div className="text-[30px] leading-none">83%</div><div className="mt-3 text-[11px] text-white/80">{tr("Data accuracy")}</div></div>
              <div><div className="text-[30px] leading-none">24/7</div><div className="mt-3 text-[11px] text-white/80">{tr("Monitoring")}</div></div>
            </div>
            <div className="flex items-center justify-between px-1 pt-1">
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
                {Array.from({ length: dots }).map((_, d) => (
                  <button
                    key={d}
                    role="tab"
                    aria-selected={d === i}
                    aria-label={`Testimonial ${d + 1}`}
                    onClick={() => setI(d)}
                    className={cn("h-[7px] rounded-full transition-all", d === i ? "w-[22px] bg-brand" : "w-[7px] bg-[#F5C3B8] dark:bg-white/25")}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-9 w-9 place-items-center rounded-full text-navy-ink dark:text-white"><LuChevronLeft size={18} /></button>
                <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-[37px] w-[37px] place-items-center rounded-full bg-navy text-white dark:bg-[#1b2a36] dark:ring-1 dark:ring-white/20"><LuChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
