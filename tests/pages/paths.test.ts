import { describe, expect, it, vi } from "vitest";

const { mockGetPaths } = vi.hoisted(() => ({ mockGetPaths: vi.fn() }));

vi.mock("@/lib/content", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/content")>();
  return { ...actual, getPaths: mockGetPaths };
});

describe("generateStaticParams de paths", () => {
  it("deriva os slugs do conteúdo em vez de fixá-los no código", async () => {
    mockGetPaths.mockReturnValue([
      { slug: "foundations", titulo: "", descricao: "", ordem: 1, cursos: [] },
      { slug: "slug-novo", titulo: "", descricao: "", ordem: 2, cursos: [] },
    ]);

    const { generateStaticParams } = await import("@/app/paths/[slug]/page");
    expect(generateStaticParams().map((item) => item.slug)).toEqual([
      "foundations",
      "slug-novo",
    ]);
  });
});
