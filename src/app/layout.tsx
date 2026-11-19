import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
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
        <footer className="border-t border-slate-200/80 bg-white/60 py-6 text-sm text-slate-500">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
            <p>
              <span className="font-semibold text-slate-700">Bússola</span> — Currículo gratuito e
              open-source de desenvolvimento web.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/paths" className="transition-colors hover:text-slate-900">
                Trilhas
              </Link>
              <Link href="/skills" className="transition-colors hover:text-slate-900">
                Matriz
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
