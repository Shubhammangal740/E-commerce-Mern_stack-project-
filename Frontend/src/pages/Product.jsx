import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrums/Breadcrum";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

function Product() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const FetchedSinleProduct = async () => {
    await fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setProduct(resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    FetchedSinleProduct();
  }, []);
  return (
    <div>
      {product ? (
        <>
          <Breadcrum product={product}></Breadcrum>
          <ProductDisplay product={product}></ProductDisplay>
          <DescriptionBox></DescriptionBox>
          <RelatedProducts></RelatedProducts>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Product;
