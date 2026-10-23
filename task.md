https://github.com/2f-tecnologia/test-fullstack-typescript-javascript

# 🧪 Teste Técnico — CRUD de Usuários (React + Node/Nest)

## 📌 Objetivo

Desenvolver uma aplicação simples com:

- **Frontend:** React  
- **Backend:** Node.js (Express) ou NestJS  

A aplicação deve permitir:

- Listar usuários  
- Criar usuários  
- Editar usuários  

---

## 🖥 Backend (API)

### 🔹 Tecnologias

- Node.js  
- Express **ou** NestJS  
- Banco de dados livre (pode ser em memória)

### 🔹 Modelo de Usuário

Campos obrigatórios:

- `id` (gerado pelo backend)  
- `name` (obrigatório)  
- `email` (obrigatório e único)  
- `role` (opcional)  
- `createdAt` (gerado pelo backend)  

Exemplo:

```ts
{
  id: string | number,
  name: string,
  email: string,
  role?: string,
  createdAt: Date
}
```

### ✅ Regras / Validações

- `name` e `email` são obrigatórios  
- `email` deve ter formato válido  
- `email` não pode ser duplicado (na criação e edição)  
- `id` e `createdAt` devem ser gerados no backend  
- Retornar status HTTP apropriados (200, 201, 400, 404, etc.)  

---

## 🚀 Entrega

O candidato deverá:

1. Criar um repositório no **GitHub pessoal**.  
2. Subir todo o código do projeto (frontend e backend).  
3. Garantir que o projeto esteja rodando conforme as instruções do README.  
4. Enviar o **link do repositório** para o recrutador.  

### 📄 O README do projeto entregue deve conter:

- Instruções para rodar o backend  
- Instruções para rodar o frontend  
- Dependências necessárias  
- Versão do Node utilizada (se aplicável)
