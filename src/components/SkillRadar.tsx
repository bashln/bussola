export interface RadarSkill {
  slug: string;
  nome: string;
  nivel: number;
}

const CENTRO = 200;
const RAIO_MAXIMO = 150;

function ponto(indice: number, total: number, fracao: number) {
  const angulo = -Math.PI / 2 + (indice * 2 * Math.PI) / total;
  return {
    x: CENTRO + Math.cos(angulo) * RAIO_MAXIMO * fracao,
    y: CENTRO + Math.sin(angulo) * RAIO_MAXIMO * fracao,
  };
}

function poligono(total: number, fracao: number) {
  return Array.from({ length: total }, (_, indice) => {
    const p = ponto(indice, total, fracao);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
}

export function SkillRadar({ dados }: { dados: RadarSkill[] }) {
  if (dados.length === 0) return null;
  const total = dados.length;

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      className="mx-auto max-w-full"
      role="img"
      aria-label="Radar de competências"
    >
      {[1, 2, 3, 4, 5].map((nivel) => (
        <polygon
          key={nivel}
          points={poligono(total, nivel / 5)}
          className={
            nivel === 5
              ? "fill-none stroke-slate-300 dark:stroke-slate-600"
              : "fill-none stroke-slate-200 dark:stroke-slate-700"
          }
          strokeWidth="1"
        />
      ))}

      {dados.map((skill, indice) => {
        const p = ponto(indice, total, 1);
        return (
          <line
            key={`axis-${skill.slug}`}
            x1={CENTRO}
            y1={CENTRO}
            x2={p.x}
            y2={p.y}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={dados
          .map((skill, indice) => {
            const p = ponto(indice, total, skill.nivel / 5);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
          })
          .join(" ")}
        className="fill-blue-500/15 stroke-blue-600 dark:fill-amber-400/15 dark:stroke-amber-400"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />

      {dados.map((skill, indice) => {
        const p = ponto(indice, total, skill.nivel / 5);
        return (
          <circle
            key={skill.slug}
            data-testid={`vertice-${skill.slug}`}
            cx={p.x}
            cy={p.y}
            r={Math.max(2.5, skill.nivel * 2.5)}
            className="fill-blue-600 stroke-white dark:fill-amber-400 dark:stroke-slate-950"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
