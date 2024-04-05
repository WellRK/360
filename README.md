<h1 align="center">API</h1>

## :computer: Requisitos

[![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)]((https://nodejs.org/en//))
[![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![YARN](https://img.shields.io/badge/YARN-%23000000.svg?style=for-the-badge&logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/install/#install-compose)

## Descriçao

API controle de acesso e modulo indicação de propriedade.

## Instalação

Acesse o diretório raiz da API e execute o comando.

```bash
$ yarn
```
## Preparar o ambiente

**1**. Acesse o diretório raiz da API e execute o comando abaixo:

``` sh
$ docker-compose up -d
```

**2**. Execute o comando para criar a estrutura do banco de dados:

``` sh
$ yarn migration:run:dev
```

**3**. Execute o comando para inserir dados iniciais:

``` sh
$ yarn seed:dev
```

## Executando a API

```bash
# development
$ yarn start:dev

```
## Documentação

Após executar a api acesse http://localhost:3000/docs

## Publicar no pm2

Revise os dados presentes no arquivo ./config/env/dev.env e execute o comando:

```bash
$ yarn publish:dev
```
