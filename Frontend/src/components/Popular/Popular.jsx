import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Items/Item";

function Popular() {
  const [product, setProduct] = useState([]);
  const popularSection = async () => {
    await fetch("http://localhost:5000/popular", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setProduct(resData.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    popularSection();
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Popular;
