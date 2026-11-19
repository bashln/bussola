// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SkillSlider } from "@/components/SkillSlider";

afterEach(cleanup);

describe("SkillSlider", () => {
  it("inicia o baseline com o valor salvo, não com o nível calculado", () => {
    render(
      <SkillSlider
        skillSlug="nodejs"
        nome="Node.js"
        baseline={0}
        nivel={3}
        meta={5}
        logado
      />,
    );

    const baseline = screen.getByLabelText(/nível atual/i) as HTMLInputElement;
    expect(baseline.value).toBe("0");

    const meta = screen.getByLabelText(/meta/i) as HTMLInputElement;
    expect(meta.value).toBe("5");
  });
});
