export const metadata = { title: "Contribuir" };

const codeClass =
  "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800 dark:bg-slate-800 dark:text-slate-200";

export default function ContribuirPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold dark:text-white">Contribuir</h1>
      <p className="mt-3 text-gray-700 dark:text-slate-300">
        Todo o conteúdo fica em <code className={codeClass}>content/</code> e é versionado. Para adicionar uma lição ou
        corrigir um texto, abra um pull request.
      </p>

      <h2 className="mt-8 text-xl font-semibold dark:text-white">Como adicionar uma lição</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-gray-700 dark:text-slate-300">
        <li>Copie um arquivo de <code className={codeClass}>content/lessons/</code> como modelo.</li>
        <li>Preencha o frontmatter: <code className={codeClass}>slug</code>, <code className={codeClass}>curso</code>, <code className={codeClass}>titulo</code>,
          <code className={codeClass}>tipo</code>, <code className={codeClass}>ordem</code>, <code className={codeClass}>minutos</code>, <code className={codeClass}>skillWeights</code>,
          <code className={codeClass}>prereqs</code> e <code className={codeClass}>recursos</code>.</li>
        <li>Escreva o conteúdo em português, abaixo do frontmatter.</li>
        <li>Em <code className={codeClass}>recursos</code>, use vídeos do YouTube e links de documentação oficial.</li>
        <li>Rode <code className={codeClass}>npm run test</code> e abra o PR.</li>
      </ol>

      <h2 id="apoiar" className="mt-8 text-xl font-semibold dark:text-white">Apoiar financeiramente</h2>
      <p className="mt-2 text-gray-700 dark:text-slate-300">
        O Bússola é 100% gratuito, sem anúncios e sem venda de dados. Se o projeto te ajudou e
        você quiser contribuir financeiramente para mantê-lo no ar, escolha uma das opções abaixo:
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="https://github.com/sponsors/bashln"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          GitHub Sponsors
        </a>
        <a
          href="https://www.buymeacoffee.com/bashln"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-xs transition-colors hover:bg-amber-300"
        >
          Buy Me a Coffee
        </a>
      </div>

      <h2 className="mt-8 text-xl font-semibold dark:text-white">Licença</h2>
      <p className="mt-2 text-gray-700 dark:text-slate-300">Código sob MIT; conteúdo sob CC BY-SA 4.0.</p>
    </div>
  );
}
