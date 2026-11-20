import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { carregarQuadro } from "@/lib/progresso";
import { ProgressBar } from "@/components/ProgressBar";
import { skills } from "@/lib/skills";

export const metadata = { title: "Painel" };

export default async function DashboardPage() {
  const userId = await getSessionUserId();
  const { licoes, concluidas, roadmap, niveis, logado } = await carregarQuadro(userId);

  const proximos = roadmap.slice(0, 6).map((item) => ({
    ...item,
    licao: licoes.find((licao) => licao.slug === item.lessonSlug),
  }));

  const percentual = licoes.length > 0 ? Math.round((concluidas.size / licoes.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Seu painel</h1>
        <p className="mt-2 text-base text-slate-600">
          Visão geral do seu progresso no currículo e próximos passos recomendados.
        </p>
      </div>

      {!logado && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p>Você ainda não entrou. Faça login para salvar lições concluídas e metas.</p>
          <Link
            href="/login"
            className="rounded-lg bg-amber-900 px-3.5 py-1.5 font-semibold text-white transition-colors hover:bg-amber-800"
          >
            Entrar
          </Link>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Progresso do currículo</h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              {percentual}%
            </span>
          </div>
          <div className="mt-4">
            <ProgressBar atual={concluidas.size} total={licoes.length} />
            <p className="mt-2.5 text-sm text-slate-600">
              <strong className="font-semibold text-slate-900">{concluidas.size}</strong> de{" "}
              <strong className="font-semibold text-slate-900">{licoes.length}</strong> lições
              concluídas
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Sugestões ativas</h2>
            <p className="mt-2 text-3xl font-extrabold text-blue-600">{roadmap.length}</p>
          </div>
          <Link
            href="/skills"
            className="mt-4 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Ajustar metas <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">Próximas lições sugeridas</h2>
          <ul className="mt-4 space-y-3">
            {proximos.map((item) => {
              const skillNome =
                skills.find((skill) => skill.slug === item.skillSlug)?.nome ?? item.skillSlug;
              return (
                <li key={`${item.lessonSlug}-${item.skillSlug}`}>
                  <Link
                    href={`/lessons/${item.lessonSlug}`}
                    className="group block rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-semibold text-slate-900 group-hover:text-blue-700">
                        {item.licao?.titulo ?? item.lessonSlug}
                      </span>
                      <span className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600">
                        →
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-600">
                      Desenvolve{" "}
                      <span className="font-medium text-slate-800">{skillNome}</span>
                      {" · nível "}
                      {item.nivel} de {item.meta}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
          {proximos.length === 0 && (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
              <p>Nenhuma sugestão ativa no momento.</p>
              <Link
                href="/paths"
                className="mt-3 inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
              >
                Explorar trilhas <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Skills mais próximas da meta</h2>
          <ul className="mt-4 space-y-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            {[...niveis]
              .filter((s) => s.meta > 0 && s.nivel < s.meta)
              .sort((a, b) => a.meta - a.nivel - (b.meta - b.nivel))
              .slice(0, 5)
              .map((skill) => (
                <li key={skill.slug} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <Link
                      href="/skills"
                      className="font-medium text-slate-800 transition-colors hover:text-blue-700"
                    >
                      {skill.nome}
                    </Link>
                    <span className="font-mono text-xs text-slate-500">
                      {skill.nivel}/{skill.meta}
                    </span>
                  </div>
                  <ProgressBar
                    atual={skill.nivel}
                    total={skill.meta}
                    ariaLabel={`Progresso em ${skill.nome}`}
                  />
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
