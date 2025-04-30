import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const CartWidget = () => {
  const { cart, showSuccess, dispatch } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleShow = () => setShowCart(true);
  const handleClose = () => setShowCart(false);

  // Ocultar el mensaje automáticamente después de 3 segundos
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_SUCCESS_MESSAGE" });
      }, 3000);
      return () => clearTimeout(timer); // Limpia el temporizador
    }
  }, [showSuccess, dispatch]);

  return (
    <div className="ms-3" style={{ position: "relative" }}>
      <button className="btn btn-outline-light" onClick={handleShow}>
        🛒 <span className="badge bg-danger">{cart.length}</span>
      </button>
      <CartModal show={showCart} handleClose={handleClose} />
      {/* Mensaje al lado izquierdo del carrito y sobre la barra */}
      {showSuccess && (
        <div
          style={{
            position: "absolute", // Relativo al contenedor del carrito
            top: "-10px", // Aparece sobre la barra de navegación
            right: "110%", // Justo al lado izquierdo del carrito
            backgroundColor: "#28a745", // Verde para éxito
            color: "white",
            padding: "10px 15px", // Espaciado interno
            borderRadius: "8px", // Bordes redondeados
            fontSize: "14px", // Texto más pequeño para ajustarse
            fontWeight: "bold",
            textAlign: "center", // Centra el texto
            whiteSpace: "nowrap", // Evita que el texto se desborde
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra
            zIndex: 1050, // Asegura que esté por encima de otros elementos
          }}
        >
          ✅ Producto(s) agregado(s)
        </div>
      )}
    </div>
  );
};

export default CartWidget;