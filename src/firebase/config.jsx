// Importa las funciones necesarias desde Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Asegúrate de incluir esta línea

// Configuración de Firebase (usa los valores de tu proyecto Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDzOAoGFQQDwhHa88entAvun_RaRvGAQ90",
  authDomain: "proyectofinal-yacovella.firebaseapp.com",
  projectId: "proyectofinal-yacovella",
  storageBucket: "proyectofinal-yacovella.firebasestorage.app",
  messagingSenderId: "558908344271",
  appId: "1:558908344271:web:728b57b59fe702d885b4ba",
  measurementId: "G-GKT8PNGKJD"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app); 