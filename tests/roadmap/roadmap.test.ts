import { describe, expect, it } from "vitest";
import { buildRoadmap } from "@/lib/roadmap";
import type { CourseMeta, LessonMeta, Skill } from "@/lib/types";

const skills: Skill[] = [
  { id: "a", slug: "skill-a", nome: "A", categoria: "backend", descricao: "", limiares: [10, 20, 30, 40, 50] },
  { id: "b", slug: "skill-b", nome: "B", categoria: "backend", descricao: "", limiares: [10, 20, 30, 40, 50] },
];

const courses: CourseMeta[] = [
  { slug: "c1", path: "p", titulo: "C1", descricao: "", ordem: 1 },
  { slug: "c2", path: "p", titulo: "C2", descricao: "", ordem: 2 },
];

const lesson = (
  slug: string,
  curso: string,
  ordem: number,
  skillWeights: Record<string, number>,
  prereqs: string[] = [],
): LessonMeta => ({
  slug,
  curso,
  titulo: slug,
  tipo: "leitura",
  ordem,
  minutos: 10,
  skillWeights,
  prereqs,
  recursos: [],
});

const base = {
  skills,
  courses,
  baselines: { a: 0, b: 0 },
  metas: {},
};

describe("buildRoadmap", () => {
  it("sem metas usa alvo 5 e não devolve lista vazia", () => {
    const items = buildRoadmap({ ...base, lessons: [lesson("l1", "c1", 1, { a: 5 })], doneLessonIds: new Set() });
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.meta === 5)).toBe(true);
  });

  it("não sugere lição já concluída", () => {
    const items = buildRoadmap({
      ...base,
      lessons: [lesson("l1", "c1", 1, { a: 5 }), lesson("l2", "c1", 2, { a: 5 })],
      doneLessonIds: new Set(["l1"]),
    });
    expect(items.map((item) => item.lessonSlug)).not.toContain("l1");
  });

  it("ordena por prereqs satisfeitos, depois peso, depois ordem do curso", () => {
    const items = buildRoadmap({
      ...base,
      lessons: [
        lesson("l1", "c1", 1, { a: 5 }),
        lesson("l2", "c1", 2, { a: 20 }, ["l1"]),
        lesson("l3", "c2", 1, { a: 20 }),
      ],
      doneLessonIds: new Set(),
    });
    expect(items.map((item) => item.lessonSlug)).toEqual(["l3", "l1", "l2"]);
  });

  it("prereq inexistente ou ciclo não trava nem remove a lição", () => {
    const items = buildRoadmap({
      ...base,
      lessons: [
        lesson("orfao", "c1", 1, { a: 5 }, ["nao-existe"]),
        lesson("ciclo1", "c1", 2, { a: 5 }, ["ciclo2"]),
        lesson("ciclo2", "c1", 3, { a: 5 }, ["ciclo1"]),
      ],
      doneLessonIds: new Set(),
    });
    expect(items.map((item) => item.lessonSlug)).toContain("orfao");
    expect(items.map((item) => item.lessonSlug)).toContain("ciclo1");
    expect(items.map((item) => item.lessonSlug)).toContain("ciclo2");
  });
});
