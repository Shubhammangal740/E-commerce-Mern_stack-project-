import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/Footer/Footer";
import men_banner from "./components/Assets/banner_mens.png";
import women_banner from "./components/Assets/banner_women.png";
import kid_banner from "./components/Assets/banner_kids.png";
import AllProducts from "./pages/AllProducts";
import Checkout from "./components/Checkout/Checkout";
import Order from "./components/Order/Order";
import cartItems from "./components/Assets/data";
import OrderSuccessfull from "./components/OrderSuccessfull/OrderSuccessfull";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Shop></Shop>}></Route>
          <Route
            path="/allproducts"
            element={<AllProducts banner={men_banner}></AllProducts>}
          ></Route>
          <Route
            path="/men"
            element={
              <ShopCategory banner={men_banner} category="men"></ShopCategory>
            }
          ></Route>
          <Route
            path="/women"
            element={
              <ShopCategory
                banner={women_banner}
                category="women"
              ></ShopCategory>
            }
          ></Route>
          <Route
            path="/kid"
            element={
              <ShopCategory banner={kid_banner} category="kid"></ShopCategory>
            }
          ></Route>

          <Route path="/product" element={<Product></Product>}>
            <Route path=":productId" element={<Product></Product>}></Route>
          </Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/login" element={<LoginSignup></LoginSignup>}></Route>
          <Route path="/signup" element={<LoginSignup></LoginSignup>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route
            path="/checkout/success"
            element={<OrderSuccessfull></OrderSuccessfull>}
          ></Route>
          <Route
            path="/orders"
            element={<Order orderDetails={cartItems}></Order>}
          ></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
