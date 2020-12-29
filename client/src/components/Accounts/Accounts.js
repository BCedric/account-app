import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../domain/accounts/Accounts-actions'

import { usersSelector } from '../../domain/accounts/accounts-selectors'
import { Alert, Row, Col } from 'react-bootstrap'
import AccountUser from './AccountUser'
import AccountReset from './AccountReset'

const Accounts = () => {
  const dispatch = useDispatch()
  const [assesment, setAssesment] = useState('')

  const users = useSelector(usersSelector)

  useEffect(() => {
    if (users.length !== 0) {
      const result =
        Math.round((Math.abs(users[0].total - users[1].total) / 2) * 100) / 100
      if (users[0].total > users[1].total) {
        return setAssesment(
          `${users[1].name} doit ${result}€ à ${users[0].name} `
        )
      }
      return setAssesment(
        `${users[0].name} doit ${result} € à ${users[1].name} `
      )
    }
  }, [users])

  useEffect(() => {
    getUsers(dispatch)
  }, [])

  return (
    <div>
      {users.length > 0 && (
        <div>
          <div className="users-container">
            <Row>
              {users.map((user) => (
                <Col key={user.id} sm>
                  <AccountUser user={user} />
                </Col>
              ))}
            </Row>
          </div>
          <Alert variant="info" className="assesment">
            {assesment}
          </Alert>
          <AccountReset />
        </div>
      )}
    </div>
  )
}

export default Accounts
