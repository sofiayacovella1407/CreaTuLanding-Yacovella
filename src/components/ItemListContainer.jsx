import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";

const ItemListContainer = ({ mensaje }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulación de llamada asíncrona
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // Lista de productos
        ]);
      }, 2000);
    }).then((data) => setItems(data));
  }, []);

  return (
    <div>
      <h1>{mensaje}</h1>
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;