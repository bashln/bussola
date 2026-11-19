// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LessonCompleteButton", () => {
  it("deslogado convida a entrar e não chama a API", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<LessonCompleteButton lessonSlug="logica-programacao" logado={false} />);

    expect(screen.getByRole("link", { name: /entre para acompanhar/i })).toHaveAttribute(
      "href",
      "/login?callbackUrl=/lessons/logica-programacao",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("logado envia a conclusão e confirma na tela", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<LessonCompleteButton lessonSlug="logica-programacao" logado />);

    fireEvent.click(screen.getByRole("button", { name: /marcar como concluído/i }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Concluído"));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/progress",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
