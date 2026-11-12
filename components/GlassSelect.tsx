"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { cn } from "@/lib/cn";

type Opt = { value: string; label: string };

/**
 * Dropdown kustom ber-glassmorphism (menggantikan <select> bawaan browser).
 * Mendukung keyboard (↑ ↓ Enter Esc), klik di luar untuk menutup, dan `name` untuk form (input hidden).
 */
export function GlassSelect({
  options, value, onChange, placeholder = "Select", name, id, ariaLabel, className, buttonClassName, menuClassName, prefix,
}: {
  options: readonly Opt[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  ariaLabel?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  prefix?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const uid = useId();
  const cur = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [open]);

  function toggle() {
    setHi(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen((v) => !v);
  }
  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return toggle();
      setHi((h) => (h + (e.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    } else if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      onChange(options[hi].value);
      setOpen(false);
    }
  }

  return (
    <div ref={root} className={cn("relative", className)} onKeyDown={onKey}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${uid}-list`}
        aria-label={ariaLabel}
        onClick={toggle}
        className={cn("flex w-full items-center gap-2 text-left", buttonClassName)}
      >
        {prefix}
        <span className={cn("min-w-0 flex-1 truncate", !cur && "opacity-70")}>{cur ? cur.label : placeholder}</span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black/5 dark:bg-white/10">
          <LuChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
        </span>
      </button>
      {open && (
        <ul
          id={`${uid}-list`}
          role="listbox"
          className={cn("glass-strong absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-64 animate-fadeUp overflow-auto rounded-2xl p-1.5 text-[14px] text-navy-ink dark:text-white", menuClassName)}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setHi(i)}
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={cn(
                "cursor-pointer rounded-xl px-4 py-2.5 transition-colors",
                i === hi && "bg-brand/10 dark:bg-white/10",
                o.value === value && "font-semibold text-brand",
              )}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
