# Deploy — Vercel + Neon

Stack escolhida: Vercel Hobby (grátis para projeto pessoal não comercial) + Neon Free (1 GB, 100 CU-h/mês, scale-to-zero após 5 min).

## 1. Neon (banco)

1. Crie conta em https://neon.tech e um projeto chamado `bussola`.
2. Copie a connection string do banco. Use a URL com pool se a ferramenta oferecer.
3. A connection string vai para `DATABASE_URL`.
4. Rode as migrations uma vez, de dentro do repo:

```bash
DATABASE_URL="postgres://..." npm run db:migrate
```

Se a conexão exigir TLS, inclua `?sslmode=require` na URL.

Sem `DATABASE_URL` a aplicação usa PGlite em memória, mas `getDb()` lança erro em `NODE_ENV=production`. Ou seja, produção sem banco quebra no login e no progresso.

## 2. GitHub OAuth App

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
2. Application name: `Bússola`.
3. Homepage URL: `https://<projeto>.vercel.app`.
4. Authorization callback URL: `https://<projeto>.vercel.app/api/auth/callback/github`.
5. Client ID vira `AUTH_GITHUB_ID`. Client Secret vira `AUTH_GITHUB_SECRET`.

O domínio exato só existe depois do primeiro deploy no Vercel. Se necessário, crie o OAuth App com `http://localhost:3000/api/auth/callback/github` e adicione a URL de produção depois.

## 3. Vercel

1. Crie conta em https://vercel.com.
2. Add New → Project → importe `https://github.com/bashln/bussola`.
3. Framework preset Next.js. Build command padrão, sem ajustes.
4. Adicione as variáveis de ambiente:

| Variável | Origem |
|---|---|
| `DATABASE_URL` | connection string do Neon |
| `AUTH_SECRET` | gere com `openssl rand -base64 32` |
| `AUTH_GITHUB_ID` | Client ID do OAuth App |
| `AUTH_GITHUB_SECRET` | Client Secret do OAuth App |

5. Deploy. O domínio será `https://<projeto>.vercel.app`.
6. Volte ao OAuth App e confirme a callback URL com o domínio real.

Nunca commite esses valores. Compartilhe segredos só pelo formulário seguro do Paseo.

## 4. Verificação depois do deploy

- `GET /` responde 200 e mostra "Bússola".
- `GET /paths`, `/skills`, `/dashboard` respondem 200.
- `GET /login` mostra "Entrar com GitHub".
- Login redireciona para `/dashboard` e cria a linha do usuário via `ensureUser()`.
- Concluir uma lição atualiza radar e roadmap após `router.refresh()`.

## 5. Domínio próprio (opcional)

Vercel → Project → Settings → Domains. Depois troque Homepage URL e callback URL no OAuth App e adicione o novo domínio em `AUTH_URL` se necessário.

## Licenças

Código sob [MIT](../LICENSE). Conteúdo sob [CC BY-SA 4.0](../LICENSE-content).
