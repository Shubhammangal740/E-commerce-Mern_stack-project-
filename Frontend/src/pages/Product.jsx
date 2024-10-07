import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrums/Breadcrum";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

function Product() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const fetchRelatedProduct = async () => {
    await fetch(`${apiUrl}/related-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.data);
      })
      .catch((err) => {});
  };
  const FetchedSinleProduct = async (productId) => {
    await fetch(`${apiUrl}/product`, {
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
      .catch((err) => {});
  };
  useEffect(() => {
    FetchedSinleProduct(productId);
    fetchRelatedProduct();
  }, [productId]);
  return (
    <div>
      {product ? (
        <>
          <Breadcrum product={product}></Breadcrum>
          <ProductDisplay product={product}></ProductDisplay>
          <DescriptionBox></DescriptionBox>
          <RelatedProducts data={data}></RelatedProducts>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Product;
