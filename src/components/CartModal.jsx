import React, { useState } from "react";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { updateProductStock } from "../firebase/database"; // Importar la función de actualización de stock
import CartItem from "./CartItem"; // Importar el componente CartItem

const CartModal = ({ show, handleClose }) => {
  const { cart, dispatch } = useCart();

  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [purchaseId, setPurchaseId] = useState(""); // Guardar el ID de la compra
  const [finalTotal, setFinalTotal] = useState(0); // Guardar el total final de la compra
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleBuy = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guarda el total antes de limpiar el carrito
      setFinalTotal(totalPrice);

      // Guardar los datos en Firestore
      const docRef = await addDoc(collection(db, "ventas"), {
        ...clientData,
        cart, // Agregar los productos comprados
        total: totalPrice, // Capturar el total aquí
        date: new Date(),
      });

      // Actualizar el stock de cada producto comprado
      for (const item of cart) {
        const newStock = item.stock - (item.quantity || 1);
        await updateProductStock(item.id, newStock);
      }

      setPurchaseId(docRef.id); // Guardar el ID de la compra
      setShowForm(false); // Cerrar el formulario
      setShowConfirmation(true); // Mostrar el mensaje final
      dispatch({ type: "CLEAR_CART" }); // Vaciar el carrito después de guardar
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      alert("Hubo un problema al registrar la compra. Por favor, inténtalo nuevamente.");
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
                {cart.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <CartItem item={item} /> {/* Usar CartItem para cada producto */}
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
        
          {cart.length > 0 && (
            <>
              <Button variant="danger" onClick={handleClearCart}>
                Vaciar Carrito
              </Button>
              <Button variant="primary" onClick={handleBuy}>
                Comprar
              </Button>
            </>
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
          <Modal.Title style={{ color: "green" }}>¡Compra Confirmada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Gracias por tu compra, {clientData.name}.</p>
          <p>
            El ID de tu compra es: <strong style={{ color: "red" }}>{purchaseId}</strong>
          </p>
          <p>
            Por favor, realiza la transferencia del total de{" "}
            <strong>${finalTotal.toLocaleString()}</strong> al siguiente alias: <strong>sofiayacovella.mp</strong>
          </p>
          <p>
            Una vez realizada la transferencia, envía el comprobante al WhatsApp: <strong>
              <a
                href={`https://wa.me/5493424302010?text=Hola%20Sofia!%20Soy%20${encodeURIComponent(clientData.name)}%F0%9F%98%81%0AQueria%20enviarte%20el%20comprobante%20de%20la%20compra:%20${purchaseId}%E2%9C%85`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar comprobante
              </a>
            </strong>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowConfirmation(false);
              window.location.reload(); // Reload the page
              window.location.href = "/"; // Navigate to the home page
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartModal;