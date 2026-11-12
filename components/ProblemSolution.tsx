import { LuArrowRight, LuCheck, LuDatabase, LuEye, LuLayoutGrid, LuSearch, LuSparkles } from "react-icons/lu";
import { Pill } from "@/components/ui";
import { problemPoints, solutionPoints } from "@/lib/content";

/** Ikon tiap poin masalah (urutan sama dengan `problemPoints` di lib/content.ts) */
const problemIcons = [LuSearch, LuDatabase, LuEye];

export function ProblemSolution() {
  return (
    <section id="why-us" className="overflow-x-clip bg-page py-16 lg:py-[72px]">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
        <div className="relative">
            {/* Light: subjudul di bawah judul. Dark: subjudul di kanan (sesuai desain) */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div>
                <Pill>The Problem &amp; Solution</Pill>
                <h2 className="mt-5 max-w-[640px] text-[clamp(1.9rem,3.5vw,2.6rem)] font-light leading-[1.12] tracking-[-0.02em] text-navy-ink dark:text-white">
                  From Scattered Data to Clear Insights
                </h2>
              </div>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#7a8798] dark:text-white/45 lg:mt-12 lg:max-w-[330px] lg:text-[13px]">
                A single intelligence layer transforms fragmented conversations into a clear, live view of reputation and performance.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-[28px] lg:grid-cols-[1fr_103px_1fr]">
              {/* PROBLEM */}
              <div className="bg-navy p-6 text-white dark:bg-[#132E3E] sm:p-8 lg:min-h-[430px]">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white/10 text-brand"><LuLayoutGrid size={20} /></span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-brand">Before Socindex</div>
                    <h3 className="text-[22px] font-semibold leading-tight">The Problem</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-5">
                  {problemPoints.map((p, i) => {
                    const Icon = problemIcons[i] ?? LuSearch;
                    return (
                      <li key={p} className="flex gap-4 text-[14.5px] leading-[1.5] text-white/85">
                        <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-white/10 text-brand"><Icon size={14} /></span>
                        {p}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8 flex items-center justify-between rounded-xl border border-white/10 bg-white/[.06] px-4 py-3.5 text-[12px] text-white/75">
                  Decision latency <b className="text-[15px] font-semibold text-brand">Days → weeks</b>
                </div>
              </div>

              {/* TRANSFORM */}
              <div className="flex items-center justify-center">
                <div className="flex w-full flex-row items-center justify-center gap-4 bg-brand py-5 dark:bg-[#B3281B] lg:h-[293px] lg:flex-col lg:py-0 lg:shadow-[0_20px_30px_-12px_rgba(0,0,0,.25)]">
                  <span className="text-[10px] font-bold uppercase tracking-[2px] text-white lg:[writing-mode:vertical-rl] lg:rotate-180">Transform</span>
                  <span className="grid h-[50px] w-[50px] place-items-center rounded-full bg-white/90 text-brand shadow-md dark:bg-white/30 dark:text-white"><LuArrowRight size={22} className="rotate-90 lg:rotate-0" /></span>
                  <i className="hidden h-[7px] w-[7px] rounded-full bg-white lg:block" />
                </div>
              </div>

              {/* SOLUTION (kaca) */}
              <div className="glass p-6 sm:p-8 lg:min-h-[430px] lg:rounded-r-[28px] lg:border-l-0">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#DFF5E7] text-[#12a150] dark:bg-[#12a150]/25"><LuSparkles size={20} /></span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-[#12a150]">With Socindex</div>
                    <h3 className="text-[22px] font-semibold leading-tight text-navy-ink dark:text-white">Our Solution</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-5">
                  {solutionPoints.map((p) => (
                    <li key={p} className="flex gap-4 text-[14.5px] leading-[1.5] text-[#6b7a8c] dark:text-white/80">
                      <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#DFF5E7] text-[#12a150] dark:bg-[#12a150]/25"><LuCheck size={13} strokeWidth={3} /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="glass-soft mt-8 flex items-center justify-between rounded-xl px-4 py-3.5 text-[12px] text-[#7a8798] dark:text-white/60">
                  Decision latency <b className="text-[15px] font-semibold text-[#12a150]">Real-time</b>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
