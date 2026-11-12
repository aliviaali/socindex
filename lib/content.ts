/**
 * Semua teks & data halaman ada di sini supaya mudah diedit tanpa menyentuh komponen.
 */

export const navLight = [
  { label: "Home", href: "#home" },
  { label: "Why Us", href: "#why-us" },
  { label: "Features", href: "#features" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
];


export const problemPoints = [
  "Data from multiple social media platforms is scattered and hard to analyze.",
  "Manual processing takes a lot of time and is prone to human error.",
  "It's difficult to monitor brand reputation and public sentiment in real-time.",
];

export const solutionPoints = [
  "Socindex collects and processes social media data in one place.",
  "Using advanced AI and machine learning to analyze sentiment and trends. Powered by Natural Language Processing, AI Sentiment Labeling, and Analytic Processing, it transforms every sentence into accurate business insights.",
  "Provides easy-to-understand dashboards for faster, smarter decisions.",
];

export const pillars = ["One data source", "AI-powered analysis", "Clear dashboards", "Faster decisions"];

export const features = [
  { icon: "radio", title: "Real-time Monitoring", desc: "Monitor mentions, trends, and conversations in real time. Get accurate data updates from multiple social platforms. Make quick business decisions based on public opinion dynamics." },
  { icon: "brain", title: "AI Tool, Human Quality", desc: "Combine the speed of artificial intelligence analysis with expert verification. Maintain data accuracy rates of up to 98 percent. Generate reliable, in-depth insights for corporate strategy." },
  { icon: "chart", title: "Comprehensive Analytics", desc: "Access comprehensive analytics reports, data visualizations, and executive summaries. Provide in depth metrics to support your team's strategic direction. Accelerate data-driven decision-making." },
  { icon: "devices", title: "Social Network Analysis Mapping", desc: "Consolidate data streams from multiple social media platforms and online sources. Manage all digital monitoring in a single, integrated workspace. Eliminate data silos for organizational operational efficiency." },
  { icon: "layout", title: "Customizable Reports", desc: "Focus on key metrics that align with your company's business objectives. Flexibly customize report formats to meet the needs of your team and stakeholders. Present crucial data professionally and accurately." },
  { icon: "eye", title: "Influencer Tracking", desc: "Turn content creator data into measurable business growth opportunities. Track audience reach, engagement rates, and campaign performance precisely. Optimize strategic partnerships to strengthen your brand position." },
] as const;

/** `detail` tampil saat step di-hover / fokus / di-tap (satu per satu). */
export const howSteps = [
  {
    title: "One Data Source", desc: "One workspace for every media source", icon: "db",
    chips: ["News", "Instagram", "Facebook", "X", "TikTok", "YouTube", "Threads"],
  },
  {
    title: "AI Powered Analysis", desc: "AI cleans, tags and scores each mention", icon: "filter",
    quote: "“The new update makes everything easier.”",
    tags: ["Positive", "Product experience", "Relevant"],
  },
  {
    title: "Faster Decision", desc: "Identify spikes and market trends in real-time for clearer data insights.", icon: "bars",
    tags: ["Product conversations", "News + social media"],
    note: "Connect a conversation spike to the stories behind it.",
  },
  {
    title: "Optimize Brand Monitoring", desc: "Turn insight into reports and alerts", icon: "doc",
    note: "Illustrative preview: bring news and social conversations together.",
    tags: ["Brand monitoring overview", "Key narratives", "Topics", "Recommended follow-up"],
    actions: ["Create a report", "Set an alert", "Share insights"],
  },
] as const;

export const issues = [
  { rank: 1, title: "Fuel Price Increase", meta: "Transportation • 2 hours ago", volume: "842.5K", delta: "+24.5%", sentiment: "positive" },
  { rank: 2, title: "Transportation Policy Discussion", meta: "Politics • 4 hours ago", volume: "612.1K", delta: "+18.2%", sentiment: "neutral" },
  { rank: 3, title: "Prabowo's Cabinet Reshuffle", meta: "Politics • 5 hours ago", volume: "450.8K", delta: "-5.1%", sentiment: "negative" },
  { rank: 4, title: "Mining Regulations Debate", meta: "Environment • 1 day ago", volume: "320.4K", delta: "+12.0%", sentiment: "positive" },
] as const;

/** 3 slide "Benefits for C Level" sesuai desain (carousel prev/next). */
export const benefitSlides = [
  {
    tag: "BENEFITS FOR C LEVEL",
    title: "Turn data into strategic decisions",
    desc: "Get a comprehensive view of public perception to support business decisions.",
    stats: [
      { label: "Monitored Topics", value: "24", note: "Strategic issues identified" },
      { label: "Sentiment Trends", value: "+12%", note: "Positive sentiment change" },
    ],
    steps: ["Monitor changes in public perception", "Find the most relevant insights", "Determine steps based on data"],
  },
  {
    tag: "BENEFITS FOR C LEVEL",
    title: "From conversation to action priorities",
    desc: "Understand what is being discussed and focus the team's attention on the most important issues.",
    stats: [
      { label: "Volume issue", value: "1.2k", note: "Mentions in 24 hours" },
      { label: "Platform dominant", value: "62%", note: "Conversation on Twitter" },
    ],
    steps: ["Sort issues by volume", "Get to know the most dominant platforms", "Understand the sentiment of the conversation"],
  },
  {
    tag: "BENEFITS FOR C LEVEL",
    title: "Recognize the risks before they become a crisis",
    desc: "Identify changes in sentiment and issues that could potentially impact the company's reputation.",
    stats: [
      { label: "Negative Sentiment", value: "18%", note: "From total conversations" },
      { label: "Rising Issues", value: "+34%", note: "In the Last 24 Hours" },
    ],
    steps: ["Detect rising issues", "Identify negative sentiments", "Prioritize risks based on impact"],
  },
];

/**
 * Testimoni carousel. Tambah / ubah item di sini; dot & tombol panah otomatis mengikuti.
 * Foto: taruh di /public/images/ lalu ubah `avatar`.
 */
export const testimonials = [
  {
    quote: "\"It is quite easy to use this dashboard and quite easy to understand, but sometimes there are down times which are a bit annoying and can be fixed in the system.\"",
    name: "Farhan",
    org: "Telkom Indonesia",
    avatar: "/images/testimonial-farhan.jpg",
    rating: 5,
  },
  {
    quote: "“So far, it has been very helpful in completing our work related to media, both for monitoring, evaluation, monitoring current issues which we can later use to create media releases, create studies from the media exposure side, create reports to the board of directors, create reports required by regulators and others.”",
    name: "Kurniawan Adi",
    org: "Bank Jateng",
    avatar: "/images/testimonial-kurniawan.jpg",
    rating: 5,
  },
  {
    quote: "“In today's digital age, public perception can change in a matter of minutes. Socindex has been a crucial partner in supporting our communications strategy, particularly in social media monitoring and public sentiment analysis. Reports are presented in real time, accurate, and easily actionable, especially when strategic issues arise that could potentially escalate into crises. Their rapid response and sharp insights significantly assist us in making informed and measured decisions.”",
    name: "Kiemas Dita Anugrah Susetya",
    org: "Pertamina Persero",
    avatar: "/images/testimonial-kiemas.jpg",
    rating: 5,
  },
];

export const aboutStats = [
  { value: "47K+", label: "Media & Organizations" },
  { value: "83%", label: "Data Accuracy" },
  { value: "24/7", label: "Real-time Monitoring" },
];

/**
 * =============================================================
 *  OUR TEAM  —  [GANTI-FOTO]
 *  Ganti foto tiap anggota tim dengan foto Anda sendiri:
 *   1. Taruh file foto di folder  /public/team/
 *   2. Ubah nilai `photo` di bawah (mis. "/team/nama-anda.jpg")
 *  Rasio terbaik: persegi (1:1), minimal 320 × 320 px.
 * =============================================================
 */
export const team = [
  {
    name: "Sapto Anggoro",
    // [DUMMY-LINK] Ganti nama akun medsos di bawah ini dengan akun asli (isi bagian "sapto.anggoro").
    badge: "CEO",
    bio: "Starting his career as a young journalist in Surabaya Post, he moved to Jakarta as a journalist at Republika and continued his career at Detik.com. He became a key journalist and deputy chief journalist, then sharpened his business skills as GM of Sales and Director of Operations (2011). With an extensive network and experience in business and organizational activities, he served as Secretary General of APJII from 2012 to 2015. In 2016, he co-founded Tirto.ID.",
    photo: "/team/member-1.jpg", // [GANTI-FOTO] foto anggota 1
    linkedin: "https://www.linkedin.com/in/sapto.anggoro", // [DUMMY-LINK] akun LinkedIn: sapto.anggoro
    instagram: "https://www.instagram.com/sapto.anggoro", // [DUMMY-LINK] akun Instagram
    x: "https://x.com/sapto_anggoro", // [DUMMY-LINK] akun X
  },
  {
    name: "Teguh Budi Santoso",
    // [DUMMY-LINK] Ganti nama akun medsos di bawah ini dengan akun asli (isi bagian "teguh.budi.santoso").
    badge: "COO",
    bio: "Started career as journalist since 1999, TBS - his famously known nickname, is full with editorial experience in almost all areas of reportage. Started from Entertainment news, Political events, Sports, Economy and Information Technology. At the end of his career at Detik.com, he was trusted to handle their content development business core. Then, he started a new challenge to initiate Binokular until now On 2016, he was became co-founder of Tirto.ID.",
    photo: "/team/member-2.jpg", // [GANTI-FOTO] foto anggota 2
    linkedin: "https://www.linkedin.com/in/teguh.budi.santoso", // [DUMMY-LINK] akun LinkedIn: teguh.budi.santoso
    instagram: "https://www.instagram.com/teguh.budi.santoso", // [DUMMY-LINK] akun Instagram
    x: "https://x.com/teguh_budi_santoso", // [DUMMY-LINK] akun X
  },
  {
    name: "Nur Samsi",
    // [DUMMY-LINK] Ganti nama akun medsos di bawah ini dengan akun asli (isi bagian "nur.samsi").
    badge: "CTO",
    bio: "He graduated from Computer Polytechnic IPB. He started his carrier in Detik.com. In a short period, he had become a leading programmer. To pursue and gain more experience, he then worked in various multinational companies in software development and deployment. He spent most of his time working on foreign projects, until he returned to raise Binokular.",
    photo: "/team/member-3.jpg", // [GANTI-FOTO] foto anggota 3
    linkedin: "https://www.linkedin.com/in/nur.samsi", // [DUMMY-LINK] akun LinkedIn: nur.samsi
    instagram: "https://www.instagram.com/nur.samsi", // [DUMMY-LINK] akun Instagram
    x: "https://x.com/nur_samsi", // [DUMMY-LINK] akun X
  },
];

/**
 * Jawaban FAQ 1–4 dari desain. Jawaban nomor 5 tidak terlihat di desain,
 * jadi ini teks sementara — silakan sesuaikan.
 */
export const faqs = [
  {
    q: "What is Socindex?",
    a: "A Big Data Monitoring and reputation analysis platform based on Artificial Intelligence (AI) and Deep Learning. This platform is specifically designed to monitor, track, and analyze the performance and reputation of an organization or brand on social media and mass media.",
  },
  {
    q: "Where does Socindex collect data from?",
    a: "Collecting netizen comments, trends, and activities on social media and collecting data from more than 500 print media, online media, and credible broadcast media.",
  },
  {
    q: "How much data can be pulled and how fast is the process?",
    a: "Socindex provides an unlimited data stream capable of collecting more than 20,000 data points per day, with the process from data retrieval to digital report preparation being completed in 10 minutes, helping organizations accelerate their response to issues and prevent potential crises.",
  },
  {
    q: "How does Socindex AI help business or organizational analysis?",
    a: "AI technology and ontology on the Socindex dashboard perform sentiment analysis, figure and relationship mapping, and market intelligence to identify public perception, find influential figures and related entities, and monitor competitor movements and industry trends.",
  },
  {
    q: "How to subscribe or contact Socindex?",
    a: "Start with a free trial using the form at the bottom of this page, or send us a direct email and our team will guide you through the next steps.",
  },
];

export const ctaPerks = [
  { icon: "zap", title: "Fast setup", desc: "Start monitoring in minutes" },
  { icon: "card", title: "Free trial", desc: "Explore before subscribing" },
  { icon: "headset", title: "Guided support", desc: "Experts ready to help" },
] as const;
