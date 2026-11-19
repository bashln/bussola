import { redirect } from "next/navigation";
import { signIn, getSessionUserId } from "@/lib/auth";

export const metadata = { title: "Entrar" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const userId = await getSessionUserId();
  if (userId) redirect("/dashboard");

  const { callbackUrl } = await searchParams;
  const destino =
    callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/dashboard";

  return (
    <div className="mx-auto max-w-md rounded-lg border p-6">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <p className="mt-2 text-gray-700">
        Use sua conta do GitHub para salvar seu progresso, níveis e metas.
      </p>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: destino });
        }}
        className="mt-6"
      >
        <button type="submit" className="rounded bg-gray-900 px-4 py-2 text-white">
          Entrar com GitHub
        </button>
      </form>
    </div>
  );
}
