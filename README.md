# HELPLESS

Uma aplicação web voltada para os alunos da UTFPR-CP que estão atualmente na graduação, com objetivo de ajudar na gerencia de suas atividades complementares. Tem como funcionalidades: guardar documentos, fornecer feedbacks intuitivos de pontuação, entre outras. O helpless-backend é uma API REST em Node.js usada no projeto.

## 🎈Começando

Faça o fork da aplicação e o clone na sua máquina.

### 📃 Pré-requisitos

* Yarn
* PostgreSQL, ultima versão. (Pode ser alterado no código)
* Docker (opcional), para rodar o bd. Você pode instalar facilmente um novo bd com o comando:
```
docker run --name postgres --restart unless-stopped -p 5432:5432 -e POSTGRES_PASSWORD=SUA_SENHA -d postgres:latest
```

### 🔧 Instalação

Crie um arquivo `.env` na raiz do aplicativo e contendo DATABASE_URL e APP_SECRET.

Execute os comandos:
```
yarn install
yarn db:migrate
yarn dev
```

## 🛠 Ferramentas

* Node.js - Ambiente de execução em JavaScript.
* TypeScript - Linguagem de programação baseada em JavaScript.
* Prisma - ORM para mapeamento e acesso ao BD.
* PostgreSQL - Sistema de gerenciamento de banco de dados relacional.
* Docker - Plataforma de criação e administração de ambientes isolados.
* Express.js - Framework de criação de servidores web.
