import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Importar Firebase Firestore
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { productId } = useParams(); // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore(); // Inicializa Firestore
        const productRef = doc(db, "products", productId); // Referencia al documento del producto
        const productSnap = await getDoc(productRef); // Obtén los datos del producto

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() }); // Guarda los datos del producto
        } else {
          console.error("El producto no existe");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Container>
        <Alert variant="info" style={{ textAlign: "center" }}>
          Cargando detalles del producto... Por favor, espera.
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Alert variant="danger" style={{ textAlign: "center" }}>
          Producto no encontrado.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <ItemDetail product={product} />
    </Container>
  );
};

export default ItemDetailContainer;