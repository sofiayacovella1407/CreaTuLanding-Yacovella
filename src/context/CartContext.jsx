import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART': {
      const newState = [...state];
      newState.splice(action.payload, 1); // Eliminar producto por índice
      return newState;
    }
    case 'CLEAR_CART': {
      return []; // Vaciar el carrito
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const newState = state.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      return newState;
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);