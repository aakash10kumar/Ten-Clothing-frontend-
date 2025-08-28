import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence,motion } from "framer-motion"; 
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaChevronDown,
  FaThLarge,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logoImg from "../assets/logo3.png";
import products from "./products";
import { useCart } from "./CartContext";
import "./Navbar.css";

const searchWords = [ "Search for any products","Shirts", "Ethnic Wear", "Party Wear"];

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const allCategoriesRef = useRef(null);

  // Search placeholder Typewriter
  
  const inputRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        allCategoriesRef.current &&
        !allCategoriesRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Typewriter effect for search placeholder
  useEffect(() => {
    const currentWord = searchWords[wordIndex];
    const typingSpeed = 100;
    const delayBetweenWords = 1500;
    let timer;

    if (charIndex < currentWord.length) {
      timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.placeholder += currentWord[charIndex];
        }
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.placeholder = "";
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % searchWords.length);
      }, delayBetweenWords);
    }

    return () => clearTimeout(timer);
  }, [charIndex, wordIndex]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setCart([]);
    navigate("/login");
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    if (query.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().split(" ").some((word) => word.startsWith(query))
      );
      setSearchResults(filtered.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    setSearchTerm("");
    setSearchResults([]);
    setMobileMenuOpen(false);
  };

  const categories = {
    Men: ["Ethnic Wear", "Party Wear", "Casual Wear", "Shirts", "T-Shirts", "Pants"],
    Women: ["Ethnic Wear", "Party Wear", "Casual Wear", "Dresses", "Tops", "Skirts"],
    Kids: ["Ethnic Wear", "Party Wear", "Casual Wear", "T-Shirts", "Shorts", "Frocks"],
  };

  const hideLogin =
    location.pathname === "/login" || location.pathname === "/register";

  return (
     <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <Link to="/" className="logo">
        <motion.img
          src={logoImg}
          alt="logo"
          className="logo-img"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        />
        <h1 className="logo-text">
          TenClothing
        
        </h1>
      </Link>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Middle + Right (Desktop Only) */}
      <div className="middle-section desktop-only">
        {/* All Categories Dropdown */}
        <div
          className={`all-categories ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={allCategoriesRef}
        >
          <span>
            <FaThLarge /> All <FaChevronDown className={menuOpen ? "rotate" : ""} />
          </span>
          {menuOpen && (
            <div className="all-dropdown">
              {Object.keys(categories).map((cat) => (
                <div key={cat} className="category-block">
                  <h4
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(activeCategory === cat ? null : cat);
                    }}
                    className="category-title"
                  >
                    {cat} <FaChevronDown className={activeCategory === cat ? "rotate" : ""} />
                  </h4>
                  {activeCategory === cat && (
                    <div className="subcategory-list">
                      {categories[cat].map((sub) => (
                        <Link
                          key={sub}
                          to={`/${cat.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="category-block">
                <h4>Other</h4>
                <Link to="/new-arrivals">New Arrivals</Link>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar with Typewriter Placeholder */}
        <div className="search-bar">
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={handleSearch}
            ref={inputRef}
          />
          <FaSearch />
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="search-item"
                  onClick={() => goToProduct(product.id)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right nav links */}
      <div className="nav-links desktop-only">
        {!hideLogin &&
          (!isLoggedIn ? (
            <Link to="/login">
              Login <FaUser />
            </Link>
          ) : (
            <div className="profile-dropdown">
              <motion.div
               whileHover={{ scale: 1.2 }}
               whileTap={{ scale: 0.9 }}
              className="profile-icon-wrapper"
            >
              <span
                className="profile-icon"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaUser /> My Profile
              </span>
            </motion.div>

           <AnimatePresence>
          {profileOpen && (
            <motion.div
              className="profile-menu"
               initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y:0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link to="/profile">View Profile</Link>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
          ))}
        <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="nav-icon"
      >
        <Link to="/wishlist">
          Wishlist <FaHeart />
        </Link>
      </motion.div>
        <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="nav-icon"
      >
        <Link to="/cart">
          Cart <FaShoppingCart />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
      </motion.div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="search-bar">
            <input
              type="text"
              placeholder=""
              value={searchTerm}
              onChange={handleSearch}
              ref={inputRef}
            />
            <FaSearch />
            {searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="search-item"
                    onClick={() => goToProduct(product.id)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
            Wishlist <FaHeart />
          </Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
            Cart <FaShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          {!hideLogin &&
            (!isLoggedIn ? (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Login <FaUser />
              </Link>
            ) : (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  My Profile
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
