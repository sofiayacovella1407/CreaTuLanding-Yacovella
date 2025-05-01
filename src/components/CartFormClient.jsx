// components/CartFormClient.jsx
import React from "react";
import { Form, Button } from "react-bootstrap";

const CartFormClient = ({ clientData, handleInputChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label>Nombre</Form.Label>
      <Form.Control
        type="text"
        name="name"
        value={clientData.name}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={clientData.email}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Teléfono</Form.Label>
      <Form.Control
        type="text"
        name="phone"
        value={clientData.phone}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Dirección</Form.Label>
      <Form.Control
        type="text"
        name="address"
        value={clientData.address}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Confirmar Compra
    </Button>
  </Form>
);

export default CartFormClient;