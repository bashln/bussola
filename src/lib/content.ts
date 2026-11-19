import { readFileSync } from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { parseCourse, parseLessonFrontmatter, parsePath } from "./content-schema";
import type { CourseMeta, Lesson, LessonMeta, PathMeta } from "./types";

const root = process.cwd();

function readCollection(directory: string) {
  const files = fg.sync(`content/${directory}/*.mdx`, { cwd: root, absolute: true });
  return files.map((file) => {
    try {
      const parsed = matter(readFileSync(file, "utf8"));
      return { ...parsed, file };
    } catch (error) {
      throw new Error(`Falha ao ler ${path.relative(root, file)}: ${String(error)}`);
    }
  });
}

function byOrdem<T extends { ordem: number; slug: string }>(a: T, b: T) {
  return a.ordem - b.ordem || a.slug.localeCompare(b.slug);
}

export function getPaths(): PathMeta[] {
  return readCollection("paths").map(({ data, file }) => {
    try {
      return parsePath(data);
    } catch (error) {
      throw new Error(`Frontmatter inválido em ${path.relative(root, file)}: ${String(error)}`);
    }
  }).sort(byOrdem);
}

export function getPath(slug: string): PathMeta | null {
  return getPaths().find((item) => item.slug === slug) ?? null;
}

export function getCourses(pathSlug?: string): CourseMeta[] {
  return readCollection("courses")
    .map(({ data, file }) => {
      try {
        return parseCourse(data) as CourseMeta;
      } catch (error) {
        throw new Error(`Frontmatter inválido em ${path.relative(root, file)}: ${String(error)}`);
      }
    })
    .filter((item) => (pathSlug ? item.path === pathSlug : true))
    .sort(byOrdem);
}

export function getCourse(slug: string): CourseMeta | null {
  return getCourses().find((item) => item.slug === slug) ?? null;
}

export function getLessons(filter?: { curso?: string; tipo?: LessonMeta["tipo"] }): LessonMeta[] {
  return readCollection("lessons")
    .map(({ data, file }) => {
      try {
        return parseLessonFrontmatter(data);
      } catch (error) {
        throw new Error(`Frontmatter inválido em ${path.relative(root, file)}: ${String(error)}`);
      }
    })
    .filter((item) => (filter?.curso ? item.curso === filter.curso : true))
    .filter((item) => (filter?.tipo ? item.tipo === filter.tipo : true))
    .sort(byOrdem);
}

export function getLesson(slug: string): Lesson | null {
  const file = fg.sync(`content/lessons/*.mdx`, { cwd: root, absolute: true }).find((candidate) =>
    matter(readFileSync(candidate, "utf8")).data.slug === slug,
  );
  if (!file) return null;
  const parsed = matter(readFileSync(file, "utf8"));
  return { ...parseLessonFrontmatter(parsed.data), content: parsed.content };
}
