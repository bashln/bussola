// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import { skills } from "@/lib/skills";

afterEach(cleanup);

describe("Hierarquia visual e navegação da home", () => {
  it("mantém CTAs preenchidos nos cards de entrada e rebaixa Como contribuir para secundário", () => {
    render(<Home />);

    const eli5Card = screen.getByRole("link", { name: /Nunca programei/i });
    const contribuirLink = screen.getByRole("link", { name: /Como contribuir/i });

    expect(eli5Card.className).not.toContain("pixel-grid-bg");
    expect(screen.getByText(/Abrir Modo ELI5/i).className).toContain("bg-amber-500");
    expect(screen.getByText(/Ver trilhas estruturadas/i).className).toContain("bg-blue-600");
    expect(contribuirLink.className).not.toContain("bg-amber-400");
    expect(contribuirLink.className).toContain("border");
  });

  it("liga cada pill de skill e o pill de excedente para /skills", () => {
    render(<Home />);

    for (const skill of skills.slice(0, 10)) {
      const link = screen.getByRole("link", { name: skill.nome });
      expect(link).toHaveAttribute("href", `/skills#${skill.slug}`);
    }

    const overflowLink = screen.getByRole("link", {
      name: `+${skills.length - 10} competências`,
    });
    expect(overflowLink).toHaveAttribute("href", "/skills");
  });

  it("mantém o selo do topo em uma linha e a seta do link da matriz inline", () => {
    render(<Home />);

    const badge = screen.getByText(/100% gratuito · Sem paywall · Open Source/i);
    expect(badge.className).toContain("whitespace-nowrap");

    const matrixLink = screen.getByRole("link", {
      name: /Ou explore direto a matriz de competências/i,
    });
    expect(matrixLink.className).not.toContain("inline-flex");
  });
});
