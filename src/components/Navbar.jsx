import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  FaHome,
} from "react-icons/fa";
import logoImg from "../assets/logo3.png";
import products from "./products";
import { useCart } from "./CartContext";
import "./Navbar.css";

const searchWords = ["Search for any products", "Shirts", "Ethnic Wear", "Party Wear"];

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mobile menu dropdown states
const [activeCategoryGroup, setActiveCategoryGroup] = useState(null); // controls "All" open/close
const [activeSubCategory, setActiveSubCategory] = useState(null);     // controls Men/Women/Kids open/close


  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const allCategoriesRef = useRef(null);
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const categories = {
    Men: ["Ethnic Wear", "Party Wear", "Casual Wear", "Shirts", "T-Shirts", "Pants"],
    Women: ["Ethnic Wear", "Party Wear", "Casual Wear", "Dresses", "Tops", "Skirts"],
    Kids: ["Ethnic Wear", "Party Wear", "Casual Wear", "T-Shirts", "Shorts", "Frocks"],
  };

  const hideLogin = location.pathname === "/login" || location.pathname === "/register";

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop categories on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allCategoriesRef.current && !allCategoriesRef.current.contains(event.target)) {
        setMenuOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Typewriter placeholder
  useEffect(() => {
    const currentWord = searchWords[wordIndex];
    const typingSpeed = 100;
    const delayBetweenWords = 1500;
    let timer;

    if (desktopInputRef.current) {
      desktopInputRef.current.placeholder = currentWord.slice(0, charIndex);
    }
    if (mobileInputRef.current) {
      mobileInputRef.current.placeholder = currentWord.slice(0, charIndex);
    }

    if (charIndex < currentWord.length) {
      timer = setTimeout(() => setCharIndex((prev) => prev + 1), typingSpeed);
    } else {
      timer = setTimeout(() => {
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
  setSearchTerm("");      // clear input
  setSearchResults([]);   // close dropdown
  setMobileMenuOpen(false); // close mobile menu if open
};

  return (
    <>
      {/* Top Navbar */}
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
          <h1 className="logo-text">TenClothing</h1>
        </Link>

        {/* Hamburger (Mobile) */}
        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Middle Section (Desktop) */}
        <div className="middle-section desktop-only">
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

          {/* Desktop Search */}
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              ref={desktopInputRef}
            />
            <FaSearch />
            {searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((product) => (
                  <div
                  key={product.id}
                  className="search-item"
                  onClick={() => goToProduct(product.id)} // ✅ will reset & navigate
                >
                  {product.name}
                </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right nav links (Desktop) */}
        <div className="nav-links desktop-only">
          {!hideLogin &&
            (!isLoggedIn ? (
              <Link to="/login">Login <FaUser /></Link>
            ) : (
              <div className="profile-dropdown">
                <span className="profile-icon" onClick={() => setProfileOpen(!profileOpen)}>
                  <FaUser /> My Profile
                </span>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      className="profile-menu"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Link to="/profile">View Profile</Link>
                      <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          <Link to="/wishlist" className="nav-icon">
            Wishlist <FaHeart />
          </Link>
          <Link to="/cart" className="nav-icon">
            Cart <FaShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="mobile-search mobile-only">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            ref={mobileInputRef}
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

      {/* Mobile Hamburger Menu */}
      {/* Mobile Hamburger Menu */}
{mobileMenuOpen && (
  <div className="mobile-menu">
    {/* All Categories */}
    <div className="category-block">
      <h4
        onClick={() =>
          setActiveCategoryGroup(activeCategoryGroup === "all" ? null : "all")
        }
        className="category-title"
      >
        <FaThLarge /> All <FaChevronDown className={activeCategoryGroup === "all" ? "rotate" : ""} />
      </h4>

      {activeCategoryGroup === "all" && (
        <div className="all-dropdown-mobile">
          {Object.keys(categories).map((cat) => (
            <div key={cat} className="category-block">
              <h5
                onClick={() =>
                  setActiveSubCategory(activeSubCategory === cat ? null : cat)
                }
                className="category-title"
              >
                {cat} <FaChevronDown className={activeSubCategory === cat ? "rotate" : ""} />
              </h5>

              {activeSubCategory === cat && (
                <div className="subcategory-list">
                  {categories[cat].map((sub) => (
                    <Link
                      key={sub}
                      to={`/${cat.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Other links */}
          <div className="category-block">
            <h5>Other</h5>
            <Link to="/new-arrivals" onClick={() => setMobileMenuOpen(false)}>
              New Arrivals
            </Link>
          </div>
        </div>
      )}
    </div>

    {/* Logout */}
    {!hideLogin && isLoggedIn && (
      <div className="logout-btn">
        <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </div>
    )}
  </div>
)}



      {/* Bottom Navigation (Mobile) */}
      <div className="bottom-nav">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          <FaHome />
          <span>Home</span>
        </Link>

        {isLoggedIn ? (
          <Link
            to="/profile"
            className={location.pathname.includes("/profile") ? "active" : ""}
          >
            <FaUser />
            <span>Profile</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className={location.pathname.includes("/login") ? "active" : ""}
          >
            <FaUser />
            <span>Login</span>
          </Link>
        )}

        <Link to="/wishlist" className={location.pathname.includes("/wishlist") ? "active" : ""}>
          <FaHeart />
          <span>Wishlist</span>
        </Link>
        <Link to="/cart" className={location.pathname.includes("/cart") ? "active" : ""}>
          <FaShoppingCart />
          <span>Cart</span>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
      </div>
    </>
  );
}

export default Navbar;
