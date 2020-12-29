import React from 'react'
import { useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { logout } from '../domain/auth/auth-actions'

// const clientPath = getEnvConst().clientPath

const Menu = () => {
  const dispatch = useDispatch()

  return (
    <Navbar bg="dark" variant="dark">
      {/* <Navbar.Collapse bg="dark" variant="dark"> */}
      <Navbar.Brand>
        <Link to={``}>Comptes</Link>
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      {/* <Navbar.Collapse className="justify-content-end"> */}
      <Link className="change-password" to={`./history`}>
        <Button>Historique</Button>
      </Link>
      <Link className="change-password menu-button" to={`./changepassword`}>
        <Button>Changer le mot de passe</Button>
      </Link>
      <Button
        className="disconnect-button menu-button"
        onClick={() => logout(dispatch)}
      >
        Déconnexion
      </Button>
      {/* <Quit className="quit-icon" onClick={() => disconnect()} /> */}
      {/* </Navbar.Collapse> */}
      {/* </Navbar.Collapse> */}
    </Navbar>
  )
}

export default Menu
