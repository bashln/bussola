import { z } from "zod";
import type { LessonMeta, PathMeta, Skill } from "./types";

const youtubeUrl = z
  .string()
  .url("Informe uma URL válida.")
  .refine(
    (url) => /(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[A-Za-z0-9_-]{6,}/.test(url),
    "Vídeos devem ser do YouTube.",
  );

const videoSchema = z.object({
  tipo: z.literal("video"),
  titulo: z.string().min(1),
  url: youtubeUrl,
  resumo: z.string().optional(),
  canal: z.string().optional(),
});

const docSchema = z.object({
  tipo: z.literal("doc"),
  titulo: z.string().min(1),
  url: z
    .string()
    .url("Informe uma URL válida.")
    .refine((url) => /^https?:\/\//i.test(url), "Só links http(s) são permitidos."),
  resumo: z.string().optional(),
  ancora: z.string().regex(/^#/, "Âncora deve começar com #.").optional(),
});

export const lessonSchema = z.object({
  slug: z.string().min(1),
  curso: z.string().min(1),
  titulo: z.string().min(1),
  tipo: z.enum(["leitura", "projeto"]),
  ordem: z.number().int().positive(),
  minutos: z.number().int().nonnegative(),
  skillWeights: z.record(z.string(), z.number().nonnegative("Peso não pode ser negativo.")),
  prereqs: z.array(z.string()).default([]),
  recursos: z.array(z.discriminatedUnion("tipo", [videoSchema, docSchema])).default([]),
});

export const skillSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  nome: z.string().min(1),
  categoria: z.enum(["frontend", "backend", "ferramentas"]),
  descricao: z.string().min(1),
  limiares: z
    .array(z.number().positive())
    .length(5, "São necessários exatamente 5 limiares.")
    .refine((v) => v.every((n, i) => i === 0 || n > v[i - 1]), "Limiares devem ser crescentes."),
});

export const pathSchema = z.object({
  slug: z.string().min(1),
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  ordem: z.number().int().positive(),
  cursos: z.array(z.string()).default([]),
});

export const courseSchema = z.object({
  slug: z.string().min(1),
  path: z.string().min(1),
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  ordem: z.number().int().positive(),
});

export function parseLessonFrontmatter(data: unknown): LessonMeta {
  return lessonSchema.parse(data) as LessonMeta;
}

export function parseSkill(data: unknown): Skill {
  return skillSchema.parse(data) as Skill;
}

export function parsePath(data: unknown): PathMeta {
  return pathSchema.parse(data) as PathMeta;
}

export function parseCourse(data: unknown) {
  return courseSchema.parse(data);
}
