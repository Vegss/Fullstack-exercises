import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'
import { logOut } from '../reducers/userReducer'

import { Container, Nav, Navbar, Button } from 'react-bootstrap'

const NavBar = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  if (!user) return <div>loading...</div>

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/'>
              Blogs
            </Nav.Link>
            <Nav.Link href='/users'>
              Users
            </Nav.Link>
          </Nav>
          <Button variant='danger' onClick={() => dispatch(logOut())}>Log Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar