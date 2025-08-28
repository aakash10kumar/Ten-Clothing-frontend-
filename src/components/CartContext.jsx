import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // ---------------- STATES ----------------
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // ---------------- PERSIST ----------------
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ---------------- CART ----------------
  const addToCart = (product, selectedSize = null) => {
    setCart((prev) => {
      const exist = prev.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
      if (exist) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize }];
    });
  };

  const removeFromCart = (id, size = null) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (id, newQuantity) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
  );
};


  // ---------------- WISHLIST ----------------
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // ---------------- ORDERS ----------------
  const placeOrder = (order) => {
    setOrders((prev) => [...prev, order]);
    setCart([]); // clear cart
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addToCart,
        setCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
