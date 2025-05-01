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

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideDown {
        0% {
          transform: translateX(-50%) translateY(-20px);
          opacity: 0;
        }
        100% {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* ✅ Mensaje global, fuera del contenedor del carrito */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "4.5rem",
            left: "50%",
            transform: "translateX(-50%) translateY(0)",
            backgroundColor: "#28a745",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            zIndex: 9999,
            opacity: 1,
            transition: "transform 0.4s ease, opacity 0.4s ease",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            animation: "slideDown 0.4s ease-out",
          }}
        >
          ✅ Producto(s) agregado(s)
        </div>
      )}

      {/* 🛒 Carrito y botón */}
      <div className="ms-3">
        <button className="btn btn-outline-light" onClick={handleShow}>
          🛒 <span className="badge bg-danger">{cart.length}</span>
        </button>
        <CartModal show={showCart} handleClose={handleClose} />
      </div>
    </>
  );
};

export default CartWidget;