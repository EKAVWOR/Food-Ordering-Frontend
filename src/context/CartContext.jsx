import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (meal) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...meal, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (mealId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === mealId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeFromCart = (mealId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== mealId));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
