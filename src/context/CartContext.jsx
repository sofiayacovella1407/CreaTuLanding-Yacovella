import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualiza su cantidad
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Si el producto no está en el carrito, agrégalo
        return [...state, action.payload];
      }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);