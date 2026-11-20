import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonOrProjectView } from "@/components/LessonOrProjectView";
import { getSessionUserId } from "@/lib/auth";
import { getLesson, getLessons } from "@/lib/content";
import { listDoneLessonIds } from "@/lib/db/repositories";

export function generateStaticParams() {
  return getLessons()
    .filter((l) => l.tipo === "leitura")
    .map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const licao = getLesson(slug);
  return { title: licao?.titulo ?? "Lição" };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const licao = getLesson(slug);
  if (!licao || licao.tipo !== "leitura") notFound();

  const userId = await getSessionUserId();
  const concluidas = userId ? await listDoneLessonIds(userId) : new Set<string>();

  return (
    <LessonOrProjectView
      item={licao}
      logado={Boolean(userId)}
      concluido={concluidas.has(licao.slug)}
    />
  );
}
