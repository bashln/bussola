"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/eli5", label: "Comece do zero", code: "00" },
  { href: "/paths", label: "Trilhas", code: "01" },
  { href: "/skills", label: "Minha matriz", code: "02" },
  { href: "/dashboard", label: "Painel", code: "03" },
  { href: "/contribuir", label: "Contribuir", code: "04" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && Boolean(pathname?.startsWith(`${href}/`)));

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b0f17]/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group transition-opacity hover:opacity-90">
          <BrandLogo showTagline />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 md:flex"
        >
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  active
                    ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="ml-2 flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-800">
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              Entrar
            </Link>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-all duration-150 hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {menuOpen ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer with subtle pixel-grid surface */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="pixel-grid-bg border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-[#0b0f17]/95"
        >
          <nav
            aria-label="Navegação mobile"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                    active
                      ? "border border-slate-900 bg-slate-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950"
                      : "border border-transparent text-slate-700 hover:border-slate-200 hover:bg-white dark:text-slate-200 dark:hover:border-slate-800 dark:hover:bg-slate-900"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`font-mono text-xs ${
                      active
                        ? "text-amber-300 dark:text-slate-900"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {link.code}
                  </span>
                </Link>
              );
            })}
            <div className="mt-2 border-t border-slate-200 pt-3 dark:border-slate-800">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Entrar
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
