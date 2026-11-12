"use client";

import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter, FaTiktok } from "react-icons/fa6";
import { LuBell, LuNewspaper } from "react-icons/lu";
import { Pill } from "@/components/ui";
import { cn } from "@/lib/cn";

/* Kartu mockup (data dummy visual) */
const frame = "rounded-[22px] bg-[#EEF1F6] p-2 dark:bg-white/[.06]";
const inner = "rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1C2438]/80";
const chip = "rounded-full px-3 py-1 text-[10px] font-semibold";

function Sources() {
  const items = [
    [LuNewspaper, "News", "text-[#2b5fd9]"], [FaInstagram, "Instagram", "text-[#d6249f]"], [FaFacebookF, "Facebook", "text-[#1877f2]"],
    [FaXTwitter, "X", "text-black dark:text-white"], [FaTiktok, "TikTok", "text-black dark:text-white"], [FaYoutube, "YouTube", "text-[#ff0000]"],
  ] as const;
  return (
    <div className={frame}><div className={inner}>
      <div className="flex items-center justify-between text-[10px] uppercase text-[#7a8798] dark:text-white/50">Connected sources <span className="rounded-full bg-[#E3F6EA] px-2 py-0.5 normal-case text-[#12a150]">6 live</span></div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map(([I, n, c]) => (
          <span key={n} className="flex items-center gap-2 rounded-xl bg-[#F1F3F7] px-3 py-2.5 text-[11px] font-semibold text-navy-ink dark:bg-white/10 dark:text-white"><I className={c} size={13} />{n}</span>
        ))}
      </div>
    </div></div>
  );
}

function Analysis() {
  return (
    <div className={frame}><div className={inner}>
      <div className="flex items-center justify-between text-[12px] font-bold text-navy-ink dark:text-white">AI Conversation Analysis <span className="rounded-full bg-[#E3F6EA] px-2 py-0.5 text-[10px] text-[#12a150]">+ AI Analyzed</span></div>
      <p className="mt-3 text-[10px] font-semibold text-navy-ink dark:text-white">Sentiment classification</p>
      <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full"><i className="w-[65%] bg-[#12a150]" /><i className="w-[25%] bg-[#8a94a3]" /><i className="w-[10%] bg-[#e2453c]" /></div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className={cn(chip, "bg-[#E3F6EA] text-[#12a150]")}>Positive 65%</span>
        <span className={cn(chip, "bg-[#EEF0F4] text-[#566274]")}>Neutral 25%</span>
        <span className={cn(chip, "bg-[#FDE3E1] text-[#e2453c]")}>Negative 10%</span>
      </div>
      <p className="mt-3 text-[10px] font-semibold text-navy-ink dark:text-white">Detected topics</p>
      <div className="mt-2 flex flex-wrap gap-2">{["Brand Reputation", "Customer Experience", "Product Quality"].map((t) => <span key={t} className="rounded-full bg-[#F1F3F7] px-3 py-1 text-[10px] text-[#566274] dark:bg-white/10 dark:text-white/70">{t}</span>)}</div>
    </div></div>
  );
}

function Decision() {
  const authors = [["@jessica_lee", "12.4K mentions"], ["@techreview_id", "8.7K mentions"], ["@toastsrad", "6.1K mentions"]];
  return (
    <div className={frame}><div className={inner}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#F1F3F7] p-3 dark:bg-white/10"><p className="text-[10px] text-[#7a8798] dark:text-white/50">Total Mentions</p><p className="text-[22px] font-bold text-navy-ink dark:text-white">12,840 <span className="rounded-full bg-[#E3F6EA] px-1.5 text-[9px] text-[#12a150]">↑ 18.5%</span></p></div>
        <div className="rounded-xl bg-[#F1F3F7] p-3 dark:bg-white/10"><p className="text-[10px] text-[#7a8798] dark:text-white/50">Top Influencers</p><p className="text-[22px] font-bold text-navy-ink dark:text-white">248 <span className="text-[9px] font-normal text-[#7a8798]">Identified authors</span></p></div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-navy-ink dark:text-white">Conversation trend <span className="rounded-full bg-[#FFF1CC] px-2 py-0.5 text-[#a8760a]">Trend detected</span></div>
      <svg viewBox="0 0 260 70" className="mt-2 h-[70px] w-full" preserveAspectRatio="none"><path d="M0 52 L20 48 L40 54 L65 38 L90 44 L110 32 L135 40 L160 28 L185 36 L210 22 L235 30 L260 26 L260 70 L0 70Z" fill="#FDE3DC" /><path d="M0 52 L20 48 L40 54 L65 38 L90 44 L110 32 L135 40 L160 28 L185 36 L210 22 L235 30 L260 26" fill="none" stroke="#e2453c" strokeWidth="1.6" /></svg>
      <p className="mt-2 text-[10px] font-bold text-navy-ink dark:text-white">Top Authors</p>
      {authors.map(([a, m], i) => (
        <div key={a} className="mt-2 flex items-center justify-between text-[10px] text-[#566274] dark:text-white/70">
          <span className="flex items-center gap-2 font-semibold text-navy-ink dark:text-white"><i className="h-6 w-6 rounded-full" style={{ background: ["#8a5a3c", "#9fb4cf", "#b08a5a"][i] }} />{a}</span>{m}
        </div>
      ))}
    </div></div>
  );
}

function Monitoring() {
  return (
    <div className={frame}><div className={cn(inner, "grid gap-3 sm:grid-cols-[1.15fr_1fr]")}>
      <div>
        <p className="text-[10px] font-bold text-navy-ink dark:text-white">Tracked Keywords</p>
        <div className="mt-2 flex flex-wrap gap-1.5">{["Socindex", "Brand Reputation", "+"].map((t) => <span key={t} className={cn(chip, t === "+" ? "bg-[#EEF0F4] text-[#566274]" : "bg-[#E3F6EA] text-[#12a150]")}>{t}</span>)}</div>
        <p className="mt-4 text-[10px] font-bold text-navy-ink dark:text-white">Monitored Accounts</p>
        {["@astra_career", "@bank_indonesia"].map((a) => (
          <div key={a} className="mt-2 flex items-center justify-between gap-2 text-[10px] text-navy-ink dark:text-white"><span className="flex items-center gap-2"><i className="h-5 w-5 rounded-full bg-[#1a3a6b]" />{a}</span><span className={cn(chip, "bg-[#E3F6EA] text-[#12a150]")}>Monitoring</span></div>
        ))}
      </div>
      <div className="rounded-xl border border-[#BFE6CD] bg-[#E8F7EE] p-4 dark:bg-[#12a150]/15">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-navy-ink"><LuBell size={13} /></span>
        <p className="mt-3 text-[11px] font-bold text-navy-ink dark:text-white">Monitoring alerts</p>
        <p className="mt-1 text-[9px] text-[#566274] dark:text-white/60">Stay updated on relevant conversations.</p>
        <span className="relative mt-3 block h-4 w-8 rounded-full bg-[#12a150]"><i className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" /></span>
      </div>
    </div></div>
  );
}

const steps = [
  { t: "One Data Source", d: "One centralized workspace to monitor conversations across multiple social media platforms and digital news sources.", v: <Sources /> },
  { t: "AI-Powered Analysis", d: "AI automatically processes and classifies conversations to uncover sentiment, topics, and meaningful insights from social media data.", v: <Analysis /> },
  { t: "Faster Decision", d: "Spot emerging trends, track conversation spikes, and identify influential voices to make faster, data-driven decisions.", v: <Decision /> },
  { t: "Optimize Brand Monitoring", d: "Customize your monitoring with relevant keywords and selected social media accounts. Stay informed with organized reports and timely alerts.", v: <Monitoring /> },
];

export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  const [trackH, setTrackH] = useState(0);
  const [reached, setReached] = useState(1);

  // garis merah turun mengikuti scroll: setiap melewati satu angka, angka itu menyala
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const ol = listRef.current;
      if (!ol) return;
      const items = Array.from(ol.children).filter((c) => c.tagName === "LI") as HTMLElement[];
      const last = items[items.length - 1];
      const total = last.offsetTop;
      const y = window.innerHeight * 0.55 - ol.getBoundingClientRect().top - 18;
      const f = Math.min(Math.max(y, 0), total);
      setTrackH(total);
      setFill(f);
      setReached(items.filter((li) => li.offsetTop <= f + 1).length || 1);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-page py-16 lg:py-[90px]">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Pill>How It&apos;s Work</Pill>
          <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,2.5rem)] font-light leading-[1.15] tracking-[-0.02em] text-navy-ink dark:text-white">How Socindex Turns Data Into Your Decision</h2>
          <p className="mt-5 max-w-[400px] text-[13px] leading-[1.6] text-[#7a8798] dark:text-white/55">Media data is collected, processed, and analyzed to help you discover the stories, trends, and connections behind the numbers.</p>
          <a href="#get-started" className="mt-6 inline-flex h-[34px] items-center rounded-full bg-[#D93A1E] px-6 text-[12px] font-semibold text-white transition hover:brightness-110">Discuss With Us →</a>
        </div>

        <ol ref={listRef} className="relative mx-auto mt-14 max-w-[840px] space-y-12 lg:space-y-[70px]">
          {/* jalur garis (abu) + isi garis merah yang turun saat scroll */}
          <i className="absolute left-[18px] top-[18px] w-[2px] -translate-x-1/2 bg-line dark:bg-white/15 lg:left-1/2" style={{ height: trackH }} aria-hidden />
          <i className="absolute left-[18px] top-[18px] w-[2px] -translate-x-1/2 bg-[#D93A1E] lg:left-1/2" style={{ height: fill }} aria-hidden />
          {steps.map((s, i) => {
            const textLeft = i % 2 === 0;
            const text = (
              <div className={cn("lg:max-w-[300px]", textLeft ? "lg:ml-auto lg:text-right" : "lg:mr-auto")}>
                <p className="text-[9px] tracking-widest text-brand">STEP &nbsp;0{i + 1}</p>
                <h3 className="mt-1 text-[22px] font-bold leading-tight text-navy-ink dark:text-white">{s.t}</h3>
                <p className="mt-3 text-[12.5px] leading-[1.7] text-[#7a8798] dark:text-white/55">{s.d}</p>
              </div>
            );
            const vis = <div className={cn("w-full max-w-[400px]", textLeft ? "lg:mr-auto" : "lg:ml-auto")}>{s.v}</div>;
            return (
              <li key={s.t} className="relative grid grid-cols-1 gap-5 pl-14 lg:grid-cols-2 lg:gap-x-[70px] lg:pl-0">
                <span className={cn("absolute left-0 top-0 z-10 grid h-9 w-9 place-items-center rounded-full border-2 text-[12px] font-bold transition-colors duration-300 lg:left-1/2 lg:-translate-x-1/2", i < reached ? "border-[#D93A1E] bg-[#D93A1E] text-white" : "border-line bg-white text-[#9aa5b3] dark:border-white/20 dark:bg-[#1C2438] dark:text-white/50")}>0{i + 1}</span>
                {textLeft ? <>{text}{vis}</> : <><div className="order-2 lg:order-1">{vis}</div><div className="order-1 lg:order-2">{text}</div></>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
