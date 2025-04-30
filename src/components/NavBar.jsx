import React from 'react';
import { NavLink } from 'react-router-dom'; // Cambiado de Link a NavLink
import { Navbar, Nav } from 'react-bootstrap';
import CartWidget from './CartWidget';
import logo from '../assets/logo.png'; // Asegúrate de que esta ruta sea correcta
import '../styles/NavigationBar.css';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container-fluid">
        {/* Logo y texto de Mi Tienda Online */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '60px', marginRight: '10px' }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mi Tienda Online</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Espaciamos los enlaces más a la derecha */}
          <Nav className="ms-4">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link> {/* Añadido "end" para rutas exactas */}
            <Nav.Link as={NavLink} to="/category/Desarrollo Web">Desarrollo Web</Nav.Link>
            <Nav.Link as={NavLink} to="/category/Diseño">Diseño</Nav.Link>
            <Nav.Link as={NavLink} to="/category/Redes Sociales">Redes Sociales</Nav.Link>
          </Nav>
          {/* Carrito permanece a la derecha */}
          <div className="ms-auto">
            <CartWidget />
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;