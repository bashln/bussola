import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

process.env.DATABASE_URL = "pglite://memory";

const { mockGetSessionUserId } = vi.hoisted(() => ({
  mockGetSessionUserId: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ getSessionUserId: mockGetSessionUserId }));

type Rotas = {
  progress: (request: Request) => Promise<Response>;
  baseline: (request: Request) => Promise<Response>;
  meta: (request: Request) => Promise<Response>;
};

let rotas: Rotas;
let repositorios: typeof import("@/lib/db/repositories");

const request = (body: unknown) =>
  new Request("http://localhost/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

beforeAll(async () => {
  const { getDb } = await import("@/lib/db/client");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  await migrate(getDb() as never, { migrationsFolder: "drizzle" });

  rotas = {
    progress: (await import("@/app/api/progress/route")).POST,
    baseline: (await import("@/app/api/baseline/route")).PUT,
    meta: (await import("@/app/api/meta/route")).PUT,
  };
  repositorios = await import("@/lib/db/repositories");
});

beforeEach(() => {
  mockGetSessionUserId.mockReset();
  mockGetSessionUserId.mockResolvedValue("u1");
});

describe("rotas de API", () => {
  it("POST /api/progress sem sessão retorna 401 e não salva", async () => {
    mockGetSessionUserId.mockResolvedValue(null);
    const resposta = await rotas.progress(request({ lessonSlug: "logica-programacao" }));
    expect(resposta.status).toBe(401);
    expect([...(await repositorios.listDoneLessonIds("u1"))]).toEqual([]);
  });

  it("POST /api/progress com slug inexistente retorna 404", async () => {
    const resposta = await rotas.progress(request({ lessonSlug: "nao-existe" }));
    expect(resposta.status).toBe(404);
  });

  it("PUT /api/baseline com nivel fora de 0..5 retorna 400", async () => {
    const resposta = await rotas.baseline(request({ skillSlug: "nodejs", nivel: 9 }));
    expect(resposta.status).toBe(400);
  });

  it("PUT /api/baseline com skill desconhecida retorna 400", async () => {
    const resposta = await rotas.baseline(request({ skillSlug: "inexistente", nivel: 3 }));
    expect(resposta.status).toBe(400);
  });

  it("PUT /api/meta com skill desconhecida retorna 400", async () => {
    const resposta = await rotas.meta(request({ skillSlug: "inexistente", nivelAlvo: 3 }));
    expect(resposta.status).toBe(400);
  });

  it("PUT /api/meta com nivelAlvo fora de 1..5 retorna 400", async () => {
    const resposta = await rotas.meta(request({ skillSlug: "nodejs", nivelAlvo: 0 }));
    expect(resposta.status).toBe(400);
  });

  it("PUT /api/baseline válido retorna 200 e persiste", async () => {
    const resposta = await rotas.baseline(request({ skillSlug: "nodejs", nivel: 3 }));
    expect(resposta.status).toBe(200);
    expect((await repositorios.getBaselines("u1")).nodejs).toBe(3);
  });
});
