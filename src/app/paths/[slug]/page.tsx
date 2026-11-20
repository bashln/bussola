import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourses, getLessons, getPath, getPaths } from "@/lib/content";

export function generateStaticParams() {
  return getPaths().map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getPath(slug);
  return { title: path?.titulo ?? "Trilha" };
}

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = getPath(slug);
  if (!path) notFound();

  const cursos = getCourses(path.slug);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <Link
          href="/paths"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-300 dark:hover:text-amber-300"
        >
          <span aria-hidden="true">←</span> Todas as trilhas
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {path.titulo}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">{path.descricao}</p>
      </div>

      {cursos.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-xs dark:border-slate-800 dark:bg-[#111827]">
          <p className="text-sm text-slate-600 dark:text-slate-300">Nenhum curso disponível nesta trilha ainda.</p>
          <Link
            href="/paths"
            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Explorar outras trilhas
          </Link>
        </div>
      ) : (
        <ol className="grid gap-4 sm:grid-cols-2">
          {cursos.map((curso, indice) => {
            const licoes = getLessons({ curso: curso.slug });
            const totalMinutos = licoes.reduce((acc, l) => acc + l.minutos, 0);

            return (
              <li key={curso.slug}>
                <Link
                  href={`/courses/${curso.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-800 dark:bg-[#111827] dark:hover:border-amber-400/50"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                        Curso {indice + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {licoes.length} {licoes.length === 1 ? "lição" : "lições"} · {totalMinutos} min
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-amber-300">
                      {curso.titulo}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{curso.descricao}</p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-amber-400">
                    <span>Abrir curso</span>
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
