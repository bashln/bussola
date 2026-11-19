import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getLessons } from "@/lib/content";
import { ProgressBar } from "@/components/ProgressBar";
import { getSessionUserId } from "@/lib/auth";
import { listDoneLessonIds } from "@/lib/db/repositories";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curso = getCourse(slug);
  if (!curso) notFound();

  const licoes = getLessons({ curso: slug });
  const userId = await getSessionUserId();
  const concluidas = userId ? await listDoneLessonIds(userId) : new Set<string>();
  const total = licoes.length;
  const feitas = licoes.filter((licao) => concluidas.has(licao.slug)).length;

  return (
    <div>
      <h1 className="text-3xl font-bold">{curso.titulo}</h1>
      <p className="mt-2 text-gray-700">{curso.descricao}</p>
      <div className="mt-6 max-w-md">
        <ProgressBar atual={feitas} total={total} />
        <p className="mt-2 text-sm text-gray-600">{feitas} de {total} concluídas</p>
      </div>
      <ol className="mt-8 space-y-3">
        {licoes.map((licao) => (
          <li key={licao.slug} className="rounded-lg border p-4">
            <h2 className="font-semibold">
              <Link className="text-blue-700 underline" href={`/lessons/${licao.slug}`}>
                {licao.titulo}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {licao.tipo === "projeto" ? "Projeto" : "Leitura"} · {licao.minutos} min
              {concluidas.has(licao.slug) ? " · concluído" : ""}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
