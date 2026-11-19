"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border p-6 text-center">
      <h1 className="text-2xl font-bold">Algo deu errado</h1>
      <p className="mt-2 text-gray-700">Não foi possível carregar esta página.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded bg-blue-700 px-4 py-2 text-white"
      >
        Tentar novamente
      </button>
    </div>
  );
}
