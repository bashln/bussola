import { computeLevel } from "./level";
import type { CourseMeta, LessonMeta, Skill } from "./types";

export interface RoadmapInput {
  skills: Skill[];
  lessons: LessonMeta[];
  doneLessonIds: Set<string>;
  baselines: Record<string, number>;
  metas: Record<string, number>;
  courses: CourseMeta[];
}

export interface RoadmapItem {
  lessonSlug: string;
  skillSlug: string;
  nivel: number;
  meta: number;
  peso: number;
}

export function buildRoadmap(input: RoadmapInput): RoadmapItem[] {
  const ordemDoCurso = new Map(input.courses.map((curso) => [curso.slug, curso.ordem]));
  const slugsConhecidos = new Set(input.lessons.map((lesson) => lesson.slug));
  const candidatos: Array<RoadmapItem & { faltantes: number; ordem: number }> = [];

  for (const skill of input.skills) {
    const baseline = input.baselines[skill.id] ?? 0;
    const meta = Math.min(5, Math.max(1, input.metas[skill.id] ?? 5));
    const pesosConcluidos = input.lessons
      .filter((lesson) => input.doneLessonIds.has(lesson.slug))
      .reduce((total, lesson) => total + (lesson.skillWeights[skill.id] ?? 0), 0);
    const nivel = computeLevel(baseline, pesosConcluidos, skill.limiares);

    if (nivel >= meta) continue;

    for (const lesson of input.lessons) {
      if (input.doneLessonIds.has(lesson.slug)) continue;
      const peso = lesson.skillWeights[skill.id] ?? 0;
      if (peso <= 0) continue;

      const faltantes = lesson.prereqs.filter(
        (prereq) => slugsConhecidos.has(prereq) && !input.doneLessonIds.has(prereq),
      ).length;

      candidatos.push({
        lessonSlug: lesson.slug,
        skillSlug: skill.slug,
        nivel,
        meta,
        peso,
        faltantes,
        ordem: ordemDoCurso.get(lesson.curso) ?? 0,
      });
    }
  }

  candidatos.sort(
    (a, b) =>
      a.faltantes - b.faltantes ||
      b.peso - a.peso ||
      a.ordem - b.ordem ||
      a.lessonSlug.localeCompare(b.lessonSlug) ||
      a.skillSlug.localeCompare(b.skillSlug),
  );

  return candidatos.map((item) => ({
    lessonSlug: item.lessonSlug,
    skillSlug: item.skillSlug,
    nivel: item.nivel,
    meta: item.meta,
    peso: item.peso,
  }));
}
