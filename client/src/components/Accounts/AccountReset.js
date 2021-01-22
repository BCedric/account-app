import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { putResetExpenses } from '../../domain/accounts/Accounts-actions'

const AccountReset = () => {
  const [isResetMessageDisplayed, setIsResetMessageDisplayed] = useState(false)
  const hide = () => setIsResetMessageDisplayed(false)
  const dispatch = useDispatch()
  const confirmReset = () => putResetExpenses(dispatch).then(() => hide())

  return (
    <React.Fragment>
      <Button
        className="reset-button"
        onClick={() => setIsResetMessageDisplayed(true)}
      >
        Reset
      </Button>

      <Modal show={isResetMessageDisplayed} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Es-tu sûr de vouloir remettre les comptes à 0</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => confirmReset()}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default AccountReset
