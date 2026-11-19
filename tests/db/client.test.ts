import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("getDb", () => {
  it("falha em produção quando DATABASE_URL não está definida", async () => {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DATABASE_URL", undefined);

    const { getDb } = await import("@/lib/db/client");
    expect(() => getDb()).toThrow(/DATABASE_URL/);
  });
});
