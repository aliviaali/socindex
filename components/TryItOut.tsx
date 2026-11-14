"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { LuArrowRight, LuEllipsis, LuGrid3X3, LuShare2 } from "react-icons/lu";
import { FaInstagram, FaTiktok, FaThreads, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { GlassSelect } from "@/components/GlassSelect";
import { NetworkGraph } from "@/components/NetworkGraph";
import { Pill } from "@/components/ui";
import { UnlockModal } from "@/components/UnlockModal";
import { defaultTopicData, getTopicData, topics, type TopicData } from "@/lib/tryItOutData";
import { useLang } from "@/lib/i18n";
import { localizeCloudWord } from "@/lib/tryItOutWords";
import { cn } from "@/lib/cn";

const darkWordColors = ["#FBBF24", "#60A5FA", "#E2E8F0", "#FB923C", "#4ADE80", "#FDBA74", "#FB7185"];
const srcIcon = { Tiktok: FaTiktok, Instagram: FaInstagram, Threads: FaThreads, Youtube: FaYoutube, Twitter: FaXTwitter } as const;
const C = { pos: "#5AA9C4", neu: "#4B5A6E", neg: "#E0212F" };

function Spark({ data, color }: { data: number[]; color: string }) {
  const w = 240, h = 40, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 4 - ((v - min) / (max - min || 1)) * (h - 12)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <path d={`${line} L${w} ${h} L0 ${h} Z`} fill={color} opacity=".12" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function TryItOut() {
  const { t, lang } = useLang();
  // (apply api) topik & data saat ini DUMMY (lib/tryItOutData.ts). Ganti dengan API dashboard.
  const [topicId, setTopicId] = useState<string>(topics[0].id);
  const [d, setD] = useState<TopicData>(defaultTopicData);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false); // notifikasi "Unlock content" (View All, See All, tab Network/Stats)

  useEffect(() => {
    let alive = true;
    setLoading(true);
    // (apply api) getTopicData() -> fetch ke endpoint dashboard
    getTopicData(topicId).then((r) => { if (alive) { setD(r); setLoading(false); } });
    return () => { alive = false; };
  }, [topicId]);

  const s = d.sentiment;
  const words = d.words.slice(0, 10);
  const maxW = Math.max(...words.map((w) => w.size));
  const list = [["Positive", "pos", s.pct.positive, s.counts.positive], ["Neutral", "neu", s.pct.neutral, s.counts.neutral], ["Negative", "neg", s.pct.negative, s.counts.negative]] as const;
  // pie chart: warna lewat CSS variable agar netral tetap terbaca di dark mode
  const pie = `conic-gradient(var(--pos) 0 ${s.pct.positive}%, var(--neu) ${s.pct.positive}% ${s.pct.positive + s.pct.neutral}%, var(--neg) ${s.pct.positive + s.pct.neutral}% 100%)`;

  return (
    <div
      id="try-it-out"
      className="glass-wrap relative mt-12 scroll-mt-20 rounded-[28px] p-5 [--neg:#E0212F] [--neu:#4B5A6E] [--pos:#5AA9C4] dark:[--neu:#8391A7] dark:[--pos:#6CC3DE] sm:p-6 lg:mt-14 lg:p-7"
    >
      {/* ===== Header: judul (kiri) + pilihan topik (kanan) ===== */}
      <div className="flex flex-col gap-3">
        <div>
          <Pill>{t("Try It Out")}</Pill>
          <h2 className="mt-3 text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy-ink dark:text-white">
            {t("Turning Conversations Into Strategic Action")}
          </h2>
        </div>
        <GlassSelect
          ariaLabel={t("Select topic")}
          value={topicId}
          onChange={setTopicId}
          options={topics.map((x) => ({ value: x.id, label: x.label }))}
          className="w-full sm:w-[380px]"
          buttonClassName="glass rounded-full !border-brand/40 px-5 py-2.5 text-[14px] font-semibold text-navy-ink dark:text-white"
          prefix={<span className="font-normal text-[#8a95a3] dark:text-white/50">{t("Select Topic:")}</span>}
        />
      </div>

      <div aria-busy={loading} className={cn("mt-4 space-y-3 transition", loading && "opacity-60")}>
        {/* ===== 4 metrik dalam satu baris ===== */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {d.metrics.map((m) => (
            <div key={m.label} className="overflow-hidden rounded-2xl glass pt-3">
              <div className="flex flex-col gap-0.5 px-4 text-[9.5px] leading-snug text-[#7a8798] dark:text-white/50 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                <b className="font-medium uppercase">{t(m.label)}</b><span className="sm:text-right">{t(m.hint)}</span>
              </div>
              <div className="px-4 pb-1 pt-1 text-[24px] font-bold leading-tight text-navy-ink dark:text-white">{m.value}</div>
              <Spark data={m.series} color={m.color} />
            </div>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)]">
          {/* ===== Kolom kiri: pie sentimen + sumber data ===== */}
          <div className="flex min-w-0 flex-col gap-3">
            <div className="glass rounded-2xl p-4">
              <div className="text-[10px] uppercase text-[#7a8798] dark:text-white/50">{t("Total Sentiment")}</div>
              <div className="mt-2 flex items-center gap-4">
                <div className="relative h-[116px] w-[116px] shrink-0 rounded-full" style={{ background: pie }} role="img" aria-label={t("Sentiment split")}>
                  <div className="absolute inset-[22px] grid place-items-center rounded-full bg-white text-center dark:bg-[#2a313c]">
                    <div>
                      <div className="text-[20px] font-bold leading-none text-navy-ink dark:text-white">{s.pct[s.dominant as keyof typeof s.pct]}%</div>
                      <div className="mt-0.5 text-[9.5px] font-semibold text-[#7a8798] dark:text-white/60">{t(s.dominant)}</div>
                    </div>
                  </div>
                </div>
                {/* legend: persentase masuk ke pie, keterangan di sini */}
                <ul className="min-w-0 flex-1 space-y-2 text-[11.5px] text-navy-ink dark:text-white">
                  {list.map(([n, k, v, c]) => (
                    <li key={n} className="flex items-center gap-2">
                      <i className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: `var(--${k})` }} />
                      <span className="font-semibold">{t(n)}</span>
                      <span className="ml-auto font-bold">{v}%</span>
                      <span className="w-10 text-right text-[10.5px] text-[#7a8798] dark:text-white/55">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass flex flex-1 flex-col rounded-2xl p-4">
              <div className="text-[10px] uppercase text-[#7a8798] dark:text-white/50">{t("Data Source")} · {d.totalPosts} {t("posts")}</div>
              <ul className="flex flex-1 flex-col justify-evenly py-2">
                {d.sources.map((r) => {
                  const Icon = srcIcon[r.name];
                  const width = (r.total / d.sources[0].total) * 100;
                  const sum = r.pct.positive + r.pct.neutral + r.pct.negative;
                  return (
                    <li key={r.name} className="flex items-center gap-2.5 text-[11px] font-semibold text-navy-ink dark:text-white">
                      <Icon size={14} className="shrink-0" />
                      <span className="w-[58px] shrink-0">{r.name}</span>
                      <div className="h-2 flex-1 rounded-sm bg-[#EEF0F4] dark:bg-white/10">
                        <div className="flex h-full overflow-hidden rounded-sm" style={{ width: `${width}%` }}>
                          <i style={{ width: `${(r.pct.positive / sum) * 100}%`, background: "var(--pos)" }} /><i style={{ width: `${(r.pct.neutral / sum) * 100}%`, background: "var(--neu)" }} /><i style={{ width: `${(r.pct.negative / sum) * 100}%`, background: "var(--neg)" }} />
                        </div>
                      </div>
                      <span className="w-10 text-right">{r.total.toLocaleString("en-US")}</span>
                    </li>
                  );
                })}
              </ul>
              <button type="button" onClick={() => setLocked(true)} className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand">{t("View All")} <LuArrowRight size={12} /></button>
            </div>
          </div>

          {/* ===== Kolom kanan: social network (lebar) + word cloud ===== */}
          <div className="flex min-w-0 flex-col gap-3">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-[14px] font-semibold text-navy-ink dark:text-white"><LuShare2 size={17} />{t("Social Network")}</div>
                <div className="flex items-center gap-2">
                  {/* menyentuh tab Network / Stats memunculkan notifikasi berlangganan */}
                  <div role="group" aria-label={t("Social Network")} className="flex rounded-full bg-[#EEF0F4] p-0.5 text-[11px] font-semibold dark:bg-white/10">
                    <button type="button" onClick={() => setLocked(true)} className="rounded-full bg-navy px-3 py-1 text-white dark:bg-white dark:text-navy-ink">{t("Network")}</button>
                    <button type="button" onClick={() => setLocked(true)} className="rounded-full px-3 py-1 text-[#566274] dark:text-white/70">{t("Stats")}</button>
                  </div>
                  <span className="grid h-7 w-7 place-items-center rounded-full text-[#7a8798] dark:text-white/60" aria-hidden><LuEllipsis size={16} /></span>
                </div>
              </div>
              <div className="mt-2"><NetworkGraph seed={topicId} /></div>
            </div>

            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-[14px] font-semibold text-navy-ink dark:text-white"><LuGrid3X3 size={16} />{t("Word Cloud")}</div>
                <button type="button" onClick={() => setLocked(true)} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2b6fd9] dark:text-[#7db0ff]">{t("See All")} <LuArrowRight size={12} /></button>
              </div>
              <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-0.5 leading-tight">
                {words.map((w, i) => (
                  <span
                    key={w.text + i}
                    className="font-bold text-[var(--word-light)] dark:text-[var(--word-dark)]"
                    style={{ fontSize: Math.round(13 + (w.size / maxW) * 9), "--word-light": w.color, "--word-dark": darkWordColors[i % darkWordColors.length] } as CSSProperties}
                  >
                    {localizeCloudWord(w.text, lang)}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      {locked && <UnlockModal topic={d.label} onClose={() => setLocked(false)} />}
    </div>
  );
}
