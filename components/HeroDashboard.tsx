import Image from "next/image";

/**
 * Seluruh mockup dashboard (kartu statistik, grafik, donut, Influencer Insight,
 * All Platform, AI Summary) sudah ada di dalam GIF animasi — jadi di sini hanya
 * menampilkan GIF-nya saja, tanpa elemen tambahan di atasnya.
 */
export function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[701px] overflow-hidden rounded-[44px]" style={{ aspectRatio: "900 / 755" }}>
      <Image
        src="/motion/converted.gif"
        alt="Socindex brand intelligence dashboard: mentions, engagement, sentiment, influencer insight and AI summary"
        fill
        unoptimized
        priority
        sizes="(max-width: 1024px) 100vw, 701px"
        className="object-contain dark:hidden"
      />
      <Image
        src="/motion/converted (1).gif"
        alt=""
        aria-hidden
        fill
        unoptimized
        priority
        sizes="(max-width: 1024px) 100vw, 701px"
        className="hidden object-contain dark:block"
      />
    </div>
  );
}
