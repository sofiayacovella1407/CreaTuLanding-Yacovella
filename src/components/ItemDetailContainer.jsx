import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore
import { db } from '../firebase/config'; // Importa la configuración de Firebase
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito

const ItemDetailContainer = () => {
  const { productId } = useParams(); // Obtén el ID del producto desde los parámetros de la URL
  const [product, setProduct] = useState(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const { dispatch } = useCart(); // Despachador del contexto del carrito

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        const docRef = doc(db, 'products', productId); // Referencia al documento en Firestore
        const docSnap = await getDoc(docRef); // Obtiene los datos del documento

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() }); // Almacena el producto en el estado
        } else {
          console.error('El producto no existe en la base de datos');
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product }); // Agrega el producto al carrito
    } else {
      console.error('No se puede agregar un producto inexistente al carrito');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de "Cargando" mientras los datos se obtienen
  }

  if (!product) {
    return <div>No se encontró el producto</div>; // Muestra un mensaje si no se encuentra el producto
  }

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text className="mt-3" style={{ whiteSpace: 'pre-line' }}>{product.details}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${product.price.toLocaleString()}</Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>Agregar al Carrito</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemDetailContainer;