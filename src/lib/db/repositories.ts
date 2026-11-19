import { eq } from "drizzle-orm";
import { db } from "./client";
import { baselines, metas, progresso } from "./schema";

export async function saveProgress(userId: string, lessonSlug: string): Promise<void> {
  await db.insert(progresso).values({ userId, lessonSlug }).onConflictDoNothing();
}

export async function listDoneLessonIds(userId: string): Promise<Set<string>> {
  const linhas = await db
    .select({ lessonSlug: progresso.lessonSlug })
    .from(progresso)
    .where(eq(progresso.userId, userId));
  return new Set(linhas.map((linha) => linha.lessonSlug));
}

export async function getBaselines(userId: string): Promise<Record<string, number>> {
  const linhas = await db.select().from(baselines).where(eq(baselines.userId, userId));
  return Object.fromEntries(linhas.map((linha) => [linha.skillSlug, linha.nivel]));
}

export async function setBaseline(userId: string, skillSlug: string, nivel: number): Promise<void> {
  await db
    .insert(baselines)
    .values({ userId, skillSlug, nivel })
    .onConflictDoUpdate({
      target: [baselines.userId, baselines.skillSlug],
      set: { nivel },
    });
}

export async function getMetas(userId: string): Promise<Record<string, number>> {
  const linhas = await db.select().from(metas).where(eq(metas.userId, userId));
  return Object.fromEntries(linhas.map((linha) => [linha.skillSlug, linha.nivelAlvo]));
}

export async function setMeta(userId: string, skillSlug: string, nivelAlvo: number): Promise<void> {
  await db
    .insert(metas)
    .values({ userId, skillSlug, nivelAlvo })
    .onConflictDoUpdate({
      target: [metas.userId, metas.skillSlug],
      set: { nivelAlvo },
    });
}
