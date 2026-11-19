import { integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  githubId: text("github_id").notNull(),
  usuario: text("usuario").notNull(),
  avatarUrl: text("avatar_url"),
});

export const progresso = pgTable(
  "progresso",
  {
    userId: text("user_id").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    status: text("status").notNull().default("done"),
    concluidoEm: timestamp("concluido_em").notNull().defaultNow(),
  },
  (tabela) => [primaryKey({ columns: [tabela.userId, tabela.lessonSlug] })],
);

export const baselines = pgTable(
  "baselines",
  {
    userId: text("user_id").notNull(),
    skillSlug: text("skill_slug").notNull(),
    nivel: integer("nivel").notNull(),
  },
  (tabela) => [primaryKey({ columns: [tabela.userId, tabela.skillSlug] })],
);

export const metas = pgTable(
  "metas",
  {
    userId: text("user_id").notNull(),
    skillSlug: text("skill_slug").notNull(),
    nivelAlvo: integer("nivel_alvo").notNull(),
  },
  (tabela) => [primaryKey({ columns: [tabela.userId, tabela.skillSlug] })],
);
