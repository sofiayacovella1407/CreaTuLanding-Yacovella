import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import CartWidget from './CartWidget';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Mi Tienda Online</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/category/Desarrollo Web">Desarrollo Web</Nav.Link>
          <Nav.Link as={Link} to="/category/Diseño">Diseño</Nav.Link>
          <Nav.Link as={Link} to="/category/Redes Sociales">Redes Sociales</Nav.Link>
        </Nav>
        <CartWidget />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;