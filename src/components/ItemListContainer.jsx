import React from "react";

const ItemListContainer = ({ mensaje }) => {
  return (
    <div className="container text-center mt-5">
      <h2 className="display-4">{mensaje}</h2>
      <p className="lead">Explora nuestros servicios de desarrollo, diseño y redes sociales.</p>
    </div>
  );
};

export default ItemListContainer;
