import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer mensaje="Bienvenido a nuestra tienda de servicios" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer mensaje="Servicios por categoría" />} />
        <Route path="/product/:productId" element={<ItemDetailContainer />} />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default App;