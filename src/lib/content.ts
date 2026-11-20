import { readFileSync } from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { parseCourse, parseLessonFrontmatter, parsePath } from "./content-schema";
import type { CourseMeta, Lesson, LessonMeta, PathMeta } from "./types";

const root = process.cwd();

function readFrontmatter(file: string) {
  try {
    return matter(readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`Falha ao ler ${path.relative(root, file)}: ${String(error)}`);
  }
}

function readCollection<T>(directory: string, parse: (data: unknown) => T): T[] {
  const files = fg.sync(`content/${directory}/*.mdx`, { cwd: root, absolute: true });
  return files.map((file) => {
    const { data } = readFrontmatter(file);
    try {
      return parse(data);
    } catch (error) {
      throw new Error(`Frontmatter inválido em ${path.relative(root, file)}: ${String(error)}`);
    }
  });
}

function byOrdem<T extends { ordem: number; slug: string }>(a: T, b: T) {
  return a.ordem - b.ordem || a.slug.localeCompare(b.slug);
}

export function getPaths(): PathMeta[] {
  return readCollection("paths", parsePath).sort(byOrdem);
}

export function getPath(slug: string): PathMeta | null {
  return getPaths().find((item) => item.slug === slug) ?? null;
}

export function getCourses(pathSlug?: string): CourseMeta[] {
  return readCollection("courses", parseCourse)
    .filter((item) => (pathSlug ? item.path === pathSlug : true))
    .sort(byOrdem);
}

export function getCourse(slug: string): CourseMeta | null {
  return getCourses().find((item) => item.slug === slug) ?? null;
}

export function getLessons(filter?: { curso?: string; tipo?: LessonMeta["tipo"] }): LessonMeta[] {
  return readCollection("lessons", parseLessonFrontmatter)
    .filter((item) => (filter?.curso ? item.curso === filter.curso : true))
    .filter((item) => (filter?.tipo ? item.tipo === filter.tipo : true))
    .sort(byOrdem);
}

export function getLesson(slug: string): Lesson | null {
  const files = fg.sync(`content/lessons/*.mdx`, { cwd: root, absolute: true });
  for (const file of files) {
    const parsed = readFrontmatter(file);
    if (parsed.data.slug !== slug) continue;
    try {
      return { ...parseLessonFrontmatter(parsed.data), content: parsed.content };
    } catch (error) {
      throw new Error(`Frontmatter inválido em ${path.relative(root, file)}: ${String(error)}`);
    }
  }
  return null;
}
