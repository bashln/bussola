"use client";

import { useState } from "react";

interface Eli5CodeBlockProps {
  titulo: string;
  linguagem: string;
  codigo: string;
  oQueFaz: string;
}

export function Eli5CodeBlock({ titulo, linguagem, codigo, oQueFaz }: Eli5CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">{titulo}</h2>
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {linguagem}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 rounded border px-2.5 py-0.5 font-mono text-xs font-medium transition-all duration-150 active:scale-95 ${
              copied
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
            }`}
          >
            {copied ? "✓ copiado" : "copiar"}
          </button>
        </div>
      </div>

      <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-[#0b0f17] p-4 font-mono text-sm leading-relaxed text-slate-100">
        <code>{codigo}</code>
      </pre>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        <strong className="font-semibold text-slate-900 dark:text-white">O que isso faz:</strong>{" "}
        {oQueFaz}
      </p>
    </section>
  );
}
