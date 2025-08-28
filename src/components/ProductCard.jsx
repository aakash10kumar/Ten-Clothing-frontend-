import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProductCard.css";

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  showAddToCart = false,
  ...aosProps
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleWishlistClick = (e) => {
    e.preventDefault();   // prevent link navigation when clicking heart
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);

    if (!isWishlisted) {
      toast.success(`${product.name} added to wishlist`, {
        toastId: `wishlist-add-${product.id}`,
      });
    } else {
      toast.info(`${product.name} removed from wishlist`, {
        toastId: `wishlist-remove-${product.id}`,
      });
    }

    onAddToWishlist(product);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const productImage =
    product.image && product.image.trim() !== ""
      ? product.image
      : "/images/placeholder.png";

  const discountedPrice =
    product.discountPercentage > 0
      ? Math.round(
          product.price - (product.price * product.discountPercentage) / 100
        )
      : null;

  return (
    <div className="product-card" {...aosProps}>
      <Link to={`/product/${product.id}`} className="product-link">
        {/* ==== IMAGE + WISHLIST WRAPPER ==== */}
        <div className="product-image">
          <img
            src={productImage}
            alt={product.name || "Product"}
            className="product-img"
          />
          {/* Rating Badge */}
          {product.rating && (
            <div className="rating-badge">
              <span className="star">★</span>
              <span>{product.rating}</span>
              <span className="count">| {product.reviews}k</span>
            </div>
          )}

          {/* Wishlist Icon inside image */}
          <div
            className={`wishlist-icon ${isWishlisted ? "wishlisted" : ""}`}
            onClick={handleWishlistClick}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FaHeart />
          </div>
        </div>

        <div className="product-info">
          <p className="product-price">
            {discountedPrice ? (
              <>
                <span className="old-price">₹{product.price}</span>
                <span className="discounted-price">₹{discountedPrice}</span>
                <span className="discount-badge">
                  {product.discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="no-discount">₹{product.price}</span>
            )}
          </p>
          <h3 className="product-name">{product.name}</h3>
        </div>
      </Link>

      {showAddToCart && (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
