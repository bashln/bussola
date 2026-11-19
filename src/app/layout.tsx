import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Bússola", template: "%s | Bússola" },
  description: "Aprenda desenvolvimento web de graça e acompanhe suas competências.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-gray-900">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
