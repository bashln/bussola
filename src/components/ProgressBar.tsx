export function ProgressBar({
  atual,
  total,
  ariaLabel = "Progresso",
}: {
  atual: number;
  total: number;
  ariaLabel?: string;
}) {
  const bruto = total <= 0 ? 0 : Math.round((atual / total) * 100);
  const percentual = Math.min(100, Math.max(0, bruto));

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={percentual}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
    >
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-amber-400"
        style={{ width: `${percentual}%` }}
      />
    </div>
  );
}
