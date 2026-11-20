import { redirect } from "next/navigation";
import { signIn, getSessionUserId } from "@/lib/auth";

export const metadata = { title: "Entrar" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const userId = await getSessionUserId();
  if (userId) redirect("/dashboard");

  const { callbackUrl, error } = await searchParams;
  const destino =
    callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/dashboard";

  return (
    <div className="mx-auto my-8 max-w-md rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-[#111827]">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Entrar no Bússola</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Use sua conta do GitHub para salvar seu progresso, níveis e metas de competência.
      </p>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-500/30 dark:bg-rose-950/30 dark:text-rose-200"
        >
          Não foi possível concluir o login ({error}). Tente novamente.
        </div>
      )}

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: destino });
        }}
        className="mt-6"
      >
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
              clipRule="evenodd"
            />
          </svg>
          Entrar com GitHub
        </button>
      </form>
    </div>
  );
}
