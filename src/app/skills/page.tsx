import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { carregarQuadro } from "@/lib/progresso";
import { SkillRadar } from "@/components/SkillRadar";
import { SkillSlider } from "@/components/SkillSlider";

export const metadata = { title: "Minha matriz" };

export default async function SkillsPage() {
  const userId = await getSessionUserId();
  const { niveis, baselines, logado } = await carregarQuadro(userId);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Minha matriz de competências
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Visualize seu equilíbrio técnico no radar e ajuste seu nível base ou meta em cada
          competência.
        </p>
      </div>

      {!logado && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200">
          <p>
            Você está vendo uma matriz vazia. Entre para salvar seu progresso e ajustar seu nível.
          </p>
          <Link
            href="/login"
            className="rounded-lg bg-amber-900 px-3.5 py-1.5 font-semibold text-white transition-colors hover:bg-amber-800 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
          >
            Entrar
          </Link>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs lg:sticky lg:top-24 dark:border-slate-800 dark:bg-[#111827]">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Radar de competências</h2>
            <p className="mb-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
              Escala de 0 a 5 combinando seu conhecimento prévio e lições concluídas.
            </p>
            <SkillRadar dados={niveis} />
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Níveis e metas</h2>
          <ul className="space-y-3">
            {niveis.map((skill) => (
              <SkillSlider
                key={skill.slug}
                skillSlug={skill.slug}
                nome={skill.nome}
                baseline={baselines[skill.slug] ?? 0}
                nivel={skill.nivel}
                meta={skill.meta}
                logado={logado}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
