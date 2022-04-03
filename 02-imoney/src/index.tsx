import { render } from 'react-dom';

import { createServer, Model } from 'miragejs'

import { App } from './App';

createServer({
  //Criando modelo do banco de dados:
  models: {
    transaction: Model,
  },

  //Criando dados iniciais do bando de dados:
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          description: 'Freelance Website',
          value: 6000,
          category: 'Dev',
          type: 'deposit',
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          description: 'Aluguel',
          value: 1100,
          category: 'Casa',
          type: 'withdraw',
          createdAt: new Date('2021-02-14 11:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'appapi' //A default prefix applied to all subsequent route definitions.

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

render(
    <App />,
  document.getElementById('root')
);