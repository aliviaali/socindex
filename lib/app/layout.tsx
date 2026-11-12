import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Socindex — Social Media Analytics & Brand Intelligence",
  description:
    "Socindex is a big data monitoring and reputation analysis platform powered by AI. Track mentions, understand sentiment, and make faster decisions.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Socindex — Brings Data and Sight Directly to Your Sight",
    description: "AI-powered social media analytics for media, government and businesses.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171c22" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
