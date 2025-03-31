import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const ItemListContainer = ({ mensaje }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulación de llamada asíncrona
    new Promise((resolve) => {
      setTimeout(() => {
        const allProducts = [
          { id: 1, name: 'Plan Básico', category: 'Desarrollo Web', description: 'Landing page simple + Hosting por 1 año', price: 150000 },
          { id: 2, name: 'Plan Profesional', category: 'Desarrollo Web', description: 'Sitio web completo + SEO básico + Hosting por 1 año', price: 250000 },
          { id: 3, name: 'Pack Básico', category: 'Diseño', description: 'Logo + Paleta de colores + Tipografía', price: 80000 },
          { id: 4, name: 'Pack Completo', category: 'Diseño', description: 'Identidad visual completa', price: 150000 },
          { id: 5, name: 'Gestión Básica', category: 'Redes Sociales', description: 'Gestión de 2 redes sociales', price: 60000 },
          { id: 6, name: 'Gestión Premium', category: 'Redes Sociales', description: 'Gestión completa de redes sociales', price: 100000 },
        ];
        resolve(allProducts.filter(product => !categoryId || product.category === categoryId));
      }, 2000);
    }).then((data) => setItems(data));
  }, [categoryId]);

  return (
    <Container>
      <Alert variant="success">
        ¡Bienvenido a nuestra tienda online! Explore nuestros servicios y elija el que mejor se adapte a sus necesidades.
      </Alert>
      <h1>{mensaje}</h1>
      <Row>
        {items.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Precio:</strong> ${product.price.toLocaleString()}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary">Ver Detalles</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemListContainer;