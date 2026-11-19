import Link from "next/link";
import { getPaths } from "@/lib/content";

export const metadata = { title: "Trilhas" };

export default function PathsPage() {
  const paths = getPaths();
  return (
    <div>
      <h1 className="text-3xl font-bold">Trilhas</h1>
      <p className="mt-2 text-gray-700">Comece pelos fundamentos e siga em frente.</p>
      <ul className="mt-8 space-y-4">
        {paths.map((path) => (
          <li key={path.slug} className="rounded-lg border p-5">
            <h2 className="text-xl font-semibold">{path.titulo}</h2>
            <p className="mt-2 text-gray-700">{path.descricao}</p>
            <Link className="mt-3 inline-block text-blue-700 underline" href={`/paths/${path.slug}`}>
              Ver trilha
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
