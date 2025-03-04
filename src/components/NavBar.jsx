import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#333", color: "white" }}>
      <h2>Mi Tienda</h2>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
        <li><a href="#" style={{ color: "white" }}>Inicio</a></li>
        <li><a href="#" style={{ color: "white" }}>Productos</a></li>
        <li><a href="#" style={{ color: "white" }}>Contacto</a></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
