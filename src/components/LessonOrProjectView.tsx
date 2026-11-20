import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { StudySessionPanel } from "@/components/StudySessionPanel";
import type { Lesson } from "@/lib/types";
import { getCourse, getLessons } from "@/lib/content";
import { skills } from "@/lib/skills";

interface Props {
  item: Lesson;
  logado: boolean;
  concluido: boolean;
}

function itemHref(lesson: { tipo: string; slug: string }): string {
  return lesson.tipo === "projeto" ? `/projects/${lesson.slug}` : `/lessons/${lesson.slug}`;
}

export function LessonOrProjectView({ item, logado, concluido }: Props) {
  const curso = getCourse(item.curso);
  const irmaos = getLessons({ curso: item.curso });
  const idx = irmaos.findIndex((l) => l.slug === item.slug);
  const anterior = idx > 0 ? irmaos[idx - 1] : null;
  const proximo = idx >= 0 && idx < irmaos.length - 1 ? irmaos[idx + 1] : null;

  const desenvolvimento = Object.keys(item.skillWeights).map(
    (id) => skills.find((skill) => skill.id === id)?.nome ?? id,
  );
  const isProjeto = item.tipo === "projeto";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3 border-b border-slate-200 pb-6 dark:border-slate-800">
        {curso && (
          <Link
            href={`/courses/${curso.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-300 dark:hover:text-amber-300"
          >
            <span aria-hidden="true">←</span> {curso.titulo}
          </Link>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isProjeto
                ? "bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300"
                : "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
            }`}
          >
            {isProjeto ? "Projeto prático" : "Leitura"}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.minutos} min</span>
          {concluido && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <span aria-hidden="true">✓</span> Concluído
            </span>
          )}
        </div>
      </div>

      <article className="mdx-prose">
        <MDXRemote source={item.content} />
      </article>

      {desenvolvimento.length > 0 && (
        <section
          aria-label="Skills desenvolvidas"
          className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111827]"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Skills desenvolvidas
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {desenvolvimento.map((nome) => (
              <li
                key={nome}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {nome}
              </li>
            ))}
          </ul>
        </section>
      )}

      <StudySessionPanel recursos={item.recursos} />

      <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <LessonCompleteButton
          lessonSlug={item.slug}
          logado={logado}
          concluidoInicial={concluido}
          hrefPrefix={isProjeto ? "/projects" : "/lessons"}
        />

        <nav aria-label="Navegação entre lições" className="flex flex-wrap items-center gap-3">
          {anterior && (
            <Link
              href={itemHref(anterior)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span aria-hidden="true">←</span> Anterior
            </Link>
          )}
          {proximo && (
            <Link
              href={itemHref(proximo)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-800 dark:bg-amber-400 dark:text-slate-950 dark:hover:border-amber-300 dark:hover:bg-amber-300"
            >
              Próxima <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
