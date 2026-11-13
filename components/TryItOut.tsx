"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { LuArrowRight, LuChevronDown, LuCalendarDays, LuGrip } from "react-icons/lu";
import { SocialNetworkPreview } from "@/components/SocialNetworkPreview";
import { FaInstagram, FaTiktok, FaThreads, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { GlassSelect } from "@/components/GlassSelect";
import { Pill } from "@/components/ui";
import { UnlockModal } from "@/components/UnlockModal";
import { defaultTopicData, getTopicData, topics, type TopicData } from "@/lib/tryItOutData";
import { useLang } from "@/lib/i18n";
import { localizeCloudWord } from "@/lib/tryItOutWords";

const srcIcon = { Tiktok: FaTiktok, Instagram: FaInstagram, Threads: FaThreads, Youtube: FaYoutube, Twitter: FaXTwitter } as const;
const C = { pos: "#78C8EA", neu: "#344363", neg: "#FF3656" };
const darkWordColors = ["#FBBF24", "#60A5FA", "#E2E8F0", "#FB923C", "#4ADE80", "#FDBA74", "#FB7185"];

function Spark({ data, color }: { data: number[]; color: string }) {
  const w = 240, h = 40, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 4 - ((v - min) / (max - min || 1)) * (h - 12)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" preserveAspectRatio="none" aria-hidden>
      <path d={`${line} L${w} ${h} L0 ${h} Z`} fill={color} opacity=".12" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function TryItOut() {
  // (apply api) topik & data saat ini DUMMY (lib/tryItOutData.ts). Ganti dengan API dashboard.
  const { t, lang } = useLang();
  const [topicId, setTopicId] = useState<string>(topics[0].id);
  const [d, setD] = useState<TopicData>(defaultTopicData);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false); // notifikasi "Unlock content"

  useEffect(() => {
    let alive = true;
    setLoading(true);
    // (apply api) getTopicData() -> fetch ke endpoint dashboard
    getTopicData(topicId).then((r) => { if (alive) { setD(r); setLoading(false); } });
    return () => { alive = false; };
  }, [topicId]);

  const s = d.sentiment;
  return (
    <div id="try-it-out" className="glass-wrap relative mt-12 scroll-mt-20 rounded-[28px] p-4 sm:p-6 lg:mt-14 lg:p-8">
      <Pill>{t("Try It Out")}</Pill>
      <div className="mt-4">
        <h2 className="max-w-[480px] text-[clamp(1.625rem,2.6vw,2.125rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy-ink dark:text-white">
          {t("Turning Conversations Into Strategic Action")}
        </h2>
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <GlassSelect
          ariaLabel={t("Select topic")}
          value={topicId}
          onChange={setTopicId}
          options={topics.map((t) => ({ value: t.id, label: t.label }))}
          className="w-full sm:w-[60%]"
          buttonClassName="glass rounded-2xl px-4 py-3 text-[14px] font-semibold text-navy-ink dark:text-white"
          prefix={<span className="font-normal text-slate-600 dark:text-slate-300">{t("Select Topic:")}</span>}
        />
        <button type="button" onClick={() => setLocked(true)} className="glass inline-flex items-center justify-center gap-3 self-end rounded-2xl px-4 py-3 text-xs font-semibold text-navy-ink dark:text-white"><LuCalendarDays />{t("Last 7 Days")}<LuChevronDown /></button>
      </div>

      <div aria-busy={loading} className={`mt-3 grid items-stretch gap-5 lg:grid-cols-[3fr_2fr] ${loading ? "opacity-60" : ""}`}>
        <div className="min-w-0 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {d.metrics.map((m) => (
            <div key={m.label} className="overflow-hidden rounded-2xl glass pt-4">
              <div className="flex min-h-[52px] flex-col gap-1 px-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <b className="font-semibold uppercase tracking-[0.06em]">{t(m.label)}</b><span>{t(m.hint)}</span>
              </div>
              <div className="px-4 pb-2 pt-2 text-[clamp(1.75rem,2.5vw,2.125rem)] font-bold leading-tight text-navy-ink dark:text-white">{m.value}</div>
              <Spark data={m.series} color={m.color} />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="glass rounded-2xl p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-600 dark:text-slate-300">{t("Total Sentiment")}</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-[clamp(2rem,3vw,2.5rem)] font-bold leading-tight text-navy-ink dark:text-white">{s.pct[s.dominant as keyof typeof s.pct]}%</span>
              <span className="text-[14px] font-semibold text-navy-ink dark:text-white">{t(s.dominant)}</span>
            </div>
            <div className="mt-2 flex h-2.5 overflow-hidden rounded-full" role="img" aria-label={t("Sentiment split")}>
              <i style={{ width: `${s.pct.positive}%`, background: C.pos }} /><i style={{ width: `${s.pct.neutral}%`, background: C.neu }} /><i style={{ width: `${s.pct.negative}%`, background: C.neg }} />
            </div>
            <ul className="mt-4 space-y-2 text-sm text-navy-ink dark:text-white">
              {([["Positive", C.pos, s.pct.positive], ["Neutral", C.neu, s.pct.neutral], ["Negative", C.neg, s.pct.negative]] as const).map(([n, c, v]) => (
                <li key={n} className="flex items-center gap-3"><i className="h-2.5 w-3 rounded-sm" style={{ background: c }} />{t(n)}<span className="ml-auto">{v} %</span></li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs leading-relaxed">
              {([["Positive", s.counts.positive, "bg-[#E6F6FB] text-[#3a8fae] dark:bg-sky-400/15 dark:text-sky-300"], ["Neutral", s.counts.neutral, "bg-[#E3EDF8] text-[#4B5A6E] dark:bg-slate-400/20 dark:text-slate-200"], ["Negative", s.counts.negative, "bg-[#FDE3E6] text-[#E0212F] dark:bg-rose-400/15 dark:text-rose-300"]] as const).map(([n, v, c]) => (
                <div key={n} className={`rounded-2xl px-1 py-2 ${c}`}>{t(n)}<br /><strong className="text-sm">{v}</strong></div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.04em] text-slate-600 dark:text-slate-300">
              <span>{t("Data Source")} · {d.totalPosts} {t("posts")}</span>
              <span className="flex gap-3 normal-case">
                {([["Positive", C.pos], ["Neutral", C.neu], ["Negative", C.neg]] as const).map(([n, c]) => (<span key={n} className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm" style={{ background: c }} />{t(n)}</span>))}
              </span>
            </div>
            <ul className="mt-3 space-y-3">
              {d.sources.map((r) => {
                const Icon = srcIcon[r.name];
                const max = Math.max(...d.sources.map((source) => source.total), 1);
                const width = (r.total / max) * 100;
                const sum = r.pct.positive + r.pct.neutral + r.pct.negative;
                return (
                  <li key={r.name} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-navy-ink dark:text-white">
                    <Icon size={20} className="shrink-0" />
                    <span className="w-[64px] sm:w-[76px] shrink-0">{r.name}</span>
                    <div className="h-3 flex-1 rounded-sm bg-[#EEF0F4] dark:bg-white/10">
                      <div className="flex h-full overflow-hidden rounded-sm" style={{ width: `${width}%` }}>
                        <i style={{ width: `${(r.pct.positive / sum) * 100}%`, background: C.pos }} /><i style={{ width: `${(r.pct.neutral / sum) * 100}%`, background: C.neu }} /><i style={{ width: `${(r.pct.negative / sum) * 100}%`, background: C.neg }} />
                      </div>
                    </div>
                    <span className="w-12 shrink-0 text-right">{r.total.toLocaleString("en-US")}</span>
                  </li>
                );
              })}
            </ul>
            <button type="button" onClick={() => setLocked(true)} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-deep dark:text-orange-300">{t("View All")} <LuArrowRight size={12} /></button>
          </div>
        </div>

        </div>
        <div className="flex min-w-0 flex-col gap-4">
        <SocialNetworkPreview key={d.id} topicId={d.id} onUnlock={() => setLocked(true)} />
        <div className="glass flex min-h-[300px] flex-1 flex-col rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3 text-base font-semibold text-navy-ink dark:text-white">
            <span className="flex items-center gap-2"><LuGrip />{t("Word Cloud")}</span>
            <button type="button" onClick={() => setLocked(true)} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm text-blue-700 dark:text-blue-400">{t("See All")}<LuArrowRight /></button>
          </div>
          <div className="relative mt-5 min-h-0 flex-1">
          <p tabIndex={0} aria-label={t("Word Cloud")} className="absolute inset-0 flex flex-wrap content-start items-center justify-center gap-x-4 gap-y-3 overflow-y-auto leading-tight">
            {d.words.map((w, i) => (<span key={w.text + i} className="max-w-full break-words font-bold text-[var(--word-light)] dark:text-[var(--word-dark)]" style={{ fontSize: w.size, "--word-light": w.color, "--word-dark": darkWordColors[i % darkWordColors.length] } as CSSProperties}>{localizeCloudWord(w.text, lang)}</span>))}
          </p>
          </div>
        </div>
        </div>
      </div>
      {locked && <UnlockModal topic={d.label} onClose={() => setLocked(false)} />}
    </div>
  );
}
