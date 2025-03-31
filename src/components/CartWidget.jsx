import React from "react";
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cart } = useCart();

  return (
    <div className="ms-3">
      <button className="btn btn-outline-light">
        🛒 <span className="badge bg-danger">{cart.length}</span>
      </button>
    </div>
  );
};

export default CartWidget;