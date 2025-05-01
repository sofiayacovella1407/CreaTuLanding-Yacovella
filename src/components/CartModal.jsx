import React, { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { updateProductStock } from "../firebase/database";
import CartItem from "./CartItem";
import CartFormClient from "./CartFormClient";
import CartMessageConfirmation from "./CartMessageConfirmation";

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
  const [purchaseId, setPurchaseId] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);
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
      setFinalTotal(totalPrice);
      const docRef = await addDoc(collection(db, "ventas"), {
        ...clientData,
        cart,
        total: totalPrice,
        date: new Date(),
      });

      for (const item of cart) {
        const newStock = item.stock - (item.quantity || 1);
        await updateProductStock(item.id, newStock);
      }

      setPurchaseId(docRef.id);
      setShowForm(false);
      setShowConfirmation(true);
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      alert("Hubo un problema al registrar la compra. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <>
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
                    <CartItem item={item} />
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
      
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CartFormClient
            clientData={clientData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Modal.Body>
      </Modal>

      <CartMessageConfirmation
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        clientData={clientData}
        purchaseId={purchaseId}
        finalTotal={finalTotal}
      />
    </>
  );
};

export default CartModal;
