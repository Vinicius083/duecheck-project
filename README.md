# DueCheck Project

DueCheck é uma aplicação desenvolvida para gerenciar consultas e usuários de forma eficiente. O projeto utiliza Prisma como ORM para interagir com o banco de dados PostgreSQL, garantindo uma integração robusta e escalável. A aplicação é composta por um backend desenvolvido em Node.js e TypeScript, com suporte a operações CRUD para os modelos de usuários e consultas.

## Funcionalidades principais

- **Gerenciamento de usuários:** Criação, leitura, atualização e exclusão de usuários, com validação de e-mails únicos.
- **Gerenciamento de consultas:** Criação de consultas associadas a usuários, com validação de CPF único para evitar duplicidades.
- **Banco de dados:** Integração com PostgreSQL utilizando Prisma ORM.
- **Validações:** Regras de unicidade para campos como e-mail e CPF, garantindo consistência nos dados.
- **Atualizações automáticas:** Campos como `createdAt` e `updatedAt` são gerenciados automaticamente pelo Prisma.

## Tecnologias utilizadas

- **Node.js:** Plataforma para execução do backend.
- **TypeScript:** Linguagem utilizada para maior segurança e tipagem estática.
- **Prisma:** ORM para modelagem e interação com o banco de dados.
- **PostgreSQL:** Banco de dados relacional utilizado no projeto.

## Estrutura do projeto

- **Backend:** Contém os serviços, controladores e configurações do Prisma.
- **Prisma:** Diretório com o arquivo `schema.prisma`, que define os modelos e a conexão com o banco de dados.
- **Gerado pelo Prisma:** Código gerado automaticamente para interagir com o banco de dados.

## Configuração

1. Certifique-se de ter o Node.js e o PostgreSQL instalados.
2. Configure a variável de ambiente `DATABASE_URL` no arquivo `.env` com a URL de conexão do banco de dados.
3. Execute `npm install` para instalar as dependências.
4. Use `npx prisma migrate dev` para aplicar as migrações no banco de dados.
5. Inicie o servidor com `npm run dev`.

## Observações

- O Prisma Client é gerado automaticamente após a configuração do schema. Certifique-se de executar `npx prisma generate` após alterações no arquivo `schema.prisma`.
- O projeto utiliza a versão **6.6.0** do Prisma Client.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias no projeto.
