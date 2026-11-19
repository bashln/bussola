import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { parseLessonFrontmatter, parseSkill } from "@/lib/content-schema";
import { getLesson, getLessons, getPaths } from "@/lib/content";

const fixtureData = (name: string) =>
  matter(readFileSync(path.join(__dirname, "fixtures", name), "utf8")).data;

describe("schema de conteúdo", () => {
  it("rejeita skillWeight negativo em uma lição", () => {
    const data = fixtureData("peso-negativo.mdx");
    expect(() => parseLessonFrontmatter(data)).toThrow();
  });

  it("rejeita recurso de vídeo que não é do YouTube", () => {
    const data = fixtureData("video-invalido.mdx");
    expect(() => parseLessonFrontmatter(data)).toThrow();
  });

  it("rejeita skill com menos de cinco limiares", () => {
    expect(() =>
      parseSkill({
        id: "node",
        slug: "node",
        nome: "Node.js",
        categoria: "backend",
        descricao: "Runtime",
        limiares: [10, 25],
      }),
    ).toThrow();
  });

  it("aceita um MDX válido e devolve recursos tipados", () => {
    const lesson = parseLessonFrontmatter(fixtureData("valida.mdx"));
    expect(lesson.slug).toBe("exemplo-valido");
    expect(lesson.recursos.map((r) => r.tipo)).toEqual(["video", "doc"]);
  });
});

describe("carregador de conteúdo", () => {
  it("getLesson devolve null para slug inexistente", () => {
    expect(getLesson("slug-que-nao-existe")).toBeNull();
  });

  it("getPaths devolve as trilhas semente em ordem", () => {
    expect(getPaths().map((p) => p.slug)).toEqual(["foundations", "full-stack-node"]);
  });

  it("getLessons filtra por tipo projeto", () => {
    expect(getLessons({ tipo: "projeto" }).length).toBeGreaterThan(0);
    expect(getLessons({ tipo: "projeto" }).every((l) => l.tipo === "projeto")).toBe(true);
  });
});
