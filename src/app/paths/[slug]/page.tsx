import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourses, getPath, getPaths } from "@/lib/content";

export function generateStaticParams() {
  return getPaths().map((path) => ({ slug: path.slug }));
}

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = getPath(slug);
  if (!path) notFound();

  const cursos = getCourses(path.slug);
  return (
    <div>
      <h1 className="text-3xl font-bold">{path.titulo}</h1>
      <p className="mt-2 text-gray-700">{path.descricao}</p>
      <ol className="mt-8 space-y-4">
        {cursos.map((curso, indice) => (
          <li key={curso.slug} className="rounded-lg border p-5">
            <p className="text-sm text-gray-500">Curso {indice + 1}</p>
            <h2 className="text-xl font-semibold">{curso.titulo}</h2>
            <p className="mt-1 text-gray-700">{curso.descricao}</p>
            <Link className="mt-3 inline-block text-blue-700 underline" href={`/courses/${curso.slug}`}>
              Abrir curso
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
