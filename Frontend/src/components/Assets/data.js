const cartItems = {
  id: "12345",
  date: "2024-09-15T14:48:00.000Z", // Date in ISO format
  status: "Shipped",
  items: [
    {
      id: "1",
      title: "T-Shirt",
      quantity: 2,
      price: 19.99,
      imageUrl: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      id: "2",
      title: "Jeans",
      quantity: 1,
      price: 49.99,
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      title: "Sneakers",
      quantity: 1,
      price: 89.99,
      imageUrl: "https://via.placeholder.com/100",
    },
  ],
  totalPrice: 179.96, // Calculate based on items
};

export default cartItems;
