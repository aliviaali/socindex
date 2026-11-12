import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("flex items-center gap-3", className)} aria-label="Socindex home">
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden>
        <path d="M9 2h14a7 7 0 0 1 7 7v14a7 7 0 0 1-7 7H9a7 7 0 0 1-7-7V9a7 7 0 0 1 7-7z" fill="#F15235" />
        <path d="M8 21l5-6 4 3 7-8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[19px] font-normal tracking-tight text-ink">Socindex</span>
    </a>
  );
}

/** Label kecil berbentuk pill (mis. "FEATURES & BENEFITS"). */
export function Pill({
  children,
  className,
  dot,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#FFEEE6] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand dark:bg-[#3A211F]",
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
      {children}
    </span>
  );
}
