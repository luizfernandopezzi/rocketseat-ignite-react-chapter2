import Modal from 'react-modal';

import { Container, RadioBoxButton, TransactionTypeContainer } from './styles';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useState } from 'react';

import { api } from "../../services/api";

interface NewTransactionModalProps {
    isNewTransactionModalOpen: boolean,
    onCloseNewTransactionModal: () => void
}

export function NewTransactionModal( 
    {isNewTransactionModalOpen, onCloseNewTransactionModal}: NewTransactionModalProps
){
    const [ transactionType, setTransactionType ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ value, setValue ] = useState(0)
    const [ category, setCategory ] = useState('')

    function handleCreateNewTransaction(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        api.post('/transactions', transaction)
    }

    const transaction = {
        description: description,
        value: value,
        transactionType: transactionType,
        category: category
    }
    
    return(
        <Modal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={onCloseNewTransactionModal}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <button
                type='button'
                onClick={onCloseNewTransactionModal}
                className='react-modal-close'
            >
                <img src={closeImg} alt='Close modal'/>
            </button>

            <Container onSubmit={event => handleCreateNewTransaction(event)}>
                <h2>Nova Transação</h2>
                <input 
                    placeholder='Descrição'
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <input 
                    type='number' 
                    placeholder='Valor'
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}                
                />

                <TransactionTypeContainer>
                    <RadioBoxButton 
                        type='button' 
                        onClick={() => setTransactionType('deposit')}
                        isActive = {transactionType === 'deposit'} //Styled Components também permite passar propriedades para o componente.
                        activeColor='activedGreen'
                    >
                        <img src={incomeImg} alt='Entrada'/>
                        <span>Entrada</span>
                    </RadioBoxButton>
                    <RadioBoxButton 
                        type='button'
                        onClick={() => setTransactionType('withdraw')}
                        isActive={transactionType === 'withdraw'}
                        activeColor='activedRed'
                    >
                        <img src={outcomeImg} alt='Saída'/>
                        <span>Saída</span>
                    </RadioBoxButton>
                </TransactionTypeContainer>     

                <input 
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}                 
                />
                <button type='submit'>Cadastrar</button>
            </Container>
        </Modal>
    )
}