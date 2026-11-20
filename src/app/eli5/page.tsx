import Link from "next/link";
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
      <section className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-blue-50/60 p-8 shadow-xs sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/80 px-3 py-1 text-xs font-bold tracking-wide text-amber-900 uppercase">
          Modo ELI5 · Explique como se eu tivesse 5 anos
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Nunca programou? Comece aqui.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Você não precisa saber nada antes de começar. Aqui explicamos os conceitos mais básicos da
          programação usando analogias simples do dia a dia, sem jargão técnico e com exemplos
          curtos para você entender como tudo se conecta.
        </p>
      </section>

      <div className="space-y-10">
        {categoryOrder.map((category) => {
          const categoryTopics = topics.filter((t) => t.categoria === category);
          return (
            <section key={category} aria-labelledby={`cat-${category}`} className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-2">
                <h2 id={`cat-${category}`} className="text-xl font-bold text-slate-900">
                  {eli5CategoryLabels[category]}
                </h2>
                <span className="text-xs font-medium text-slate-500">
                  {categoryTopics.length} tópicos
                </span>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTopics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/eli5/${topic.slug}`}
                      className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-blue-300 hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700">
                            Passo {topic.ordem}
                          </span>
                          <span>{topic.tempoLeitura}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                          {topic.titulo}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {topic.subtitulo}
                        </p>
                      </div>

                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                        Ler explicação
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-0.5"
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

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold text-slate-900">
            Já entendeu a base e quer praticar?
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Quando se sentir confortável com esses conceitos, siga para a trilha de Fundamentos com
            lições e projetos guiados.
          </p>
        </div>
        <Link
          href="/paths/foundations"
          className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-800 sm:mt-0"
        >
          Ir para Fundamentos
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
