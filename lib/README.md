# Socindex — Landing Page (Next.js)

Landing page Socindex berbasis **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, dengan mode **terang / gelap**, responsif (mobile → desktop), dan siap deploy ke **Vercel**.

## Menjalankan di komputer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi
npm run start      # jalankan hasil build
```

Butuh Node.js 18.18+ (disarankan 20 atau 22).

## Struktur

```
app/                 layout, halaman utama, CSS global (token warna terang/gelap)
components/          satu file per section (Hero, Features, Team, Faq, ...)
lib/content.ts       SEMUA teks & data (menu, fitur, FAQ, tim, testimoni)
public/team/         ← FOTO TIM (ganti dengan foto Anda)
public/images/       avatar, testimoni, ilustrasi About
public/motion/       GIF animasi (dashboard, hub orbit, strip logo) versi terang & gelap
```

## Mengganti foto "Our Team"  `[GANTI-FOTO]`

1. Salin foto ke `public/team/` (rasio 1:1, minimal 320 × 320 px), mis. `public/team/budi.jpg`.
2. Buka `lib/content.ts`, cari `[GANTI-FOTO]` lalu ubah:
   ```ts
   photo: "/team/member-1.jpg", // [GANTI-FOTO]
   →
   photo: "/team/budi.jpg",
   ```
3. Nama, jabatan, deskripsi, dan tag fokus diedit di objek yang sama.

Penanda juga ada di `components/Team.tsx` (cari `[GANTI-FOTO]`).
Cari semua penanda sekaligus: `grep -rn "GANTI-FOTO" .`

> Foto bawaan (`member-1..4.jpg`, avatar hero, foto testimoni, ilustrasi About) dipotong dari file desain dan beresolusi rendah. Ganti dengan file asli untuk hasil tajam di layar retina.

## Deploy: GitHub → Vercel

### 1. Push ke GitHub

```bash
git init -b main            # lewati jika folder sudah repo git
git add .
git commit -m "feat: socindex landing page"
git remote add origin https://github.com/<username>/<nama-repo>.git
git push -u origin main
```

Atau dengan GitHub CLI: `gh repo create socindex --public --source=. --push`

### 2. Deploy di Vercel

1. Buka <https://vercel.com/new> dan login dengan GitHub.
2. **Import** repo tadi. Framework otomatis terdeteksi **Next.js** — tidak perlu mengubah apa pun (Build: `next build`, Output: default).
3. Klik **Deploy**. Setiap `git push` ke `main` akan otomatis ter-deploy ulang.

Atau via CLI: `npx vercel` (preview) dan `npx vercel --prod` (produksi).

## Catatan konten

- Form email di bagian CTA hanya validasi di sisi klien; sambungkan ke backend/CRM di `components/CtaFooter.tsx` (cari `TODO`).
- Hanya ada satu testimoni asli (Pertamina). Tambahkan testimoni asli lain di `lib/content.ts` → `testimonials` agar dot & panah carousel berfungsi.
- Jawaban FAQ no. 2–5 dan slide 2–3 kartu "Benefits" adalah teks sementara — sesuaikan.
