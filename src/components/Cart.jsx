import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, dispatch, totalPrice } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="container mt-4">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price.toLocaleString()}</p>
                </div>
                <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3 className="mt-4">Total: ${totalPrice.toLocaleString()}</h3>
          <button className="btn btn-warning mt-3" onClick={handleClearCart}>
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;