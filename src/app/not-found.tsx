import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto my-12 max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xs dark:border-slate-800 dark:bg-[#111827]">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-amber-400">Erro 404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Página não encontrada</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        O endereço pode ter mudado ou o conteúdo não está mais disponível.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/paths"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
        >
          Ver trilhas
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Início
        </Link>
      </div>
    </div>
  );
}
