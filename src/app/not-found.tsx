import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-lg border p-6 text-center">
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-gray-700">O endereço pode ter mudado ou a lição não existe mais.</p>
      <Link className="mt-5 inline-block rounded bg-blue-700 px-4 py-2 text-white" href="/paths">
        Ver trilhas
      </Link>
    </div>
  );
}
