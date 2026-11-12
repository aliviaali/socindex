"use client";

import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { LuCreditCard, LuHeadset, LuZap } from "react-icons/lu";
import { GlassSelect } from "@/components/GlassSelect";
import { Logo } from "@/components/ui";
import { ctaPerks } from "@/lib/content";

const perkIcon = { zap: LuZap, card: LuCreditCard, headset: LuHeadset } as const;

export function Cta() {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const [source, setSource] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (!String(f.get("name") ?? "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !f.get("source")) return setStatus("error");
    // TODO: hubungkan ke backend / CRM / API route Anda di sini (data ada di `f`).
    setStatus("done");
    e.currentTarget.reset();
    setSource("");
  }

  const field = "h-[56px] w-full rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md px-5 text-[14px] text-white outline-none placeholder:text-white/80 focus:border-white/60";
  const label = "mb-2 block text-left text-[14px] font-bold";

  return (
    <section id="get-started" className="relative overflow-hidden py-20 text-white lg:py-[100px]" style={{ background: "var(--cta-bg)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-48 h-[480px] w-[480px] rounded-full bg-white/[.09]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-72 -left-20 h-[420px] w-[560px] rounded-full bg-black/[.06]" />

      <div className="relative mx-auto max-w-[780px] px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-white" /> Get Started
        </span>
        <h2 className="mt-9 text-[clamp(2.2rem,5vw,3.35rem)] font-light leading-[1.1] tracking-[-0.02em]">Ready to See the Bigger Picture?</h2>
        <p className="mt-6 text-[15px] text-white/85">Request your custom demo today and experience the power of social media intelligence.</p>

        <form onSubmit={onSubmit} noValidate className="mt-12 grid gap-5 sm:grid-cols-2">
          <div><label htmlFor="c-name" className={label}>Name</label><input id="c-name" name="name" autoComplete="name" placeholder="Enter your name" className={field} /></div>
          <div><label htmlFor="c-email" className={label}>Email</label><input id="c-email" name="email" type="email" autoComplete="email" placeholder="Enter your business email" aria-invalid={status === "error"} className={field} /></div>
          <div><label htmlFor="c-phone" className={label}>Phone Number</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+62 8226457986" className={field} /></div>
          <div><label htmlFor="c-company" className={label}>Company</label><input id="c-company" name="company" autoComplete="organization" placeholder="Company name" className={field} /></div>
          <div className="sm:col-span-2">
            <label htmlFor="c-source" className={label}>We’d love to know, how did you first discover our company ? *</label>
            <GlassSelect
              id="c-source"
              name="source"
              value={source}
              onChange={setSource}
              placeholder="Select an options"
              options={["Google / Search", "Social media", "Referral", "Event", "Other"].map((o) => ({ value: o, label: o }))}
              buttonClassName={field + " items-center"}
              menuClassName="!text-navy-ink"
            />
          </div>
          <div className="sm:col-span-2"><label htmlFor="c-msg" className={label}>Message</label><textarea id="c-msg" name="message" rows={6} className={field + " h-auto py-4"} /></div>
          <button type="submit" className="h-[56px] rounded-2xl bg-[#B0281B] text-[15px] font-medium text-white transition hover:brightness-110 sm:col-span-2">Request Demo</button>
        </form>
        <p role="status" className="mt-3 min-h-[20px] text-[13px] text-white/90">
          {status === "error" && "Please fill in your name, a valid email, and how you found us."}
          {status === "done" && "Thanks! We'll be in touch shortly."}
        </p>

        <ul className="mx-auto mt-10 grid max-w-[780px] gap-6 text-left sm:grid-cols-3">
          {ctaPerks.map((p) => {
            const Icon = perkIcon[p.icon];
            return (
              <li key={p.title} className="flex items-center gap-3 sm:justify-center">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Icon size={18} /></span>
                <div>
                  <div className="text-[13px] font-bold">{p.title}</div>
                  <div className="text-[11px] text-white/80">{p.desc}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { label: "LinkedIn", icon: FaLinkedin, href: "#" },
    { label: "Facebook", icon: FaFacebook, href: "#" },
    { label: "Instagram", icon: FaInstagram, href: "#" },
    { label: "YouTube", icon: FaYoutube, href: "#" },
  ];
  return (
    <footer className="bg-white dark:bg-page">
      <div className="mx-auto max-w-page px-4 pt-12 sm:px-6 lg:px-0">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo />
          <div className="flex items-center gap-5 text-[#1f2430] dark:text-white">
            {social.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} aria-label={label} className="transition hover:text-brand"><Icon size={22} /></a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[#EEF0F4] py-6 text-[11.5px] text-[#7a8798] dark:border-white/10 dark:text-white/50 sm:flex-row">
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand">Terms of Service</a>
            <a href="#" className="hover:text-brand">Privacy Policy</a>
          </div>
          <p>Copyright © {year} Socindex. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
