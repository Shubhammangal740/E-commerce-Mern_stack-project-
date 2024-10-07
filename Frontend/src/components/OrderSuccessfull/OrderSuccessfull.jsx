import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

function OrderSuccessfull() {
  const apiUrl = "http://localhost:5000";
  const { clearCart, cartItems, all_product } = useContext(ShopContext);
  const navigate = useNavigate();
  const storedCartItems = localStorage.getItem("orderData");
  const storedTotalPrice = localStorage.getItem("Price");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`${apiUrl}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the correct token management here
      },
      body: JSON.stringify({
        cartItems: JSON.parse(storedCartItems),
        totalPrice: storedTotalPrice,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Optionally, clear cart from local storage or app state here
        localStorage.removeItem("orderData");
        localStorage.removeItem("Price");
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/orders"); // Redirect to the "All Orders" page
        }, 2000);
      })
      .catch((err) => {});
  }, [navigate]);

  return (
    <>
      {all_product.map((e, i) => {
        if (cartItems[e._id] > 0) {
          clearCart();
        }
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
        return null;
      })}
      <h2>Your order was successful! Redirecting...</h2>
    </>
  );
}

export default OrderSuccessfull;
