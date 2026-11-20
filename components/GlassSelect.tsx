"use client";
import { useId, type ReactNode } from "react";
import { LuChevronDown } from "react-icons/lu";
import { cn } from "@/lib/cn";
type Props = {
  options: readonly { value: string; label: string }[];
  value: string; onChange: (value: string) => void;
  placeholder?: string; name?: string; id?: string; ariaLabel?: string;
  className?: string; buttonClassName?: string; menuClassName?: string;
  prefix?: ReactNode; disabled?: boolean; required?: boolean;
  "aria-invalid"?: boolean; "aria-describedby"?: string;
};
export function GlassSelect({ options, value, onChange, placeholder = "Select", name, id, ariaLabel, className, buttonClassName, prefix, disabled, required, "aria-invalid": invalid, "aria-describedby": describedBy }: Props) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <div className={cn("relative", className)}>
      {prefix && <label htmlFor={selectId} className="mb-1 block text-sm">{prefix}</label>}
      <div className="relative">
        <select id={selectId} name={name} value={value} onChange={event => onChange(event.target.value)}
          aria-label={ariaLabel} aria-invalid={invalid} aria-describedby={describedBy}
          disabled={disabled || options.length === 0} required={required}
          className={cn("block w-full appearance-none cursor-pointer !pr-10 text-left focus-visible:ring-2 focus-visible:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-60", buttonClassName)}>
          <option value="" disabled className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">{placeholder}</option>
          {options.map(option => <option key={option.value} value={option.value} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">{option.label}</option>)}
        </select>
        <LuChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
    </div>
  );
}
