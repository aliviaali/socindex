"use client";

import Image from "next/image";
import { Pill } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export function MultiChannel() {
  const { t } = useLang();
  return (
    <section className="bg-page dark:bg-[#171B22] pb-8 pt-8 lg:pt-12">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
        <div className="text-center">
          <Pill>{t("Ai Powered")}</Pill>
          <h2 className="mx-auto mt-5 max-w-[1010px] text-[clamp(1.8rem,3.4vw,2.5rem)] font-light leading-[1.15] tracking-[-0.02em] text-[#3a4250] dark:text-white">
            {t("Comprehensive Multi-Channel Monitoring powered by Artificial Intelligence")}
          </h2>
          <p className="mx-auto mt-5 max-w-[920px] text-[14px] text-[#7a8798] dark:text-white/45">
            {t("Track your brand keywords across X, Instagram, Facebook, Threads, YouTube, TikTok, and online forums and blogs simultaneously.")}
          </p>
        </div>

        {/* Seluruh animasi orbit (ring, ikon platform, komet) sudah ada di dalam GIF */}
        <div className="relative mx-auto mt-2 w-full select-none" style={{ maxWidth: 1114, aspectRatio: "960 / 540" }}>
          <Image src="/motion/hub-light.gif" alt="Socindex AI hub monitoring X, Instagram, Facebook, Threads, YouTube, TikTok and LinkedIn" fill unoptimized sizes="(max-width: 1186px) 100vw, 1114px" className="object-contain dark:hidden" />
          <Image src="/motion/hub-dark.gif" alt="" aria-hidden fill unoptimized sizes="(max-width: 1186px) 100vw, 1114px" className="hidden object-contain dark:block [mask-image:radial-gradient(ellipse_at_center,#000_62%,transparent_98%)]" />
        </div>
      </div>
    </section>
  );
}
