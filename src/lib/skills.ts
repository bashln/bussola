import { parseSkill } from "./content-schema";
import type { Skill } from "./types";

const limiares = [10, 25, 50, 90, 150];

const sementes: Array<Omit<Skill, "limiares">> = [
  { id: "logica", slug: "logica-programacao", nome: "Lógica de programação", categoria: "backend", descricao: "Algoritmos, condicionais e laços." },
  { id: "estruturas", slug: "estruturas-dados", nome: "Estruturas de dados", categoria: "backend", descricao: "Arrays, listas, pilhas, filas e mapas." },
  { id: "oop", slug: "orientacao-objetos", nome: "Orientação a objetos", categoria: "backend", descricao: "Classes, objetos, herança e composição." },
  { id: "javascript", slug: "javascript", nome: "JavaScript", categoria: "backend", descricao: "Linguagem base da web." },
  { id: "nodejs", slug: "nodejs", nome: "Node.js", categoria: "backend", descricao: "Runtime JavaScript no servidor." },
  { id: "typescript", slug: "typescript", nome: "TypeScript", categoria: "backend", descricao: "Tipagem estática sobre JavaScript." },
  { id: "frameworks", slug: "frameworks-backend", nome: "Frameworks backend", categoria: "backend", descricao: "Express, Fastify ou NestJS." },
  { id: "rest", slug: "rest-apis", nome: "APIs REST", categoria: "backend", descricao: "Recursos, verbos HTTP e contratos." },
  { id: "sql", slug: "sql", nome: "SQL", categoria: "backend", descricao: "PostgreSQL e MySQL." },
  { id: "nosql", slug: "nosql", nome: "NoSQL", categoria: "backend", descricao: "MongoDB e modelagem de documentos." },
  { id: "git", slug: "git", nome: "Git", categoria: "ferramentas", descricao: "Versionamento e colaboração." },
  { id: "organizacao", slug: "organizacao-codigo", nome: "Organização de código", categoria: "backend", descricao: "Separação de responsabilidades e boas práticas." },
  { id: "testes", slug: "testes-unitarios", nome: "Testes unitários", categoria: "backend", descricao: "Jest, Vitest e testes automatizados." },
  { id: "seguranca", slug: "seguranca-api", nome: "Segurança de APIs", categoria: "backend", descricao: "Autenticação, autorização e validação." },
  { id: "docs-api", slug: "documentacao-api", nome: "Documentação de APIs", categoria: "backend", descricao: "Swagger e Postman." },
  { id: "docker", slug: "docker-cloud", nome: "Docker e cloud", categoria: "ferramentas", descricao: "Containers e serviços em nuvem." },
  { id: "depuracao", slug: "depuracao", nome: "Depuração e diagnóstico", categoria: "ferramentas", descricao: "Localizar e corrigir falhas em runtime." },
];

export const skills: Skill[] = sementes.map((skill) => parseSkill({ ...skill, limiares }));

export function skillConhecida(slug: string): boolean {
  return skills.some((skill) => skill.slug === slug);
}
