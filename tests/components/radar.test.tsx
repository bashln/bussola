// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SkillRadar } from "@/components/SkillRadar";

afterEach(cleanup);

const dados = [
  { slug: "a", nome: "Skill A", nivel: 0 },
  { slug: "b", nome: "Skill B", nivel: 3 },
];

describe("SkillRadar", () => {
  it("desenha um vértice por skill e usa o nível como raio", () => {
    render(<SkillRadar dados={dados} />);

    expect(document.querySelector("svg")).toHaveAttribute("viewBox", "0 0 400 400");
    expect(screen.getAllByTestId(/^vertice-/)).toHaveLength(2);

    const verticeA = screen.getByTestId("vertice-a");
    const verticeB = screen.getByTestId("vertice-b");
    expect(Number(verticeB.getAttribute("r"))).toBeGreaterThan(Number(verticeA.getAttribute("r")));
  });

  it("escala em tela estreita e mantém a lista depois do radar", () => {
    render(
      <div>
        <SkillRadar dados={dados} />
        <ul aria-label="Níveis"><li>Skill A</li></ul>
      </div>,
    );

    expect(document.querySelector("svg")).toHaveAttribute("preserveAspectRatio", "xMidYMid meet");
    expect(document.querySelector("svg")).toHaveClass("max-w-full");
    const elements = Array.from(document.body.querySelectorAll("*"));
    expect(elements.findIndex((el) => el.tagName === "svg")).toBeLessThan(
      elements.findIndex((el) => el.getAttribute("aria-label") === "Níveis"),
    );
  });
});
