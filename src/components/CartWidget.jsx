import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const CartWidget = () => {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleShow = () => setShowCart(true);
  const handleClose = () => setShowCart(false);

  return (
    <div className="ms-3">
      <button className="btn btn-outline-light" onClick={handleShow}>
        🛒 <span className="badge bg-danger">{cart.length}</span>
      </button>
      <CartModal show={showCart} handleClose={handleClose} />
    </div>
  );
};

export default CartWidget;