import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { StudySessionPanel } from "@/components/StudySessionPanel";
import { getSessionUserId } from "@/lib/auth";
import { getLesson } from "@/lib/content";
import { skills } from "@/lib/skills";

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const licao = getLesson(slug);
  if (!licao || licao.tipo !== "leitura") notFound();

  const userId = await getSessionUserId();
  const desenvolvimento = Object.keys(licao.skillWeights)
    .map((id) => skills.find((skill) => skill.id === id)?.nome ?? id);

  return (
    <article>
      <p className="text-sm text-gray-500">Leitura · {licao.minutos} min</p>
      <MDXRemote source={licao.content} />

      <section aria-label="Skills desenvolvidas" className="my-6">
        <h2 className="text-lg font-semibold">Skills desenvolvidas</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {desenvolvimento.map((nome) => (
            <li key={nome} className="rounded-full bg-gray-100 px-3 py-1 text-sm">{nome}</li>
          ))}
        </ul>
      </section>

      <StudySessionPanel recursos={licao.recursos} />
      <LessonCompleteButton lessonSlug={licao.slug} logado={Boolean(userId)} />
    </article>
  );
}
