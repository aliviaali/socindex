/**
 * TRY IT OUT — DATA DUMMY
 * ---------------------------------------------------------------
 * (apply api) Semua data di file ini adalah DUMMY sementara.
 * Nanti diganti dengan data dari API dashboard Socindex:
 *   - `topics`            -> (apply api) GET /topics            (daftar topik untuk dropdown)
 *   - `getTopicData(id)`  -> (apply api) GET /topics/:id/summary (metrik, sentimen, sumber data, word cloud)
 * Bentuk (type) data di bawah bisa dipakai sebagai kontrak response API.
 */

export type Sentiment = { positive: number; neutral: number; negative: number };
export type TopicData = {
  id: string;
  label: string;
  metrics: { label: string; hint: string; value: string; series: number[]; color: string }[];
  sentiment: { dominant: string; pct: Sentiment; counts: { positive: string; neutral: string; negative: string } };
  totalPosts: string;
  sources: { name: "Tiktok" | "Instagram" | "Threads" | "Youtube" | "Twitter"; total: number; pct: Sentiment }[];
  words: { text: string; size: number; color: string }[];
};

const palette = ["#E89B1B", "#0E81C2", "#1A1F2B", "#C4472B", "#12A150", "#B3661B", "#D63A2F"];
const cloud = (list: [string, number][]) => list.map(([text, size], i) => ({ text, size, color: palette[i % palette.length] }));

// (apply api) dropdown topik — ganti dengan response API
export const topics = [
  { id: "ihsg", label: "IHSG Terkena Trading Halt" },
  { id: "bbm", label: "Kenaikan Harga BBM" },
  { id: "greenpeace", label: "Aksi Greenpeace di Monumen" },
] as const;

const data: Record<string, TopicData> = {
  ihsg: {
    id: "ihsg", label: "IHSG Terkena Trading Halt",
    metrics: [
      { label: "ENGAGEMENT", hint: "Total comments, like, shares, views", value: "35.3M", series: [5, 9, 6, 7, 6, 8], color: "#3B82F6" },
      { label: "TALK", hint: "Total posts and comments", value: "12.2K", series: [8, 5, 6, 5, 6, 7], color: "#F59E0B" },
      { label: "APPLAUSE", hint: "Total likes", value: "4.4M", series: [9, 6, 6, 5, 6, 7], color: "#EF4444" },
      { label: "AUDIENCE", hint: "People reached", value: "106.9M", series: [5, 7, 6, 8, 6, 7], color: "#22C55E" },
    ],
    sentiment: { dominant: "neutral", pct: { positive: 15, neutral: 65, negative: 20 }, counts: { positive: "900K", neutral: "900K", negative: "300K" } },
    totalPosts: "12,240",
    sources: [
      { name: "Tiktok", total: 4236, pct: { positive: 10, neutral: 62, negative: 18 } },
      { name: "Instagram", total: 3807, pct: { positive: 18, neutral: 55, negative: 16 } },
      { name: "Threads", total: 1989, pct: { positive: 8, neutral: 33, negative: 13 } },
      { name: "Youtube", total: 1006, pct: { positive: 5, neutral: 12, negative: 4 } },
      { name: "Twitter", total: 958, pct: { positive: 2, neutral: 12, negative: 6 } },
    ],
    words: cloud([["greenpeaceindonesia", 18], ["jam", 18], ["kawasan", 18], ["ruang", 18], ["warga", 18], ["hukum", 18], ["prabowo", 18], ["kondisi", 18], ["hi", 28], ["aktivis", 28], ["indonesia", 32], ["membentangkan", 32], ["monumen", 32], ["bundaran", 28], ["greenpeace", 30], ["aksi", 24], ["spanduk", 28], ["jakarta", 26], ["krisis", 22], ["iklim", 20], ["masyarakat", 22], ["pemerintah", 24], ["selamat", 18], ["patung", 20], ["biaya", 20], ["hidup", 20], ["lingkungan", 18], ["polisi", 18]]),
  },
  bbm: {
    id: "bbm", label: "Kenaikan Harga BBM",
    metrics: [
      { label: "ENGAGEMENT", hint: "Total comments, like, shares, views", value: "52.8M", series: [4, 6, 8, 9, 8, 9], color: "#3B82F6" },
      { label: "TALK", hint: "Total posts and comments", value: "28.6K", series: [5, 7, 8, 9, 8, 8], color: "#F59E0B" },
      { label: "APPLAUSE", hint: "Total likes", value: "6.1M", series: [6, 6, 7, 7, 6, 6], color: "#EF4444" },
      { label: "AUDIENCE", hint: "People reached", value: "142.3M", series: [5, 6, 7, 8, 8, 9], color: "#22C55E" },
    ],
    sentiment: { dominant: "negative", pct: { positive: 12, neutral: 38, negative: 50 }, counts: { positive: "1.1M", neutral: "3.4M", negative: "4.6M" } },
    totalPosts: "28,640",
    sources: [
      { name: "Twitter", total: 9120, pct: { positive: 6, neutral: 24, negative: 55 } },
      { name: "Tiktok", total: 7410, pct: { positive: 12, neutral: 30, negative: 40 } },
      { name: "Instagram", total: 6020, pct: { positive: 10, neutral: 35, negative: 35 } },
      { name: "Threads", total: 3380, pct: { positive: 8, neutral: 32, negative: 30 } },
      { name: "Youtube", total: 2710, pct: { positive: 5, neutral: 20, negative: 22 } },
    ],
    words: cloud([["bbm", 34], ["harga", 30], ["naik", 30], ["pertalite", 26], ["subsidi", 26], ["rakyat", 24], ["demo", 22], ["ojol", 22], ["inflasi", 20], ["pemerintah", 24], ["mahasiswa", 20], ["transportasi", 20], ["ekonomi", 22], ["antre", 18], ["spbu", 18], ["tarif", 18]]),
  },
  greenpeace: {
    id: "greenpeace", label: "Aksi Greenpeace di Monumen",
    metrics: [
      { label: "ENGAGEMENT", hint: "Total comments, like, shares, views", value: "18.4M", series: [3, 5, 7, 6, 8, 7], color: "#3B82F6" },
      { label: "TALK", hint: "Total posts and comments", value: "7.9K", series: [4, 6, 5, 7, 6, 7], color: "#F59E0B" },
      { label: "APPLAUSE", hint: "Total likes", value: "2.7M", series: [5, 6, 6, 7, 6, 8], color: "#EF4444" },
      { label: "AUDIENCE", hint: "People reached", value: "64.2M", series: [4, 5, 7, 6, 8, 8], color: "#22C55E" },
    ],
    sentiment: { dominant: "positive", pct: { positive: 48, neutral: 40, negative: 12 }, counts: { positive: "1.3M", neutral: "1.1M", negative: "320K" } },
    totalPosts: "7,912",
    sources: [
      { name: "Instagram", total: 3100, pct: { positive: 30, neutral: 40, negative: 8 } },
      { name: "Twitter", total: 2200, pct: { positive: 25, neutral: 30, negative: 10 } },
      { name: "Tiktok", total: 1500, pct: { positive: 20, neutral: 25, negative: 9 } },
      { name: "Threads", total: 700, pct: { positive: 10, neutral: 18, negative: 5 } },
      { name: "Youtube", total: 412, pct: { positive: 6, neutral: 10, negative: 3 } },
    ],
    words: cloud([["greenpeace", 34], ["aktivis", 28], ["iklim", 28], ["monumen", 26], ["spanduk", 24], ["lingkungan", 24], ["aksi", 22], ["jakarta", 22], ["krisis", 20], ["polisi", 18], ["warga", 18], ["hukum", 18]]),
  },
};

/**
 * (apply api) Ganti isi fungsi ini dengan fetch ke API dashboard, mis.:
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}/summary`);
 *   return (await res.json()) as TopicData;
 * Saat ini mengembalikan data dummy dengan jeda kecil agar UI siap untuk loading state.
 */
export async function getTopicData(id: string): Promise<TopicData> {
  await new Promise((r) => setTimeout(r, 150));
  return data[id] ?? data.ihsg;
}

export const defaultTopicData = data.ihsg;
