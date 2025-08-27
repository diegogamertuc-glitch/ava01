# CRUD de Estoque

Este projeto fornece uma API simples para controle de estoque utilizando Node.js, Express e SQLite através do Knex. O objetivo do CRUD é permitir o gerenciamento completo dos produtos do estoque: criar novos itens, listar os existentes, atualizar informações e excluir registros.

## Como executar o CRUD

1. Acesse a pasta da API:
   ```
   cd api-estoque
   ```
2. Instale as dependências (se necessário):
   ```
   npm install
   ```
3. Execute as migrações do banco de dados SQLite:
   ```
   npm run migrate
   ```
4. Inicie o servidor da API:
   ```
   npm run dev
   ```
5. A API estará disponível em `http://localhost:3000`.

## Endpoints principais
- `GET /produtos` &mdash; lista todos os produtos.
- `GET /produtos/:id` &mdash; obtém um produto específico.
- `POST /produtos` &mdash; cadastra um novo produto (campos `nome`, `quantidade`, `preco`).
- `PUT /produtos/:id` &mdash; atualiza um produto existente.
- `DELETE /produtos/:id` &mdash; remove um produto do estoque.

Este CRUD tem como propósito facilitar o registro e a manutenção do estoque de produtos, garantindo controle sobre as entradas e saídas.
