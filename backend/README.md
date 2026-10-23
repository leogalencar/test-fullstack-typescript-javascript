# Backend — API CRUD de Usuários

API REST construída com **Node.js**, **Express**, **TypeScript**, **Prisma ORM**, **SQLite** e **Zod**.

---

## Pré-requisitos

- **Node.js**: `v24.x` (desenvolvido e testado com `v24.22.1` — requer suporte nativo a TypeScript via Node `>= 22.6.0`)
- **npm**: `v10+`

---

## Dependências Principais

### Produção
- `express` (`^5.3.0`) — Framework HTTP
- `cors` (`^2.8.6`) — Habilitação de CORS para integração com o frontend
- `@prisma/client` & `@prisma/adapter-better-sqlite3` (`^7.10.1`) — ORM e adapter SQLite
- `better-sqlite3` (`^13.0.3`) — Driver SQLite
- `zod` (`^4.6.7`) — Validação de dados e schemas
- `dotenv` (`^18.0.9`) — Carregamento de variáveis de ambiente

### Desenvolvimento
- `typescript` (`^7.0.2`)
- `prisma` (`^7.10.1`)
- `@types/express`, `@types/cors`, `@types/better-sqlite3`, `@types/node`

---

## Configuração e Instalação

1. **Acesse a pasta do backend:**
   ```bash
   cd backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

   Variáveis disponíveis no `.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   BACKEND_PORT=3001
   PORT=3001
   BACKEND_URL="http://localhost:3001"
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Gere o cliente Prisma e execute as migrations do banco SQLite:**
   ```bash
   npx prisma generate --config prisma7.config.ts
   npx prisma migrate dev --config prisma7.config.ts
   ```

---

## Como Rodar o Backend

- **Modo de desenvolvimento (com hot-reload):**
  ```bash
  npm run dev
  ```

- **Modo de produção:**
  ```bash
  npm start
  ```

- **Checagem de tipos (TypeScript):**
  ```bash
  npm run typecheck
  ```

O servidor iniciará por padrão em `http://localhost:3001`.

---

## Endpoints da API

| Método | Rota         | Descrição                   | Status de Retorno        |
| ------ | ------------ | --------------------------- | ------------------------ |
| `GET`  | `/users`     | Lista todos os usuários     | `200 OK`                 |
| `POST` | `/users`     | Cria um novo usuário        | `201 Created`, `400`     |
| `PUT`  | `/users/:id` | Atualiza um usuário por ID  | `200 OK`, `400`, `404`   |

---

## Decisões Técnicas (Key Decisions)

- **Arquitetura em Camadas (Layered Architecture)**: O projeto foi estruturado separando responsabilidades em `routes/` (roteamento), `controllers/` (tratamento de requisições/respostas HTTP e status codes), `services/` (regras de negócio e comunicação com o banco), `schemas/` (contratos de validação) e `utils/` (utilitários). Essa separação mantém o código desacoplado, legível e fácil de testar ou escalar.
- **Prisma ORM (v7)**: Em vez de escrever queries SQL manualmente, optei pelo Prisma ORM pela segurança de tipos (*type-safety*), produtividade e gerenciamento declarativo de schemas e migrations. Foi escolhida a versão 7 estável (com `@prisma/adapter-better-sqlite3`), que conta com documentação consolidada para uso com SQLite, evitando possíveis instabilidades de versões *release candidate* mais recentes.
- **SQLite para Persistência**: Embora o teste permitisse armazenamento em memória, optei pelo SQLite para garantir persistência real dos dados entre reinicializações do servidor, sem exigir infraestrutura externa (como containers Docker para PostgreSQL ou MongoDB). Isso simplifica a avaliação do projeto mantendo o comportamento real de um banco relacional (como *constraints* `@unique` e geração automática de `id` e `createdAt`).
- **Validação de Dados com Zod**: Utilizado na camada de entrada para validar formato de e-mail e obrigatoriedade de campos antes de acionar a camada de serviço. Isso evita condicionais manuais verbosas nos controllers e garante respostas padronizadas (`400 Bad Request`) com mensagens claras por campo.
- **Tratamento Centralizado de Erros (`AppError`)**: Criação de uma classe utilitária customizada (`utils/app-error.ts`) para encapsular erros de regra de negócio (como e-mail duplicado `400` ou usuário não encontrado `404`), permitindo que a camada de serviço permaneça independente do protocolo HTTP enquanto o controller traduz cada exceção para o status code adequado.
