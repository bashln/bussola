export function computeLevel(
  baseline: number,
  doneWeights: number,
  limiares: readonly number[],
): number {
  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const base = clamp(Number.isFinite(baseline) ? Math.trunc(baseline) : 0, 0, 5);
  const weights = Number.isFinite(doneWeights) ? Math.max(0, doneWeights) : 0;

  if (limiares.length === 0) return base;

  const pontoDePartida = base > 0 ? limiares[base - 1] : 0;
  const score = pontoDePartida + weights;

  let nivel = 0;
  for (let i = 0; i < limiares.length; i += 1) {
    if (score >= limiares[i]) nivel = i + 1;
  }
  return clamp(nivel, 0, 5);
}
