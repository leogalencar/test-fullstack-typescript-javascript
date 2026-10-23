# Teste Técnico — CRUD de Usuários (React + Node/Express)

Aplicação Fullstack em **TypeScript** para gerenciamento de usuários (listagem, criação e edição), composta por uma API REST em **Node.js + Express + Prisma (SQLite) + Zod** e uma interface web em **React 19 + Vite**.

---

## Funcionalidades

- **Listar usuários** (`GET /users`): Exibe todos os usuários cadastrados ordenados por data de criação.
- **Criar usuários** (`POST /users`): Cadastra novos usuários com validação de campos obrigatórios (`name`, `email`), formato de e-mail válido e verificação de unicidade de e-mail.
- **Editar usuários** (`PUT /users/:id`): Atualiza dados de um usuário existente garantindo que o novo e-mail não pertença a outro registro.

---

## Pré-requisitos e Versão do Node

- **Node.js**: `v24.x` (desenvolvido e testado com **`v24.22.1`** — requer Node `>= 22.6.0` para suporte nativo a TypeScript no backend)
- **npm**: `v10+`

---

## Dependências Principais

### Backend (`/backend`)
- **Produção**: `express` (`^5.3.0`), `cors` (`^2.8.6`), `@prisma/client` (`^7.10.1`), `@prisma/adapter-better-sqlite3` (`^7.10.1`), `better-sqlite3` (`^13.0.3`), `zod` (`^4.6.7`), `dotenv` (`^18.0.9`)
- **Desenvolvimento**: `typescript` (`^7.0.2`), `prisma` (`^7.10.1`), `@types/express`, `@types/cors`, `@types/better-sqlite3`, `@types/node`

### Frontend (`/frontend`)
- **Produção**: `react` (`^19.3.1`), `react-dom` (`^19.3.1`)
- **Desenvolvimento**: `vite` (`^8.3.4`), `@vitejs/plugin-react` (`^6.1.2`), `typescript` (`~6.0.3`), `oxlint` (`^1.88.0`), `@types/react`, `@types/react-dom`, `@types/node`

---

## Como Rodar o Projeto

### 1. Rodando o Backend (API)

Abra um terminal e execute os passos abaixo:

```bash
# 1. Acesse a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Crie o arquivo .env a partir do exemplo
cp .env.example .env

# 4. Gere o cliente Prisma e aplique as migrations do banco SQLite
npx prisma generate --config prisma7.config.ts
npx prisma migrate dev --config prisma7.config.ts

# 5. Inicie o servidor em modo de desenvolvimento
npm run dev
```

O servidor da API estará rodando em **`http://localhost:3001`**.

> Para mais detalhes sobre os endpoints e decisões de arquitetura do servidor, consulte o [README do Backend](./backend/README.md).

---

### 2. Rodando o Frontend (Interface Web)

Em um **segundo terminal** (mantendo o backend em execução), execute:

```bash
# 1. Acesse a pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Crie o arquivo .env a partir do exemplo
cp .env.example .env

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação web estará disponível em **`http://localhost:3000`**.

> Para mais detalhes sobre os componentes e decisões técnicas da interface, consulte o [README do Frontend](./frontend/README.md).

---

## Endpoints da API

| Método | Rota         | Descrição                  | Status HTTP de Retorno |
| ------ | ------------ | -------------------------- | ---------------------- |
| `GET`  | `/users`     | Lista todos os usuários    | `200 OK`               |
| `POST` | `/users`     | Cria um novo usuário       | `201 Created`, `400`   |
| `PUT`  | `/users/:id` | Atualiza um usuário por ID | `200 OK`, `400`, `404` |

### Exemplo de Payload (`POST /users` e `PUT /users/:id`)

```json
{
  "name": "Mario Silva",
  "email": "mario@email.com",
  "role": "Desenvolvedor"
}
```

---

## Estrutura do Repositório

```text
.
├── backend/          # API REST (Node.js, Express, Prisma, SQLite, Zod)
├── frontend/         # Aplicação Web (React 19, TypeScript, Vite)
├── task.md           # Especificação original do teste técnico
└── README.md         # Documentação geral do projeto
```
