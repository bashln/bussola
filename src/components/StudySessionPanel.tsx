"use client";

import { useState } from "react";
import type { Recurso } from "@/lib/types";
import { youtubeId } from "@/lib/youtube";

export function StudySessionPanel({ recursos }: { recursos: Recurso[] }) {
  const [carregados, setCarregados] = useState<Set<string>>(new Set());

  if (recursos.length === 0) return null;

  const videos = recursos.filter(
    (recurso): recurso is Extract<Recurso, { tipo: "video" }> => recurso.tipo === "video",
  );
  const docs = recursos.filter(
    (recurso): recurso is Extract<Recurso, { tipo: "doc" }> => recurso.tipo === "doc",
  );

  return (
    <section
      aria-labelledby="sessao-de-estudo"
      className="my-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111827]"
    >
      <h2 id="sessao-de-estudo" className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Sessão de estudo
      </h2>

      {videos.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Vídeos
          </h3>
          <ul className="space-y-4">
            {videos.map((video) => {
              const id = youtubeId(video.url);
              return (
                <li
                  key={video.url}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">{video.titulo}</p>
                  {video.resumo && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{video.resumo}</p>}
                  <div className="mt-3">
                    {id ? (
                      carregados.has(video.url) ? (
                        <iframe
                          title={video.titulo}
                          className="aspect-video w-full max-w-2xl rounded-lg border border-slate-200 dark:border-slate-700"
                          src={`https://www.youtube-nocookie.com/embed/${id}`}
                          allow="accelerometer; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 shadow-xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                          onClick={() =>
                            setCarregados((anteriores) => new Set(anteriores).add(video.url))
                          }
                        >
                          Assistir: {video.titulo}
                        </button>
                      )
                    ) : (
                      <a
                        className="text-sm font-medium text-blue-600 underline dark:text-amber-400"
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
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Documentação
          </h3>
          <ul className="space-y-2.5">
            {docs.map((doc) => (
              <li
                key={doc.url}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-700 dark:bg-slate-900/70"
              >
                <a
                  className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-amber-400 dark:hover:text-amber-300"
                  href={doc.ancora ? `${doc.url}${doc.ancora}` : doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.titulo}
                </a>
                {doc.resumo && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{doc.resumo}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
