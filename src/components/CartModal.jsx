import React, { useState } from 'react';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config'; // Importa tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore

const CartModal = ({ show, handleClose }) => {
  const { cart, dispatch } = useCart();

  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el mensaje final
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [purchaseId, setPurchaseId] = useState(''); // Guardar el ID de la compra
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleBuy = () => {
    setShowForm(true); // Mostrar el formulario al hacer clic en "Comprar"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guardar los datos en Firestore
      const docRef = await addDoc(collection(db, 'clientes'), {
        ...clientData,
        cart, // Agregar los productos comprados
        total: totalPrice,
        date: new Date(),
      });

      setPurchaseId(docRef.id); // Guardar el ID de la compra
      setShowForm(false); // Cerrar el formulario
      setShowConfirmation(true); // Mostrar el mensaje final
      dispatch({ type: 'CLEAR_CART' }); // Vaciar el carrito
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      alert('Hubo un problema al registrar la compra. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <>
      {/* Modal del carrito */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tu Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <div>
              <ListGroup>
                {cart.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{item.name}</h5>
                        <p>Precio: ${item.price.toLocaleString()}</p>
                        <p>Cantidad: {item.quantity || 1}</p>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(index)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h3 className="mt-4 text-center">Total: ${totalPrice.toLocaleString()}</h3>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Vaciar Carrito
          </Button>
          {cart.length > 0 && (
            <Button variant="primary" onClick={handleBuy}>
              Comprar
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal del formulario */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={clientData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={clientData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={clientData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={clientData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirmar Compra
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmación */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡Compra Confirmada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Gracias por tu compra, {clientData.name}.</p>
          <p>
            Por favor, realiza la transferencia al siguiente alias:
            <strong> sofiayacovella.mp</strong>
          </p>
          <p>
            Una vez realizada la transferencia, envía el comprobante al siguiente WhatsApp: <strong>
              <a
                href={`https://wa.me/5493424302010?text=Hola%20Sofia!%20Soy%20${encodeURIComponent(
                  clientData.name
                )}%F0%9F%98%81%0AQueria%20enviarte%20el%20comprobante%20de%20la%20compra:%20${purchaseId}%E2%9C%85`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar comprobante
              </a>
            </strong>.
          </p>
          <p>Pronto me pondre en contacto contigo para comenzar a trabajar juntos. ¡Gracias!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowConfirmation(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartModal;