import { cn } from "@/lib/cn";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("flex items-center gap-3", className)} aria-label="Socindex home">
      <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0 object-contain" />
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
