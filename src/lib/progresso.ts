import { getCourses, getLessons } from "./content";
import { getBaselines, getMetas, listDoneLessonIds } from "./db/repositories";
import { computeLevel } from "./level";
import { buildRoadmap } from "./roadmap";
import { skills } from "./skills";

export async function carregarQuadro(userId: string | null) {
  const licoes = getLessons();
  const cursos = getCourses();
  const concluidas = userId ? await listDoneLessonIds(userId) : new Set<string>();
  const baselines = userId ? await getBaselines(userId) : {};
  const metas = userId ? await getMetas(userId) : {};

  const licoesFeitas = licoes.filter((licao) => concluidas.has(licao.slug));

  const niveis = skills.map((skill) => ({
    slug: skill.slug,
    nome: skill.nome,
    nivel: computeLevel(
      baselines[skill.slug] ?? 0,
      licoesFeitas.reduce((total, licao) => total + (licao.skillWeights[skill.id] ?? 0), 0),
      skill.limiares,
    ),
    meta: metas[skill.slug] ?? 5,
  }));

  const baselinesPorId = Object.fromEntries(
    skills.map((skill) => [skill.id, baselines[skill.slug] ?? 0]),
  );
  const metasPorId = Object.fromEntries(
    skills.map((skill) => [skill.id, metas[skill.slug] ?? 5]),
  );

  const roadmap = buildRoadmap({
    skills,
    lessons: licoes,
    doneLessonIds: concluidas,
    baselines: baselinesPorId,
    metas: metasPorId,
    courses: cursos,
  });

  return {
    licoes,
    concluidas,
    niveis,
    roadmap,
    baselines,
    metas,
    logado: Boolean(userId),
  };
}
