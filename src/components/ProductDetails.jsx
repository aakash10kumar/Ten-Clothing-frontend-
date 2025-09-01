import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import products from "./products";
import "./ProductDetails.css";
import Navbar from "./Navbar";
import empty_cart from "../assets/empty_cart.jpeg";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Font Awesome (needed for star icons)
import "@fortawesome/fontawesome-free/css/all.min.css";



const ProductDetails = () => {
   const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const reviewsRef = useRef(null);

  // Find product
  const product = products.find((item) => item.id.toString() === id);

  // ---------------- STATES ----------------
  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Reviews
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews-${id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  // ---------------- SAFE RETURN ----------------
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  // ---------------- HELPERS ----------------
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const filteredReviews = reviews
    .filter((r) => {
      if (filter === "photos") return r.photo;
      if (filter !== "all") return r.rating === parseInt(filter);
      return true;
    })
    .sort((a, b) => {
      if (sort === "recent") return b.date - a.date;
      if (sort === "high") return b.rating - a.rating;
      if (sort === "low") return a.rating - b.rating;
      return 0;
    });

  const handleSubmitReview = () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }
    const newReview = {
      rating,
      title,
      comment,
      photo,
      name: "Guest User",
      verified: true,
      profilePic: "/default-avatar.png",
      date: Date.now(),
    };
    setReviews([...reviews, newReview]);
    setRating(0);
    setTitle("");
    setComment("");
    setPhoto(null);
    toast.success("Review submitted ✅", { autoClose: 1500 });
  };

  // ---------------- CART ----------------
  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }
    const productWithOptions = {
      ...product,
      size: selectedSize || "M",
      color: selectedColor || product.colors?.[0]?.name || "Default",
      image: selectedImage || product.image,
    };
    addToCart(productWithOptions);
    toast.success(`${product.name} added to cart 🛒`, { autoClose: 1500 });
    navigate("/cart");
  };

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      toast.warning("⚠️ Please log in to continue checkout", { autoClose: 2000 });
      return;
    }
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size before checkout");
      return;
    }
    const productWithOptions = {
      ...product,
      size: selectedSize || "M",
      color: selectedColor || product.colors?.[0]?.name || "Default",
      image: selectedImage || product.image,
    };
    addToCart(productWithOptions);
    toast.success(`Proceeding to checkout with ${product.name} ✅`, {
      autoClose: 1500,
    });
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      {/* Login Required Prompt */}
      {showLoginPrompt && (
        <div className="cart-container">
          <div className="login-required">
            <h2 className="login-title">PLEASE LOG IN</h2>
            <p className="login-subtitle">Login to continue your purchase.</p>
            <img src={empty_cart} alt="Login Required" className="empty-image" />
            <button className="login-btn" onClick={() => navigate("/login")}>
              LOGIN
            </button>
          </div>
        </div>
      )}

      {!showLoginPrompt && (
        <>
          <div className="product-details">
            {/* LEFT - Image Gallery */}
            <div className="image-gallery">
              <div className="thumbnails">
                {product.variants && product.variants.length > 0 ? (
                  product.variants.map((variant, index) => (
                    <img
                      key={index}
                      src={variant}
                      alt="variant"
                      className={`${selectedImage === variant ? "active" : ""}`}
                      onClick={() => setSelectedImage(variant)}
                    />
                  ))
                ) : (
                  <img src={product.image} alt={product.name} className="active" />
                )}
              </div>
              <div className="main-image">
                <img src={selectedImage || product.image} alt={product.name} />
              </div>
            </div>

            {/* RIGHT - Product Info */}
            <div className="product-info">
              <h1 className="product-title">{product.name}</h1>
              <p className="brand">Brand: {product.brand || "No brand"}</p>

              {/* Rating */}
              <div
                className="rating-summary-badge"
                onClick={scrollToReviews}
              >
                <span className="avg-rating">
                  {reviews.length > 0
                    ? averageRating.toFixed(1)
                    : product.rating || "3.5"}{" "}
                  ⭐
                </span>
                <span className="total-reviews">
                  ({reviews.length > 0 ? reviews.length : product.reviews || "1000+"})
                </span>
              </div>

              {/* Price Section */}
              <div className="price-section">
                <span className="price">
                  ₹
                  {Math.round(
                    product.price - (product.price * product.discountPercentage) / 100
                  )}
                </span>
                <span className="old-price">₹{product.price}</span>
                <span className="discount">-{product.discountPercentage}%</span>
              </div>

              {/* Extra Info Pills */}
              <div className="extra-info">
                <div className="info-item">🔄 10 Days Return & Exchange</div>
                <div className="info-item">💵 Cash on Delivery Available</div>
                <div className="info-item">🚚 Free Delivery</div>
                <div className="info-item">🏷️ Top Brand</div>
                <div className="info-item">✅ Secure Transaction</div>
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="colors">
                  <span className="option-title">Available Colors:</span>
                  <div className="color-options">
                    {product.colors.map((colorVariant, index) => {
                      const colorCode = colorVariant.code || "";
                      const isWhite =
                        colorCode.toLowerCase() === "#ffffff" ||
                        colorCode.toLowerCase() === "white";

                      return (
                        <div
                          key={index}
                          className={`color-circle ${
                            selectedColor === colorVariant.name ? "active" : ""
                          } ${isWhite ? "white-border" : ""}`}
                          style={{ backgroundColor: colorCode }}
                          onClick={() => {
                            setSelectedImage(colorVariant.image);
                            setSelectedColor(colorVariant.name);
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="sizes">
                  <span className="option-title">Available Sizes:</span>
                  <div className="size-options">
                    {product.sizes.map((size, index) => (
                      <div
                        key={index}
                        className={`size-box ${selectedSize === size ? "active" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="actions">
                <button className="add-to-cart" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="buy-now" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* EXTRA SECTION */}
          <div className="product-extra-section">
            <div className="description-card">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="details-card">
              <h3>Product Details</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Gender:</td>
                    <td>{product.gender}</td>
                  </tr>
                  <tr>
                    <td>Fabric:</td>
                    <td>{product.fabric}</td>
                  </tr>
                  <tr>
                    <td>Net Quantity:</td>
                    <td>{product.netQuantity}</td>
                  </tr>
                  <tr>
                    <td>Country of Origin:</td>
                    <td>{product.countryOfOrigin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* WHY CHOOSE SECTION */}
          <div className="why-choose">
            <h3>Why Choose This {product.name || "Product"}?</h3>

            <div className="features">
              <div className="feature">
                <div className="icon blue">👕</div>
                <h4>Premium Quality</h4>
                <p>
                  Made from high-quality {product.fabric} fabric for comfort and durability.
                </p>
              </div>
              <div className="feature">
                <div className="icon green">📏</div>
                <h4>Perfect Fit</h4>
                <p>Slim-fit design tailored for professional appearance and comfort.</p>
              </div>
              <div className="feature">
                <div className="icon purple">🏅</div>
                <h4>Versatile Style</h4>
                <p>Suitable for office wear, meetings, and formal occasions.</p>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="reviews-section" ref={reviewsRef}>
            <h3>Customer Reviews</h3>

            {/* Rating Summary */}
            <div className="rating-summary">
              <div className="avg-rating">
                <span className="avg-score">{averageRating.toFixed(1)}</span>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fa-star ${
                        star <= Math.round(averageRating) ? "fas" : "far"
                      }`}
                    ></i>
                  ))}
                </div>
                <p>{reviews.length} Reviews</p>
              </div>

              <div className="rating-distribution">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const percent = (count / reviews.length) * 100 || 0;
                  return (
                    <div key={star} className="rating-bar">
                      <span>{star} ★</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter & Sort */}
            <div className="review-controls">
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Reviews</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
                <option value="photos">With Photos</option>
              </select>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="high">Highest Rated</option>
                <option value="low">Lowest Rated</option>
              </select>
            </div>

            {/* Write Review */}
            <div className="review-form">
                <h3> Write a Review</h3>
              <label><h4>Your Rating</h4></label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa-star ${star <= rating ? "fas selected" : "far"}`}
                    onClick={() => setRating(star)}
                  ></i>
                ))}
              </div>

              <input
                type="text"
                placeholder="Review Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <input type="file" accept="image/*" onChange={handlePhotoUpload} />

              <button onClick={handleSubmitReview}>Submit Review</button>
            </div>

            {/* Reviews Grid */}
<div className="review-list">
  {filteredReviews.length === 0 ? (
    <p>No reviews yet. Be the first!</p>
  ) : (
    filteredReviews.map((rev, index) => (
      <div key={index} className="review-card">
        <div className="review-header">
          <img
            src={rev.profilePic || "/default-avatar.png"}
            alt={rev.name}
            className="profile-pic"
          />
          <div className="review-meta">
            <div className="reviewer-name">{rev.name}</div>
            <div className="review-stars-time">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa-star ${star <= rev.rating ? "fas" : "far"}`}
                  ></i>
                ))}
              </div>
              <span className="time">
                {rev.date ? new Date(rev.date).toLocaleDateString() : "recently"}
              </span>
            </div>
          </div>
        </div>

        <h4 className="review-title">{rev.title}</h4>
        <p className="review-text">{rev.comment}</p>

        {rev.photo && (
          <div className="review-photos">
            <img src={rev.photo} alt="review" />
          </div>
        )}

        {rev.verified && (
          <span className="verified">✔ Verified Purchase</span>
        )}
      </div>
    ))
  )}
 </div>
   </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
