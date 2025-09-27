import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "./CartContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import "./ProductCard.css";
import "./HomePage.css";
import Navbar from "./Navbar";

import men_fashion from "../assets/men_fashion.jpeg";
import women_fashion from "../assets/women_fashion.jpeg";
import kid_fashion from "../assets/kids_fashion1.jpeg";
import heroImg1 from "../assets/hero1.jpg";
import heroImg2 from "../assets/hero2.jpg";
import heroImg3 from "../assets/hero3.jpg";

function HomePage() {
  const { addToCart, addToWishlist } = useCart();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [heroImg1, heroImg2, heroImg3];

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/featured`
        );
        console.log("Featured products response data:", res.data);

        // Log keys and data type
        console.log("Response keys:", Object.keys(res.data));
        console.log("Response type:", typeof res.data);

        let products = [];

        if (Array.isArray(res.data)) {
          products = res.data;
        } else if (res.data && Array.isArray(res.data.products)) {
          products = res.data.products;
        } else if (res.data && Array.isArray(res.data.data)) {
          // Sometimes API returns { data: [...] }
          products = res.data.data;
        } else {
          throw new Error("Unexpected response structure");
        }

        setFeaturedProducts(products.slice(0, 5));
      } catch (err) {
        setError("Could not load featured products.");
        console.error("Failed to fetch featured products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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

      {/* Hero Section (Desktop) */}
      <section className="hero desktop-hero">
        <img src={heroImages[currentSlide]} alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-right">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.1, 1], opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Link to="/all-products" className="shop-now-btn">
                Shop Now →
              </Link>
            </motion.div>
          </div>
        </div>

        <button className="hero-arrow left" onClick={prevSlide}>
          ❮
        </button>
        <button className="hero-arrow right" onClick={nextSlide}>
          ❯
        </button>

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

      {/* Hero Section (Mobile) */}
      <section className="mobile-hero">
        <img
          src={heroImages[currentSlide]}
          alt="Hero"
          className="hero-image-mobile"
        />
        <div className="hero-overlay-mobile">
          <Link to="/all-products" className="shop-now-btn-mobile">
            Shop Now →
          </Link>
        </div>
        <button className="hero-arrow-mobile left" onClick={prevSlide}>
          ❮
        </button>
        <button className="hero-arrow-mobile right" onClick={nextSlide}>
          ❯
        </button>
        <div className="hero-dots-mobile">
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
          <Link
            to="/category/men/all"
            className="card"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="circle-bg pink-gradient">
              <img src={men_fashion} alt="Men" />
            </div>
            <p>Men's Fashion</p>
          </Link>

          <Link
            to="/category/women/all"
            className="card"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="circle-bg purple-gradient">
              <img src={women_fashion} alt="Women" />
            </div>
            <p>Women's Fashion</p>
          </Link>

          <Link
            to="/category/kids/all"
            className="card"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="circle-bg orange-gradient">
              <img src={kid_fashion} alt="Kids" />
            </div>
            <p>Kids' Fashion</p>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2 data-aos="fade-up">Featured Products</h2>

        {loading && <p>Loading featured products...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            <div className="featured-products-list">
             {featuredProducts.map((product, index) => {
  console.log(`Product ${index}:`, product);
  return (
    <ProductCard
      key={`${product._id}-${index}`}
      product={product}
      onAddToCart={addToCart}
      onAddToWishlist={addToWishlist}
      showAddToCart={false}
      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
      data-aos-delay={index * 150}
      data-aos-once="true"
    />
  );
})}

            </div>
            <Link to="/all-products">
              <button
                className="view-all"
                data-aos="fade-up"
                data-aos-delay={featuredProducts.length * 150}
              >
                View All Products
              </button>
            </Link>
          </>
        )}
      </section>

      {/* Newsletter */}
      <section className="newsletter" data-aos="fade-up">
        <h2>Subscribe to TenClothing</h2>
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
