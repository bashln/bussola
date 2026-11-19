# Hardskills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Site gratuito/open-source em PT-BR com currículo estilo Odin ligado a uma matriz de hardskills (nível híbrido), incluindo sessões de estudo com vídeos e documentação curados.

**Architecture:** Next.js App Router com conteúdo MDX versionado como fonte do currículo; regras de nível e roadmap em funções puras testáveis; progresso/baseline/metas em Postgres via Drizzle; Auth.js (GitHub) só para salvar progresso. Conteúdo público, escrita autenticada.

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind CSS, `gray-matter` + `zod` + `next-mdx-remote/rsc`, Auth.js (GitHub), Postgres + Drizzle ORM + drizzle-kit, Vitest + React Testing Library, Playwright (smoke), Vercel/Neon free tiers.

**Spec:** `docs/superpowers/specs/2026-11-19-hardskills-design.md`

## Global Constraints

- Toda interface e conteúdo em **PT-BR**.
- **Mobile-first responsivo** em todas as telas.
- **Gratuito e open-source**; sem cobrança, sem anúncios intrusivos.
- **Sem upload/correção de código** no v1; "concluir" = marcar como feito.
- **Sem comunidade/fórum** no v1.
- Nível de skill inteiro entre **0 e 5**; `limiares` = 5 números crescentes.
- Meta padrão = **5** quando não existe linha em `Meta`.
- Prereqs são **consultivos**: nunca bloqueiam conclusão.
- Conteúdo público; **salvar progresso exige login GitHub**.
- Vídeos: só YouTube, embed `youtube-nocookie.com`, carregamento por clique. Docs: só links externos com `rel="noopener noreferrer"`. Nenhum segredo no repo.

## Review Focus

- **Visitante tentando concluir lição:** deve ver convite para entrar e nenhuma escrita ocorrer → teste em Task 6 (API 401) e Task 7 (botão deslogado).
- **URL de vídeo inválida ou não-YouTube em `recursos`:** não deve gerar iframe quebrado; cai como link simples → teste em Task 7.
- **Baseline/peso fora da faixa (MDX ou API):** rejeitado na validação e nível nunca passa de 5 → testes em Task 2, Task 3 e Task 6.
- **Usuário sem nenhuma linha `Meta`:** roadmap não nasce vazio (usa 5) → teste em Task 3.
- **Prereq inexistente ou ciclo:** roadmap continua ordenando e a lição pode ser concluída → teste em Task 3.

---

## File Structure

```
src/lib/types.ts                  tipos compartilhados (Skill, LessonMeta, Recurso...)
src/lib/skills.ts                 17 skills semente com limiares
src/lib/content-schema.ts         schemas zod do frontmatter
src/lib/content.ts                leitura/validação dos MDX (server-only)
src/lib/level.ts                  computeLevel (puro)
src/lib/roadmap.ts                buildRoadmap (puro)
src/lib/db/schema.ts              tabelas Drizzle
src/lib/db/client.ts              conexão
src/lib/db/repositories.ts        Progresso/baseline/meta + interface de store
src/lib/auth.ts                   Auth.js (GitHub)
src/app/api/auth/[...nextauth]/route.ts
src/app/api/{progress,baseline,meta}/route.ts
src/components/{Header,StudySessionPanel,LessonCompleteButton,SkillRadar,SkillSlider,ProgressBar}.tsx
src/app/paths/...                 páginas públicas de paths, courses, lessons, projects
src/app/{skills,dashboard,contribuir,login}/...  páginas de matriz, roadmap, apoio e login
content/{paths,courses,lessons}/*.mdx
tests/{content,level,roadmap,api,components}/...
```

---

### Task 1: Scaffold do projeto

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `.gitignore`, `.env.example`, `README.md`

**Interfaces:**
- Produces: scripts `dev`, `build`, `lint`, `test`; aliases `@/*` → `src/*`; `vitest` com ambiente `node` e `jsdom` por arquivo.

- [ ] **Step 1: Iniciar git e gerar o scaffold**

```bash
git init
npm init -y
npm i next@latest react@latest react-dom@latest
npm i -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss eslint eslint-config-next vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Configurar aliases e scripts**

`tsconfig.json`: `paths: { "@/*": ["./src/*"] }`, `strict: true`, `target: ES2022`, `module: ESNext`, `moduleResolution: Bundler`, `jsx: preserve`.
`package.json` scripts: `dev: next dev`, `build: next build`, `lint: next lint`, `test: vitest run`.

- [ ] **Step 3: Criar `.env.example` sem valores reais**

```
DATABASE_URL=
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

- [ ] **Step 4: Verificar build e lint**

Run: `npm run build && npm run lint`
Expected: sucesso, sem erros.

- [ ] **Step 5: Commit**

```bash
git add . && git commit -m "chore: scaffold next.js + tailwind + vitest"
```

---

### Task 2: Schema de conteúdo e conteúdo semente

**Files:**
- Create: `src/lib/types.ts`, `src/lib/content-schema.ts`, `src/lib/content.ts`, `content/paths/*.mdx`, `content/courses/*.mdx`, `content/lessons/*.mdx`, `tests/content/content.test.ts`, `tests/content/fixtures/*.mdx`

**Interfaces:**
- Consumes: aliases de Task 1.
- Produces:
```ts
type Recurso =
  | { tipo: 'video'; titulo: string; url: string; resumo?: string; canal?: string }
  | { tipo: 'doc'; titulo: string; url: string; resumo?: string; ancora?: string };
interface LessonMeta { slug: string; curso: string; titulo: string; tipo: 'leitura'|'projeto'; ordem: number; minutos: number; skillWeights: Record<string, number>; prereqs: string[]; recursos: Recurso[] }
interface Lesson extends LessonMeta { content: string }
interface CourseMeta { slug: string; path: string; titulo: string; descricao: string; ordem: number }
interface PathMeta { slug: string; titulo: string; descricao: string; ordem: number; cursos: string[] }
getPaths(): PathMeta[]; getPath(slug: string): PathMeta | null
getCourses(pathSlug?: string): CourseMeta[]; getCourse(slug: string): CourseMeta | null
getLessons(filter?: { curso?: string; tipo?: LessonMeta['tipo'] }): LessonMeta[]
getLesson(slug: string): Lesson | null
```

- [ ] **Step 1: Escrever testes que falham**

```ts
it('rejeita skillWeight negativo e recurso de vídeo não-YouTube')
it('rejeita baseline/limiares com menos de 5 valores')
it('aceita um MDX válido e devolve recursos tipados')
it('getLesson devolve null para slug inexistente')
```

- [ ] **Step 2: Rodar e confirmar FAIL**

Run: `npm run test -- tests/content`
Expected: FAIL (módulos não existem).

- [ ] **Step 3: Instalar dependências e implementar**

```bash
npm i gray-matter zod next-mdx-remote fast-glob
```
`content-schema.ts`: schemas zod com `skillWeights` (`record(string, number().nonnegative())`), `recursos` discriminado por `tipo`, `url` de vídeo validada com regex de `youtube.com/watch?v=` / `youtu.be/` / `youtube.com/embed/`, `limiares` como tupla de 5 números crescentes. `content.ts`: `fast-glob` + `gray-matter` + `parse` + erro com caminho do arquivo em caso de falha.

- [ ] **Step 4: Criar conteúdo semente**

17 skills (as da spec) em `src/lib/skills.ts` com `limiares: [10, 25, 50, 90, 150]` para todas (valor semente, ajustável depois). 2 paths (`foundations`, `full-stack-node`), 3 cursos, 5 lições de leitura e 2 projetos, com `skillWeights` (5–20 por skill), `recursos` (pelo menos 1 vídeo MDN/YouTube e 1 doc MDN em lições diferentes) e texto MDX curto em PT-BR.

- [ ] **Step 5: Rodar testes e confirmar PASS**

Run: `npm run test -- tests/content`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add . && git commit -m "feat: MDX content schema, validation and seed"
```

---

### Task 3: Regras de nível e roadmap (funções puras)

**Files:**
- Create: `src/lib/level.ts`, `src/lib/roadmap.ts`, `tests/level/level.test.ts`, `tests/roadmap/roadmap.test.ts`

**Interfaces:**
- Consumes: `Skill`, `LessonMeta`, `PathMeta`, `CourseMeta` de Task 2; `skills` de `src/lib/skills.ts`.
- Produces:
```ts
computeLevel(baseline: number, doneWeights: number, limiares: readonly number[]): number
interface RoadmapInput { skills: Skill[]; lessons: LessonMeta[]; doneLessonIds: Set<string>; baselines: Record<string, number>; metas: Record<string, number>; courses: CourseMeta[] }
interface RoadmapItem { lessonSlug: string; skillSlug: string; nivel: number; meta: number; peso: number }
buildRoadmap(input: RoadmapInput): RoadmapItem[]
```

- [ ] **Step 1: Testes que falham — nível**

```ts
it('sem baseline e sem pesos retorna 0')
it('baseline 3 com w1=10 começa no nível 3')
it('soma pesos e sobe de faixa ao passar do limiar')
it('nunca retorna acima de 5 nem abaixo de 0')
it('baseline 6 e peso negativo são saneados para 0')
```

- [ ] **Step 2: Testes que falham — roadmap**

```ts
it('sem metas usa alvo 5 e não devolve lista vazia')
it('não sugere lição já concluída')
it('ordena por prereqs satisfeitos, depois peso desc, depois ordem do curso')
it('prereq inexistente ou ciclo não trava nem remove a lição')
```

- [ ] **Step 3: Rodar e confirmar FAIL**

Run: `npm run test -- tests/level tests/roadmap`
Expected: FAIL.

- [ ] **Step 4: Implementar**

`computeLevel`: `score = clamp(baseline,0,5) * limiares[0] + max(0, doneWeights)`; percorre `limiares` e retorna maior índice+1 com `score >= limiar`, senão 0; limita a 5. `buildRoadmap`: para cada skill com `nivel < meta`, cada lição não concluída com `skillWeights[skillSlug] > 0`, conta prereqs não satisfeitos (prereq ausente conta como satisfeito para não travar), ordena por `(faltantes asc, peso desc, ordem do curso asc, slug asc)`.

- [ ] **Step 5: Rodar e confirmar PASS**

Run: `npm run test -- tests/level tests/roadmap`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add . && git commit -m "feat: hybrid level and roadmap pure logic"
```

---

### Task 4: Banco, schema e repositórios

**Files:**
- Create: `src/lib/db/schema.ts`, `src/lib/db/client.ts`, `src/lib/db/repositories.ts`, `drizzle.config.ts`, `docker-compose.yml`, `tests/db/repositories.test.ts`

**Interfaces:**
- Consumes: `DATABASE_URL` e `DATABASE_URL_TEST` (variáveis de ambiente).
- Produces:
```ts
saveProgress(userId: string, lessonSlug: string): Promise<void>
listDoneLessonIds(userId: string): Promise<Set<string>>
getBaselines(userId: string): Promise<Record<string, number>>
setBaseline(userId: string, skillSlug: string, nivel: number): Promise<void>
getMetas(userId: string): Promise<Record<string, number>>
setMeta(userId: string, skillSlug: string, nivelAlvo: number): Promise<void>
```

- [ ] **Step 1: Teste que falha**

```ts
it('round-trip de progresso, baseline e meta para um usuário')
it('metas e baselines de usuários diferentes não se misturam')
```

- [ ] **Step 2: Rodar e confirmar FAIL**

Run: `DATABASE_URL_TEST=... npm run test -- tests/db` (se ausente, teste falha com aviso explícito — não silenciar)
Expected: FAIL.

- [ ] **Step 3: Instalar, gerar migration e implementar**

```bash
npm i drizzle-orm postgres
npm i -D drizzle-kit
npx drizzle-kit generate
```
Tabelas: `users(id text pk, githubId text, usuario text, avatarUrl text)`, `progresso(userId, lessonSlug, status, concluidoEm, pk(userId,lessonSlug))`, `baselines(userId, skillSlug, nivel, pk(userId,skillSlug))`, `metas(userId, skillSlug, nivelAlvo, pk(userId,skillSlug))`. `client.ts` usa `postgres.js` com `DATABASE_URL` (testes usam `DATABASE_URL_TEST`). `docker-compose.yml` traz Postgres local opcional.

- [ ] **Step 4: Rodar e confirmar PASS**

Run: `npm run test -- tests/db && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add . && git commit -m "feat: drizzle schema, migrations and repositories"
```

---

### Task 5: Autenticação GitHub

**Files:**
- Create: `src/lib/auth.ts`, `src/lib/session-user.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `tests/auth/session-user.test.ts`

**Interfaces:**
- Consumes: `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`.
- Produces: `auth`, `handlers`, `signIn`, `signOut`; `getSessionUserId(): string | null`; `sessionUserId(session): string | null` (puro, testável).

- [ ] **Step 1: Teste que falha**

```ts
it('sessionUserId retorna id quando presente e null quando ausente')
```

- [ ] **Step 2: Rodar e confirmar FAIL**

Run: `npm run test -- tests/auth`
Expected: FAIL.

- [ ] **Step 3: Implementar**

```bash
npm i next-auth@beta
```
Auth.js com `GitHub` provider, `session: { strategy: 'jwt' }`, `callbacks.jwt` guardando `token.userId = user.id`, `callbacks.session` expondo `session.user.id`. `getSessionUserId` chama `auth()` e devolve o id ou null. Rota exporta `handlers.GET`/`handlers.POST`.

- [ ] **Step 4: Rodar e confirmar PASS**

Run: `npm run test -- tests/auth && npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add . && git commit -m "feat: github oauth via auth.js"
```

---

### Task 6: API de progresso, baseline e metas

**Files:**
- Create: `src/app/api/progress/route.ts`, `src/app/api/baseline/route.ts`, `src/app/api/meta/route.ts`, `tests/api/routes.test.ts`

**Interfaces:**
- Consumes: `getSessionUserId` (Task 5), repositórios (Task 4), `getLesson` (Task 2).
- Produces: `POST /api/progress { lessonSlug }`, `PUT /api/baseline { skillSlug, nivel }`, `PUT /api/meta { skillSlug, nivelAlvo }`.

- [ ] **Step 1: Testes que falham**

```ts
it('POST /api/progress sem sessão retorna 401 e não chama o repositório')
it('POST /api/progress com slug inexistente retorna 404')
it('PUT /api/baseline com nivel fora de 0..5 retorna 400')
it('PUT /api/meta com nivelAlvo fora de 1..5 retorna 400')
it('PUT /api/baseline válido retorna 200 e persiste')
```

- [ ] **Step 2: Rodar e confirmar FAIL**

Run: `npm run test -- tests/api`
Expected: FAIL.

- [ ] **Step 3: Implementar**

Cada handler: `getSessionUserId()` → 401 se null; valida corpo com zod (`nivel.int().min(0).max(5)`, `nivelAlvo.int().min(1).max(5)`, `lessonSlug` existente em `getLesson`); chama repositório; devolve `{ ok: true }`. Erros de validação retornam 400 com mensagem em PT-BR.

- [ ] **Step 4: Rodar e confirmar PASS**

Run: `npm run test -- tests/api`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add . && git commit -m "feat: progress, baseline and meta api routes"
```

---

### Task 7: Currículo público e Sessão de estudo

**Files:**
- Create: `src/components/Header.tsx`, `src/components/StudySessionPanel.tsx`, `src/components/LessonCompleteButton.tsx`, `src/components/ProgressBar.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/app/paths/page.tsx`, `src/app/paths/[slug]/page.tsx`, `src/app/courses/[slug]/page.tsx`, `src/app/lessons/[slug]/page.tsx`, `src/app/projects/[slug]/page.tsx`, `tests/components/study-session.test.tsx`, `tests/components/complete-button.test.tsx`

**Interfaces:**
- Consumes: `getPaths`, `getPath`, `getCourses`, `getCourse`, `getLessons`, `getLesson` (Task 2); `getSessionUserId` (Task 5).

- [ ] **Step 1: Testes que falham**

```tsx
it('vídeo válido renderiza botão; após clique aparece iframe youtube-nocookie')
it('URL não-YouTube aparece como link, sem iframe')
it('doc com resumo mostra o trecho e abre em nova aba com rel noopener')
it('deslogado mostra "Entre para acompanhar" e não chama a API')
it('logado mostra "Marcar como concluído" e chama POST /api/progress')
```

- [ ] **Step 2: Rodar e confirmar FAIL**

Run: `npm run test -- tests/components`
Expected: FAIL.

- [ ] **Step 3: Implementar componentes**

`StudySessionPanel`: separa `recursos` por tipo, extrai ID do YouTube, guarda `carregado` em estado local; `youtube-nocookie.com/embed/<id>` só após clique. `LessonCompleteButton`: cliente, recebe `logado: boolean` e `lessonSlug`; deslogado linka para `/login?callbackUrl=...`; logado `fetch('/api/progress', { method:'POST' })`. `Header`: navegação responsiva com menu mobile. `ProgressBar`: largura em % via `style`.

- [ ] **Step 4: Implementar páginas server-safe**

Páginas server components com `generateStaticParams` onde couber, `notFound()` para slugs ausentes, `<article>` com conteúdo MDX via `next-mdx-remote/rsc`, badges das skills desenvolvidas, painel de sessão e botão de conclusão. Landing com CTA "Começar" e prévia da matriz.

- [ ] **Step 5: Rodar testes, build e smoke visual**

Run: `npm run test -- tests/components && npm run build && npm run dev` e abrir no navegador em 375px e 1440px.
Expected: PASS; páginas legíveis, sem overflow horizontal.

- [ ] **Step 6: Commit**

```bash
git add . && git commit -m "feat: public curriculum pages and study session panel"
```

---

### Task 8: Matriz de hardskills, radar e dashboard

**Files:**
- Create: `src/components/SkillRadar.tsx`, `src/components/SkillSlider.tsx`, `src/app/skills/page.tsx`, `src/app/dashboard/page.tsx`, `tests/components/radar.test.tsx`

**Interfaces:**
- Consumes: `getLessons`, `getCourse` (Task 2), `computeLevel`, `buildRoadmap` (Task 3), `skills` (Task 2), repositórios (Task 4), `getSessionUserId` (Task 5).

- [ ] **Step 1: Teste que falha**

```tsx
it('radar desenha um vértice por skill e usa o nível como raio')
it('matriz em tela estreita empilha lista abaixo do radar sem overflow')
```

- [ ] **Step 2: Rodar e confirmar FAIL**

Run: `npm run test -- tests/components/radar`
Expected: FAIL.

- [ ] **Step 3: Implementar**

`SkillRadar`: SVG com `viewBox="0 0 400 400"`, um eixo por skill, polígonos por nível 1–5 e polígono do usuário; `preserveAspectRatio` + CSS `max-width:100%`. `SkillSlider`: `input[type=range]` 0–5 que chama `PUT /api/baseline` (e `/api/meta` para alvo). `/skills`: servidor calcula níveis via `computeLevel` com baseline+soma de pesos das lições concluídas; visitante vê matriz zerada com convite para entrar. `/dashboard`: roadmap via `buildRoadmap`, progresso e próximas lições.

- [ ] **Step 4: Rodar testes e build**

Run: `npm run test -- tests/components/radar && npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add . && git commit -m "feat: skills matrix, radar and dashboard"
```

---

### Task 9: Login, contribuição e acabamento PT-BR

**Files:**
- Create: `src/app/login/page.tsx`, `src/app/contribuir/page.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `signIn`, `signOut` (Task 5).

- [ ] **Step 1: Escrever conteúdo PT-BR e verificar rotas**

`/login` com botão "Entrar com GitHub" e callbackUrl; `/contribuir` explicando como adicionar lição (copiar MDX, campos obrigatórios, abrir PR). `error.tsx` e `not-found.tsx` com mensagens acionáveis em PT-BR.

- [ ] **Step 2: Rodar lint e build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add . && git commit -m "feat: login, contribute guide and brazilian portuguese polish"
```

---

### Task 10: CI, deploy e verificação final

**Files:**
- Create: `.github/workflows/ci.yml`, `docs/deploy.md`

**Interfaces:**
- Consumes: todos os tasks anteriores.

- [ ] **Step 1: CI**

Workflow com `npm ci`, `npm run lint`, `npm run test`, `npm run build`. Postgres de teste via serviço `postgres` do GitHub Actions com `DATABASE_URL_TEST`.

- [ ] **Step 2: Documentar deploy**

`docs/deploy.md`: Neon (Postgres free tier), Vercel, variáveis de ambiente do `.env.example`, OAuth GitHub (callback `/api/auth/callback/github`), licenças (MIT código / CC BY-SA conteúdo).

- [ ] **Step 3: Verificação final no artefato real**

Run: `npm run lint && npm run test && npm run build` e smoke manual: visitante navega, entra com GitHub, conclui lição, nível sobe, roadmap muda, vídeo carrega por clique, doc abre, 375px e 1440px.
Expected: tudo PASS; nenhuma regressão de mobile.

- [ ] **Step 4: Commit**

```bash
git add . && git commit -m "chore: CI, deploy docs and final verification"
```
