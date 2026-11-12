/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // GIF animasi harus dirender apa adanya (tanpa optimasi) agar tetap bergerak.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
