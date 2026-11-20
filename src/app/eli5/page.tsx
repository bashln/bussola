import Link from "next/link";
import { Eli5Progress, Eli5TopicBadge } from "@/components/Eli5Progress";
import {
  eli5CategoryLabels,
  getEli5Topics,
  type Eli5Category,
} from "@/lib/eli5";

export const metadata = {
  title: "Comece do zero (ELI5)",
  description:
    "Explicações simples, sem jargão e com analogias do dia a dia para quem nunca programou.",
};

const categoryOrder: Eli5Category[] = ["base", "web", "ferramentas"];

export default function Eli5Page() {
  const topics = getEli5Topics();

  return (
    <div className="space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="transition-colors hover:text-slate-900 dark:hover:text-white">
          início
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 dark:text-slate-200">eli5</span>
      </nav>

      <section className="pixel-grid-bg relative overflow-hidden rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50/90 via-white to-blue-50/50 p-7 shadow-xs sm:p-10 dark:border-amber-500/30 dark:from-[#161412] dark:via-[#111827] dark:to-[#0f172a]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded bg-amber-200/80 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide text-amber-950 uppercase dark:bg-amber-400/15 dark:text-amber-300">
            00 · Modo ELI5 · Explique como se eu tivesse 5 anos
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Nunca programou? Comece aqui.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Você não precisa saber nada antes de começar. Aqui explicamos os conceitos mais básicos
            da programação usando analogias simples do dia a dia, sem jargão técnico e com exemplos
            curtos.
          </p>
        </div>

        <div className="mt-6 max-w-md rounded-xl border border-slate-200/90 bg-white/90 p-4 backdrop-blur-xs dark:border-slate-800 dark:bg-slate-950/70">
          <Eli5Progress total={topics.length} />
        </div>
      </section>

      <div className="space-y-10">
        {categoryOrder.map((category) => {
          const categoryTopics = topics.filter((t) => t.categoria === category);
          return (
            <section key={category} aria-labelledby={`cat-${category}`} className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <h2 id={`cat-${category}`} className="text-xl font-bold text-slate-900 dark:text-white">
                  {eli5CategoryLabels[category]}
                </h2>
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {categoryTopics.length} tópicos
                </span>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTopics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/eli5/${topic.slug}`}
                      className="group flex h-full flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-[#111827] dark:hover:border-amber-400/70"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                          <Eli5TopicBadge slug={topic.slug} ordem={topic.ordem} />
                          <span className="font-mono text-[11px]">{topic.tempoLeitura}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-amber-300">
                          {topic.titulo}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {topic.subtitulo}
                        </p>
                      </div>

                      <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-700 dark:text-amber-300">
                        ler explicação
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-150 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex sm:items-center sm:justify-between sm:p-8 dark:border-slate-800 dark:bg-[#111827]">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Já entendeu a base e quer praticar?
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
            Quando se sentir confortável com esses conceitos, siga para a trilha de Fundamentos com
            lições e projetos guiados.
          </p>
        </div>
        <Link
          href="/paths/foundations"
          className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 sm:mt-0 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
        >
          Ir para Fundamentos
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
