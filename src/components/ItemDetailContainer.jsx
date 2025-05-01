import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore(); 
        const productRef = doc(db, "products", productId); 
        const productSnap = await getDoc(productRef); 

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() }); 
        } else {
          console.error("El producto no existe");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false); 
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