import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logoImg from "../assets/logo3.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left side - Logo + description */}
        <div className="footer-section logo-section">
          <img src={logoImg} alt="logo" className="logo-img" />
          <p>
            Discover the latest fashion trends for men, women, and kids, with
            styles that suit every occasion.
          </p>

          <div className="social-icons">
            <a href="/" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="/" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="/" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Right side sections */}
        <div className="footer-right">
           {/* New Sections like Amazon */}
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Our Story</p>
            <p>Careers</p>
            <p>Press</p>
            <p>Investors</p>
          </div>
          <div className="footer-section">
            <h3>Shop</h3>
            <p>Men</p>
            <p>Women</p>
            <p>Kids</p>
            <p>New Arrivals</p>
            <p>Sale</p>
          </div>

          <div className="footer-section">
            <h3>Help</h3>
            <p>Customer Service</p>
            <p>Track Order</p>
            <p>Returns & Exchanges</p>
            <p>Shipping Info</p>
            <p>FAQ</p>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>123 Fashion Street</p>
            <p>MUMBAI, 400001</p>
            <p>INDIA</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@tenclothing.com</p>
          </div>

         
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Bottom bar with extra links */}
      <div className="footer-bottom">
        <div className="footer-links">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookies</p>
          <p>Sitemap</p>
        </div>
        <div className="footer-logo">
          <img src={logoImg} alt="logo" />
        </div>
        <p>&copy; {new Date().getFullYear()} TenClothing. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
