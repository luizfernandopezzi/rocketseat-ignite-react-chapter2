# Consumindo API

Após construção da aplicação (estrutura e estilo) com dados estáticos, chega a hora de começar a tornar a aplicação funcional. Neste ponto começa a se fazer necessário conectar o FRONT END com o BACK END, seja ele desenvolvido PHP, PYTHON, JAVA, RUBY, NODE, etc... Ou seja, vamos ter uma API REST ou uma API GRAPHQL que irão servir dados para o FRONT END ler, editar, gravar, etc... 

Muitas vezes, quando o time de FRONT END finaliza o desenvolvimendo de alguma feature que o BACK END ainda não finalizou e não possui a rota/API para forencimento dos dados. Terminar a aplicação com dados estáticos não é interessante pois é muito diferente de estar consumindo uma API visto que ficarão faltando muitas funcionalidades do lado do REACT como estados, useEffects, consumo de API em si, loading, tratamento de erros, etc...

Um meio termo que pode ser utilizado no ambiente de desenvolvimento e testes é a simulação de uma API Fake através de:
1) JSON SERVER: criação de um arquivo db.json com a estrutura de um objeto JS onde cada chave do objeto é uma rota. Cada chave do objeto armazena um array de objetos, criando toda a estrutura necessária para o CRUA (create, read, update, delete).

* Getting started
* Install JSON Server

npm install -g json-server

* Create a db.json file with some data

{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}

* Start JSON Server

json-server --watch db.json

* Now if you go to http://localhost:3000/posts/1, you'll get

{ "id": 1, "title": "json-server", "author": "typicode" }

Neste projeto não iremos utilizar o JSON SERVER pois precisamos executá-lo em um processo paralelo de modo que ele não é executado junto com a aplicação. Ou seja, para utilizá-lo no ambiente de desenvolvimento é necessário executar algo à parte da aplicação.

2) MirageJS: an API mocking library. Consegue-se construir uma API Fake dentro da aplicação, de modo que não é necessário rodar nada em paralelo.

3) MSW: Mocking Service Worker.

# MirageJS

yarn add miragejs

Em index.tsx:

import { Server, createServer } from 'miragejs'

# Configurando Cliente Axios

Configura-se um cliente HTTP para não precisar realizar as requisições utilizando fetch que é a API nativa de requisições HTTP do próprio browser. Opta-se por não utilizar o fetch e sim outra biblitoeca pois:
1) O fetch necessita que indique-se toda a URL em toda a requisição realizada;
2) Necessidade de transformar a response em json em toda requisição realizada;
3) Através da biblioteca AXIOS, é possível interceptar a requisição antes de chegar no backend/API e portanto alterar dados, adicionando tokens de autentificação por exemplo, ou outras infos. O mesmo para as respostas.

yarn add axios

Cria-se uma pasta src/services
Cria-se arquivo api.ts

import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://localhost:3000/appapi'
})