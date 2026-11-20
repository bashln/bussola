import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonOrProjectView } from "@/components/LessonOrProjectView";
import { getSessionUserId } from "@/lib/auth";
import { getLesson, getLessons } from "@/lib/content";
import { listDoneLessonIds } from "@/lib/db/repositories";

export function generateStaticParams() {
  return getLessons()
    .filter((l) => l.tipo === "projeto")
    .map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projeto = getLesson(slug);
  return { title: projeto?.titulo ?? "Projeto" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projeto = getLesson(slug);
  if (!projeto || projeto.tipo !== "projeto") notFound();

  const userId = await getSessionUserId();
  const concluidas = userId ? await listDoneLessonIds(userId) : new Set<string>();

  return (
    <LessonOrProjectView
      item={projeto}
      logado={Boolean(userId)}
      concluido={concluidas.has(projeto.slug)}
    />
  );
}
