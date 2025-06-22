import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const saved = localStorage.getItem('cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
      setLoaded(true);
    }, []);
  
    useEffect(() => {
      if (loaded) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    }, [cartItems, loaded]);
  
    function addToCart(product) {
      setCartItems((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          );
        }
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      });
    }
  
    function removeFromCart(productId) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    }
  
    return (
      <CartContext.Provider
        value={{ cartItems, addToCart, removeFromCart, setCartItems }}
      >
        {children}
      </CartContext.Provider>
    );
  }
  

export function useCart() {
  return useContext(CartContext);
}
