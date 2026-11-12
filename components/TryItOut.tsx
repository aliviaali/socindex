"use client";

import { useEffect, useState } from "react";
import { LuArrowRight, LuChevronDown } from "react-icons/lu";
import { FaInstagram, FaTiktok, FaThreads, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { GlassSelect } from "@/components/GlassSelect";
import { Pill } from "@/components/ui";
import { UnlockModal } from "@/components/UnlockModal";
import { defaultTopicData, getTopicData, topics, type TopicData } from "@/lib/tryItOutData";

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
  // (apply api) topik & data saat ini DUMMY (lib/tryItOutData.ts). Ganti dengan API dashboard.
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
    <div id="try-it-out" className="glass-wrap relative mt-12 scroll-mt-20 rounded-[28px] p-5 sm:p-8 lg:mt-14 lg:p-10">
      <Pill>Try It Out</Pill>
      <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <h2 className="max-w-[560px] text-[clamp(1.8rem,3.4vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy-ink dark:text-white">
          Turning Conversations Into Strategic Action
        </h2>
        <GlassSelect
          ariaLabel="Select topic"
          value={topicId}
          onChange={setTopicId}
          options={topics.map((t) => ({ value: t.id, label: t.label }))}
          className="w-full lg:w-[555px]"
          buttonClassName="glass rounded-full !border-brand/40 px-5 py-3 text-[14px] font-semibold text-navy-ink dark:text-white"
          prefix={<span className="font-normal text-[#8a95a3] dark:text-white/50">Select Topic:</span>}
        />
      </div>

      <div aria-busy={loading} className={loading ? "opacity-60 transition" : "transition"}>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.metrics.map((m) => (
            <div key={m.label} className="overflow-hidden rounded-2xl glass pt-4">
              <div className="flex items-baseline justify-between gap-2 px-4 text-[9.5px] text-[#7a8798] dark:text-white/50">
                <b className="font-medium uppercase">{m.label}</b><span className="truncate">{m.hint}</span>
              </div>
              <div className="px-4 pb-2 pt-2 text-[28px] font-bold text-navy-ink dark:text-white">{m.value}</div>
              <Spark data={m.series} color={m.color} />
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[400fr_840fr]">
          <div className="glass rounded-2xl p-5">
            <div className="text-[10px] uppercase text-[#7a8798] dark:text-white/50">Total Sentiment</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-[38px] font-bold text-navy-ink dark:text-white">{s.pct[s.dominant as keyof typeof s.pct]}%</span>
              <span className="text-[14px] font-semibold text-navy-ink dark:text-white">{s.dominant}</span>
            </div>
            <div className="mt-2 flex h-2.5 overflow-hidden rounded-full" role="img" aria-label="Sentiment split">
              <i style={{ width: `${s.pct.positive}%`, background: C.pos }} /><i style={{ width: `${s.pct.neutral}%`, background: C.neu }} /><i style={{ width: `${s.pct.negative}%`, background: C.neg }} />
            </div>
            <ul className="mt-4 space-y-1.5 text-[12px] text-navy-ink dark:text-white">
              {([["Positive", C.pos, s.pct.positive], ["Neutral", C.neu, s.pct.neutral], ["Negative", C.neg, s.pct.negative]] as const).map(([n, c, v]) => (
                <li key={n} className="flex items-center gap-3"><i className="h-2.5 w-3 rounded-sm" style={{ background: c }} />{n}<span className="ml-auto">{v} %</span></li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
              {([["Positive", s.counts.positive, "bg-[#E6F6FB] text-[#3a8fae]"], ["Neutral", s.counts.neutral, "bg-[#E3EDF8] text-[#4B5A6E]"], ["Negative", s.counts.negative, "bg-[#FDE3E6] text-[#E0212F]"]] as const).map(([n, v, c]) => (
                <div key={n} className={`rounded-2xl px-1 py-2 ${c}`}>{n}<br />{v}</div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase text-[#7a8798] dark:text-white/50">
              <span>Data Source · {d.totalPosts} posts</span>
              <span className="flex gap-3 normal-case">
                {([["Positive", C.pos], ["Neutral", C.neu], ["Negative", C.neg]] as const).map(([n, c]) => (<span key={n} className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm" style={{ background: c }} />{n}</span>))}
              </span>
            </div>
            <ul className="mt-3 space-y-3">
              {d.sources.map((r) => {
                const Icon = srcIcon[r.name];
                const max = d.sources[0].total;
                const width = (r.total / max) * 100;
                const sum = r.pct.positive + r.pct.neutral + r.pct.negative;
                return (
                  <li key={r.name} className="flex items-center gap-3 text-[12px] font-semibold text-navy-ink dark:text-white">
                    <Icon size={20} className="shrink-0" />
                    <span className="w-[72px] shrink-0">{r.name}</span>
                    <div className="h-3 flex-1 rounded-sm bg-[#EEF0F4] dark:bg-white/10">
                      <div className="flex h-full overflow-hidden rounded-sm" style={{ width: `${width}%` }}>
                        <i style={{ width: `${(r.pct.positive / sum) * 100}%`, background: C.pos }} /><i style={{ width: `${(r.pct.neutral / sum) * 100}%`, background: C.neu }} /><i style={{ width: `${(r.pct.negative / sum) * 100}%`, background: C.neg }} />
                      </div>
                    </div>
                    <span className="w-12 text-right">{r.total.toLocaleString("en-US")}</span>
                  </li>
                );
              })}
            </ul>
            <button type="button" onClick={() => setLocked(true)} className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-brand">View All <LuArrowRight size={12} /></button>
          </div>
        </div>

        <div className="mt-4 glass rounded-2xl p-5">
          <div className="text-[10px] uppercase text-[#7a8798] dark:text-white/50">Word Cloud</div>
          <p className="mx-auto mt-3 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-5 gap-y-1 leading-tight">
            {d.words.map((w, i) => (<span key={w.text + i} className="font-bold" style={{ fontSize: w.size, color: w.color }}>{w.text}</span>))}
          </p>
        </div>
      </div>
      {locked && <UnlockModal topic={d.label} onClose={() => setLocked(false)} />}
    </div>
  );
}
