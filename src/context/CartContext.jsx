import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualiza su cantidad
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          showSuccess: true, // Activa el mensaje de confirmación
        };
      } else {
        // Si el producto no está en el carrito, agrégalo
        return {
          ...state,
          cart: [...state.cart, action.payload],
          showSuccess: true, // Activa el mensaje de confirmación
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
              : item
          )
          .filter((item) => item.quantity > 0), // Elimina del carrito si la cantidad llega a 0
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "HIDE_SUCCESS_MESSAGE":
      return { ...state, showSuccess: false }; // Oculta el mensaje de confirmación

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = {
    cart: [], // Estado inicial del carrito
    showSuccess: false, // Estado inicial del mensaje de confirmación
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);