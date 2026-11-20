"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { href: "/eli5", label: "Comece do zero" },
  { href: "/paths", label: "Trilhas" },
  { href: "/skills", label: "Minha matriz" },
  { href: "/dashboard", label: "Painel" },
  { href: "/contribuir", label: "Contribuir" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group transition-opacity hover:opacity-90">
          <BrandLogo showTagline />
        </Link>

        <nav aria-label="Navegação principal" className="flex flex-wrap items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname?.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            className="ml-1 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
