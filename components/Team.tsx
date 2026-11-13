"use client";

import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { team } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function Team() {
  const { t } = useLang();
  return (
    <section id="team" className="bg-page py-16 lg:py-[80px]">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
        <div className="rounded-[28px] bg-[#F3F4F6] p-6 dark:bg-transparent sm:p-10">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0e81c2]">{t("Meet the team")}</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy-ink dark:text-white">
            {t("The people behind clearer decisions")}
          </h2>
          <p className="mt-1 text-[14px] text-navy-ink/80 dark:text-white/60 font-normal">
            {t("A passionate team of designers, developers, and data experts working to build better social media intelligence solutions.")}
          </p>

          {/* ======================================================================
              [GANTI-FOTO]  KARTU TIM — FOTO ANDA SENDIRI
              Foto diambil dari  lib/content.ts  →  const team  →  field `photo`.
                1) Salin foto ke folder  /public/team/   (mis. public/team/budi.jpg)
                2) Ubah  photo: "/team/member-1.jpg"  →  photo: "/team/budi.jpg"
              Nama, jabatan (badge), bio & link sosial (linkedin/instagram/x, bertanda [DUMMY-LINK]) diedit di file yang sama.
              Rasio foto disarankan 4:5 (potret), minimal 600 × 750 px.
             ====================================================================== */}
          <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="flex flex-col glass rounded-[24px] p-3 dark:!bg-[#1C2438]/70">
                <div className="overflow-hidden rounded-[18px] bg-white">
                  {/* [GANTI-FOTO] ← foto anggota tim (sumber: m.photo di lib/content.ts) */}
                  <Image src={m.photo} alt={`Foto ${m.name}`} width={400} height={440} className="aspect-[4/3] h-auto w-full object-cover object-[50%_25%]" />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <span className="flex items-center gap-2 text-xs font-normal uppercase tracking-wide text-[#2b5fd9] dark:text-blue-300"><i className="h-[2px] w-4 bg-current" />{m.badge}</span>
                  <h3 className="mt-2 text-[20px] font-bold leading-7 text-navy-ink dark:text-white lg:min-h-14">{m.name}</h3>
                  <hr className="my-4 border-line dark:border-white/10" />
                  <p className="pb-6 text-left text-sm font-normal leading-[1.75] text-[#4b5b6e] dark:text-white/80">{t(m.bio)}</p>
                  <div className="mt-auto grid grid-cols-3 items-center gap-2 border-t border-line pt-4 text-[11px] text-[#4b5b6e] dark:border-white/20 dark:text-white">
                    {([["LinkedIn", FaLinkedinIn, m.linkedin], ["Instagram", FaInstagram, m.instagram], ["X", FaXTwitter, m.x]] as const).map(([n, Icon, href]) => (
                      <a key={n} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} di ${n}`} className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border border-line bg-white/50 px-1 py-2 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-white/20 dark:bg-white/5 dark:hover:border-blue-300 dark:hover:bg-white/15 dark:hover:text-white">
                        <Icon size={14} className="shrink-0 text-[#2b5fd9] dark:text-[#8fa6ff]" />{n}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
