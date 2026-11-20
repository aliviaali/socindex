"use client";

import { useRef, useState } from "react";
import { FaInstagram, FaThreads, FaTiktok } from "react-icons/fa6";
import { LuCreditCard, LuHeadset, LuZap } from "react-icons/lu";
import { GlassSelect } from "@/components/GlassSelect";
import { Logo } from "@/components/ui";
import { ctaPerks } from "@/lib/content";
import { useLang } from "@/lib/i18n";

import { demoLimits, demoSources, validateDemo } from "@/lib/demoValidation";
import { privacyUrl, termsUrl } from "@/lib/siteLinks";

const perkIcon = { zap: LuZap, card: LuCreditCard, headset: LuHeadset } as const;

export function Cta() {
  const { t, lang } = useLang();
  const text = (en: string, id: string) => lang === "id" ? id : en;
  const errorText = (message: string) => lang === "id" ? ({
    "This field is required.": "Kolom ini wajib diisi.",
    "Invalid value.": "Nilai tidak valid.",
    "This value is too long.": "Isian terlalu panjang.",
    "Please enter a valid email address.": "Masukkan alamat email yang valid.",
    "Please enter a valid phone number.": "Masukkan nomor telepon yang valid.",
    "Please select how you found us.": "Pilih bagaimana Anda mengenal kami.",
  } as Record<string, string>)[message] ?? message : message;
  const sending = useRef(false);
  const attempt = useRef<{ payload: string; key: string } | null>(null);
  const [submitError, setSubmitError] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [source, setSource] = useState("");
  // pesan error per kolom: { name: "...", email: "..." } (disimpan dalam bahasa Inggris, diterjemahkan saat tampil)
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (k: string) =>
    setErrors((p) => {
      if (!p[k]) return p;
      const n = { ...p };
      delete n[k];
      return n;
    });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const form = e.currentTarget;
    const { data, errors: next } = validateDemo(Object.fromEntries(new FormData(form)));
    setErrors(next);
    setSubmitError(false);
    setStatus("idle");
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    sending.current = true;
    setStatus("submitting");
    try {
      const payload = JSON.stringify(data);
      if (attempt.current?.payload !== payload) {
        attempt.current = { payload, key: crypto.randomUUID() };
      }
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": attempt.current.key },
        body: payload,
        signal: AbortSignal.timeout(15_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Request not accepted");
      form.reset();
      setSource("");
      setErrors({});
      attempt.current = null;
      setStatus("done");
    } catch {
      setStatus("idle");
      setSubmitError(true);
    } finally {
      sending.current = false;
    }
  }

  const invalid = " !border-white ring-2 ring-white/60";
  const fieldCls = (k: string) => field + (errors[k] ? invalid : "");
  const aria = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `err-${k}` : undefined });
  const err = (k: string) =>
    errors[k] ? (
      <p id={`err-${k}`} role="alert" className="mt-1.5 text-left text-[12.5px] font-semibold text-white">
        {errorText(errors[k])}
      </p>
    ) : null;

  const field ="h-[56px] w-full rounded-2xl border border-white/30 bg-white/15 backdrop-blur-[3px] px-5 text-[14px] text-white outline-none placeholder:text-white/80 focus:border-white/60";
  const label = "mb-2 block text-left text-[14px] font-bold";

  return (
    <section id="get-started" className="relative overflow-hidden py-20 text-white lg:py-[100px]" style={{ background: "var(--cta-bg)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-48 h-[480px] w-[480px] rounded-full bg-white/[.09]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-72 -left-20 h-[420px] w-[560px] rounded-full bg-black/[.06]" />

      <div className="relative mx-auto max-w-[780px] px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-white" /> {t("Get Started")}
        </span>
        <h2 className="mt-9 text-[clamp(2.2rem,5vw,3.35rem)] font-bold leading-[1.1] tracking-[-0.02em]">{t("Ready to See the Bigger Picture?")}</h2>
        <p className="mt-6 text-[15px] text-white/85 font-normal">{t("Request your custom demo today and experience the power of social media intelligence.")}</p>

        <form
          onSubmit={onSubmit}
          onChange={(e) => { if (!sending.current) { setStatus("idle"); setSubmitError(false); } const n = (e.target as unknown as { name?: string }).name; if (n) clearError(n); }} /* error kolom hilang saat user mulai mengetik */
          noValidate
          aria-busy={status === "submitting"}
          className="mt-12"
        >
          <fieldset disabled={status === "submitting"} className="grid min-w-0 gap-5 sm:grid-cols-2">
          <div><label htmlFor="c-name" className={label}>{t("Name")} *</label><input id="c-name" name="name" required maxLength={demoLimits.name} autoComplete="name" placeholder={t("Enter your name")} {...aria("name")} className={fieldCls("name")} />{err("name")}</div>
          <div><label htmlFor="c-email" className={label}>{t("Email")} *</label><input id="c-email" name="email" required maxLength={demoLimits.email} type="email" autoComplete="email" placeholder={t("Enter your business email")} {...aria("email")} className={fieldCls("email")} />{err("email")}</div>
          <div><label htmlFor="c-phone" className={label}>{t("Phone Number")} *</label><input id="c-phone" name="phone" required maxLength={demoLimits.phone} type="tel" autoComplete="tel" placeholder="+62 8226457986" {...aria("phone")} className={fieldCls("phone")} />{err("phone")}</div>
          <div><label htmlFor="c-company" className={label}>{t("Company")} *</label><input id="c-company" name="company" required maxLength={demoLimits.company} autoComplete="organization" placeholder={t("Company name")} {...aria("company")} className={fieldCls("company")} />{err("company")}</div>
          <div className="sm:col-span-2">
            <label htmlFor="c-source" className={label}>{t("We’d love to know, how did you first discover our company ? *")}</label>
            <GlassSelect
              id="c-source"
              name="source"
              required
              {...aria("source")}
              value={source}
              onChange={(v) => { setSource(v); clearError("source"); setStatus("idle"); setSubmitError(false); }}
              placeholder={t("Select an option")}
              options={demoSources.map((o) => ({ value: o, label: t(o) }))}
              buttonClassName={fieldCls("source") + " items-center"}
              menuClassName="text-left"
            />
            {err("source")}
          </div>
          <div className="sm:col-span-2"><label htmlFor="c-msg" className={label}>{t("Message")}</label><textarea id="c-msg" name="message" maxLength={demoLimits.message} rows={6} className={field + " h-auto py-4"} /></div>
          <button type="submit" className="h-[56px] rounded-2xl border border-white/20 bg-[#8F2419] text-[15px] font-semibold text-white shadow-lg transition hover:bg-[#751B12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white dark:border-white/70 dark:bg-white dark:text-[#8F2419] dark:hover:bg-orange-50 sm:col-span-2">{status === "submitting" ? text("Sending…", "Mengirim…") : t("Request Demo")}</button>
          </fieldset>
        </form>
        {submitError && <p role="alert" className="mt-3 text-sm font-semibold">{text("We could not confirm your request. Your entries are kept; please try again.", "Permintaan belum dapat dikonfirmasi. Isian Anda tetap tersimpan di formulir; silakan coba lagi.")}</p>}
        <p role="status" className="mt-3 min-h-[20px] text-[13px] text-white/90">
          {status === "done" && t("Thanks! We'll be in touch shortly.")}
        </p>

        <ul className="mx-auto mt-10 grid max-w-[780px] gap-6 text-left sm:grid-cols-3">
          {ctaPerks.map((p) => {
            const Icon = perkIcon[p.icon];
            return (
              <li key={p.title} className="flex items-center gap-3 sm:justify-center">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Icon size={18} /></span>
                <div>
                  <div className="text-[13px] font-bold">{t(p.title)}</div>
                  <div className="text-[11px] text-white/80">{t(p.desc)}</div>
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
  const { t } = useLang();
  const year = new Date().getFullYear();
  const social = [
    { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/socindex.id" },
    { label: "Threads", icon: FaThreads, href: "https://www.threads.com/@socindex.id" },
    { label: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@socindex.net" },
  ];
  return (
    <footer className="bg-white dark:bg-page">
      <div className="mx-auto max-w-page px-4 pt-12 sm:px-6 lg:px-0">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo />
          <div className="flex items-center gap-5 text-[#1f2430] dark:text-white">
            {social.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition hover:text-brand"><Icon size={22} /></a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[#EEF0F4] py-6 text-[11.5px] text-[#7a8798] dark:border-white/10 dark:text-white/50 sm:flex-row">
          <div className="flex gap-5">
            {termsUrl && <a href={termsUrl} className="hover:text-brand">{t("Terms of Service")}</a>}
            {privacyUrl && <a href={privacyUrl} className="hover:text-brand">{t("Privacy Policy")}</a>}
          </div>
          <p>Copyright © {year} Socindex. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
