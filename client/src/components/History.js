import React, { useEffect, useState } from 'react'
import Http from '../common/Http'
import { accountsApi } from '../constants/api-const'
import { Table } from 'react-bootstrap'

import moment from 'moment'

const History = () => {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    Http.get(accountsApi.history()).then((data) => setExpenses(data.expenses))
  }, [])

  return (
    <Table className="history-expenses" striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Date</th>
          <th>Label</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => {
          return (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>{moment(expense.date).format('D/M/Y')}</td>
              <td>{expense.label}</td>
              <td>{expense.cost}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default History
