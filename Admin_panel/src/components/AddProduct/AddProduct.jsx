import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useNavigate, useParams } from "react-router-dom";

function AddProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    old_price: "",
    new_price: "",
  });

  useEffect(() => {
    if (productId) {
      fetch("http://localhost:5000/admin/product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      })
        .then((res) => res.json())
        .then((product) => {
          setProductDetails({
            name: product.data.name || "",
            image: product.data.image || "",
            category: product.data.category || "women",
            old_price: product.data.old_price || "",
            new_price: product.data.new_price || "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productId]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const add_Product = async () => {
    let responseData;
    let product = { ...productDetails };

    if (image && typeof image !== "string") {
      let formData = new FormData();
      formData.append("image", image);

      await fetch("http://localhost:5000/admin/image", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData);
          product.image = resData.imageUrl;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const url = productId
      ? `http://localhost:5000/admin/addproduct/${productId}`
      : "http://localhost:5000/admin/addproduct";

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        res.json();
      })
      .then((resData) => {
        console.log(resData);
        navigate("/allproducts");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addproduct-selector"
        >
          <option value="women">Women</option>
          <option value="men">men</option>
          <option value="kid">kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={add_Product} className="addproduct-btn">
        {productId ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
}

export default AddProduct;
