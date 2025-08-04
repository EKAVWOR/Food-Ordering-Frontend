// // context/CartContext.js

// import { createContext, useState } from "react";

// // ✅ 1. Create the context object
// export const CartContext = createContext();

// // ✅ 2. Create the provider component
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);


//   const addToCart = (meal) => {
//   setCartItems(prevItems => {
//     // Check: does this meal already exist in the cart?
//     const existingItem = prevItems.find(item => item.id === meal.id);

//     if (existingItem) {
//       // If exists: increase quantity
//       return prevItems.map(item =>
//         item.id === meal.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       // Else: add new meal
//       return [...prevItems, { ...meal, quantity: 1 }];
//     }
//   });
// };


//   const updateQuantity = (id, quantity) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };


//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };




// context/CartContext.js

import { createContext, useState } from "react";

// ✅ 1. Create the context object
export const CartContext = createContext();

// ✅ 2. Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (meal) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === meal.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...meal, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // ✅ ADD THIS!
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart // ✅ INCLUDE IT HERE
    }}>
      {children}
    </CartContext.Provider>
  );
};
