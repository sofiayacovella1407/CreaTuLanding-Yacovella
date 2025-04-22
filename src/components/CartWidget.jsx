import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartWidget = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart'); // Redirige a la página del carrito
  };

  return (
    <div className="ms-3">
      <button className="btn btn-outline-light" onClick={handleCartClick}>
        🛒 <span className="badge bg-danger">{totalItems}</span>
      </button>
    </div>
  );
};

export default CartWidget;