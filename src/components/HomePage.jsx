import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "./CartContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import './ProductCard.css';
import "./HomePage.css";
import Navbar from "./Navbar";

import men_fashion from "../assets/men_fashion.jpeg";
import women_fashion from "../assets/women_fashion.jpeg";
import kid_fashion from "../assets/kids_fashion1.jpeg";
import denim_jeans from "../assets/denim_jeans.jpeg";
import heroImg1 from "../assets/hero1.jpg";
import heroImg2 from "../assets/hero2.jpg";
import heroImg3 from "../assets/hero3.jpg";

function HomePage() {
  const { addToCart, addToWishlist } = useCart();

  const featuredProducts = [
    { id: 1, name: "Premium Denim Jeans", price: 1999, discountPercentage: 15, image: denim_jeans },
    { id: 2, name: "Men's Casual Shirt", price: 1299, discountPercentage: 10, image: men_fashion },
    { id: 3, name: "Women's Ethnic Dress", price: 2499, discountPercentage: 20, image: women_fashion },
    { id: 4, name: "Kids' Party Wear Outfit", price: 1599, discountPercentage: 12, image: kid_fashion },
    { id: 5, name: "Women's Casual Shirt", price: 1799, discountPercentage: 18, image: women_fashion },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [heroImg1, heroImg2, heroImg3];

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <img src={heroImages[currentSlide]} alt="Hero" className="hero-image" />

        {/* Overlay content */}
        <div className="hero-overlay">
          <div className="hero-center"></div>
          <div className="hero-right">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
            >
              <Link to="/all-products" className="shop-now-btn">
                Shop Now →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Arrows */}
        <button className="hero-arrow left" onClick={prevSlide}>❮</button>
        <button className="hero-arrow right" onClick={nextSlide}>❯</button>

        {/* Dots */}
        <div className="hero-dots">
          {heroImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 data-aos="fade-up">Shop by Category</h2>
        <div className="category-cards">
          <Link to="/category/men/all" className="card" data-aos="zoom-in" data-aos-delay="100">
            <div className="circle-bg pink-gradient">
              <img src={men_fashion} alt="Men" />
            </div>
            <p>Men's Fashion</p>
          </Link>

          <Link to="/category/women/all" className="card" data-aos="zoom-in" data-aos-delay="200">
            <div className="circle-bg purple-gradient">
              <img src={women_fashion} alt="Women" />
            </div>
            <p>Women's Fashion</p>
          </Link>

          <Link to="/category/kids/all" className="card" data-aos="zoom-in" data-aos-delay="300">
            <div className="circle-bg orange-gradient">
              <img src={kid_fashion} alt="Kids" />
            </div>
            <p>Kids' Fashion</p>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      
      {/* Featured Products Section */}
<section className="featured">
  <h2 data-aos="fade-up">Featured Products</h2>
  <div className="featured-products-list">
    {featuredProducts.map((product, index) => (
      <ProductCard
      key={product.id}
      product={product}
      onAddToCart={addToCart}
      onAddToWishlist={addToWishlist}
      showAddToCart={false}
      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
      data-aos-delay={index * 150}
      data-aos-once="true"
    />
    ))}
  </div>
  <Link to="/all-products">
    <button className="view-all" data-aos="fade-up" data-aos-delay={featuredProducts.length * 150}>
      View All Products
    </button>
  </Link>
</section>



      {/* Newsletter */}
      <section className="newsletter" data-aos="fade-up">
        <h2>Subscribe to  TenClothing</h2>
        <p>
          Get the latest updates on new products, exclusive offers, and fashion
          tips delivered straight to your inbox.
        </p>
        <div className="subscribe">
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
