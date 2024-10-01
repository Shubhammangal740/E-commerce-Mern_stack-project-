import React from "react";
import "./RelatedProducts.css";
import Item from "../Items/Item";

function RelatedProducts(props) {
  const { data } = props; // Destructure 'data' from 'props'
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-items">
        {data.map((item, i) => (
          <Item
            key={i}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
