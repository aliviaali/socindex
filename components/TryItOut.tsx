"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { LuArrowRight, LuGrid3X3, LuShare2 } from "react-icons/lu";
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

function MetricAreaChart({ data, color, label }: { data: number[]; color: string; label: string }) {
  const peak = Math.max(...data);
  return (
    <ResponsiveContainer width="100%" height={40} minWidth={0}>
      <AreaChart accessibilityLayer title={label} data={data.map(value => ({ value }))} margin={{ top: 6, right: 6, bottom: 5, left: 6 }}>
        <Tooltip cursor={false} labelStyle={{ display: "none" }} wrapperStyle={{ zIndex: 1 }} position={{ y: 0 }}
          contentStyle={{ fontSize: 10, padding: "2px 6px", borderRadius: 6 }} />
        <Area type="natural" dataKey="value" name={label} stroke={color} strokeWidth={1.5}
          fill={color} fillOpacity={0.4} isAnimationActive={false} activeDot={false}
          dot={({ cx, cy, index }) => {
            const isPeak = data[index] === peak;
            return (
              <circle
                key={index} cx={cx} cy={cy} r={isPeak ? 4 : 2.5}
                fill={isPeak ? color : `color-mix(in srgb, ${color} 46%, #84909c)`}
                stroke="rgb(var(--surface))" strokeWidth={1}
              />
            );
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TryItOut() {
  const { t, lang } = useLang();
  // (apply api) topik & data saat ini DUMMY (lib/tryItOutData.ts). Ganti dengan API dashboard.
  const [topicId, setTopicId] = useState<string>(topics[0].id);
  const [d, setD] = useState<TopicData>(defaultTopicData);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const text = (en: string, id: string) => lang === "id" ? id : en;
  const number = (value: number) => value.toLocaleString(lang === "id" ? "id-ID" : "en-US");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setLocked(false);
    getTopicData(topicId, controller.signal)
      .then(result => { if (!controller.signal.aborted) setD(result); })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [topicId, retry]);

  const s = d.sentiment;
  const words = d.words.slice(0, 10);
  const maxW = Math.max(1, ...words.map((w) => w.size));
  const maxSource = Math.max(1, ...d.sources.map(source => source.total));
  const list = [["Positive", "pos", s.pct.positive, s.counts.positive], ["Neutral", "neu", s.pct.neutral, s.counts.neutral], ["Negative", "neg", s.pct.negative, s.counts.negative]] as const;
  // pie chart: warna lewat CSS variable agar netral tetap terbaca di dark mode
  const pie = `conic-gradient(var(--pos) 0 ${s.pct.positive}%, var(--neu) ${s.pct.positive}% ${s.pct.positive + s.pct.neutral}%, var(--neg) ${s.pct.positive + s.pct.neutral}% 100%)`;

  return (
    <div
      className="glass-wrap glass-panel relative rounded-[20px] p-5 [--neg:#E0212F] [--neu:#4B5A6E] [--pos:#5AA9C4] dark:[--neu:#8391A7] dark:[--pos:#6CC3DE] sm:p-6 lg:p-7"
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

      <p className="mt-3 text-sm text-muted">{text("Sample data — not live analytics. The network is an illustrative demo.", "Data contoh — bukan analitik langsung. Jaringan merupakan ilustrasi demo.")}</p>
      {loading && <p role="status" className="mt-3">{text("Loading…", "Memuat…")}</p>}
      {error && <div role="alert" className="mt-3">
        <p>{text("Could not load this topic.", "Topik gagal dimuat.")}</p>
        <button type="button" className="mt-2 rounded-lg border px-3 py-2" onClick={() => setRetry(value => value + 1)}>{text("Try again", "Coba lagi")}</button>
      </div>}
      <div hidden={loading || error || d.id !== topicId} aria-busy={loading} className={cn("mt-4 space-y-3 transition", loading && "opacity-60")}>
        {/* ===== 4 metrik dalam satu baris ===== */}
        <div className="grid auto-rows-fr grid-cols-2 gap-3 lg:grid-cols-4">
          {d.metrics.map((m) => (
            <div key={m.label} className="glass flex min-w-0 flex-col overflow-hidden rounded-2xl pt-3">
              <div className="flex flex-col gap-0.5 px-4 text-[9.5px] leading-snug text-[#7a8798] dark:text-white/50 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                <b className="font-medium uppercase">{t(m.label)}</b><span className="sm:text-right">{t(m.hint)}</span>
              </div>
              <div className="mt-auto px-4 pb-1 pt-1 text-[24px] font-bold leading-tight text-navy-ink dark:text-white">{m.value}</div>
              <MetricAreaChart data={m.series} color={m.color} label={t(m.label)} />
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
                      <span className="min-w-[54px] text-right text-[10.5px] text-[#7a8798] dark:text-white/55">{number(c)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass flex flex-1 flex-col rounded-2xl p-4">
              <div className="text-[10px] uppercase text-[#7a8798] dark:text-white/50">{t("Data Source")} · {number(d.totalPosts)} {t("posts")}</div>
              <ul className="flex flex-1 flex-col justify-evenly py-2">
                {d.sources.map((r) => {
                  const Icon = srcIcon[r.name];
                  const width = Math.min(100, Math.max(0, (r.total / maxSource) * 100));
                  const sum = Math.max(1, r.pct.positive + r.pct.neutral + r.pct.negative);
                  return (
                    <li key={r.name} className="flex items-center gap-2.5 text-[11px] font-semibold text-navy-ink dark:text-white">
                      <Icon size={14} className="shrink-0" />
                      <span className="w-[58px] shrink-0">{r.name}</span>
                      <div className="h-2 flex-1 rounded-sm bg-[#EEF0F4] dark:bg-white/10">
                        <div className="flex h-full overflow-hidden rounded-sm" style={{ width: `${width}%` }}>
                          <i style={{ width: `${(r.pct.positive / sum) * 100}%`, background: "var(--pos)" }} /><i style={{ width: `${(r.pct.neutral / sum) * 100}%`, background: "var(--neu)" }} /><i style={{ width: `${(r.pct.negative / sum) * 100}%`, background: "var(--neg)" }} />
                        </div>
                      </div>
                      <span className="w-10 text-right">{number(r.total)}</span>
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
                <button type="button" onClick={() => setLocked(true)} className="rounded-full bg-navy px-3 py-1 text-[11px] font-semibold text-white dark:bg-white dark:text-navy-ink">{t("Network")}</button>
              </div>
              <div className="mt-2"><NetworkGraph key={d.id} seed={d.id} /></div>
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
      {locked && !loading && !error && d.id === topicId && <UnlockModal topic={d.label} onClose={() => setLocked(false)} />}
    </div>
  );
}
