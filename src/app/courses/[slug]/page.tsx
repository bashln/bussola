import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { getSessionUserId } from "@/lib/auth";
import { getCourse, getCourses, getLessons, getPath } from "@/lib/content";
import { listDoneLessonIds } from "@/lib/db/repositories";

export function generateStaticParams() {
  return getCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const curso = getCourse(slug);
  return { title: curso?.titulo ?? "Curso" };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curso = getCourse(slug);
  if (!curso) notFound();

  const trilha = getPath(curso.path);
  const licoes = getLessons({ curso: slug });
  const userId = await getSessionUserId();
  const concluidas = userId ? await listDoneLessonIds(userId) : new Set<string>();
  const total = licoes.length;
  const feitas = licoes.filter((licao) => concluidas.has(licao.slug)).length;
  const percentual = total === 0 ? 0 : Math.round((feitas / total) * 100);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/paths" className="font-medium transition-colors hover:text-blue-700">
            Trilhas
          </Link>
          {trilha && (
            <>
              <span aria-hidden="true">/</span>
              <Link
                href={`/paths/${trilha.slug}`}
                className="font-medium transition-colors hover:text-blue-700"
              >
                {trilha.titulo}
              </Link>
            </>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {curso.titulo}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600">{curso.descricao}</p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="mb-2.5 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900">Progresso do curso</span>
          <span className="font-medium text-slate-600">
            {feitas} de {total} concluídas ({percentual}%)
          </span>
        </div>
        <ProgressBar atual={feitas} total={total} ariaLabel="Progresso do curso" />
      </div>

      {licoes.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-xs">
          <p className="text-sm text-slate-600">Nenhuma lição cadastrada neste curso ainda.</p>
        </div>
      ) : (
        <ol className="space-y-3">
          {licoes.map((licao, indice) => {
            const concluida = concluidas.has(licao.slug);
            const isProjeto = licao.tipo === "projeto";
            const href = isProjeto ? `/projects/${licao.slug}` : `/lessons/${licao.slug}`;

            return (
              <li key={licao.slug}>
                <Link
                  href={href}
                  className={`group flex items-center justify-between gap-4 rounded-2xl border bg-white p-5 shadow-xs transition-all hover:border-blue-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    concluida ? "border-emerald-200/90" : "border-slate-200/90"
                  }`}
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        concluida
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700"
                      }`}
                    >
                      {concluida ? "✓" : indice + 1}
                    </span>

                    <div className="min-w-0">
                      <h2 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                        {licao.titulo}
                      </h2>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold ${
                            isProjeto
                              ? "bg-amber-50 text-amber-800"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {isProjeto ? "Projeto" : "Leitura"}
                        </span>
                        <span className="text-slate-500">{licao.minutos} min</span>
                        {concluida && (
                          <span className="font-semibold text-emerald-700">· Concluído</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span
                    className="shrink-0 text-sm font-semibold text-blue-600 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
