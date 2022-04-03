import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { TransactionRow } from "../TransactionRow";
import { Container } from "./styles";

interface Transactions {
        transactions: [{
        id: number,
        description: string,
        value: number,
        type: string,
        category: string,
        createdAt: string
    }]
}

export function TransactionsTable(){
    const [ transactions, setTransactions ] = useState<Transactions>()

    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data))
    }, [])

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.transactions.map(transaction => {
                        return (
                        <TransactionRow key={transaction.id} transaction={transaction}/>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}