# Deploy

## Banco de dados (Neon, free tier)

1. Crie um projeto/no banco no Neon e copie a connection string.
2. Defina `DATABASE_URL` com essa string no provedor de deploy.
3. Rode as migrations uma vez:

```bash
DATABASE_URL="postgres://..." npm run db:migrate
```

Sem `DATABASE_URL`, a app usa PGlite em memória — serve para desenvolvimento e testes, mas **não persiste dados** entre requisições em produção.

## Vercel

1. Importe o repositório.
2. Framework: Next.js (detecção automática).
3. Variáveis de ambiente (mesmas de `.env.example`):

| Variável | Origem |
|---|---|
| `DATABASE_URL` | connection string do Neon |
| `AUTH_SECRET` | gere com `openssl rand -base64 32` |
| `AUTH_GITHUB_ID` | OAuth App do GitHub |
| `AUTH_GITHUB_SECRET` | OAuth App do GitHub |

Nunca commite esses valores.

## OAuth no GitHub

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
2. Homepage URL: URL do site.
3. Authorization callback URL: `https://<seu-dominio>/api/auth/callback/github`.
4. Copie Client ID e Client Secret para `AUTH_GITHUB_ID` e `AUTH_GITHUB_SECRET`.

## Conteúdo

Lições, cursos e trilhas são arquivos MDX em `content/`. Contribuições passam por PR; o CI roda lint, testes e build.

## Licenças

- Código: MIT.
- Conteúdo: CC BY-SA 4.0.
