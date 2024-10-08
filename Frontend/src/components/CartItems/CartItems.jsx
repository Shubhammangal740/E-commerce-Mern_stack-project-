import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

function CartItems() {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-fromat-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e, i) => {
        if (cartItems[e._id] > 0) {
          return (
            <div>
              <div key={i} className="cartitems-format cartitems-fromat-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p> {e.name} </p>
                <p> ${e.new_price} </p>
                <button className="cartitems-quantity">
                  {cartItems[e._id]}
                </button>
                <p>${e.new_price * cartItems[e._id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e._id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>
            <Link to={"/checkout"}>PROCEED TO CHECKOUT</Link>
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
