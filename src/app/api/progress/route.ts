import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { getLesson } from "@/lib/content";
import { saveProgress } from "@/lib/db/repositories";

const corpoSchema = z.object({ lessonSlug: z.string().min(1) });

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ erro: "Entre para acompanhar seu progresso." }, { status: 401 });
  }

  const corpo = corpoSchema.safeParse(await request.json().catch(() => null));
  if (!corpo.success) {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }
  if (!getLesson(corpo.data.lessonSlug)) {
    return NextResponse.json({ erro: "Lição não encontrada." }, { status: 404 });
  }

  await saveProgress(userId, corpo.data.lessonSlug);
  return NextResponse.json({ ok: true });
}
