import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import AllProducts from "../../components/AllProducts/AllProducts";

function Admin() {
  return (
    <div className="admin">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/addproduct" element={<AddProduct></AddProduct>}></Route>
        <Route
          path="/addproduct/:productId"
          element={<AddProduct></AddProduct>}
        ></Route>
        <Route
          path="/allproducts"
          element={<AllProducts></AllProducts>}
        ></Route>
      </Routes>
    </div>
  );
}

export default Admin;
