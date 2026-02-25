import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "PAIS — Atención Integral Senior",
    template: "%s | PAIS",
  },
  description:
    "Tu compañero de salud, movilidad y bienestar. Plataforma de Atención Integral Senior.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PAIS",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2D8A56",
};

import { UserProvider } from "@/hooks/useUser";
import { PwaUpdater } from "@/components/layout/PwaUpdater";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--pais-warm-50)] text-[var(--pais-text-primary)]">
        <UserProvider>
          {children}
          <PwaUpdater />
        </UserProvider>
      </body>
    </html>
  );
}
