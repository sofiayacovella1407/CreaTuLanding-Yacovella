import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CartModal = ({ show, handleClose }) => {
  const { cart, dispatch } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tu Carrito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ListGroup>
            {cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Precio: ${item.price.toLocaleString()}</p>
                    <div>
                      Cantidad:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value, 10))
                        }
                        style={{ width: '50px', marginLeft: '10px' }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="danger" onClick={() => dispatch({ type: 'CLEAR_CART' })}>
          Vaciar Carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal; // Asegúrate de exportarlo como "default"