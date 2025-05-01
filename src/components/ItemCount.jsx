import React, { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrease = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(count);
  };

  return (
    <div>
      <div className="d-flex align-items-center my-2">
        <button
          onClick={handleDecrease}
          className="btn btn-outline-secondary"
          disabled={count <= 1}
        >
          -
        </button>
        <span className="mx-3 fs-5">{count}</span>
        <button
          onClick={handleIncrease}
          className="btn btn-outline-secondary"
          disabled={count >= stock}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="btn btn-primary w-100 mt-2"
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;