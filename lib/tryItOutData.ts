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
  sentiment: { dominant: keyof Sentiment; pct: Sentiment; counts: Sentiment };
  totalPosts: number;
  sources: { name: "Tiktok" | "Instagram" | "Threads" | "Youtube" | "Twitter"; total: number; pct: Sentiment; counts: Sentiment }[];
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

type RawTopic = Omit<TopicData, "sentiment" | "totalPosts" | "sources"> & {
  sources: { name: TopicData["sources"][number]["name"]; counts: Sentiment }[];
};
// Synthetic counts for demonstration; these are not observations from the real platforms.
const rawData: Record<string, RawTopic> = {
  ihsg: {
    id: "ihsg", label: "IHSG Terkena Trading Halt",
    metrics: [
      { label: "ENGAGEMENT", hint: "Total comments, likes, shares, and views", value: "35.3M", series: [5, 9, 6, 7, 6, 8], color: "#3B82F6" },
      { label: "TALK", hint: "Total posts and comments", value: "12.2K", series: [8, 5, 6, 5, 6, 7], color: "#F59E0B" },
      { label: "APPLAUSE", hint: "Total likes", value: "4.4M", series: [9, 6, 6, 5, 6, 7], color: "#EF4444" },
      { label: "AUDIENCE", hint: "People reached", value: "106.9M", series: [5, 7, 6, 8, 6, 7], color: "#22C55E" },
    ],
    sources: [
      { name: "Tiktok", counts: { positive: 471, neutral: 2918, negative: 847 } },
      { name: "Instagram", counts: { positive: 770, neutral: 2353, negative: 684 } },
      { name: "Threads", counts: { positive: 295, neutral: 1215, negative: 479 } },
      { name: "Youtube", counts: { positive: 239, neutral: 575, negative: 192 } },
      { name: "Twitter", counts: { positive: 96, neutral: 575, negative: 287 } },
    ],
    words: cloud([["ihsg", 34], ["saham", 30], ["bursa", 28], ["investor", 26], ["trading", 24], ["halt", 24], ["pasar", 22], ["indeks", 22], ["ekonomi", 20], ["transaksi", 20]]),
  },
  bbm: {
    id: "bbm", label: "Kenaikan Harga BBM",
    metrics: [
      { label: "ENGAGEMENT", hint: "Total comments, likes, shares, and views", value: "52.8M", series: [4, 6, 8, 9, 8, 9], color: "#3B82F6" },
      { label: "TALK", hint: "Total posts and comments", value: "28.6K", series: [5, 7, 8, 9, 8, 8], color: "#F59E0B" },
      { label: "APPLAUSE", hint: "Total likes", value: "6.1M", series: [6, 6, 7, 7, 6, 6], color: "#EF4444" },
      { label: "AUDIENCE", hint: "People reached", value: "142.3M", series: [5, 6, 7, 8, 8, 9], color: "#22C55E" },
    ],
    sources: [
      { name: "Twitter", counts: { positive: 644, neutral: 2575, negative: 5901 } },
      { name: "Tiktok", counts: { positive: 1084, neutral: 2711, negative: 3615 } },
      { name: "Instagram", counts: { positive: 752, neutral: 2634, negative: 2634 } },
      { name: "Threads", counts: { positive: 386, neutral: 1545, negative: 1449 } },
      { name: "Youtube", counts: { positive: 288, neutral: 1153, negative: 1269 } },
    ],
    words: cloud([["bbm", 34], ["harga", 30], ["naik", 30], ["pertalite", 26], ["subsidi", 26], ["rakyat", 24], ["demo", 22], ["ojol", 22], ["inflasi", 20], ["pemerintah", 24], ["mahasiswa", 20], ["transportasi", 20], ["ekonomi", 22], ["antre", 18], ["spbu", 18], ["tarif", 18]]),
  },
  greenpeace: {
    id: "greenpeace", label: "Aksi Greenpeace di Monumen",
    metrics: [
      { label: "ENGAGEMENT", hint: "Total comments, likes, shares, and views", value: "18.4M", series: [3, 5, 7, 6, 8, 7], color: "#3B82F6" },
      { label: "TALK", hint: "Total posts and comments", value: "7.9K", series: [4, 6, 5, 7, 6, 7], color: "#F59E0B" },
      { label: "APPLAUSE", hint: "Total likes", value: "2.7M", series: [5, 6, 6, 7, 6, 8], color: "#EF4444" },
      { label: "AUDIENCE", hint: "People reached", value: "64.2M", series: [4, 5, 7, 6, 8, 8], color: "#22C55E" },
    ],
    sources: [
      { name: "Instagram", counts: { positive: 1192, neutral: 1590, negative: 318 } },
      { name: "Twitter", counts: { positive: 846, neutral: 1015, negative: 339 } },
      { name: "Tiktok", counts: { positive: 556, neutral: 694, negative: 250 } },
      { name: "Threads", counts: { positive: 212, neutral: 382, negative: 106 } },
      { name: "Youtube", counts: { positive: 130, neutral: 217, negative: 65 } },
    ],
    words: cloud([["greenpeace", 34], ["aktivis", 28], ["iklim", 28], ["monumen", 26], ["spanduk", 24], ["lingkungan", 24], ["aksi", 22], ["jakarta", 22], ["krisis", 20], ["polisi", 18], ["warga", 18], ["hukum", 18]]),
  },
};

const keys = ["positive", "neutral", "negative"] as const;

export function percentages(counts: Sentiment): Sentiment {
  const total = counts.positive + counts.neutral + counts.negative;
  if (!total) return { positive: 0, neutral: 0, negative: 0 };
  // Largest-remainder rounding: displayed percentages add up to exactly 100.0%.
  const units = keys.map(key => Math.floor(counts[key] / total * 1000));
  const order = keys.map((key, i) => ({ i, remainder: counts[key] / total * 1000 - units[i] }))
    .sort((a, b) => b.remainder - a.remainder);
  const remaining = 1000 - units.reduce((a, b) => a + b, 0);
  for (let i = 0; i < remaining; i++) units[order[i].i]++;
  return { positive: units[0] / 10, neutral: units[1] / 10, negative: units[2] / 10 };
}

function buildTopic(raw: RawTopic): TopicData {
  const counts: Sentiment = { positive: 0, neutral: 0, negative: 0 };
  const sources = raw.sources.map(source => {
    for (const key of keys) counts[key] += source.counts[key];
    return { ...source, total: source.counts.positive + source.counts.neutral + source.counts.negative, pct: percentages(source.counts) };
  });
  const totalPosts = sources.reduce((sum, source) => sum + source.total, 0);
  const dominant = keys.reduce((best, key) => counts[key] > counts[best] ? key : best);
  return {
    ...raw, sources, totalPosts,
    metrics: raw.metrics.map(metric => metric.label === "TALK" ? {
      ...metric, value: new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(totalPosts),
    } : metric),
    sentiment: { dominant, counts, pct: percentages(counts) },
  };
}

const data = Object.fromEntries(Object.entries(rawData).map(([id, raw]) => [id, buildTopic(raw)]));

export async function getTopicData(id: string, signal?: AbortSignal): Promise<TopicData> {
  if (!Object.prototype.hasOwnProperty.call(data, id)) throw new Error("Unknown topic");
  await new Promise<void>((resolve, reject) => {
    if (signal?.aborted) { reject(new DOMException("Aborted", "AbortError")); return; }
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      reject(new DOMException("Aborted", "AbortError"));
    };
    const timer = setTimeout(() => { signal?.removeEventListener("abort", abort); resolve(); }, 150);
    signal?.addEventListener("abort", abort, { once: true });
  });
  return data[id];
}

export const defaultTopicData = data.ihsg;
