"use client";

import { useState, useSyncExternalStore } from "react";
import { markEli5Read, readEli5Progress } from "@/lib/eli5-progress";

interface Eli5QuickCheckProps {
  slug: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

function subscribe(callback: () => void) {
  window.addEventListener("bussola-eli5-progress", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("bussola-eli5-progress", callback);
    window.removeEventListener("storage", callback);
  };
}

export function Eli5QuickCheck({
  slug,
  pergunta,
  opcoes,
  correta,
  explicacao,
}: Eli5QuickCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const alreadyRead = useSyncExternalStore(
    subscribe,
    () => readEli5Progress().includes(slug),
    () => false,
  );

  function handleSelect(index: number) {
    setSelected(index);
    markEli5Read(slug);
  }

  const isCorrect = selected === correta;

  return (
    <section
      aria-label="Check rápido"
      className="rounded-xl border border-slate-300 bg-slate-950 p-5 text-slate-100 shadow-xs dark:border-slate-800 dark:bg-[#0d1320]"
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <span className="font-mono text-xs font-semibold text-amber-400">
          &gt;_ check rápido
        </span>
        {alreadyRead && (
          <span className="font-mono text-[11px] text-emerald-400">✓ tópico lido</span>
        )}
      </div>

      <p className="mt-4 text-sm font-semibold text-white sm:text-base">{pergunta}</p>

      <div className="mt-4 grid gap-2">
        {opcoes.map((opcao, index) => {
          const isPicked = selected === index;
          const showCorrect = selected !== null && index === correta;
          const showWrong = isPicked && index !== correta;

          return (
            <button
              key={opcao}
              type="button"
              onClick={() => handleSelect(index)}
              className={`flex items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-all duration-150 ${
                showCorrect
                  ? "border-emerald-500/70 bg-emerald-500/15 text-emerald-100"
                  : showWrong
                    ? "border-rose-500/70 bg-rose-500/15 text-rose-100"
                    : "border-slate-800 bg-slate-900/80 text-slate-200 hover:border-slate-600 hover:bg-slate-900"
              }`}
            >
              <span className="mt-0.5 font-mono text-xs text-slate-400">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{opcao}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          className={`mt-4 rounded-lg border px-3.5 py-3 text-sm ${
            isCorrect
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-amber-500/40 bg-amber-500/10 text-amber-200"
          }`}
        >
          <span className="font-mono text-xs font-bold uppercase">
            {isCorrect ? "✓ exato" : "quase lá"}:{" "}
          </span>
          {explicacao}
        </div>
      )}
    </section>
  );
}
