import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Lexend } from "next/font/google";
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

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
import { Onboarding } from "@/components/layout/Onboarding";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} ${lexend.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
        <UserProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full mx-auto">
              {children}
            </main>
          </div>
          <Onboarding />
          <PwaUpdater />
        </UserProvider>
      </body>

    </html>
  );
}
