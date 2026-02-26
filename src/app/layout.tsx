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
    default: "PAIS — Plataforma de Atención Integral Senior (Gerontología Digital 2026)",
    template: "%s | PAIS - Atención Integral Senior",
  },
  description:
    "Únete a más de 10,000 seniors que ya disfrutan de mayor autonomía. La plataforma líder en salud, transporte seguro y compañía voluntaria.",
  keywords: ["senior", "salud", "transporte seguro", "acompañamiento", "autonomía", "gerontología digital"],
  openGraph: {
    title: "PAIS — Atención Integral Senior",
    description: "Tu compañero de vida para una autonomía prolongada y un bienestar integral. Certificado para tu seguridad.",
    type: "website",
    locale: "es_BO",
    siteName: "PAIS",
  },
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
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 max-w-[70ch] mx-auto w-full px-4 lg:px-0">
              {children}
            </main>
          </div>
          <PwaUpdater />
        </UserProvider>
      </body>

    </html>
  );
}
