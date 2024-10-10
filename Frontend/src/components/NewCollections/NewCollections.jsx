import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../Items/Item";
function NewCollections() {
  const apiUrl = "https://cloth-store-backend-kruy.onrender.com";
  const [product, setProduct] = useState([]);

  const NewCollectionProduct = async () => {
    await fetch(`${apiUrl}/newcollection`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    NewCollectionProduct();
  }, []);
  return (
    <div className="new-collection">
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            ></Item>
          );
        })}
      </div>
    </div>
  );
}

export default NewCollections;
