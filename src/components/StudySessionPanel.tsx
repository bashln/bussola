"use client";

import { useState } from "react";
import type { Recurso } from "@/lib/types";

function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  return match?.[1] ?? null;
}

export function StudySessionPanel({ recursos }: { recursos: Recurso[] }) {
  const [carregados, setCarregados] = useState<Set<string>>(new Set());

  if (recursos.length === 0) return null;

  const videos = recursos.filter((recurso) => recurso.tipo === "video");
  const docs = recursos.filter((recurso) => recurso.tipo === "doc");

  return (
    <section aria-labelledby="sessao-de-estudo" className="my-8 rounded-lg border p-4">
      <h2 id="sessao-de-estudo" className="mb-4 text-xl font-semibold">Sessão de estudo</h2>

      {videos.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-medium">Vídeos</h3>
          <ul className="space-y-4">
            {videos.map((video) => {
              if (video.tipo !== "video") return null;
              const id = youtubeId(video.url);
              return (
                <li key={video.url}>
                  <p className="mb-2 font-medium">{video.titulo}</p>
                  {video.resumo && <p className="mb-2 text-sm text-gray-600">{video.resumo}</p>}
                  {id ? (
                    carregados.has(video.url) ? (
                      <iframe
                        title={video.titulo}
                        className="aspect-video w-full max-w-2xl"
                        src={`https://www.youtube-nocookie.com/embed/${id}`}
                        allow="accelerometer; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        className="rounded border px-3 py-2"
                        onClick={() =>
                          setCarregados((anteriores) => new Set(anteriores).add(video.url))
                        }
                      >
                        Assistir: {video.titulo}
                      </button>
                    )
                  ) : (
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      {video.titulo}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {docs.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-medium">Documentação</h3>
          <ul className="space-y-3">
            {docs.map((doc) => {
              if (doc.tipo !== "doc") return null;
              return (
                <li key={doc.url}>
                  <a
                    className="text-blue-700 underline"
                    href={doc.ancora ? `${doc.url}${doc.ancora}` : doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc.titulo}
                  </a>
                  {doc.resumo && <p className="text-sm text-gray-600">{doc.resumo}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
