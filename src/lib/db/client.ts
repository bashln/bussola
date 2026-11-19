import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePglite, type PgliteDatabase } from "drizzle-orm/pglite";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = PgliteDatabase<typeof schema>;

const url = process.env.DATABASE_URL ?? "";
export const usandoMemoria = url === "" || url.startsWith("pglite://");

let instancia: Database | null = null;

function criarBanco(): Database {
  if (usandoMemoria) return drizzlePglite(new PGlite(), { schema });
  return drizzlePostgres(postgres(url), { schema }) as unknown as Database;
}

export function getDb(): Database {
  if (!instancia) {
    if (usandoMemoria && process.env.NODE_ENV === "production") {
      throw new Error(
        "DATABASE_URL é obrigatório em produção: o banco em memória não persiste dados.",
      );
    }
    instancia = criarBanco();
  }
  return instancia;
}
