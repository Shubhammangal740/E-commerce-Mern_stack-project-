import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>E-shop</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <a
            href="https://www.instagram.com/shubham_mangal_14/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram box1"></i>
          </a>
        </div>
        <div className="footer-icons-container">
          <a
            href="https://wa.me/7568029718"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp box2"></i>
          </a>
        </div>
        <div className="footer-icons-container">
          <a
            href="https://www.linkedin.com/in/shubham-mangal-105661274/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin box3"></i>
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
