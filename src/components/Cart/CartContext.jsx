import { createContext, useContext, useState, useEffect } from "react";
import { addToCart as addCartApi, getCart, removeCart } from "../../api/cartApi";
  import { getUser } from "../../utils/getUser";

const CartContext = createContext();
export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  const user = getUser();
  const userId = user?.id;

  useEffect(() => {
    if(userId){
      loadCart();
    }
  }, [userId]);

  async function loadCart() {
    try {

      const res = await getCart(userId);

      setCart(res.data || []);

    } catch (err) {

      console.error("Cart load error", err);

    }
  }

  // Add item to cart
  async function addToCart(meal) {

    try {

      const res = await addCartApi({
        userId: userId,
        foodId: meal.id,
        qty: 1,
        note: ""
      });

      setCart(prev => [...prev, res.data]);

    } catch (err) {

      console.error("Add cart error", err);

    }

  }

  // Update quantity
  function updateQty(foodId, change) {

    setCart(prev =>
      prev.map(item =>
        item.foodId === foodId
          ? {
              ...item,
              qty: Math.max(1, item.qty + change)
            }
          : item
      )
    );

  }

  // Update note
  function updateNote(foodId, note) {

    setCart(prev =>
      prev.map(item =>
        item.foodId === foodId
          ? { ...item, note }
          : item
      )
    );

  }

  // Remove item from cart
  async function removeItem(cartId) {

    if (!cartId) {
      console.error("Cart ID Undefined");
      return;
    }

    try {

      await removeCart(cartId);

      setCart(prev =>
        prev.filter(item => item.cartId !== cartId)
      );

    } catch (err) {

      console.error("Remove error", err);

    }

  }

  // ⭐ Clear cart after order confirmation
  function emptyCart() {
    setCart([]);
  }

  // Calculate totals
  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 0),
    0
  );

  const count = cart.reduce(
    (sum, item) => sum + (item.qty || 0),
    0
  );

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        updateNote,
        removeItem,
        emptyCart,
        total,
        count
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export const useCart = () => useContext(CartContext);