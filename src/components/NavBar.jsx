import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import CartWidget from './CartWidget';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';
import '../styles/NavigationBar.css';

const NavigationBar = () => {
  const { showSuccess, dispatch } = useCart();

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_SUCCESS_MESSAGE' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, dispatch]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container-fluid">
          <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              style={{ height: '60px', marginRight: '10px' }}
            />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              Mi Tienda Online
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-4">
              <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/category/Desarrollo Web">Desarrollo Web</Nav.Link>
              <Nav.Link as={NavLink} to="/category/Diseño">Diseño</Nav.Link>
              <Nav.Link as={NavLink} to="/category/Redes Sociales">Redes Sociales</Nav.Link>
            </Nav>
            <div className="ms-auto">
              <CartWidget />
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "5rem",
            left: "50%",
            transform: "translateX(-50%) translateY(0)",
            backgroundColor: "#28a745",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            zIndex: 99999,
            opacity: 1,
            transition: "transform 0.4s ease, opacity 0.4s ease",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            maxWidth: "90vw",
            textAlign: "center",
          }}
        >
          ✅ Producto(s) agregado(s)
        </div>
      )}
    </>
  );
};

export default NavigationBar;