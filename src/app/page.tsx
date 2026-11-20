import Link from "next/link";
import { skills } from "@/lib/skills";

const pillars = [
  {
    code: "01",
    titulo: "Trilhas estruturadas",
    descricao:
      "Do zero ao deploy com cursos sequenciais, sem pular fundamentos nem ficar perdido em tutoriais soltos.",
    href: "/paths",
    cta: "Ver trilhas",
  },
  {
    code: "02",
    titulo: "Matriz de competências",
    descricao:
      "Teste seus conhecimentos, acompanhe seu nível atual e defina metas claras em cada habilidade técnica.",
    href: "/skills",
    cta: "Abrir matriz",
  },
  {
    code: "03",
    titulo: "Progresso orientado a metas",
    descricao:
      "Receba sugestões automáticas das próximas lições que mais aproximam você dos seus objetivos.",
    href: "/dashboard",
    cta: "Ir para o painel",
  },
];

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xs sm:p-11 dark:border-slate-800 dark:bg-[#111827]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl dark:bg-blue-500/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-400/10"
        />

        <div className="relative space-y-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-slate-700 uppercase dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
              100% gratuito · Sem paywall · Open Source
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Aprenda web dev e acompanhe suas competências
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              Um currículo aberto para quem quer aprender desenvolvimento web de verdade e testar
              sua evolução na prática. Sem mensalidade, sem pegadinhas.
            </p>
          </div>

          {/* Guided 2-path choice */}
          <div className="space-y-3">
            <p className="font-mono text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Qual é o seu momento?
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/eli5"
                className="group pixel-grid-bg relative flex flex-col justify-between rounded-xl border border-amber-300/90 bg-amber-50/70 p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md dark:border-amber-500/40 dark:bg-amber-950/20 dark:hover:border-amber-400"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="rounded bg-amber-200/80 px-2 py-0.5 font-bold text-amber-950 dark:bg-amber-400/20 dark:text-amber-300">
                      00 · MODO ELI5
                    </span>
                    <span className="text-amber-800/70 transition-transform duration-150 group-hover:translate-x-1 dark:text-amber-300">
                      →
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                    Nunca programei
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    Comece pelo básico do básico: o que é HTML, CSS, Git, função e terminal — com
                    analogias simples e zero jargão.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-900 dark:text-amber-300">
                  Abrir Modo ELI5
                </span>
              </Link>

              <Link
                href="/paths"
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/70 dark:hover:border-blue-400 dark:hover:bg-slate-900"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="rounded bg-blue-100 px-2 py-0.5 font-bold text-blue-900 dark:bg-blue-500/20 dark:text-blue-300">
                      01 · TRILHAS
                    </span>
                    <span className="text-slate-400 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      →
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                    Já tenho uma noção
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Vá direto para as trilhas estruturadas com cursos, projetos práticos e
                    acompanhamento de competências.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">
                  Ver trilhas estruturadas
                </span>
              </Link>
            </div>

            <div className="pt-1">
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                Ou explore direto a matriz de competências
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pillars-heading">
        <h2 id="pillars-heading" className="sr-only">
          Como funciona
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.titulo}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-150 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-[#111827] dark:hover:border-slate-700"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {pillar.code}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  {pillar.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {pillar.descricao}
                </p>
              </div>
              <Link
                href={pillar.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {pillar.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-blue-900/15 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 p-8 text-white shadow-sm sm:p-10 dark:border-slate-800">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-amber-400/15 px-3 py-1 font-mono text-xs font-bold tracking-wide text-amber-300 uppercase">
              Manifesto aberto
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Educação técnica aberta, gratuita e transparente
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Assim como grandes projetos open-source da comunidade, a Bússola existe para dar
              direção clara a quem estuda por conta própria: todo o conteúdo, código e matriz de
              habilidades são abertos para você usar, estudar e contribuir.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contribuir"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:bg-amber-300"
            >
              Como contribuir
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              O que você vai desenvolver
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Competências mapeadas do básico ao avançado para guiar seus estudos.
            </p>
          </div>
          <Link
            href="/skills"
            className="text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Explorar todas as {skills.length} competências →
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {skills.slice(0, 10).map((skill) => (
            <li
              key={skill.id}
              className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {skill.nome}
            </li>
          ))}
          {skills.length > 10 && (
            <li className="rounded-full border border-dashed border-slate-300 bg-white px-3.5 py-1.5 font-mono text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              +{skills.length - 10} competências
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
