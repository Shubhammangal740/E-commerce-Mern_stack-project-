import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/allproducts`)
      .then((res) => res.json())
      .then((resData) => {
        setAll_products(resData.data);
      })
      .catch((err) => {});

    // Fetch cart items for the authenticated user
    if (localStorage.getItem("auth-token")) {
      const token = localStorage.getItem("auth-token");
      fetch("http://localhost:5000/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          const fetchedCart = {};
          resData.cartItems.forEach((item) => {
            if (item.productId && item.productId._id) {
              fetchedCart[item.productId._id] = item.quantity;
            }
          });
          setCartItems(fetchedCart);
        })
        .catch((err) => {});
    }
  }, []);

  const addToCart = async (itemId) => {
    const newQuantity = cartItems[itemId] ? cartItems[itemId] + 1 : 1;
    setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

    if (localStorage.getItem("auth-token")) {
      const token = localStorage.getItem("auth-token");
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: itemId,
          quantity: newQuantity,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {})
        .catch((err) => {});
    }
  };

  const removeFromCart = async (itemId) => {
    const newQuantity = cartItems[itemId] - 1;

    if (newQuantity <= 0) {
      const { [itemId]: removedItem, ...rest } = cartItems;
      setCartItems(rest);
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));
    }

    if (localStorage.getItem("auth-token")) {
      const token = localStorage.getItem("auth-token");
      await fetch("http://localhost:5000/cart", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: itemId,
          quantity: newQuantity,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {})
        .catch((err) => {});
    }
  };

  const clearCart = async () => {
    setCartItems({});

    if (localStorage.getItem("auth-token")) {
      const token = localStorage.getItem("auth-token");
      await fetch("http://localhost:5000/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {})
        .catch((err) => {});
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartAmount,
    getTotalCartItems,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
