// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { StudySessionPanel } from "@/components/StudySessionPanel";
import type { Recurso } from "@/lib/types";

afterEach(cleanup);

describe("StudySessionPanel", () => {
  it("carrega o iframe do YouTube nocookie somente após clique", () => {
    const recursos: Recurso[] = [
      { tipo: "video", titulo: "Introdução", url: "https://www.youtube.com/watch?v=abcd1234XYZ" },
    ];
    render(<StudySessionPanel recursos={recursos} />);

    expect(document.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /assistir: introdução/i }));

    const iframe = document.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/abcd1234XYZ");
  });

  it("mostra URL não-YouTube como link, sem iframe", () => {
    const recursos = [
      { tipo: "video", titulo: "Errado", url: "https://vimeo.com/123" },
    ] as unknown as Recurso[];

    render(<StudySessionPanel recursos={recursos} />);

    expect(screen.getByRole("link", { name: /errado/i })).toHaveAttribute("href", "https://vimeo.com/123");
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("mostra o resumo do doc e abre em nova aba com rel seguro", () => {
    const recursos: Recurso[] = [
      {
        tipo: "doc",
        titulo: "MDN map",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
        resumo: "Veja o parâmetro callback.",
      },
    ];

    render(<StudySessionPanel recursos={recursos} />);

    expect(screen.getByText("Veja o parâmetro callback.")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /mdn map/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
