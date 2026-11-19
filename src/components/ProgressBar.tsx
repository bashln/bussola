export function ProgressBar({ atual, total }: { atual: number; total: number }) {
  const percentual = total === 0 ? 0 : Math.round((atual / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={percentual}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
        style={{ width: `${percentual}%` }}
      />
    </div>
  );
}
