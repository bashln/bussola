import Link from "next/link";
import { skills } from "@/lib/skills";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-xl bg-gray-50 p-8">
        <h1 className="text-3xl font-bold">Aprenda web dev e acompanhe suas competências</h1>
        <p className="mt-4 max-w-2xl text-gray-700">
          Currículo gratuito e open-source, organizado por trilhas e ligado a uma matriz de
          competências. Estude, construa projetos e veja seu progresso virar nível.
        </p>
        <Link
          href="/paths"
          className="mt-6 inline-block rounded bg-blue-700 px-5 py-3 font-medium text-white"
        >
          Começar
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">O que você vai desenvolver</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.slice(0, 8).map((skill) => (
            <li key={skill.id} className="rounded-full border px-3 py-1 text-sm">{skill.nome}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          E mais {skills.length - 8} competências na sua matriz.
        </p>
      </section>
    </div>
  );
}
