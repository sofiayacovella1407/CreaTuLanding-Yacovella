# 🛍️ Mi Tienda Web | Proyecto Final

¡Bienvenido/a a **Mi Tienda Web**!  
Este es el proyecto final desarrollado para el curso de Desarrollo Front End organizado por Coder House. Se trata de una aplicación de comercio electrónico que utiliza tecnologías modernas para proporcionar una experiencia de usuario atractiva y funcional. 🚀

---

## ✨ Funcionalidades

- **🔧 Gestión de productos:**
Los productos se almacenan y gestionan en Firebase Firestore, con propiedades como id, nombre, categoría, precio, descripción, detalles y stock.

- **🛒 Carrito de compras:**
Los usuarios pueden agregar productos al carrito, ajustar cantidades y ver el total de la compra.

- **🧭 Navegación dinámica:**
Implementación de rutas con React Router Dom para una transición fluida entre vistas.
- `/` → Muestra todos los productos.
- `/category/:category` → Filtra productos por categoría.
- Los `NavLink` resaltan la ruta activa con subrayado.

- **🔍 Detalle de producto:**
Cada producto cuenta con una página de detalles individual y la posibilidad de agregar el producto al carrito siempre y cuando haya stock disponible. Si no hay sotck disponible el "Agregar al Carrito" se desactiva automaticamente.

- **📥 Formulario de compra:**
Solo se puede acceder al formulario si el carrito contiene productos, de lo contrario el boton comprar no aparece en el carrito y no se permite la validación de datos como nombre, email, teléfono y direccion que se pedirian antes de generar la orden.

- **📃Generación de orden de compra:**  
Al finalizar una compra, se lleva a cabo un proceso automatizado que incluye:
     - **Generación de un ID de compra único:** Cada transacción se identifica de manera única.
     - **Almacenamiento en Firestore:** La orden de compra, junto con los detalles de los productos adquiridos, se guarda en la colección `ventas`.
     - **Validación de la orden:** Se muestra un mensaje de confirmación de la compra para informar al usuario del éxito de la transacción y se pide enviar comporbante por wsp redireccionando al mismo mediante un link.
     - **Actualización del stock:** El inventario de los productos se reduce en función de la cantidad adquirida por el usuario actualizando el stock en firebase.
     - **Reinicio del carrito:** Una vez completada la compra, al cerrar el carrito el mismo se vacía automáticamente y se redireciona al inicio de la app.
Esta funcionalidad asegura una experiencia fluida y confiable para el usuario al realizar compras en la tienda online.

- **🔔 Notificaciones:**
Confirmaciones visuales al agregar productos al carrito o realizar una compra exitosa.

---

## 🛠️ Tecnologías Utilizadas

| Herramienta             | Descripción                                      |
|--------------------------|------------------------------------------------|
| **React**               | Librería para construir interfaces dinámicas.   |
| **Firebase**            | Base de datos en tiempo real y almacenamiento.  |
| **React Router Dom**    | Navegación entre rutas dinámicas.               |
| **Bootstrap**           | Framework CSS para diseño responsivo.           |
| **Vite**                | Herramienta de desarrollo rápida.               |

---

## 🚀 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/sofiayacovella1407/ProyectoFinal-Yacovella.git
   cd ProyectoFinal-Yacovella
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Previsualiza el proyecto**
   ```bash
   npm run dev
   ```

---

## ⚡ Próximas Mejoras

- Implementar autenticación de usuarios para gestionar sesiones.
- Integrar una pasarela de pagos para procesar transacciones.
- Mejorar la accesibilidad para garantizar que todos los usuarios puedan interactuar con la aplicación.
- Optimizar el rendimiento general del sitio.

---

## 👩‍💻 Autor

**Sofía Yacovella**.  
2025  

---

💌 Si tienes alguna sugerencia o encuentras un problema, no dudes en abrir una [issue](https://github.com/sofiayacovella1407/ProyectoFinal-Yacovella/issues).  

