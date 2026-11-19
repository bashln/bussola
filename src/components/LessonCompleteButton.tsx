"use client";

import { useState } from "react";

interface Props {
  lessonSlug: string;
  logado: boolean;
}

export function LessonCompleteButton({ lessonSlug, logado }: Props) {
  const [concluido, setConcluido] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!logado) {
    return (
      <a
        className="inline-block rounded bg-blue-700 px-4 py-2 text-white"
        href={`/login?callbackUrl=/lessons/${lessonSlug}`}
      >
        Entre para acompanhar
      </a>
    );
  }

  if (concluido) {
    return <p role="status" className="font-medium text-green-700">Concluído</p>;
  }

  async function marcar() {
    setErro(null);
    const resposta = await fetch("/api/progress", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lessonSlug }),
    });
    if (resposta.ok) setConcluido(true);
    else setErro("Não foi possível salvar. Tente novamente.");
  }

  return (
    <div>
      <button
        type="button"
        className="rounded bg-blue-700 px-4 py-2 text-white"
        onClick={marcar}
      >
        Marcar como concluído
      </button>
      {erro && <p role="alert" className="mt-2 text-red-700">{erro}</p>}
    </div>
  );
}
