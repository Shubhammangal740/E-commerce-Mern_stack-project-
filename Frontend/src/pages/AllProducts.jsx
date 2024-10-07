import React, { useEffect, useState } from "react";
import { useContext } from "react";
import dropdown_icon from "../components/Assets/dropdown_icon.png";
import Item from "../components/Items/Item";
import { ShopContext } from "../context/ShopContext";

function AllProducts(props) {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-36</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="above_div">
        <div className="shopcategory_products">
          {all_product.map((item, i) => {
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
        <div className="shopcategory-loadmore">Explore More</div>
      </div>
    </div>
  );
}

export default AllProducts;
