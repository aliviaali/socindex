// Original Indonesian demo keywords; names and brands stay unchanged.
const english: Record<string, string> = {
  jam: "hour", kawasan: "area", ruang: "space", warga: "residents",
  hukum: "law", kondisi: "conditions", aktivis: "activists",
  membentangkan: "unfurling", monumen: "monument", bundaran: "roundabout",
  aksi: "action", spanduk: "banner", krisis: "crisis", iklim: "climate",
  masyarakat: "community", pemerintah: "government", selamat: "safe",
  patung: "statue", biaya: "cost", hidup: "living", lingkungan: "environment",
  polisi: "police", bbm: "fuel", harga: "price", naik: "rising",
  subsidi: "subsidy", rakyat: "people", demo: "protest", ojol: "ride-hailing",
  inflasi: "inflation", mahasiswa: "students", transportasi: "transport",
  ekonomi: "economy", antre: "queue", spbu: "gas station", tarif: "fare",
};

export function localizeCloudWord(word: string, lang: "id" | "en") {
  return lang === "en" ? english[word] ?? word : word;
}
