import { getSessionUserId } from "@/lib/auth";
import { carregarQuadro } from "@/lib/progresso";
import { SkillRadar } from "@/components/SkillRadar";
import { SkillSlider } from "@/components/SkillSlider";

export const metadata = { title: "Minha matriz" };

export default async function SkillsPage() {
  const userId = await getSessionUserId();
  const { niveis, baselines, logado } = await carregarQuadro(userId);

  return (
    <div>
      <h1 className="text-3xl font-bold">Minha matriz de competências</h1>
      {!logado && (
        <p className="mt-3 rounded bg-gray-100 p-3">
          Você está vendo uma matriz vazia. <a className="underline" href="/login">Entre</a> para
          salvar seu progresso e ajustar seu nível.
        </p>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <SkillRadar dados={niveis} />
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Níveis e metas</h2>
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
