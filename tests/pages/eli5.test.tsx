// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Eli5Page from "@/app/eli5/page";
import Eli5TopicPage from "@/app/eli5/[slug]/page";
import { getEli5TopicBySlug, getEli5Topics } from "@/lib/eli5";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Modo ELI5", () => {
  it("lista tópicos essenciais em ordem, com check rápido e sem slugs duplicados", () => {
    const topics = getEli5Topics();
    const slugs = topics.map((t) => t.slug);

    expect(topics.length).toBeGreaterThanOrEqual(8);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("o-que-e-html");
    expect(slugs).toContain("o-que-e-css");
    expect(slugs).toContain("o-que-e-git");
    expect(slugs).toContain("linguagem-de-programacao");
    expect(slugs).toContain("o-que-e-funcao");
    for (const topic of topics) {
      expect(topic.check.opcoes.length).toBeGreaterThanOrEqual(2);
      expect(topic.check.correta).toBeGreaterThanOrEqual(0);
      expect(topic.check.correta).toBeLessThan(topic.check.opcoes.length);
    }
  });

  it("renderiza a página principal do modo ELI5 com barra de progresso", () => {
    render(<Eli5Page />);
    expect(screen.getByText("Nunca programou? Comece aqui.")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Progresso no modo ELI5" })).toBeInTheDocument();
    expect(screen.getByText("O que é HTML?")).toBeInTheDocument();
  });

  it("renderiza tópico com botão copiar e check rápido que salva progresso", async () => {
    const topic = getEli5TopicBySlug("o-que-e-html");
    expect(topic).toBeDefined();

    const ui = await Eli5TopicPage({ params: Promise.resolve({ slug: "o-que-e-html" }) });
    render(ui);

    expect(screen.getByRole("heading", { name: "O que é HTML?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "copiar" })).toBeInTheDocument();

    const correctOption = topic!.check.opcoes[topic!.check.correta];
    fireEvent.click(screen.getByRole("button", { name: new RegExp(correctOption) }));

    expect(screen.getByText(/✓ exato/)).toBeInTheDocument();
    expect(screen.getByText("✓ tópico lido")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("bussola-eli5-read") ?? "[]")).toContain("o-que-e-html");
  });
});
