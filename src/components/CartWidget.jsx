import React from "react";

const CartWidget = () => {
  return (
    <div className="ms-3">
      <button className="btn btn-outline-light">
        🛒 <span className="badge bg-danger">0</span>
      </button>
    </div>
  );
};

export default CartWidget;
