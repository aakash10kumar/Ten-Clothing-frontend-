import React from "react";
import { useCart } from "./CartContext";
import "./Wishlist.css";
import empty_wishlist from "../assets/empty_wishlist.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      toast.warn("Please log in to add items to cart!", { autoClose: 1500 });
      return navigate("/login");
    }
    addToCart(item);
    toast.success(`${item.name} added to cart`, { autoClose: 1500 });
  };

  const handleRemoveFromWishlist = (item) => {
    if (!isLoggedIn) {
      toast.warn("Please log in to remove items!");
      return navigate("/login");
    }
    removeFromWishlist(item.id);
    toast.info(`${item.name} removed from wishlist`);
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        {!isLoggedIn ? (
          <div className="login-required">
            <h2 className="login-title">PLEASE LOG IN</h2>
            <p className="login-subtitle">
              Login to view items in your wishlist.
            </p>
            <img
              src={empty_wishlist}
              alt="Login Required"
              className="empty-image"
            />
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <h2 className="empty-title">YOUR WISHLIST IS EMPTY</h2>
            <p className="empty-subtitle">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <img
              src={empty_wishlist}
              alt="Empty Wishlist"
              className="empty-image"
            />
            <button
              className="continue-btn"
              onClick={() => navigate("/")}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <h2 className="wishlist-title">
              My Wishlist <span>{wishlist.length} items</span>
            </h2>
            <div className="wishlist-grid">
              {wishlist.map((item) => {
                const discountedPrice = item.discountPercentage
                  ? Math.round(
                      item.price - (item.price * item.discountPercentage) / 100
                    )
                  : null;

                return (
                  <div className="wishlist-card" key={item.id}>
                    <div className="wishlist-image-wrapper">
                      <img src={item.image} alt={item.name} />
                      <button
                        className="wishlist-remove"
                        onClick={() => handleRemoveFromWishlist(item)}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>

                    <h3 className="wishlist-product-name">{item.name}</h3>

                    {item.discountPercentage ? (
                      <div className="wishlist-price">
                        <span className="discounted">₹{discountedPrice}</span>
                        <span className="original">₹{item.price}</span>
                        <span className="discount-label">
                          {item.discountPercentage}% OFF
                        </span>
                      </div>
                    ) : (
                      <p className="wishlist-price">₹{item.price}</p>
                    )}

                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
