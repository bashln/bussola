// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SkillSlider } from "@/components/SkillSlider";

const { mockRefresh } = vi.hoisted(() => ({ mockRefresh: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: mockRefresh }) }));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  mockRefresh.mockReset();
});

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

  it("salva o baseline e atualiza os dados do servidor", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <SkillSlider skillSlug="nodejs" nome="Node.js" baseline={0} nivel={0} meta={5} logado />,
    );

    const baseline = screen.getByLabelText(/nível atual/i) as HTMLInputElement;
    fireEvent.change(baseline, { target: { value: "2" } });
    fireEvent.pointerUp(baseline);

    await waitFor(() => expect(mockRefresh).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/baseline",
      expect.objectContaining({ method: "PUT" }),
    );
    expect(baseline.disabled).toBe(false);
  });
});
