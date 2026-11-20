// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Eli5Page from "@/app/eli5/page";
import Eli5TopicPage from "@/app/eli5/[slug]/page";
import { getEli5TopicBySlug, getEli5Topics } from "@/lib/eli5";

afterEach(() => {
  cleanup();
});

describe("Modo ELI5", () => {
  it("lista tópicos essenciais em ordem e sem slugs duplicados", () => {
    const topics = getEli5Topics();
    const slugs = topics.map((t) => t.slug);

    expect(topics.length).toBeGreaterThanOrEqual(8);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("o-que-e-html");
    expect(slugs).toContain("o-que-e-css");
    expect(slugs).toContain("o-que-e-git");
    expect(slugs).toContain("linguagem-de-programacao");
    expect(slugs).toContain("o-que-e-funcao");
  });

  it("renderiza a página principal do modo ELI5", () => {
    render(<Eli5Page />);
    expect(screen.getByText("Nunca programou? Comece aqui.")).toBeInTheDocument();
    expect(screen.getByText("O que é HTML?")).toBeInTheDocument();
    expect(screen.getByText("O que é CSS?")).toBeInTheDocument();
    expect(screen.getByText("O que é Git (e GitHub)?")).toBeInTheDocument();
  });

  it("renderiza a página individual de um tópico com analogia e exemplo", async () => {
    const topic = getEli5TopicBySlug("o-que-e-html");
    expect(topic).toBeDefined();

    const ui = await Eli5TopicPage({ params: Promise.resolve({ slug: "o-que-e-html" }) });
    render(ui);

    expect(screen.getByText("O que é HTML?")).toBeInTheDocument();
    expect(screen.getByText(/Analogia:/)).toBeInTheDocument();
    expect(screen.getByText(/Como funciona na prática/)).toBeInTheDocument();
  });
});
