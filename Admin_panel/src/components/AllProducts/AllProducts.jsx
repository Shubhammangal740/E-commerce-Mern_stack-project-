import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import cross_icon from "../../assets/cross_icon.png";
import { Link, useNavigate } from "react-router-dom";

function AllProducts() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [allproducts, setAllproducts] = useState([]);
  const navigate = useNavigate();

  const updateHandler = (product) => {
    navigate(`/addproduct/${product._id}`);
  };

  const FetchAllProduct = async () => {
    await fetch(`${apiUrl}/admin/allproducts`)
      .then((res) => res.json())
      .then((resData) => {
        setAllproducts(resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    FetchAllProduct();
  }, []);

  const deleteProduct = async (productId) => {
    await fetch(`${apiUrl}/admin/deleteproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
    await FetchAllProduct();
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old_Price</p>
        <p>New_Price</p>
        <p>Category</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((item, i) => {
          return (
            <>
              <div
                key={i}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={item.image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{item.name}</p>
                <p>${item.old_price} </p>
                <p>${item.new_price} </p>
                <p> {item.category} </p>
                <p
                  onClick={() => {
                    updateHandler(item);
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Edit
                </p>
                <img
                  onClick={() => {
                    deleteProduct(item._id);
                  }}
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts;
