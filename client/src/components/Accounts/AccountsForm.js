import React, { useEffect, useState } from 'react'

import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { postExpense } from '../../domain/accounts/Accounts-actions'
import { setMessage } from '../../domain/toast/toast-actions'

const AccountsForm = ({ userId }) => {
  const dispatch = useDispatch()
  const [label, setLabel] = useState('')
  const [cost, setCost] = useState(0)
  const submit = (event) => {
    event.preventDefault()
    postExpense(userId, { label, cost }, dispatch)
      .then((_) => {
        setLabel('')
        setCost(0)
        dispatch(setMessage('Ajout avec succès', 'success'))
      })
      .catch(() => setMessage("Erreur de l'envoie", 'danger'))
  }

  const isSubmitDisabled = isNaN(parseFloat(cost))

  useEffect(() => {
    console.log(typeof cost, parseFloat(cost))
  }, [cost])

  return (
    <form onSubmit={(event) => submit(event)}>
      <div className="input-container">
        <Form.Group>
          <Form.Label>Label</Form.Label>
          <Form.Control
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Prix</Form.Label>
          <Form.Control
            type="number"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </Form.Group>
      </div>
      <Button type="submit" disabled={isSubmitDisabled}>
        Ajouter
      </Button>
    </form>
  )
}

export default AccountsForm
