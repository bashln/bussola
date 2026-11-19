import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { setMeta } from "@/lib/db/repositories";
import { skillConhecida } from "@/lib/skills";

const corpoSchema = z.object({
  skillSlug: z.string().min(1),
  nivelAlvo: z.number().int().min(1).max(5),
});

export async function PUT(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ erro: "Entre para acompanhar seu progresso." }, { status: 401 });
  }

  const corpo = corpoSchema.safeParse(await request.json().catch(() => null));
  if (!corpo.success) {
    return NextResponse.json({ erro: "Meta deve ser um número entre 1 e 5." }, { status: 400 });
  }

  if (!skillConhecida(corpo.data.skillSlug)) {
    return NextResponse.json({ erro: "Skill não encontrada." }, { status: 400 });
  }

  await setMeta(userId, corpo.data.skillSlug, corpo.data.nivelAlvo);
  return NextResponse.json({ ok: true });
}
