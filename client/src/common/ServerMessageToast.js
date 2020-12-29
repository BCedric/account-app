import React, { useEffect, useState } from 'react'
import { Alert, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage } from '../domain/toast/toast-actions'
import { getMessages } from '../domain/toast/toast-selectors'

import './ServerMessageToast.scss'

const ServerMessageToast = () => {
  const [intervalRef, setIntervalRef] = useState(null)
  const messages = useSelector(getMessages)
  const dispatch = useDispatch()

  const closeMessage = (index) => {
    dispatch(deleteMessage(index))
  }

  useEffect(() => {
    if (messages.length > 0) {
      if (intervalRef == null) {
        setIntervalRef(setInterval(() => closeMessage(0), 2000))
      }
    } else if (intervalRef != null) {
      clearInterval(intervalRef)
      setIntervalRef(null)
    }
  }, [messages, intervalRef])

  return (
    <div className="toasts-container">
      {messages.map((msg, index) => (
        <Toast key={index} onClose={() => closeMessage(index)} show={true}>
          <Toast.Header />
          <Toast.Body>
            <Alert variant={msg.messageType}>{msg.message}</Alert>
          </Toast.Body>
        </Toast>
      ))}
    </div>
  )
}

export default ServerMessageToast
