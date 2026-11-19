// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";

const { mockRefresh } = vi.hoisted(() => ({ mockRefresh: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: mockRefresh }) }));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  mockRefresh.mockReset();
});

describe("LessonCompleteButton", () => {
  it("deslogado convida a entrar e não chama a API", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<LessonCompleteButton lessonSlug="logica-programacao" logado={false} concluidoInicial={false} />);

    expect(screen.getByRole("link", { name: /entre para acompanhar/i })).toHaveAttribute(
      "href",
      "/login?callbackUrl=/lessons/logica-programacao",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("já concluído mostra o status e não oferece o botão", () => {
    render(<LessonCompleteButton lessonSlug="logica-programacao" logado concluidoInicial />);

    expect(screen.getByRole("status")).toHaveTextContent("Concluído");
    expect(screen.queryByRole("button", { name: /marcar como concluído/i })).not.toBeInTheDocument();
  });

  it("logado envia a conclusão e confirma na tela", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<LessonCompleteButton lessonSlug="logica-programacao" logado concluidoInicial={false} />);

    fireEvent.click(screen.getByRole("button", { name: /marcar como concluído/i }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Concluído"));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/progress",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
