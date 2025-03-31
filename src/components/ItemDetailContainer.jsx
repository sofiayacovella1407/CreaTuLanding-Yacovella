import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const products = [
            { id: 1, name: 'Plan Básico', category: 'Desarrollo Web', description: 'Landing page simple + Hosting por 1 año', price: 150000 },
            { id: 2, name: 'Plan Profesional', category: 'Desarrollo Web', description: 'Sitio web completo + SEO básico + Hosting por 1 año', price: 250000 },
            { id: 3, name: 'Pack Básico', category: 'Diseño', description: 'Logo + Paleta de colores + Tipografía', price: 80000 },
            { id: 4, name: 'Pack Completo', category: 'Diseño', description: 'Identidad visual completa', price: 150000 },
            { id: 5, name: 'Gestión Básica', category: 'Redes Sociales', description: 'Gestión de 2 redes sociales', price: 60000 },
            { id: 6, name: 'Gestión Premium', category: 'Redes Sociales', description: 'Gestión completa de redes sociales', price: 100000 },
          ];
          resolve(products.find(product => product.id === parseInt(productId)));
        }, 1000);
      });
    };

    fetchProduct().then((data) => setProduct(data));
  }, [productId]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${product.price.toLocaleString()}</Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>Agregar al Carrito</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemDetailContainer;