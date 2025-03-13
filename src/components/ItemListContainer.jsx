import React from "react";

const ItemListContainer = ({ mensaje }) => {
  return (
    <div className="container text-center mt-5">
      <h2 className="display-4">{mensaje}</h2>
      <p className="lead">Explora nuestros servicios de desarrollo, diseño y redes sociales.<br /><h1></h1>Selecciona el plan que mejor se adapte a tus necesidades</p>
    </div>
  );
};

export default ItemListContainer;
