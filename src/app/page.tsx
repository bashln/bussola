import Link from "next/link";
import { skills } from "@/lib/skills";

const pillars = [
  {
    titulo: "Trilhas estruturadas",
    descricao:
      "Do zero ao deploy com cursos sequenciais, sem pular fundamentos nem ficar perdido em tutoriais soltos.",
    href: "/paths",
    cta: "Ver trilhas",
  },
  {
    titulo: "Matriz de competências",
    descricao:
      "Teste seus conhecimentos, acompanhe seu nível atual e defina metas claras em cada habilidade técnica.",
    href: "/skills",
    cta: "Abrir matriz",
  },
  {
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
      <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold tracking-wide text-blue-800 uppercase">
            <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
            100% gratuito · Sem paywall · Open Source
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Aprenda web dev e acompanhe suas competências
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Um currículo aberto para quem quer aprender desenvolvimento web de verdade e testar sua
            evolução na prática. Sem mensalidade, sem pegadinhas — feito pela comunidade para
            qualquer pessoa usar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/paths"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-800 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Começar gratuitamente
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/eli5"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-900 shadow-xs transition-colors hover:border-amber-400 hover:bg-amber-100"
            >
              Nunca programou? Modo ELI5
            </Link>
            <Link
              href="/skills"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              Ver matriz de competências
            </Link>
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
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900">{pillar.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.descricao}</p>
              </div>
              <Link
                href={pillar.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800"
              >
                {pillar.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-blue-900/15 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-8 text-white shadow-sm sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold tracking-wide text-amber-300 uppercase">
              Manifesto aberto
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Educação técnica aberta, gratuita e transparente
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/90 sm:text-base">
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

      <section className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              O que você vai desenvolver
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Competências mapeadas do básico ao avançado para guiar seus estudos.
            </p>
          </div>
          <Link
            href="/skills"
            className="text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800"
          >
            Explorar todas as {skills.length} competências →
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {skills.slice(0, 10).map((skill) => (
            <li
              key={skill.id}
              className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700"
            >
              {skill.nome}
            </li>
          ))}
          {skills.length > 10 && (
            <li className="rounded-full border border-dashed border-slate-300 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-500">
              +{skills.length - 10} competências
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
