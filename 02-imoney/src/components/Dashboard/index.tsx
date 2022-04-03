import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";

export function Dashborad(){
    return(
        <Container>
            <Summary></Summary>
            <TransactionsTable></TransactionsTable>
        </Container>
    )
}