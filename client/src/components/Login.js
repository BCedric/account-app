import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logUser } from '../domain/auth/auth-actions'
import { setMessage } from '../domain/toast/toast-actions'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const submit = (event) => {
    event.preventDefault()

    logUser({ name, password }, dispatch).then((data) => {
      if (data.user == null) {
        dispatch(setMessage("Erreur de l'authentification", 'danger'))
      }
    })
  }

  return (
    <div>
      <form className="credentials-form" onSubmit={(event) => submit(event)}>
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button type="submit">Connexion</Button>
      </form>
    </div>
  )
}

export default Login
