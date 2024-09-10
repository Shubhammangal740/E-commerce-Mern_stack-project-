import React from "react";
import "./DescriptionBox.css";

function DescriptionBox() {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Welcome to TrendyThreads, your ultimate online destination for the
          latest in fashion. Our eCommerce clothing store offers a wide
          selection of stylish and affordable apparel for men, women, and
          children. From casual wear to formal attire, we have something for
          every occasion. With a user-friendly interface, secure payment
          options, and fast shipping, shopping with us is a breeze. Explore our
          collections today and find the perfect outfit to express your unique
          style. At TrendyThreads, fashion meets convenience, all in one click.
        </p>
        <p>
          At TrendyThreads, we believe fashion should be accessible to everyone.
          Our carefully curated collections feature the latest trends and
          timeless classics, ensuring you can always find something that suits
          your style and budget. Whether you're looking for everyday essentials,
          statement pieces, or the perfect outfit for a special event, our store
          has you covered.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox;
