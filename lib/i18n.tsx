"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "id";
export const languages: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
];

/**
 * KAMUS TERJEMAHAN.  Kunci = teks bahasa Inggris persis seperti di kode, nilai = bahasa Indonesia.
 * Teks yang tidak ada di sini otomatis tampil dalam bahasa Inggris.
 * Untuk menambah bahasa baru: tambahkan di `languages`, buat kamus baru (mis. `ms`), lalu daftarkan di `dictionaries`.
 */
const id: Record<string, string> = {
  // Navbar
  "Home": "Beranda", "Why Us": "Mengapa Kami", "Features": "Fitur", "About Us": "Tentang Kami", "FAQ": "FAQ",
  "Login": "Masuk", "Light": "Terang", "Dark": "Gelap", "Language": "Bahasa",
  // Hero
  "Social Media Analytics": "Analitik Media Sosial",
  "Turn Social Media Data": "Ubah Data Media Sosial",
  "Into Actionable Insights": "Menjadi Wawasan Siap Aksi",
  "Monitor your brand reputation, analyze social media performance, and uncover meaningful insights with Socindex’s AI-powered analytics platform.":
    "Pantau reputasi merek Anda, analisis kinerja media sosial, dan temukan wawasan bermakna dengan platform analitik berbasis AI dari Socindex.",
  "Start Free Trial": "Mulai Uji Coba Gratis", "See how it works": "Lihat cara kerjanya",
  "Trusted by 500+ media professionals": "Dipercaya 500+ profesional media", "in Indonesia": "di Indonesia",
  // Problem & Solution
  "The Problem & Solution": "Masalah & Solusi",
  "From Scattered Data to Clear Insights": "Dari Data yang Tersebar Menjadi Wawasan yang Jelas",
  "A single intelligence layer transforms fragmented conversations into a clear, live view of reputation and performance.":
    "Satu lapisan intelijen mengubah percakapan yang terfragmentasi menjadi gambaran reputasi dan kinerja yang jelas dan real-time.",
  "Before Socindex": "Sebelum Socindex", "The Problem": "Masalahnya", "With Socindex": "Bersama Socindex", "Our Solution": "Solusi Kami",
  "Decision latency": "Keterlambatan keputusan", "Days → weeks": "Hari → minggu", "Real-time": "Tepat Waktu", "Transform": "Transformasi",
  "Data from multiple social media platforms is scattered and hard to analyze.": "Data dari berbagai platform media sosial tersebar dan sulit dianalisis.",
  "Manual processing takes a lot of time and is prone to human error.": "Pemrosesan manual memakan banyak waktu dan rawan kesalahan manusia.",
  "It's difficult to monitor brand reputation and public sentiment in real-time.": "Sulit memantau reputasi merek dan sentimen publik secara real-time.",
  "Socindex collects and processes social media data in one place.": "Socindex mengumpulkan dan memproses data media sosial di satu tempat.",
  "Using advanced AI and machine learning to analyze sentiment and trends. Powered by Natural Language Processing, AI Sentiment Labeling, and Analytic Processing, it transforms every sentence into accurate business insights.":
    "Menggunakan AI dan machine learning canggih untuk menganalisis sentimen dan tren. Didukung Natural Language Processing, AI Sentiment Labeling, dan Analytic Processing, setiap kalimat diubah menjadi wawasan bisnis yang akurat.",
  "Provides easy-to-understand dashboards for faster, smarter decisions.": "Menyediakan dasbor yang mudah dipahami untuk keputusan yang lebih cepat dan cerdas.",
  // Features
  "Features & Benefits": "Fitur & Manfaat",
  "Powerful Features for Smarter Decisions": "Fitur Andal untuk Keputusan yang Lebih Cerdas",
  "Everything you need to monitor, analyze, and understand your social media presence all in one dashboard.":
    "Semua yang Anda butuhkan untuk memantau, menganalisis, dan memahami kehadiran media sosial Anda dalam satu dasbor.",
  "Real-time Monitoring": "Pemantauan Real-time",
  "Monitor mentions, trends, and conversations in real time. Get accurate data updates from multiple social platforms. Make quick business decisions based on public opinion dynamics.":
    "Pantau sebutan, tren, dan percakapan secara real-time. Dapatkan pembaruan data akurat dari berbagai platform sosial. Ambil keputusan bisnis cepat berdasarkan dinamika opini publik.",
  "AI Tool, Human Quality": "Alat AI, Kualitas Manusia",
  "Combine the speed of artificial intelligence analysis with expert verification. Maintain data accuracy rates of up to 98 percent. Generate reliable, in-depth insights for corporate strategy.":
    "Gabungkan kecepatan analisis kecerdasan buatan dengan verifikasi pakar. Jaga akurasi data hingga 98 persen. Hasilkan wawasan mendalam yang andal untuk strategi perusahaan.",
  "Comprehensive Analytics": "Analitik Komprehensif",
  "Access comprehensive analytics reports, data visualizations, and executive summaries. Provide in depth metrics to support your team's strategic direction. Accelerate data-driven decision-making.":
    "Akses laporan analitik lengkap, visualisasi data, dan ringkasan eksekutif. Sajikan metrik mendalam untuk mendukung arah strategis tim Anda. Percepat pengambilan keputusan berbasis data.",
  "Social Network Analysis Mapping": "Pemetaan Analisis Jaringan Sosial",
  "Consolidate data streams from multiple social media platforms and online sources. Manage all digital monitoring in a single, integrated workspace. Eliminate data silos for organizational operational efficiency.":
    "Gabungkan aliran data dari banyak platform media sosial dan sumber daring. Kelola seluruh pemantauan digital dalam satu ruang kerja terpadu. Hilangkan silo data demi efisiensi operasional organisasi.",
  "Customizable Reports": "Laporan yang Dapat Disesuaikan",
  "Focus on key metrics that align with your company's business objectives. Flexibly customize report formats to meet the needs of your team and stakeholders. Present crucial data professionally and accurately.":
    "Fokus pada metrik utama yang selaras dengan tujuan bisnis perusahaan Anda. Sesuaikan format laporan secara fleksibel untuk kebutuhan tim dan pemangku kepentingan. Sajikan data penting secara profesional dan akurat.",
  "Influencer Tracking": "Pelacakan Influencer",
  "Turn content creator data into measurable business growth opportunities. Track audience reach, engagement rates, and campaign performance precisely. Optimize strategic partnerships to strengthen your brand position.":
    "Ubah data kreator konten menjadi peluang pertumbuhan bisnis yang terukur. Lacak jangkauan audiens, tingkat interaksi, dan kinerja kampanye dengan tepat. Optimalkan kemitraan strategis untuk memperkuat posisi merek Anda.",
  // How it works
  "How It's Work": "Cara Kerja",
  "How Socindex Turns Data Into Your Decision": "Bagaimana Socindex Mengubah Data Menjadi Keputusan Anda",
  "Media data is collected, processed, and analyzed to help you discover the stories, trends, and connections behind the numbers.":
    "Data media dikumpulkan, diproses, dan dianalisis untuk membantu Anda menemukan cerita, tren, dan hubungan di balik angka.",
  "Discuss With Us →": "Diskusi dengan Kami →", "STEP": "LANGKAH",
  "One Data Source": "Satu Sumber Data",
  "One centralized workspace to monitor conversations across multiple social media platforms and digital news sources.":
    "Satu ruang kerja terpusat untuk memantau percakapan di berbagai platform media sosial dan sumber berita digital.",
  "AI-Powered Analysis": "Analisis Berbasis AI",
  "AI automatically processes and classifies conversations to uncover sentiment, topics, and meaningful insights from social media data.":
    "AI otomatis memproses dan mengklasifikasikan percakapan untuk mengungkap sentimen, topik, dan wawasan bermakna dari data media sosial.",
  "Faster Decision": "Keputusan Lebih Cepat",
  "Spot emerging trends, track conversation spikes, and identify influential voices to make faster, data-driven decisions.":
    "Kenali tren yang muncul, lacak lonjakan percakapan, dan identifikasi suara berpengaruh untuk keputusan yang lebih cepat dan berbasis data.",
  "Optimize Brand Monitoring": "Optimalkan Pemantauan Merek",
  "Customize your monitoring with relevant keywords and selected social media accounts. Stay informed with organized reports and timely alerts.":
    "Sesuaikan pemantauan dengan kata kunci yang relevan dan akun media sosial pilihan. Tetap terinformasi lewat laporan terstruktur dan peringatan tepat waktu.",
  // Issue preview
  "Analytics Features": "Fitur Analitik",
  "Identify the most important issues.": "Kenali isu-isu terpenting.",
  "Determine your next steps.": "Tentukan langkah Anda berikutnya.",
  "Find the most relevant conversations, understand the sentiment, and prioritize your team's response.":
    "Temukan percakapan paling relevan, pahami sentimennya, dan prioritaskan respons tim Anda.",
  "Top Issue Preview": "Pratinjau Isu Teratas",
  "BENEFITS FOR C LEVEL": "MANFAAT UNTUK C-LEVEL",
  "Turn data into strategic decisions": "Ubah data menjadi keputusan strategis",
  "Get a comprehensive view of public perception to support business decisions.": "Dapatkan gambaran menyeluruh tentang persepsi publik untuk mendukung keputusan bisnis.",
  "Monitored Topics": "Topik Dipantau", "Strategic issues identified": "Isu strategis teridentifikasi",
  "Sentiment Trends": "Tren Sentimen", "Positive sentiment change": "Perubahan sentimen positif",
  "Monitor changes in public perception": "Pantau perubahan persepsi publik",
  "Find the most relevant insights": "Temukan wawasan paling relevan",
  "Determine steps based on data": "Tentukan langkah berdasarkan data",
  "From conversation to action priorities": "Dari percakapan menjadi prioritas tindakan",
  "Understand what is being discussed and focus the team's attention on the most important issues.":
    "Pahami apa yang sedang dibicarakan dan fokuskan perhatian tim pada isu terpenting.",
  "Volume issue": "Volume isu", "Mentions in 24 hours": "Sebutan dalam 24 jam",
  "Platform dominant": "Platform dominan", "Conversation on Twitter": "Percakapan di Twitter",
  "Sort issues by volume": "Urutkan isu berdasarkan volume",
  "Get to know the most dominant platforms": "Kenali platform paling dominan",
  "Understand the sentiment of the conversation": "Pahami sentimen percakapan",
  "Recognize the risks before they become a crisis": "Kenali risiko sebelum menjadi krisis",
  "Identify changes in sentiment and issues that could potentially impact the company's reputation.":
    "Identifikasi perubahan sentimen dan isu yang berpotensi memengaruhi reputasi perusahaan.",
  "Negative Sentiment": "Sentimen Negatif", "From total conversations": "Dari total percakapan",
  "Rising Issues": "Isu Meningkat", "In the Last 24 Hours": "Dalam 24 Jam Terakhir",
  "Detect rising issues": "Deteksi isu yang meningkat", "Identify negative sentiments": "Identifikasi sentimen negatif",
  "Prioritize risks based on impact": "Prioritaskan risiko berdasarkan dampak",
  // Multichannel
  "Ai Powered": "Berbasis AI",
  "Comprehensive Multi-Channel Monitoring powered by Artificial Intelligence": "Pemantauan Multi-Kanal Komprehensif Berbasis Kecerdasan Buatan",
  "Track your brand keywords across X, Instagram, Facebook, Threads, YouTube, TikTok, and online forums and blogs simultaneously.":
    "Lacak kata kunci merek Anda di X, Instagram, Facebook, Threads, YouTube, TikTok, serta forum dan blog daring secara bersamaan.",
  // Trusted
  "Trusted by leading organizations": "Dipercaya organisasi terkemuka",
  "Trusted by Agency, Government & Company": "Dipercaya Agensi, Pemerintah & Perusahaan",
  "More than 500+ Agency and companies already use Socindex to manage their social media intelligence":
    "Lebih dari 500+ agensi dan perusahaan telah memakai Socindex untuk mengelola intelijen media sosial mereka",
  "Active users": "Pengguna aktif", "Media professionals and organizations across Indonesia.": "Profesional media dan organisasi di seluruh Indonesia.",
  "Data accuracy": "Akurasi data", "Monitoring": "Pemantauan",
  // About
  "Building Smarter Social Media Intelligences": "Membangun Intelijen Media Sosial yang Lebih Cerdas",
  "Socindex is a BIG DATA MONITORING tools. Designed to help organizations and businesses analyze social media data with advanced AI and machine learning technology.":
    "Socindex adalah alat BIG DATA MONITORING. Dirancang untuk membantu organisasi dan bisnis menganalisis data media sosial dengan teknologi AI dan machine learning canggih.",
  "Media & Organizations": "Media & Organisasi", "Data Accuracy": "Akurasi Data",
  "Learn More": "Selengkapnya", "Clarity": "Kejelasan", "Accuracy": "Akurasi", "Speed": "Kecepatan",
  // Team
  "Meet the team": "Kenali tim kami", "The people behind clearer decisions": "Orang-orang di balik keputusan yang lebih jelas",
  "A passionate team of designers, developers, and data experts working to build better social media intelligence solutions.":
    "Tim yang bersemangat, terdiri dari desainer, pengembang, dan pakar data, yang membangun solusi intelijen media sosial yang lebih baik.",
  // FAQ
  "Frequently": "Pertanyaan", "asked questions": "yang sering diajukan",
  "What is Socindex?": "Apa itu Socindex?",
  "A Big Data Monitoring and reputation analysis platform based on Artificial Intelligence (AI) and Deep Learning. This platform is specifically designed to monitor, track, and analyze the performance and reputation of an organization or brand on social media and mass media.":
    "Platform Big Data Monitoring dan analisis reputasi berbasis Kecerdasan Buatan (AI) dan Deep Learning. Platform ini dirancang khusus untuk memantau, melacak, dan menganalisis kinerja serta reputasi organisasi atau merek di media sosial dan media massa.",
  "Where does Socindex collect data from?": "Dari mana Socindex mengumpulkan data?",
  "Collecting netizen comments, trends, and activities on social media and collecting data from more than 500 print media, online media, and credible broadcast media.":
    "Mengumpulkan komentar, tren, dan aktivitas warganet di media sosial serta data dari lebih dari 500 media cetak, media daring, dan media penyiaran terpercaya.",
  "How much data can be pulled and how fast is the process?": "Berapa banyak data yang bisa ditarik dan secepat apa prosesnya?",
  "Socindex provides an unlimited data stream capable of collecting more than 20,000 data points per day, with the process from data retrieval to digital report preparation being completed in 10 minutes, helping organizations accelerate their response to issues and prevent potential crises.":
    "Socindex menyediakan aliran data tanpa batas yang mampu mengumpulkan lebih dari 20.000 titik data per hari, dengan proses dari pengambilan data hingga penyusunan laporan digital selesai dalam 10 menit, membantu organisasi mempercepat respons terhadap isu dan mencegah potensi krisis.",
  "How does Socindex AI help business or organizational analysis?": "Bagaimana AI Socindex membantu analisis bisnis atau organisasi?",
  "AI technology and ontology on the Socindex dashboard perform sentiment analysis, figure and relationship mapping, and market intelligence to identify public perception, find influential figures and related entities, and monitor competitor movements and industry trends.":
    "Teknologi AI dan ontologi pada dasbor Socindex melakukan analisis sentimen, pemetaan tokoh dan relasi, serta market intelligence untuk mengidentifikasi persepsi publik, menemukan tokoh berpengaruh dan entitas terkait, serta memantau pergerakan kompetitor dan tren industri.",
  "How to subscribe or contact Socindex?": "Bagaimana cara berlangganan atau menghubungi Socindex?",
  "Start with a free trial using the form at the bottom of this page, or send us a direct email and our team will guide you through the next steps.":
    "Mulailah dengan uji coba gratis lewat formulir di bagian bawah halaman ini, atau kirim email langsung dan tim kami akan memandu langkah berikutnya.",
  "Do you have more questions?": "Punya pertanyaan lain?",
  "Let’s discuss how Socindex can help track your brand reputation. Contact us directly for a quick chat.":
    "Mari diskusikan bagaimana Socindex dapat membantu melacak reputasi merek Anda. Hubungi kami langsung untuk berbincang singkat.",
  "Get in Touch": "Hubungi Kami",
  // CTA
  "Get Started": "Mulai Sekarang", "Ready to See the Bigger Picture?": "Siap Melihat Gambaran yang Lebih Besar?",
  "Request your custom demo today and experience the power of social media intelligence.":
    "Minta demo khusus Anda hari ini dan rasakan kekuatan intelijen media sosial.",
  "Name": "Nama", "Email": "Email", "Phone Number": "Nomor Telepon", "Company": "Perusahaan", "Message": "Pesan",
  "Enter your name": "Masukkan nama Anda", "Enter your business email": "Masukkan email bisnis Anda", "Company name": "Nama perusahaan",
  "We’d love to know, how did you first discover our company ? *": "Kami ingin tahu, bagaimana Anda pertama kali mengenal perusahaan kami? *",
  "Select an options": "Pilih salah satu", "Google / Search": "Google / Pencarian", "Social media": "Media sosial", "Referral": "Rekomendasi", "Event": "Acara", "Other": "Lainnya",
  "Request Demo": "Minta Demo",
  "Please fill in your name, a valid email, and how you found us.": "Mohon isi nama, email yang valid, dan bagaimana Anda mengenal kami.",
  "Thanks! We'll be in touch shortly.": "Terima kasih! Kami akan segera menghubungi Anda.",
  "Fast setup": "Pengaturan cepat", "Start monitoring in minutes": "Mulai memantau dalam hitungan menit",
  "Free trial": "Uji coba gratis", "Explore before subscribing": "Jelajahi sebelum berlangganan",
  "Guided support": "Dukungan terpandu", "Experts ready to help": "Pakar siap membantu",
  "Terms of Service": "Ketentuan Layanan", "Privacy Policy": "Kebijakan Privasi",
  "All Rights Reserved": "Hak Cipta Dilindungi",   // ===== Tambahan: Team, Testimoni, Issue preview, Try It Out, modal =====
  "Starting his career as a young journalist in Surabaya Post, he moved to Jakarta as a journalist at Republika and continued his career at Detik.com. He became a key journalist and deputy chief journalist, then sharpened his business skills as GM of Sales and Director of Operations (2011). With an extensive network and experience in business and organizational activities, he served as Secretary General of APJII from 2012 to 2015. In 2016, he co-founded Tirto.ID.":
    "Memulai karier sebagai jurnalis muda di Surabaya Post, ia pindah ke Jakarta sebagai jurnalis di Republika dan melanjutkan kariernya di Detik.com. Ia menjadi jurnalis kunci sekaligus wakil redaktur, lalu mengasah kemampuan bisnisnya sebagai GM Sales dan Direktur Operasional (2011). Dengan jaringan dan pengalaman luas di bidang bisnis dan organisasi, ia menjabat Sekretaris Jenderal APJII pada 2012 hingga 2015. Pada 2016, ia turut mendirikan Tirto.ID.",
  "Started career as journalist since 1999, TBS - his famously known nickname, is full with editorial experience in almost all areas of reportage. Started from Entertainment news, Political events, Sports, Economy and Information Technology. At the end of his career at Detik.com, he was trusted to handle their content development business core. Then, he started a new challenge to initiate Binokular until now On 2016, he was became co-founder of Tirto.ID.":
    "Memulai karier sebagai jurnalis sejak 1999, TBS, nama panggilan yang dikenal luas, kaya pengalaman redaksi di hampir semua bidang liputan. Berawal dari berita hiburan, peristiwa politik, olahraga, ekonomi, hingga teknologi informasi. Di akhir kariernya di Detik.com, ia dipercaya menangani inti bisnis pengembangan konten. Kemudian ia memulai tantangan baru dengan merintis Binokular hingga kini. Pada 2016, ia menjadi salah satu pendiri Tirto.ID.",
  "He graduated from Computer Polytechnic IPB. He started his carrier in Detik.com. In a short period, he had become a leading programmer. To pursue and gain more experience, he then worked in various multinational companies in software development and deployment. He spent most of his time working on foreign projects, until he returned to raise Binokular.":
    "Lulusan Politeknik Komputer IPB. Ia memulai kariernya di Detik.com dan dalam waktu singkat menjadi programmer andalan. Untuk menambah pengalaman, ia bekerja di berbagai perusahaan multinasional di bidang pengembangan dan penerapan perangkat lunak. Sebagian besar waktunya dihabiskan pada proyek luar negeri, hingga akhirnya kembali untuk membesarkan Binokular.",
  "\"It is quite easy to use this dashboard and quite easy to understand, but sometimes there are down times which are a bit annoying and can be fixed in the system.\"":
    "\"Dasbor ini cukup mudah digunakan dan dipahami, tetapi terkadang ada waktu henti yang agak mengganggu dan semoga bisa diperbaiki di sistem.\"",
  "“So far, it has been very helpful in completing our work related to media, both for monitoring, evaluation, monitoring current issues which we can later use to create media releases, create studies from the media exposure side, create reports to the board of directors, create reports required by regulators and others.”":
    "“Sejauh ini sangat membantu menyelesaikan pekerjaan kami terkait media, baik untuk pemantauan, evaluasi, maupun memantau isu terkini yang kemudian dapat kami gunakan untuk membuat rilis media, kajian dari sisi pemberitaan, laporan kepada direksi, laporan yang diwajibkan regulator, dan lainnya.”",
  "“In today's digital age, public perception can change in a matter of minutes. Socindex has been a crucial partner in supporting our communications strategy, particularly in social media monitoring and public sentiment analysis. Reports are presented in real time, accurate, and easily actionable, especially when strategic issues arise that could potentially escalate into crises. Their rapid response and sharp insights significantly assist us in making informed and measured decisions.”":
    "“Di era digital saat ini, persepsi publik bisa berubah dalam hitungan menit. Socindex menjadi mitra penting dalam mendukung strategi komunikasi kami, terutama dalam pemantauan media sosial dan analisis sentimen publik. Laporan disajikan secara real-time, akurat, dan mudah ditindaklanjuti, terutama saat muncul isu strategis yang berpotensi menjadi krisis. Respons cepat dan wawasan tajam mereka sangat membantu kami mengambil keputusan yang tepat dan terukur.”",
  // Issue preview
  "Dummy data • Top issues by conversation volume • Last 7 days": "Data contoh • Isu teratas berdasarkan volume percakapan • 7 hari terakhir",
  "DATA": "DATA", "Total Volume": "Total Volume", "vs 7 days ago": "dibanding 7 hari lalu",
  "Average Sentiment": "Rata-rata Sentimen", "Netral": "Netral", "Stable": "Stabil", "Stable Trend": "Tren Stabil",
  "Top Platform": "Platform Teratas", "Dominan": "Dominan", "64% share": "64% pangsa",
  "Fuel Price Increase": "Kenaikan Harga BBM", "Transportation Policy Discussion": "Diskusi Kebijakan Transportasi",
  "Prabowo's Cabinet Reshuffle": "Reshuffle Kabinet Prabowo", "Mining Regulations Debate": "Perdebatan Regulasi Pertambangan",
  "Transportation • 2 hours ago": "Transportasi • 2 jam lalu", "Politics • 4 hours ago": "Politik • 4 jam lalu",
  "Politics • 5 hours ago": "Politik • 5 jam lalu", "Environment • 1 day ago": "Lingkungan • 1 hari lalu",
  "positive": "positif", "neutral": "netral", "negative": "negatif",
  // Try It Out
  "Try It Out": "Coba Sekarang", "Turning Conversations Into Strategic Action": "Mengubah Percakapan Menjadi Aksi Strategis",
  "Select Topic:": "Pilih Topik:", "Select topic": "Pilih topik",
  "ENGAGEMENT": "KETERLIBATAN", "TALK": "PERCAKAPAN", "APPLAUSE": "APRESIASI", "AUDIENCE": "AUDIENS",
  "Total comments, like, shares, views": "Total komentar, suka, bagikan, tayangan", "Total posts and comments": "Total unggahan dan komentar",
  "Total likes": "Total suka", "People reached": "Orang terjangkau",
  "Total Sentiment": "Total Sentimen", "Sentiment split": "Rincian sentimen",
  "Positive": "Positif", "Neutral": "Netral", "Negative": "Negatif",
  "Data Source": "Sumber Data", "posts": "unggahan", "View All": "Lihat Semua", "Word Cloud": "Awan Kata",
  // Modal
  "Data Source · Locked": "Sumber Data · Terkunci", "Unlock the full data source Analysis": "Buka analisis sumber data selengkapnya",
  "You are viewing the free overview. Subscribe to Socindex to open the deeper analysis for": "Anda sedang melihat ringkasan gratis. Berlangganan Socindex untuk membuka analisis lebih dalam untuk",
  "Sentiment per platform over time": "Sentimen per platform dari waktu ke waktu", "Top accounts on every platform": "Akun teratas di setiap platform",
  "Open the original posts": "Buka unggahan aslinya", "Subscribe to Socindex": "Berlangganan Socindex", "Maybe later": "Nanti saja",
  "Already a subscriber?": "Sudah berlangganan?", "Sign in": "Masuk",
};

const dictionaries: Record<Lang, Record<string, string>> = { en: {}, id };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };
const LangCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // pulihkan pilihan bahasa pengunjung (jika ada)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("socindex-lang");
      if (saved === "en" || saved === "id") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("socindex-lang", l); } catch {}
  };
  const t = (s: string) => dictionaries[lang][s] ?? s;

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
