export type Recurso =
  | { tipo: "video"; titulo: string; url: string; resumo?: string; canal?: string }
  | { tipo: "doc"; titulo: string; url: string; resumo?: string; ancora?: string };

export interface LessonMeta {
  slug: string;
  curso: string;
  titulo: string;
  tipo: "leitura" | "projeto";
  ordem: number;
  minutos: number;
  skillWeights: Record<string, number>;
  prereqs: string[];
  recursos: Recurso[];
}

export interface Lesson extends LessonMeta {
  content: string;
}

export interface CourseMeta {
  slug: string;
  path: string;
  titulo: string;
  descricao: string;
  ordem: number;
}

export interface PathMeta {
  slug: string;
  titulo: string;
  descricao: string;
  ordem: number;
  cursos: string[];
}

export interface Skill {
  id: string;
  slug: string;
  nome: string;
  categoria: "frontend" | "backend" | "ferramentas";
  descricao: string;
  limiares: number[];
}
