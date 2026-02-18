import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(meal) {
    setCart(prev => {
      const exist = prev.find(i => i.id === meal.id);
      if (exist) {
        return prev.map(i =>
          i.id === meal.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...meal, qty: 1, note: "" }];
    });
  }

  function updateQty(id, change) {
    setCart(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, qty: Math.max(1, i.qty + change) } : i
        )
    );
  }

  function updateNote(id, note) {
    setCart(prev =>
      prev.map(i =>
        i.id === id ? { ...i, note } : i
      )
    );
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeItem, updateNote, total ,count}}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
