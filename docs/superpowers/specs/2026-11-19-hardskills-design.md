# Hardskills — Design

Data: 2026-11-19
Status: aguardando aprovação

## Intent e por quê

Site gratuito e open-source, para desktop e mobile, onde qualquer pessoa aprende e acompanha hardskills de desenvolvimento web. Começa por web dev (frontend e backend), com foco inicial em backend/Node.js.

Motivo: o autor quer um lugar para testar, aprimorar e aprender programação, aberto a quem quiser o mesmo. Inspiração explícita: The Odin Project (currículo livre, orientado a projetos, mantido por comunidade open-source).

Diferencial sobre o Odin: o currículo e uma **matriz de hardskills** são ligados. Concluir lições/projetos move níveis Skills; a matriz devolve um roadmap do que estudar depois.

## Goals

- Aprender web dev em PT-BR, de graça, sem anúncios intrusivos.
- Mapear competências por skill (as "hardskills") com nível visível (0–5).
- Ligar progresso do currículo às skills: concluir conteúdo atualiza a matriz.
- Agrupar, por lição, uma **sessão de estudo** com vídeos curados e links para documentação oficial.
- Ser open-source e contributável: conteúdo versionado, fácil de adicionar lições.
- Funcionar bem em desktop e mobile (responsivo desde o início).

## Non-goals

- Corrigir código enviado pelo usuário automaticamente (upload/CodePen): pendência futura.
- Fórum, Discord ou chat/comunidade no v1.
- Cursos em vídeo, assinatura ou qualquer cobrança.
- Cobrir todas as linguagens — v1 é JavaScript/Node + fundamentos.

## Anti-goals (o que seria falha mesmo funcionando)

- Agregador de links externos mortos/desatualizados sem manutenção.
- Matriz que a pessoa preenche e nunca mais usa (sem ligação com o currículo).
- Produto bonito no desktop e quebrado no celular.
- Exigir infra paga para rodar.

## Constraints

- Gratuito, open-source, licença a definir (sugestão: MIT para código, CC BY-SA para conteúdo).
- Conteúdo e interface em PT-BR.
- Responsivo (mobile-first).
- Repositório greenfield em `/home/agente/projects/hardskills` (ainda sem git).
- Sem custo de infra para o mantenedor: dependentes de free tiers.

## Abordagens consideradas

1. **Currículo curado + matriz ligada (escolhida).** Lições/projetos como arquivos Markdown/MDX no repo, conteúdo curado no estilo Odin + specs de projeto próprias. Cada lição declara quais skills desenvolve. Matriz híbrida: baseline manual + aumento por conclusão. Prós: entrega o diferencial, baixo custo, contribuível via PR. Contras: precisa de regra de cálculo de nível clara e de manutenção do conteúdo.
2. **Desafios com correção automática (sandbox/Docker).** Usuário envia código, testes rodam. É o "testar" literal, mas exige isolamento, fila, custo de compute e manutenção de imagens. Rejeitado para v1; fica como integração futura (upload ou CodePen).
3. **Plataforma de cursos em vídeo.** Passivo, caro de produzir, host de vídeo externo, contrário ao espírito open-source local. Rejeitado.

## Decisões fechadas (com o autor)

- **Modelo 1+3:** trilhas de aprendizado + matriz de hardskills, **ligadas**.
- **Nível híbrido:** baseline manual no início + conclusão de lições empurra o nível, com teto por faixa.
- **"Concluir" = marcar lição/projeto como feito.** Sem correção de código no v1.
- **Conteúdo curado + specs de projeto próprias**, em PT-BR.
- **Login GitHub** para salvar progresso.
- Fora do v1: upload/correção de código, integração CodePen, comunidade/fórum, frontend avançado.

## Decisões tomadas pelo agente (call, não concordadas explicitamente)

- Stack sugerida: Next.js (App Router) + TypeScript + Tailwind CSS; conteúdo em MDX versionado; Auth.js (GitHub OAuth); PostgreSQL via free tier com Drizzle ORM; Vitest + Playwright para testes; deploy em Vercel/equivale.
- Essa stack é uma proposta; o plano de implementação a confirma ou ajusta.

### Decisões do builder check (call do agente)

- **Visitante:** conteúdo (paths, cursos, lições, projetos, matriz zerada) é público. Só salvar progresso exige login GitHub. Sem persistência local nem migração anônimo→conta no v1. Rotas de progresso mostram estado "entre para acompanhar" quando deslogado.
- **Notas de entrega:** são orientação estática escrita no MDX do projeto, não dado salvo pelo usuário. Nenhuma entidade nova no schema. "Sem upload" vale para arquivos; texto também não é persistido no v1.
- **Baseline:** sem wizard de onboarding. No primeiro login a `/skills` já mostra os sliders das 17 skills em 0, com dica "ajuste o que você já sabe". Ajuste é sempre possível depois na mesma tela.
- **Prereqs:** consultivos. Ordenam o roadmap e aparecem como "recomendado antes", mas não travam a conclusão da lição (sem cadeado, sem checagem server-side de gate).
- **Meta padrão:** quando não há linha `Meta`, o alvo é 5 para toda skill. O roadmap sempre mostra algo; a pessoa só cria `Meta` quando quer alvo diferente.

## Modelo de dados (núcleo)

```
Path       id, slug, titulo, descricao, ordem
Course     id, pathId, slug, titulo, ordem
Lesson     id, courseId, slug, titulo, tipo (leitura|projeto),
           conteudoRef (MDX), minutos, skillWeights {skillId: peso},
           prereqs [lessonId]
Recurso    tipo (video|doc), titulo, url, resumo?, ancora?  [no MDX da lição]
Skill      id, slug, nome, categoria (frontend|backend|ferramentas),
           descricao, limiares [w1..w5]
User       id, githubId, usuario, avatarUrl
Baseline   userId, skillId, nivel (0-5)
Progresso  userId, lessonId, status, concluidoEm
Meta       userId, skillId, nivelAlvo
```

### Cálculo do nível (híbrido, determinístico)

- Cada Skill tem `limiares = [w1, w2, w3, w4, w5]` (peso acumulado necessário para cada nível).
- `score = baseline[skill] * w1 + soma(skillWeights[skill] das lições concluídas)`.
- `nivel = maior L em 1..5 tal que score >= limiares[L-1]`, senão 0.
- Isso dá o "teto por faixa": um salto de baseline 3 começa em 3, e cada lição empurra gradualmente até 5.
- Nunca diminui sozinho: concluir lições só adiciona peso. Ajuste manual do baseline é explícito.

### Roadmap

Para cada skill com `nivel < meta` (meta padrão = 5), sugerir lições não concluídas que developing essa skill, ordenadas por: prereqs satisfeitos → peso da skill (desc) → ordem do curso. Prereqs são consultivos; nunca bloqueiam a conclusão.

## Sessão de estudo (vídeos + documentação)

Cada lição pode declarar, no frontmatter do MDX, uma lista `recursos` com dois tipos:

- **`video`** — URL do YouTube + título + canal/duração opcional + por que aquele vídeo ajuda. Renderizado como iframe via `youtube-nocookie.com`, carregado só depois de clique (privacidade e performance). Sem hospedar vídeo, sem upload.
- **`doc`** — URL da documentação oficial (MDN, docs de Node/Express/Postgres etc.) + título + `resumo` opcional dizendo o que olhar ("parâmetro `callback` de `Array.prototype.map`"). `ancora` opcional para links diretos ao trecho. Abre em nova aba com `rel="noopener noreferrer"`.

A tela da lição mostra um painel "Sessão de estudo" com as duas seções. É curadoria, não espelhamento: links podem quebrar e o conteúdo é mantido por PR, como o resto. Nenhum dado novo no banco — `Recurso` vive no MDX.

## Telas principais

- `/` — landing: proposta, CTA "Começar", prévia da matriz.
- `/paths` e `/paths/[slug]` — trilhas e seus cursos, com progresso.
- `/courses/[slug]` — lições do curso + barra de progresso.
- `/lessons/[slug]` — conteúdo MDX, painel "Sessão de estudo" (vídeos + docs), badges de skills desenvolvidas, botão "Marcar como concluído".
- `/projects/[slug]` — spec do projeto + orientação de entrega (estática, no MDX; sem upload e sem notas salvas), marcar como feito.
- `/skills` — minha matriz: radar + lista com nível, meta e ajuste de baseline (sliders em 0 no primeiro login; visitante vê matriz zerada com convite para entrar).
- `/dashboard` — progresso, roadmap, próximas lições.
- `/login` — callback GitHub OAuth.
- `/contribuir` — como adicionar conteúdo via GitHub.

## Skills semente (v1, backend)

Lógica de programação · Estruturas de dados · Orientação a objetos · JavaScript · Node.js · TypeScript (noções) · Frameworks backend (Express/Fastify/Nest) · REST APIs · SQL (PostgreSQL/MySQL) · NoSQL (MongoDB) · Git · Organização de código · Testes unitários (Jest/Vitest) · Autenticação/autorização/segurança de API · Docs e testes de API (Swagger/Postman) · Docker e cloud (diferencial).

Frontend (HTML/CSS, responsividade, DOM, React) entra na leitura seguinte, fora da primeira entrega.

## Deixado para o builder (plano de implementação)

- Confirmar/ajustar a stack e o provedor free tier.
- Detalhar componentes, rotas e esquema Drizzle completo.
- Definir os limiares numéricos por skill e o conteúdo MDX semente das primeiras lições.
- Estratégia de testes (unidade no cálculo de nível/roadmap; e2e nos fluxos de concluir e matriz).
- Pipeline de contribuição de conteúdo (validação do frontmatter MDX, incluindo os `recursos` de vídeo/doc).
- Deploy e variáveis de ambiente (sem segredos no repo; GitHub OAuth via config do provedor).
