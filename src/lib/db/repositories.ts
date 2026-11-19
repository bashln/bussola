import { eq } from "drizzle-orm";
import { getDb } from "./client";
import { baselines, metas, progresso, users } from "./schema";

export async function ensureUser(
  id: string,
  githubId: string,
  usuario: string,
  avatarUrl: string | null,
): Promise<void> {
  await getDb()
    .insert(users)
    .values({ id, githubId, usuario, avatarUrl })
    .onConflictDoUpdate({
      target: users.id,
      set: { githubId, usuario, avatarUrl },
    });
}

export async function saveProgress(userId: string, lessonSlug: string): Promise<void> {
  await getDb().insert(progresso).values({ userId, lessonSlug }).onConflictDoNothing();
}

export async function listDoneLessonIds(userId: string): Promise<Set<string>> {
  const linhas = await getDb()
    .select({ lessonSlug: progresso.lessonSlug })
    .from(progresso)
    .where(eq(progresso.userId, userId));
  return new Set(linhas.map((linha) => linha.lessonSlug));
}

export async function getBaselines(userId: string): Promise<Record<string, number>> {
  const linhas = await getDb().select().from(baselines).where(eq(baselines.userId, userId));
  return Object.fromEntries(linhas.map((linha) => [linha.skillSlug, linha.nivel]));
}

export async function setBaseline(userId: string, skillSlug: string, nivel: number): Promise<void> {
  await getDb()
    .insert(baselines)
    .values({ userId, skillSlug, nivel })
    .onConflictDoUpdate({
      target: [baselines.userId, baselines.skillSlug],
      set: { nivel },
    });
}

export async function getMetas(userId: string): Promise<Record<string, number>> {
  const linhas = await getDb().select().from(metas).where(eq(metas.userId, userId));
  return Object.fromEntries(linhas.map((linha) => [linha.skillSlug, linha.nivelAlvo]));
}

export async function setMeta(userId: string, skillSlug: string, nivelAlvo: number): Promise<void> {
  await getDb()
    .insert(metas)
    .values({ userId, skillSlug, nivelAlvo })
    .onConflictDoUpdate({
      target: [metas.userId, metas.skillSlug],
      set: { nivelAlvo },
    });
}
