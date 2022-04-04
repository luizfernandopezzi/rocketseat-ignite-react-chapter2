interface TransactionRowProps {
    transaction: {
        id: number,
        description: string,
        value: number,
        type: string,
        category: string,
        createdAt: string
    }
}

export function TransactionRow( { transaction }: TransactionRowProps){
    return(
        <tr>
            <td>{transaction.description}</td>
            <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(transaction.value)}
            </td>
            <td>{transaction.category}</td>
            <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}    
            </td>
        </tr>
    )
}