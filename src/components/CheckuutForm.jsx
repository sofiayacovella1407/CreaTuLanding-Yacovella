import React, { useState } from "react";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Compra realizada con éxito");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Finalizar Compra</button>
    </form>
  );
};

export default CheckoutForm;