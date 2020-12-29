import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { changePassword } from '../domain/auth/auth-actions'

// import Http from './Http'
// import { setMessage } from '../domain/accounts/Accounts-actions'
import { userConnectedSelector } from '../domain/auth/auth-selectors'

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
  const [redirection, setRedirection] = useState(false)

  const userConnected = useSelector(userConnectedSelector)

  const submit = (event) => {
    event.preventDefault()
    console.log(
      currentPassword,
      newPassword,
      newPasswordConfirmation,
      userConnected.id
    )
    changePassword(userConnected.id, {
      currentPassword,
      newPassword,
      newPasswordConfirmation
    }).then((res) => {
      //   this.props.setMsg(data)
      setRedirection(true)
    })
  }

  return (
    <form onSubmit={(event) => submit(event)}>
      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setCurrentPassword(event.target.value)}
        ></Form.Control>
        <Form.Label>Nouveau mot de passe</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setNewPassword(event.target.value)}
        ></Form.Control>
        <Form.Label>Confirmation du nouveau mot de passe</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setNewPasswordConfirmation(event.target.value)}
        ></Form.Control>
        <Button className="form-button" type="submit">
          Valider
        </Button>
      </Form.Group>
      {redirection && <Redirect to="/accounts" />}
    </form>
  )
}

export default ChangePasswordForm
