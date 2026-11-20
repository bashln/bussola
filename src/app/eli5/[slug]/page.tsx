import Link from "next/link";
import { notFound } from "next/navigation";
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
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <Link href="/eli5" className="text-blue-700 hover:underline">
            ← Voltar para Comece do zero
          </Link>
          <span className="text-slate-300">·</span>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-900">
            {eli5CategoryLabels[topic.categoria]}
          </span>
          <span className="text-slate-500">{topic.tempoLeitura} de leitura</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {topic.titulo}
        </h1>
        <p className="text-lg text-slate-600">{topic.subtitulo}</p>
      </div>

      <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
        <h2 className="text-sm font-bold tracking-wide text-amber-900 uppercase">
          Analogia: {topic.analogia.titulo}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-slate-800">{topic.analogia.texto}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Como funciona na prática</h2>
        <p className="text-base leading-relaxed text-slate-700">{topic.explicacao}</p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">{topic.exemplo.titulo}</h2>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
            {topic.exemplo.linguagem}
          </span>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-100">
          <code>{topic.exemplo.codigo}</code>
        </pre>
        <p className="text-sm text-slate-600">
          <strong className="font-semibold text-slate-900">O que isso faz:</strong>{" "}
          {topic.exemplo.oQueFaz}
        </p>
      </section>

      <section className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-6">
        <h2 className="text-sm font-bold tracking-wide text-blue-900 uppercase">
          Por que isso importa?
        </h2>
        <p className="mt-2 text-base leading-relaxed text-slate-800">{topic.porQueImporta}</p>
      </section>

      <nav
        aria-label="Navegação entre tópicos"
        className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        {prevTopic ? (
          <Link
            href={`/eli5/${prevTopic.slug}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            ← {prevTopic.titulo}
          </Link>
        ) : (
          <span />
        )}

        {nextTopic ? (
          <Link
            href={`/eli5/${nextTopic.slug}`}
            className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Próximo: {nextTopic.titulo} →
          </Link>
        ) : (
          <Link
            href="/paths/foundations"
            className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Ir para a trilha Fundamentos →
          </Link>
        )}
      </nav>
    </article>
  );
}
