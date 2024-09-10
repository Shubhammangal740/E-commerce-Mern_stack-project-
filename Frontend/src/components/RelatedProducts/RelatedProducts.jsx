import React from "react";
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from "../Items/Item";

function RelatedProducts() {
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-items">
        {data_product.map((item, i) => {
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

export default RelatedProducts;
