# Frontend — Interface CRUD de Usuários

Aplicação web construída com **React 19**, **TypeScript** e **Vite** para gerenciamento de usuários (listagem, criação e edição), consumindo a API REST do backend.

---

## Pré-requisitos

- **Node.js**: `v24.x` (desenvolvido e testado com `v24.22.1`)
- **npm**: `v10+`
- **Backend em execução** em `http://localhost:3001` (ou na URL configurada via variável de ambiente)

---

## Dependências Principais

### Produção
- `react` (`^19.3.1`) — Biblioteca para construção da interface de usuário
- `react-dom` (`^19.3.1`) — Renderização DOM do React

### Desenvolvimento
- `vite` (`^8.3.4`) — Bundler e servidor de desenvolvimento rápido
- `@vitejs/plugin-react` (`^6.1.2`) — Integração oficial do React com Vite
- `typescript` (`~6.0.3`) — Tipagem estática
- `oxlint` (`^1.88.0`) — Linter rápido para React e TypeScript
- `@types/react`, `@types/react-dom`, `@types/node`

---

## Configuração e Instalação

1. **Acesse a pasta do frontend:**
   ```bash
   cd frontend
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
   VITE_API_URL=http://localhost:3001
   ```

---

## Como Rodar o Frontend

- **Modo de desenvolvimento:**
  ```bash
  npm run dev
  ```
  A aplicação estará disponível em `http://localhost:3000`.

- **Build de produção (inclui checagem de tipos via `tsc -b`):**
  ```bash
  npm run build
  ```

- **Visualizar build de produção localmente:**
  ```bash
  npm run preview
  ```

- **Executar o linter (`oxlint`):**
  ```bash
  npm run lint
  ```

---

## Estrutura de Pastas

```text
frontend/src/
├── components/
│   ├── UserForm.tsx       # Formulário unificado de criação e edição de usuários
│   └── UserList.tsx       # Tabela de listagem de usuários com estados de loading e vazio
├── lib/
│   └── api.ts             # Configuração de URL base e tratamento padronizado de respostas HTTP
├── services/
│   └── user.service.ts    # Comunicação com os endpoints REST (/users)
├── types/
│   ├── error.ts           # Tipagem de erros retornados pela API
│   └── user.ts            # Contratos de dados de usuário (User, UserFormData)
├── App.tsx                # Componente principal e gerenciamento de estado do CRUD
├── index.css              # Estilização responsiva da aplicação
└── main.tsx               # Ponto de entrada da aplicação React
```

---

## Decisões Técnicas (Key Decisions)

- **Separação entre Camada de Serviço e Componentes Visuais**: A comunicação HTTP (`fetch`) foi isolada em `services/user.service.ts` e `lib/api.ts`, mantendo os componentes React (`App.tsx`, `UserForm.tsx`, `UserList.tsx`) focados exclusivamente em estado de interface e experiência do usuário.
- **Fetch API Nativa (Zero Dependências Extras)**: Utilização da API `fetch` nativa do navegador em conjunto com o helper genérico `handleResponse<T>`, eliminando a necessidade de bibliotecas externas como Axios e mantendo o bundle enxuto.
- **Tratamento Unificado de Erros do Backend**: O helper `handleResponse` intercepta respostas HTTP de erro (`400`, `404`, `500`) e extrai tanto mensagens de validação de campos do **Zod** (`errors`) quanto erros de regra de negócio do `AppError` (`message`, como e-mail duplicado), exibindo feedback claro no formulário.
- **Formulário Reutilizável (`UserForm`)**: Um único componente atende tanto à criação (`POST /users`) quanto à edição (`PUT /users/:id`), sincronizando os dados de entrada com o estado de `editingUser` seguindo os padrões recomendados do React 19 (sem efeitos colaterais desnecessários em `useEffect`).
