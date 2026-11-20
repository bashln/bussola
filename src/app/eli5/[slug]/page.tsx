import Link from "next/link";
import { notFound } from "next/navigation";
import { Eli5CodeBlock } from "@/components/Eli5CodeBlock";
import { Eli5QuickCheck } from "@/components/Eli5QuickCheck";
import {
  eli5CategoryLabels,
  getEli5TopicBySlug,
  getEli5Topics,
} from "@/lib/eli5";

export function generateStaticParams() {
  return getEli5Topics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getEli5TopicBySlug(slug);
  if (!topic) return { title: "Tópico não encontrado" };
  return {
    title: topic.titulo,
    description: topic.subtitulo,
  };
}

export default async function Eli5TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getEli5TopicBySlug(slug);
  if (!topic) notFound();

  const allTopics = getEli5Topics();
  const currentIndex = allTopics.findIndex((t) => t.slug === topic.slug);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="transition-colors hover:text-slate-900 dark:hover:text-white">
          início
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/eli5" className="transition-colors hover:text-slate-900 dark:hover:text-white">
          eli5
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 dark:text-slate-200">{topic.slug}</span>
      </nav>

      <div className="space-y-3 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-semibold">
          <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-950 dark:bg-amber-400/15 dark:text-amber-300">
            {String(topic.ordem).padStart(2, "0")} · {eli5CategoryLabels[topic.categoria]}
          </span>
          <span className="text-slate-500 dark:text-slate-400">{topic.tempoLeitura} de leitura</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {topic.titulo}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{topic.subtitulo}</p>
      </div>

      <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-6 dark:border-amber-500/30 dark:bg-amber-950/20">
        <h2 className="font-mono text-xs font-bold tracking-wide text-amber-900 uppercase dark:text-amber-300">
          Analogia: {topic.analogia.titulo}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-200">
          {topic.analogia.texto}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Como funciona na prática
        </h2>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {topic.explicacao}
        </p>
      </section>

      <Eli5CodeBlock
        titulo={topic.exemplo.titulo}
        linguagem={topic.exemplo.linguagem}
        codigo={topic.exemplo.codigo}
        oQueFaz={topic.exemplo.oQueFaz}
      />

      <section className="rounded-xl border border-blue-200/80 bg-blue-50/60 p-6 dark:border-blue-500/30 dark:bg-blue-950/20">
        <h2 className="font-mono text-xs font-bold tracking-wide text-blue-900 uppercase dark:text-blue-300">
          Por que isso importa?
        </h2>
        <p className="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-200">
          {topic.porQueImporta}
        </p>
      </section>

      <Eli5QuickCheck
        slug={topic.slug}
        pergunta={topic.check.pergunta}
        opcoes={topic.check.opcoes}
        correta={topic.check.correta}
        explicacao={topic.check.explicacao}
      />

      <nav
        aria-label="Navegação entre tópicos"
        className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
      >
        {prevTopic ? (
          <Link
            href={`/eli5/${prevTopic.slug}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
          >
            <span aria-hidden="true">←</span> {prevTopic.titulo}
          </Link>
        ) : (
          <span />
        )}

        {nextTopic ? (
          <Link
            href={`/eli5/${nextTopic.slug}`}
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
          >
            Próximo: {nextTopic.titulo} <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <Link
            href="/paths/foundations"
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
          >
            Ir para a trilha Fundamentos <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
