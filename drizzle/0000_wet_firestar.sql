CREATE TABLE "baselines" (
	"user_id" text NOT NULL,
	"skill_slug" text NOT NULL,
	"nivel" integer NOT NULL,
	CONSTRAINT "baselines_user_id_skill_slug_pk" PRIMARY KEY("user_id","skill_slug")
);
--> statement-breakpoint
CREATE TABLE "metas" (
	"user_id" text NOT NULL,
	"skill_slug" text NOT NULL,
	"nivel_alvo" integer NOT NULL,
	CONSTRAINT "metas_user_id_skill_slug_pk" PRIMARY KEY("user_id","skill_slug")
);
--> statement-breakpoint
CREATE TABLE "progresso" (
	"user_id" text NOT NULL,
	"lesson_slug" text NOT NULL,
	"status" text DEFAULT 'done' NOT NULL,
	"concluido_em" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "progresso_user_id_lesson_slug_pk" PRIMARY KEY("user_id","lesson_slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"github_id" text NOT NULL,
	"usuario" text NOT NULL,
	"avatar_url" text
);
