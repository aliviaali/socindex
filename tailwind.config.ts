import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" } },
    extend: {
      fontFamily: { sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"] },
      colors: {
        brand: { DEFAULT: "#F15235", soft: "#FF6A57", deep: "#BB0C09" },
        navy: { DEFAULT: "#133445", ink: "#0B2230" },
        page: "rgb(var(--bg) / <alpha-value>)",
        alt: "rgb(var(--bg-alt) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        tint: "rgb(var(--tint) / <alpha-value>)",
      },
      maxWidth: { page: "1186px" },
      boxShadow: {
        card: "0 10px 30px -12px rgba(19,52,69,.18)",
        soft: "0 6px 24px -10px rgba(19,52,69,.16)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { float: "float 6s ease-in-out infinite", fadeUp: "fadeUp .7s ease both" },
    },
  },
  plugins: [],
};
export default config;
