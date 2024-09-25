import React, { useEffect, useState } from "react";
import "./Order.css"; // Import your CSS file for styling

const Order = () => {
  const [order, setOrder] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchOrder = () => {
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the correct token management here
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((res) => res.json())
      .then((redData) => {
        setOrder(redData);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order || order.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {order.map((orderDetails) => (
        <div key={orderDetails._id} className="order-container">
          <h1>Order Confirmation</h1>
          <div className="order-summary">
            <h2>Order ID: {orderDetails._id}</h2>
            <p>Date: {orderDetails.Date}</p>
          </div>
          <div className="order-items">
            <h3>Items Purchased</h3>
            <ul>
              {orderDetails.productDetail.items.map((item) => (
                <li key={item.product._id} className="order-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <p>{item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.product.new_price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-total">
            <h3>Total: ${orderDetails.totalPrice.toFixed(2)}</h3>
          </div>
          <div className="order-buttons">
            <button onClick={() => (window.location.href = "/")}>
              Continue Shopping
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Order;
