# create react-app my-app --template typescript

Utilizaremos a estrutura pré configurada criada pelo React, create-react-app. Essa estrutura de projeto já trás configurado toda a estrutura do webpack, typescript e babel.

yarn create react-app imoney --template typescript

No Create React-App a configuração do webpack e babel fica dentro do pacote node_modules "react-scripts" e por isso aqui não temos babel.config.js e webpack.config.js na raiz do projeto. É por isso que os scripts defaults são executados através do react-script.

Ao executar o script reject, o qual não pode ser desfeito, todos estes arquivos de configuração saem dos módulos e pacotes são jogados para a pasta raíz. 

A vantagem de utilizar o módulo react-scripts é que caso ocorra alguma atualização no próprio template, react ou nas configurações destes arquivos de estrutura, basta instalarmos a versão mais recente do react-script. Utilizando as configurações na pasta raíz e configurando manualmente, qualquer atualização do React ou webpack/babel, etc, que necessite de alguma mudança nos arquivos estruturais de configuração, é o próprio desenvolvedor quem tem de fazer a atualização.

Por fim, o create react-app trás todos os módulos como dependências e por boa prática, altera-se o package.json criando as devDependencias com os módulos e bibliotecas que não são necessários para produção:

"dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^12.0.0",
    "@testing-library/user-event": "^13.2.1",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.7.13",
    "@types/react": "^17.0.20",
    "@types/react-dom": "^17.0.9",
    "typescript": "^4.4.2"
  }

# Export Default vs Export Function

Ao utiliziar EXPORT DEFAULT, o nome do componente ou código importado é definido na importação, ex:

    function MyComponent(){return(...)}
    export default MyComponent

    import Batata from './.../MyComponent'

Já ao utilizar o EXPORT FUNCTION, o arquivo importador não consegue definir o nome, ex:

    export funcion MyComponente(){return(...)}
    
    import {MyComponent} from './.../MyComponent'

Neste caso, só é possível renomear da seguinte maneira:

        import {MyComponent as Batata} from './.../MyComponent'

Por fim, a imprtação inteligente acaba se perdendo para casos mais complexos ao utilizar export default.

# Instalando Styled Components

Uma das maneiras mais utilizadas para a estilização de aplicações em React é o chamado "CSS in JS" ou seja, CSS diretamente no javascript. Uma das bibliotecas mais utilizadas de CSS-in-js é a styled components.

yarn add styled-components
yarn add @types/styled-components -D

import styled from 'styled-components'

Através da styled-components criamos Componentes previamente estilizados, de modo que o atributo className não é mais diretamente responsável pela estilizição do componente.

Sintaxe:

import styled from 'styled-components'

const Title = styled.h1`
  font-size: 64px;
  color: #8257e6;
`

export function App() {
  return (
    <div className="App">
      <Title>Hello World</Title>
    </div>
  );
}

Cria-se o componente previamente estilizado Title, que é aplicado em uma tag <h1>. No JSX agora, ao invés de definir uma className para estilização deste <h1>, substitui-se o <h1> pelo componente <Title> que já possui sua estilização definida.

Outras vantagens são:

1) Suporta encadeamento de estilos:

const Title = styled.h1`
  color: black,

  p {
    backgorund: red
  }
`

<Title>
  Hello <p>World</p>
</Title>

2) A estilização fica apenas dentro do escopo do componente em questão. Os styled components definidos em um arquivo de componente não estarão disponíveis para outros components. Diferentemente do CSS clássico onde ao estilizarmos por classe, tags e id, qualquer elemento da aplicação com as mesmas classes, tag, etc, também seria estilizado da mesma forma.

# Global Styles

Arquivo CSS utilizado para criar um componente Global Style com estilizações globais.

./styles/global.ts
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`...`

Em App.tsx:

import { GlobalStyle } from "./styles/global";
export function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <GlobalStyle />
    </div>
  );
}

# Tamanho de Fonte

Por padrão, as fontes possuem tamanho 16px (ideal para Desktop).

EM = Relative to the font-size of the element (2em means 2 times the size of the current font)

<head>
<style>
p {
  font-size: 16px;
  line-height: 2em;
}
div {
  font-size: 30px;
  border: 1px solid black;
}
span {
  font-size: 0.5em;
}
</style>
</head>
<body>
<p>These paragraphs have a calculated line-height of: 2x16px = 32px.</p>
<p>These paragraphs have a calculated line-height of: 2x16px = 32px.</p>
<p>These paragraphs have a calculated line-height of: 2x16px = 32px.</p>
<div>The font-size of the div element is set to 30px. <span>The span element inside the div element has a font-size of 0.5em, which equals to 0.5x30 = 15px</span>.</div>
</body>

REM = Relative to font-size of the root element
1rem = font-size padrão da página (16px)

<head>
<style>
html {
  font-size:16px;
}
div {
  font-size: 3rem;
  border: 1px solid black;
}
#top-div {
  font-size: 2rem;
  border: 1px solid red;
}
</style>
</head>
<body>
<p>The font-size of this document is 16px.</p>
<div id="top-div">
The font-size of this div element is 2rem, which translates to 2 x the browser's font size.
<div>The font-size of this div element is 3rem. It also shows that it does not inherit from its parent element font size.</div>
</div>
<p>The rem unit sets the font-size relative to the browsers base font-size, and will not inherit from its parents.</p>
</body>

Diminui-se o font-size juntamente com a tela. Utiliza-se percentual e não diretamente o size em pixels pois caso o usuário esteja utilizando alguma configuração de acessbilidade local no seu dispositivo (como aumento de fonte, etc...), ao definirmos 15px, as configurações do usuário não serão atendidas e a aplicação será exibida com 15px. Utilizando %, a aplicação será estilizada levando em consideração estas configurações de acessibilidade e o font size irá se adequar % às configurações de fonte do usuário.
html {
    @media (max-width: 1080px) {
        font-size: 93.75%; //15px
    
    @media (max-width: 720px) {
        font-size: 87.5%; //14px
    }
}

Além disso, utilizamos rem para o resto da estilização (botões, etc...) pois o rem é uma medida relativa justamente ao font-size definido para cada tamanho de tela. E assim, todos os elementos toda a estilização é ajustada e se torna responsiva ao tamannho do display.

# Importação de fontes

Por padrão em projetos React, utiliza-se a importação de fontes diretamente no index.html através das tags <link>.
No caso de importação de fontes do google fonts, é boa prática colocar o pre connect <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> por primeiro. O pre connect abre uma pré conexão com o CDN da google, que entrega os arquivos de fontes, para que quando seja preciso solicitar alguma fonte, o carregamento se torne mais rápido. Este procedimento de colocar o preconnect para executar por primeiro acelera em cerca de 25% o carregamento das fontes.

<head>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <meta charset="utf-8" />
    <title>React App</title>
    <link rel="shortcut icon" href="favicon.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>

Por padrão, input, textarea e button não inherit a fonte definida em body. É necessário definir diretamente para assim sobrescrever a fonte nativa destes elementos.
body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

NOTA: html tag <link>
The <link> tag defines the relationship between the current document and an external resource.
The <link> tag is most often used to link to external style sheets or to add a favicon to your website.
The <link> element is an empty element, it contains attributes only.