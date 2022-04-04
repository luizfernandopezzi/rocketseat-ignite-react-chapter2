import { Container } from "./styles";
import { ReactComponent as Income } from '../../assets/income.svg';
import { ReactComponent as Outcome } from '../../assets/outcome.svg';
import { ReactComponent as Total } from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";

export function Summary(){
    const {transactions} = useTransactions()
    // const totalDeposits = transactions.reduce((acc, transaction) => {
    //     if(transaction.type === 'deposit'){
    //         return acc + transaction.value
    //     }
    //     return acc;
    // }, 0)
    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit'){
            acc.deposits += transaction.value
            acc.net += transaction.value
        }else{
            acc.withdraws += transaction.value
            acc.net -= transaction.value
        }

        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        net: 0
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entrada</p>
                    <Income/>
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saída</p>
                    <Outcome/>
                </header>
                <strong>
                    -{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}                    
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Net</p>
                    <Total/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.net)}  
                </strong>
            </div>
        </Container>
    )
}