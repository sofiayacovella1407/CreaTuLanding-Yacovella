import { db } from "./config"; 
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), 
    }));
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

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

export const updateProductStock = async (productId, newStock) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { stock: newStock });
      console.log(`Stock actualizado para el producto ${productId}`);
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  };