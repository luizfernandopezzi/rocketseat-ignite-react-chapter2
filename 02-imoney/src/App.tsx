import { Dashborad } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

import Modal from 'react-modal'
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement('#root') //Define-se por questão de acessibilidade, informando que a <div id='root'> não está visível na questão acessibilidade, ou seja, a pessoa que está utilizando acessibilidade não conseguirá interagir com o conteúdo da <div id='root'>.

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }
  
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashborad/>
      <NewTransactionModal
        isNewTransactionModalOpen={isNewTransactionModalOpen}
        onCloseNewTransactionModal={handleCloseNewTransactionModal}
      />
      <GlobalStyle/>
    </>
  );
}