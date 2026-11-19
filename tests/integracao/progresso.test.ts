import { beforeAll, describe, expect, it } from "vitest";

process.env.DATABASE_URL = "pglite://memory";

let carregarQuadro: typeof import("@/lib/progresso").carregarQuadro;
let saveProgress: typeof import("@/lib/db/repositories").saveProgress;

beforeAll(async () => {
  const { getDb } = await import("@/lib/db/client");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  await migrate(getDb() as never, { migrationsFolder: "drizzle" });
  carregarQuadro = (await import("@/lib/progresso")).carregarQuadro;
  saveProgress = (await import("@/lib/db/repositories")).saveProgress;
});

describe("carregarQuadro com progresso real", () => {
  it("concluir uma lição sobe o nível e remove a lição do roadmap", async () => {
    const antes = await carregarQuadro("u-integracao");
    const skillAntes = antes.niveis.find((item) => item.slug === "logica-programacao");
    expect(skillAntes?.nivel).toBe(0);
    expect(antes.roadmap.map((item) => item.lessonSlug)).toContain("logica-programacao");

    await saveProgress("u-integracao", "logica-programacao");
    const depois = await carregarQuadro("u-integracao");

    const skillDepois = depois.niveis.find((item) => item.slug === "logica-programacao");
    expect(skillDepois?.nivel).toBeGreaterThan(0);
    expect(depois.roadmap.map((item) => item.lessonSlug)).not.toContain("logica-programacao");
  });
});
