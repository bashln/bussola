"use client";

import { useState } from "react";
import type { Recurso } from "@/lib/types";
import { youtubeId } from "@/lib/youtube";

export function StudySessionPanel({ recursos }: { recursos: Recurso[] }) {
  const [carregados, setCarregados] = useState<Set<string>>(new Set());

  if (recursos.length === 0) return null;

  const videos = recursos.filter((recurso) => recurso.tipo === "video");
  const docs = recursos.filter((recurso) => recurso.tipo === "doc");

  return (
    <section
      aria-labelledby="sessao-de-estudo"
      className="my-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs"
    >
      <h2 id="sessao-de-estudo" className="mb-5 text-xl font-bold text-slate-900">
        Sessão de estudo
      </h2>

      {videos.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Vídeos
          </h3>
          <ul className="space-y-4">
            {videos.map((video) => {
              if (video.tipo !== "video") return null;
              const id = youtubeId(video.url);
              return (
                <li
                  key={video.url}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                >
                  <p className="font-semibold text-slate-900">{video.titulo}</p>
                  {video.resumo && <p className="mt-1 text-sm text-slate-600">{video.resumo}</p>}
                  <div className="mt-3">
                    {id ? (
                      carregados.has(video.url) ? (
                        <iframe
                          title={video.titulo}
                          className="aspect-video w-full max-w-2xl rounded-lg border border-slate-200"
                          src={`https://www.youtube-nocookie.com/embed/${id}`}
                          allow="accelerometer; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 shadow-xs transition-colors hover:bg-slate-50"
                          onClick={() =>
                            setCarregados((anteriores) => new Set(anteriores).add(video.url))
                          }
                        >
                          Assistir: {video.titulo}
                        </button>
                      )
                    ) : (
                      <a
                        className="text-sm font-medium text-blue-600 underline"
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {video.titulo}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {docs.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Documentação
          </h3>
          <ul className="space-y-2.5">
            {docs.map((doc) => {
              if (doc.tipo !== "doc") return null;
              return (
                <li
                  key={doc.url}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5"
                >
                  <a
                    className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                    href={doc.ancora ? `${doc.url}${doc.ancora}` : doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc.titulo}
                  </a>
                  {doc.resumo && <p className="mt-1 text-sm text-slate-600">{doc.resumo}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
