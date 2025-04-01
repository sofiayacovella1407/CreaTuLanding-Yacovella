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
            { id: 1, name: 'Plan Básico', category: 'Desarrollo Web', description: 'Landing page simple + Hosting por 1 año', price: 150000, details: 'Landing page simple + Hosting por 1 año', price: 150000, details: '🚀Ideal para emprendedores o pequeñas empresas que necesitan presencia online con una landing page profesional y efectiva.\n\n✔ 1 página con diseño moderno y adaptable a todos los dispositivos.\n✔ Formulario de contacto para recibir consultas directamente en tu email.\n✔ Hosting gratuito por 1 año para que tu web esté siempre en línea.\n✔ Diseño responsive para que se vea perfecto en celulares, tablets y computadoras.\n\n📌 Este plan es perfecto si querés una web sencilla, pero profesional, que muestre tu negocio de forma clara y atractiva.' },
            { id: 2, name: 'Plan Profesional', category: 'Desarrollo Web', description: 'Sitio web completo + SEO básico + Hosting por 1 año', price: 250000, details: 'Para quienes buscan un sitio web más completo con múltiples secciones y herramientas para mejorar su visibilidad online.\n\n✔ Hasta 5 páginas (Inicio, Servicios, Nosotros, Blog, Contacto o las que necesites).\n✔ Blog integrado para compartir contenido y atraer tráfico orgánico.\n✔ Optimización SEO básica para mejorar tu posicionamiento en Google.\n✔ Configuración de Google Analytics para medir visitas y rendimiento.\n✔ Hosting gratuito por 1 año para asegurar la estabilidad de tu web.\n✔ Diseño responsive, adaptable a cualquier dispositivo.\n\n📌 Este plan es ideal para negocios o profesionales que quieren destacar en internet con una web optimizada y con más funcionalidades.' },
            { id: 3, name: 'Pack Básico', category: 'Diseño', description: 'Logo + Paleta de colores + Tipografía', price: 80000, details: 'Un kit esencial para definir la identidad visual de tu marca. \n\n✔ Creación de 2 propuestas de logo para que elijas la que mejor represente tu negocio.\n✔ Paleta de colores y tipografía recomendadas para mantener coherencia en tu marca.\n✔ Manual de marca básico con instrucciones de uso del logo, colores y tipografías.\n\n📌 Perfecto para quienes están comenzando y necesitan una imagen profesional y consistente.'},
            { id: 4, name: 'Pack Completo', category: 'Diseño', description: 'Identidad visual completa', price: 150000, details: 'Una identidad visual completa y profesional para destacar tu marca en todos los medios.\n\n✔ Creación de 4 propuestas de logo para elegir la mejor versión de tu identidad.\n✔ Paleta de colores y tipografías con combinaciones estratégicas para fortalecer la imagen de marca.\n✔ Manual de marca completo con reglas de uso del logo, paleta de colores, tipografías y aplicaciones en diferentes formatos.\n✔ Diseño de papelería básica (tarjetas de presentación, hojas membretadas y firmas de email).\n\n📌 Ideal para empresas o emprendedores que buscan una identidad de marca sólida y profesional.' },
            { id: 5, name: 'Gestión Básica', category: 'Redes Sociales', description: 'Gestión de 2 redes sociales', price: 60000, details: 'Una estrategia mínima para mantener activa tu presencia en redes sociales.\n\n✔ Gestión de 2 redes sociales (Instagram y Facebook u otras a elección).\n✔ 8 posts mensuales diseñados profesionalmente.\n✔ 2 stories semanales para mantener interacción con tu audiencia.\n✔ Informe mensual con métricas clave y sugerencias de mejora.\n\n📌 Perfecto si querés mantener tus redes activas sin dedicarle demasiado tiempo, pero con un enfoque estratégico.' },
            { id: 6, name: 'Gestión Premium', category: 'Redes Sociales', description: 'Gestión completa de redes sociales', price: 100000, details: 'Un servicio completo para potenciar tu marca en redes y aumentar tu alcance.\n\n✔ Gestión de todas tus redes sociales con una estrategia alineada a tu negocio.\n✔ 15 posts mensuales diseñados estratégicamente para atraer y convertir clientes.\n✔ Stories diarios para mantener el engagement de tu comunidad.\n✔ Creación y edición de Reels para aprovechar el formato con más alcance.\n✔ Informe quincenal con métricas detalladas y estrategias de mejora.\n\n📌 Recomendado si querés hacer crecer tu negocio en redes con contenido constante y de calidad.' },
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
          <Card.Text className="mt-3" style={{ whiteSpace: 'pre-line' }}>{product.details}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${product.price.toLocaleString()}</Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>Agregar al Carrito</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemDetailContainer;