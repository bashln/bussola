"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  lessonSlug: string;
  logado: boolean;
  concluidoInicial: boolean;
  hrefPrefix?: "/lessons" | "/projects";
}

export function LessonCompleteButton({
  lessonSlug,
  logado,
  concluidoInicial,
  hrefPrefix = "/lessons",
}: Props) {
  const router = useRouter();
  const [concluido, setConcluido] = useState(concluidoInicial);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!logado) {
    return (
      <Link
        className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
        href={`/login?callbackUrl=${hrefPrefix}/${lessonSlug}`}
      >
        Entre para acompanhar
      </Link>
    );
  }

  if (concluido) {
    return (
      <p
        role="status"
        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
      >
        <span aria-hidden="true">✓</span>
        Concluído
      </p>
    );
  }

  async function marcar() {
    setErro(null);
    setSalvando(true);
    try {
      const resposta = await fetch("/api/progress", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lessonSlug }),
      });
      if (resposta.ok) {
        setConcluido(true);
        router.refresh();
      } else {
        setErro("Não foi possível salvar. Tente novamente.");
      }
    } catch {
      setErro("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={salvando}
        aria-busy={salvando}
        className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60 sm:w-auto"
        onClick={marcar}
      >
        {salvando ? "Salvando..." : "Marcar como concluído"}
      </button>
      {erro && (
        <p role="alert" className="mt-2 text-sm font-medium text-rose-600">
          {erro}
        </p>
      )}
    </div>
  );
}
