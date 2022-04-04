# Gerenciamento de Estado

Contexto é recomendado afim de evitar o "Prop Drilling" que consiste em passar propriedades de pai para filho para filho para filho...

Contexto é utilizado para compartilhamento de estados entre diversos componentes da aplicação mesmo que estes não tenham relação.

# Criando Contexto

Cria-se arquivo TransactionContext.ts na pasta raíz do projeto, e nele:

import { createContext } from 'react'
export const TransactionContext = createContext(param);

O parâmetro passado no interior do método createContext é o valor default de inicialização adotado (antes de qualquer estado ser modificado, request à banco de dados, etc...).

export const TransactionsContext = createContext([]);

Para que os diversos componentes da aplicação tenham acesso ao contexto criado, eles precisam estar envoltos pelo Provider do respectivo contexto. A fim de compartilhar o estado com todos os componentes da aplicação, em App.tsx:

import { TransactionsContext } from "./TransactionsContext";

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }
  
  return (
    <TransactionsContext.Provider value={[]}>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashborad/>
      <NewTransactionModal
        isNewTransactionModalOpen={isNewTransactionModalOpen}
        onCloseNewTransactionModal={handleCloseNewTransactionModal}
      />
    </TransactionsContext.Provider>
  );
}

Onde, 'value' refere-se ao valor atual do contexto.

Para acessar os dados do contexto nos componentes:

1) Context Render Props API:

No arquivo do componente que necessita acessar o contexto:

import { TransactionsContext } from "../../TransactionsContext";

export function MyComponent(){
    return(
        <Container>
            <TransactionsContext.Consumer>
                {(contextData) => {
                    console.log(contextData)
                    return (
                        <p>Context Render Props API</p>
                    )
                }}
            </TransactionsContext.Consumer>    

            <div>
                ...
            </div>
        </Container>
    )
}

2) Hook useContext:

No arquivo do componente que necessita acessar o contexto:

import { useContext } from 'react'
import { TransactionsContext } from "../../

export function MyComponent(){
    const data = useContext(TransactionsContext)
    console.log(data)

    return(
        <Container>
            <div>
                ...
            </div>
        </Container>
    )
}

Nota: sempre que algum dado do contexto for atualizado/alterado, todos os componentes que possuem acesso ao contexto irão renderizar novamente trazendo estes novos dados, analogamente à atualização de um estado.

