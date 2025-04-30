import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { getProducts } from "../firebase/database";
import ItemList from "./ItemList"; // Importar correctamente el default export

const ItemListContainer = ({ mensaje }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const filteredProducts = categoryId
          ? productsData.filter((product) => product.category === categoryId)
          : productsData;
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <Container>
        <Alert variant="info" style={{ textAlign: "center" }}>
          Cargando productos... Por favor, espera.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      {mensaje && <div>{mensaje}</div>}
      {products.length === 0 ? (
        <Alert variant="warning" style={{ textAlign: "center" }}>
          No hay productos disponibles en este momento.
        </Alert>
      ) : (
        <ItemList products={products} />
      )}
    </Container>
  );
};

export default ItemListContainer;