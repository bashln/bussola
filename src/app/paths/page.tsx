import Link from "next/link";
import { getPaths } from "@/lib/content";

export const metadata = { title: "Trilhas" };

export default function PathsPage() {
  const paths = getPaths();
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Trilhas</h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Comece pelos fundamentos e avance passo a passo por cursos e projetos práticos.
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {paths.map((path, index) => (
          <li key={path.slug}>
            <Link
              href={`/paths/${path.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-[#111827] dark:hover:border-amber-400/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                    Trilha {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-amber-400">
                    →
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-amber-300">
                  {path.titulo}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{path.descricao}</p>
              </div>

              <span className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 dark:text-amber-400">
                Ver trilha
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
