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
      className="max-w-full"
      role="img"
      aria-label="Radar de hardskills"
    >
      {[1, 2, 3, 4, 5].map((nivel) => (
        <polygon
          key={nivel}
          points={poligono(total, nivel / 5)}
          fill="none"
          stroke="#d1d5db"
          strokeWidth="1"
        />
      ))}

      {dados.map((skill, indice) => {
        const p = ponto(indice, total, skill.nivel / 5);
        return (
          <circle
            key={skill.slug}
            data-testid={`vertice-${skill.slug}`}
            cx={p.x}
            cy={p.y}
            r={Math.max(1, skill.nivel * 3)}
            fill="#1d4ed8"
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
        fill="rgba(29, 78, 216, 0.15)"
        stroke="#1d4ed8"
        strokeWidth="2"
      />
    </svg>
  );
}
