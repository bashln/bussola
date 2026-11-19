import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { setBaseline } from "@/lib/db/repositories";

const corpoSchema = z.object({
  skillSlug: z.string().min(1),
  nivel: z.number().int().min(0).max(5),
});

export async function PUT(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ erro: "Entre para acompanhar seu progresso." }, { status: 401 });
  }

  const corpo = corpoSchema.safeParse(await request.json().catch(() => null));
  if (!corpo.success) {
    return NextResponse.json({ erro: "Nível deve ser um número entre 0 e 5." }, { status: 400 });
  }

  await setBaseline(userId, corpo.data.skillSlug, corpo.data.nivel);
  return NextResponse.json({ ok: true });
}
