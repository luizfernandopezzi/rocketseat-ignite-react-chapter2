import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
        id: number,
        description: string,
        value: number,
        type: string,
        category: string,
        createdAt: string
}

interface TransactionsProviderProps {
    children: ReactNode
}

// interface TransactiosnInput {
//     description: string,
//     value: number,
//     type: string,
//     category: string,
// }
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>
// type TransactionInput = Pick<Transaction, 'title' | 'value' | 'type' | 'category'>

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [ transactions, setTransactions ] = useState<Transaction[]>([])

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const transaction = response.data.transaction
        setTransactions([...transactions, transaction])
    }

    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])
    return (
        // Retorna-se como value um objeto contendo transactions e createTransaction. Primeira {} para abrir sintaxe JS e segunda {} formando o objeto com as variáveis e métodos do contexto.
        <TransactionsContext.Provider value={ {transactions, createTransaction } }>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)
    return context
}