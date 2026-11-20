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

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('bussola-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased dark:bg-[#0b0f17] dark:text-slate-100">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-slate-200/80 bg-white py-8 text-sm text-slate-600 dark:border-slate-800/80 dark:bg-[#0f1420] dark:text-slate-400">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div className="space-y-1.5">
              <BrandLogo size="sm" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Currículo e plataforma de competências 100% gratuitos, sem paywall e open-source.
              </p>
              <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span className="text-amber-600 dark:text-amber-400">&gt;_</span> feito com cuidado para quem aprende do
                zero
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 font-medium">
              <Link
                href="/eli5"
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                Comece do zero
              </Link>
              <Link
                href="/paths"
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                Trilhas
              </Link>
              <Link
                href="/skills"
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                Matriz
              </Link>
              <Link
                href="/dashboard"
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                Painel
              </Link>
              <Link
                href="/contribuir"
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                Contribuir
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
