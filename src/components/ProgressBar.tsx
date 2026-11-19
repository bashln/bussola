export function ProgressBar({ atual, total }: { atual: number; total: number }) {
  const percentual = total === 0 ? 0 : Math.round((atual / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={percentual}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 w-full rounded bg-gray-200"
    >
      <div className="h-2 rounded bg-blue-700" style={{ width: `${percentual}%` }} />
    </div>
  );
}
