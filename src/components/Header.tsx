import Link from "next/link";

const links = [
  { href: "/paths", label: "Trilhas" },
  { href: "/skills", label: "Minha matriz" },
  { href: "/dashboard", label: "Painel" },
  { href: "/contribuir", label: "Contribuir" },
];

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 p-4">
        <Link href="/" className="text-lg font-bold">Hardskills</Link>
        <nav aria-label="Navegação principal" className="flex flex-wrap gap-4 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
