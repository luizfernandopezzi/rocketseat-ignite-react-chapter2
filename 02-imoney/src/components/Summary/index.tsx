import { Container } from "./styles";
import { ReactComponent as Income } from '../../assets/income.svg';
import { ReactComponent as Outcome } from '../../assets/outcome.svg';
import { ReactComponent as Total } from '../../assets/total.svg';

export function Summary(){
    return(
        <Container>
            <div>
                <header>
                    <p>Entrada</p>
                    <Income/>
                </header>
                <strong>R$ 1000,00</strong>
            </div>

            <div>
                <header>
                    <p>Entrada</p>
                    <Outcome/>
                </header>
                <strong>R$ 1000,00</strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Entrada</p>
                    <Total/>
                </header>
                <strong>R$ 1000,00</strong>
            </div>
        </Container>
    )
}