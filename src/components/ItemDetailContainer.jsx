import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Alert, Button } from "react-bootstrap";
import { getProducts } from "../firebase/database";

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Product ID recibido:", productId);

    const fetchProduct = async () => {
      try {
        const productsData = await getProducts();
        console.log("Datos recibidos de Firebase:", productsData);

        const foundProduct = productsData.find(
          (product) => product.id.toLowerCase() === productId.toLowerCase()
        );
        console.log("Producto encontrado:", foundProduct);

        setProduct(foundProduct);
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
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          {product.details && (
            <Card.Text>
              <strong>Detalles adicionales:</strong>
              <p>
                {product.details.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </Card.Text>
          )}
          <Card.Text>
            <strong>Precio:</strong> ${product.price.toLocaleString()}
          </Card.Text>
          <Button variant="primary">Comprar</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemDetailContainer;