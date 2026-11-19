"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  skillSlug: string;
  nome: string;
  baseline: number;
  nivel: number;
  meta: number;
  logado: boolean;
}

export function SkillSlider({ skillSlug, nome, baseline: baselineInicial, nivel, meta, logado }: Props) {
  const [baseline, setBaseline] = useState(baselineInicial);
  const [alvo, setAlvo] = useState(meta);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

  if (!logado) {
    return <p className="text-sm text-gray-600">{nome}: nível {nivel} · meta {meta}</p>;
  }

  async function salvar(campo: "baseline" | "meta", valor: number) {
    setSalvando(true);
    setMensagem(null);
    try {
      const resposta = await fetch(`/api/${campo}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(
          campo === "baseline"
            ? { skillSlug, nivel: valor }
            : { skillSlug, nivelAlvo: valor },
        ),
      });
      if (resposta.ok) router.refresh();
      else setMensagem("Não foi possível salvar.");
    } catch {
      setMensagem("Não foi possível salvar.");
    } finally {
      setSalvando(false);
    }
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
          disabled={salvando}
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
          disabled={salvando}
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
