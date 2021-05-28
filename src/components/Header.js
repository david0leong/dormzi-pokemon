import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Dormzi Pokemon</Navbar.Brand>

      <Button>View Carousel</Button>
    </Navbar>
  )
}

export default Header
