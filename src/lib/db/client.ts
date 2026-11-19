import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePglite, type PgliteDatabase } from "drizzle-orm/pglite";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = PgliteDatabase<typeof schema>;

const url = process.env.DATABASE_URL ?? "";
export const usandoMemoria = url === "" || url.startsWith("pglite://");

export const db: Database = usandoMemoria
  ? drizzlePglite(new PGlite(), { schema })
  : (drizzlePostgres(postgres(url), { schema }) as unknown as Database);
