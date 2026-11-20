// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import { skills } from "@/lib/skills";

afterEach(cleanup);

describe("Home page visual hierarchy and navigation", () => {
  it("renders filled primary CTAs on entry cards and demotes Como contribuir to secondary", () => {
    render(<Home />);

    const eli5Card = screen.getByRole("link", { name: /Nunca programei/i });
    const contribuirLink = screen.getByRole("link", { name: /Como contribuir/i });

    expect(eli5Card.className).not.toContain("pixel-grid-bg");
    expect(screen.getByText(/Abrir Modo ELI5/i).className).toContain("bg-amber-500");
    expect(screen.getByText(/Ver trilhas estruturadas/i).className).toContain("bg-blue-600");
    expect(contribuirLink.className).not.toContain("bg-amber-400");
    expect(contribuirLink.className).toContain("border");
  });

  it("links every skill pill and the overflow pill to /skills", () => {
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

  it("keeps the top badge on one line and the matrix link arrow inline", () => {
    render(<Home />);

    const badge = screen.getByText(/100% gratuito · Sem paywall · Open Source/i);
    expect(badge.className).toContain("whitespace-nowrap");

    const matrixLink = screen.getByRole("link", {
      name: /Ou explore direto a matriz de competências/i,
    });
    expect(matrixLink.className).not.toContain("inline-flex");
  });
});
