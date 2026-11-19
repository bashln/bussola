import { beforeAll, describe, expect, it } from "vitest";

process.env.DATABASE_URL = "pglite://memory";

type Repositorios = typeof import("@/lib/db/repositories");
let repositorios: Repositorios;

beforeAll(async () => {
  const { getDb } = await import("@/lib/db/client");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  await migrate(getDb() as never, { migrationsFolder: "drizzle" });
  repositorios = await import("@/lib/db/repositories");
});

describe("repositórios de progresso", () => {
  it("faz round-trip de progresso, baseline e meta para um usuário", async () => {
    await repositorios.saveProgress("u1", "logica-programacao");
    await repositorios.setBaseline("u1", "nodejs", 3);
    await repositorios.setMeta("u1", "nodejs", 4);

    expect([...(await repositorios.listDoneLessonIds("u1"))]).toEqual(["logica-programacao"]);
    expect((await repositorios.getBaselines("u1")).nodejs).toBe(3);
    expect((await repositorios.getMetas("u1")).nodejs).toBe(4);
  });

  it("mantém baselines e metas de usuários diferentes separados", async () => {
    await repositorios.setBaseline("u2", "git", 2);
    await repositorios.setMeta("u2", "git", 5);

    expect((await repositorios.getBaselines("u1")).git).toBeUndefined();
    expect((await repositorios.getMetas("u1")).git).toBeUndefined();
    expect((await repositorios.getBaselines("u2")).git).toBe(2);
    expect((await repositorios.getMetas("u2")).git).toBe(5);
  });
});
