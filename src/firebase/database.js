import { db } from "./config"; // Importar la configuración de Firestore
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// Función para obtener todos los productos
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), // Incluye todos los campos del documento en Firestore
    }));
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Función para obtener un producto por ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error(`Producto con ID ${productId} no encontrado`);
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw error;
  }
};