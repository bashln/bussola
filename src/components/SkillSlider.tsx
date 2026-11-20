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

export function SkillSlider({
  skillSlug,
  nome,
  baseline: baselineInicial,
  nivel,
  meta,
  logado,
}: Props) {
  const [baseline, setBaseline] = useState(baselineInicial);
  const [alvo, setAlvo] = useState(meta);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

  if (!logado) {
    return (
      <li
        id={skillSlug}
        className="flex scroll-mt-24 items-center justify-between rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm shadow-xs dark:border-slate-800 dark:bg-[#111827]"
      >
        <span className="font-medium text-slate-800 dark:text-slate-100">{nome}</span>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
          nível {nivel} · meta {meta}
        </span>
      </li>
    );
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
    <li
      id={skillSlug}
      className="scroll-mt-24 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-slate-800 dark:bg-[#111827]"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-slate-900 dark:text-white">{nome}</p>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          nível {nivel} / meta {alvo}
        </span>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="flex items-center justify-between">
            <span>Nível atual (conhecimento prévio)</span>
            <span className="font-mono font-semibold text-slate-900 dark:text-amber-300">{baseline}</span>
          </span>
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
            className="mt-1.5 h-1.5 w-full cursor-pointer accent-blue-600 dark:accent-amber-400"
          />
        </label>

        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="flex items-center justify-between">
            <span>Meta</span>
            <span className="font-mono font-semibold text-slate-900 dark:text-amber-300">{alvo}</span>
          </span>
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
            className="mt-1.5 h-1.5 w-full cursor-pointer accent-emerald-600"
          />
        </label>
      </div>

      {mensagem && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {mensagem}
        </p>
      )}
    </li>
  );
}
