import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const handleIncrement = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity: 1 } });
  };

  const handleDecrement = () => {
    dispatch({ type: "REMOVE_UNIT_FROM_CART", payload: item.id }); 
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: item.id });
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h5>{item.name}</h5>
        <p>Precio: ${item.price.toLocaleString()}</p>
        <p>Cantidad: {item.quantity || 1}</p>
      </div>
      <div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <Button variant="outline-secondary" size="sm" onClick={handleIncrement}>
          +
        </Button>
        <Button variant="danger" size="sm" onClick={handleRemove}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default CartItem;