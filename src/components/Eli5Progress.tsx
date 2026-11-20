"use client";

import { useEffect, useState } from "react";
import { readEli5Progress } from "@/lib/eli5-progress";

export function Eli5Progress({ total }: { total: number }) {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setReadSlugs(readEli5Progress());
    sync();
    window.addEventListener("bussola-eli5-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bussola-eli5-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const count = Math.min(readSlugs.length, total);
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;

  const barColor =
    percent === 100
      ? "bg-emerald-500"
      : percent >= 50
        ? "bg-blue-600 dark:bg-blue-400"
        : "bg-amber-500 dark:bg-amber-400";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-slate-600 dark:text-slate-300">
          progresso: <strong className="text-slate-900 dark:text-white">{count} de {total}</strong>
        </span>
        <span className="text-slate-500 dark:text-slate-400">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Progresso no modo ELI5"
        className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function Eli5TopicBadge({ slug, ordem }: { slug: string; ordem: number }) {
  const [read, setRead] = useState(false);

  useEffect(() => {
    const sync = () => setRead(readEli5Progress().includes(slug));
    sync();
    window.addEventListener("bussola-eli5-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bussola-eli5-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  if (read) {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
        ✓ lido
      </span>
    );
  }

  return (
    <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {String(ordem).padStart(2, "0")}
    </span>
  );
}
