import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { carregarQuadro } from "@/lib/progresso";
import { ProgressBar } from "@/components/ProgressBar";
import { skills } from "@/lib/skills";

export const metadata = { title: "Painel" };

export default async function DashboardPage() {
  const userId = await getSessionUserId();
  const { licoes, concluidas, roadmap, niveis, logado } = await carregarQuadro(userId);

  const proximos = roadmap.slice(0, 6).map((item) => ({
    ...item,
    licao: licoes.find((licao) => licao.slug === item.lessonSlug),
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold">Seu painel</h1>
      {!logado && (
        <p className="mt-3 rounded bg-gray-100 p-3">
          <a className="underline" href="/login">Entre</a> para acompanhar seu progresso.
        </p>
      )}

      <section className="mt-8 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Progresso do currículo</h2>
        <div className="mt-4 max-w-md">
          <ProgressBar atual={concluidas.size} total={licoes.length} />
          <p className="mt-2 text-sm text-gray-600">
            {concluidas.size} de {licoes.length} lições concluídas
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Próximas lições sugeridas</h2>
        <ul className="mt-4 space-y-3">
          {proximos.map((item) => (
            <li key={`${item.lessonSlug}-${item.skillSlug}`} className="rounded border p-4">
              <Link className="font-medium text-blue-700 underline" href={`/lessons/${item.lessonSlug}`}>
                {item.licao?.titulo ?? item.lessonSlug}
              </Link>
              <p className="mt-1 text-sm text-gray-600">
                Desenvolve {skills.find((skill) => skill.slug === item.skillSlug)?.nome ?? item.skillSlug}
                {" · nível "}{item.nivel} de {item.meta}
              </p>
            </li>
          ))}
        </ul>
        {proximos.length === 0 && (
          <p className="mt-4 text-gray-600">Nenhuma sugestão: suas metas foram atingidas.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Skills mais próximas da meta</h2>
        <ul className="mt-4 space-y-1">
          {[...niveis]
            .sort((a, b) => b.nivel - b.meta - (a.nivel - a.meta))
            .slice(0, 5)
            .map((skill) => (
              <li key={skill.slug}>
                {skill.nome}: {skill.nivel}/{skill.meta}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
