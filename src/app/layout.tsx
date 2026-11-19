import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hardskills",
  description: "Aprenda desenvolvimento web de graça e acompanhe suas hardskills.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
