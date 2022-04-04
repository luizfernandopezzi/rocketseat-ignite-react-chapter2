import { useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { TransactionRow } from "../TransactionRow";
import { Container } from "./styles";

export function TransactionsTable(){
    const {transactions} = useTransactions()
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
                    {transactions.map(transaction => {
                        return (
                        <TransactionRow key={transaction.id} transaction={transaction}/>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}