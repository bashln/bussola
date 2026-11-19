import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Header } from "@/components/Header";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Bússola", template: "%s | Bússola" },
  description: "Aprenda desenvolvimento web de graça e acompanhe suas competências.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-slate-200/80 bg-white py-8 text-sm text-slate-600">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div className="space-y-1.5">
              <BrandLogo size="sm" />
              <p className="text-xs text-slate-500">
                Currículo e plataforma de competências 100% gratuitos, sem paywall e open-source.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 font-medium">
              <Link href="/paths" className="transition-colors hover:text-slate-900">
                Trilhas
              </Link>
              <Link href="/skills" className="transition-colors hover:text-slate-900">
                Matriz
              </Link>
              <Link href="/dashboard" className="transition-colors hover:text-slate-900">
                Painel
              </Link>
              <Link href="/contribuir" className="transition-colors hover:text-slate-900">
                Contribuir
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
