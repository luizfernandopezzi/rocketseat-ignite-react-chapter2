import styled from "styled-components";

export const Container = styled.div`
    /* display: flex;
    flex-direction: row;
    justify-content: space-around; */

    display: grid;
    grid-template-columns: repeat(3, 1fr); //Repetindo 3x uma coluna com tamanho flexível (1fr 1fr 1fr.
    gap: 2rem;
    
    margin-top: -8rem;

    div {
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;

        color: var(--text-title);

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        strong {
            display: block; //Por padrão a tag strong possui display: inline, a qual o margin-top não é definido/não funciona. Display: block faz a tag strong se comportar como uma tag div.
            margin-top: 1rem;
            font-size: 2rem;
            font-weight: 500;
        }

        &.highlight-background {
            background: var(--green);
            color: #fff;
        }
    }
`