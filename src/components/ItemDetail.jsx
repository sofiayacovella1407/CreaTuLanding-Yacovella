import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product }) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1); 

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p>
          <strong>Precio:</strong> ${product.price.toLocaleString()}
        </p>
        <p>
          <strong>Categoría:</strong> {product.category}
        </p>
        <p>
          <strong>Detalles adicionales:</strong>
        </p>
        <div style={{ whiteSpace: "pre-line" }}>
          {product.details}
        </div>
        <p style={{ marginTop: "1rem" }}>
          <strong>Stock disponible:</strong> {product.stock}
        </p>
        <div className="d-flex align-items-center mt-3">

          <div className="d-flex align-items-center">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="btn btn-outline-secondary"
              style={{ width: "2.5rem", height: "2.5rem" }}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="mx-3 fs-5">{quantity}</span>
            <button
              onClick={() =>
                setQuantity((prev) => Math.min(product.stock, prev + 1))
              }
              className="btn btn-outline-secondary"
              style={{ width: "2.5rem", height: "2.5rem" }}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-primary ms-3"
            style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;