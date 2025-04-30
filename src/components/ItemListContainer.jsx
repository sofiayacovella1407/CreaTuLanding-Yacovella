import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { getProducts } from "../firebase/database";

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
      <Alert variant="success" style={{ textAlign: "center" }}>
        🚀 Web, redes y diseño en un solo lugar. Llevá tu marca al siguiente nivel. ¡Consultá hoy! 🔥
      </Alert>
      {mensaje && <div>{mensaje}</div>}
      {products.length === 0 ? (
        <Alert variant="warning" style={{ textAlign: "center" }}>
          No hay productos disponibles en este momento.
        </Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>
                    <strong>Precio:</strong> ${product.price.toLocaleString()}
                  </Card.Text>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="primary">Ver Detalles</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ItemListContainer;