import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({ product }) => (
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
);

const ItemList = ({ products }) => (
  <Row>
    {products.map((product) => (
      <Item key={product.id} product={product} />
    ))}
  </Row>
);

export default ItemList;