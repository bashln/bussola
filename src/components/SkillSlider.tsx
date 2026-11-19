"use client";

import { useState } from "react";

interface Props {
  skillSlug: string;
  nome: string;
  nivel: number;
  meta: number;
  logado: boolean;
}

export function SkillSlider({ skillSlug, nome, nivel, meta, logado }: Props) {
  const [baseline, setBaseline] = useState(nivel);
  const [alvo, setAlvo] = useState(meta);
  const [mensagem, setMensagem] = useState<string | null>(null);

  if (!logado) {
    return <p className="text-sm text-gray-600">{nome}: nível {nivel} · meta {meta}</p>;
  }

  async function salvar(campo: "baseline" | "meta", valor: number) {
    const resposta = await fetch(`/api/${campo}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        campo === "baseline"
          ? { skillSlug, nivel: valor }
          : { skillSlug, nivelAlvo: valor },
      ),
    });
    setMensagem(resposta.ok ? null : "Não foi possível salvar.");
  }

  return (
    <li className="rounded border p-3">
      <p className="font-medium">{nome}</p>
      <label className="mt-2 block text-sm">
        Nível atual (conhecimento prévio)
        <input
          type="range"
          min={0}
          max={5}
          value={baseline}
          onChange={(evento) => setBaseline(Number(evento.target.value))}
          onPointerUp={(evento) =>
            salvar("baseline", Number((evento.target as HTMLInputElement).value))
          }
          onKeyUp={(evento) =>
            salvar("baseline", Number((evento.target as HTMLInputElement).value))
          }
          className="ml-2 w-full max-w-48"
        />
        <span className="ml-2">{baseline}</span>
      </label>
      <label className="mt-1 block text-sm">
        Meta
        <input
          type="range"
          min={1}
          max={5}
          value={alvo}
          onChange={(evento) => setAlvo(Number(evento.target.value))}
          onPointerUp={(evento) =>
            salvar("meta", Number((evento.target as HTMLInputElement).value))
          }
          onKeyUp={(evento) =>
            salvar("meta", Number((evento.target as HTMLInputElement).value))
          }
          className="ml-2 w-full max-w-48"
        />
        <span className="ml-2">{alvo}</span>
      </label>
      {mensagem && <p role="alert" className="text-sm text-red-700">{mensagem}</p>}
    </li>
  );
}
