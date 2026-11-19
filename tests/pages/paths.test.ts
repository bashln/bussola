import path from "node:path";
import { unlinkSync, writeFileSync } from "node:fs";
import { afterAll, describe, expect, it } from "vitest";
import { generateStaticParams } from "@/app/paths/[slug]/page";

const arquivoTemporario = path.join(process.cwd(), "content/paths/slug-teste-temporario.mdx");

writeFileSync(
  arquivoTemporario,
  `---
slug: slug-teste-temporario
titulo: Temporário
descricao: Path criado pelo teste.
ordem: 99
cursos: []
---

Conteúdo temporário.
`,
);

afterAll(() => unlinkSync(arquivoTemporario));

describe("generateStaticParams de paths", () => {
  it("inclui paths adicionados ao conteúdo sem editar código", () => {
    expect(generateStaticParams().map((item) => item.slug)).toContain("slug-teste-temporario");
  });
});
