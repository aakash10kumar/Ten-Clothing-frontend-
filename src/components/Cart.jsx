import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import products from "./products";
import empty_cart from "../assets/empty_cart.jpeg";
import { toast } from "react-toastify"; // <-- import toast

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, updateCartItem, addToCart } = useCart();

  const [editItemId, setEditItemId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const navigate = useNavigate();

  const getDiscountedPrice = (item) =>
    item.discountPercentage
      ? Math.round(item.price * (1 - item.discountPercentage / 100))
      : item.price;

  const cartMRP = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const productDiscount = cart.reduce((sum, item) => {
    if (!item.discountPercentage) return sum;
    const perUnitOff = item.price - getDiscountedPrice(item);
    return sum + perUnitOff * item.quantity;
  }, 0);

  const subtotalAfterProductDiscount = cartMRP - productDiscount;

  useEffect(() => {
    if (couponApplied && couponCode.toLowerCase() === "ten10") {
      setCouponDiscount(Math.round(subtotalAfterProductDiscount * 0.1));
    } else {
      setCouponDiscount(0);
    }
  }, [couponApplied, couponCode, subtotalAfterProductDiscount]);

  const deliveryFee = 0;
  const totalPayable = Math.max(0, subtotalAfterProductDiscount - couponDiscount + deliveryFee);
  const totalSavings = productDiscount + couponDiscount;

  const handlePlaceOrder = () => navigate("/checkout");

  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "ten10") {
      setCouponApplied(true);
      toast.success("Coupon applied! You saved 10%", { autoClose: 1500 });
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
      toast.error("Invalid coupon code", { autoClose: 1500 });
    }
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="cart-container">
          <div className="login-required">
            <h2 className="login-title">PLEASE LOG IN</h2>
            <p className="login-subtitle">
              Login to view items in your cart.
            </p>
            <img
              src={empty_cart}
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
        </div>
      </>
    );
  }

  if (cart.length === 0) {
    const recommendations = products.slice(0, 3);

    return (
      <>
        <Navbar />
        <div className="empty-cart">
          <h2 className="empty-title">YOUR CART IS EMPTY</h2>
          <p className="empty-subtitle">
            Looks like you haven’t added anything to your cart yet. Browse our categories and discover the best deals for you!
          </p>
          <img src={empty_cart} alt="Empty Cart" className="empty-image" />
          <button className="continue-btn" onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </button>

          {/* Recommendations */}
          <div className="recommendations">
            <h3 className="recommend-title">You may also like</h3>
            <div className="recommend-grid">
              {recommendations.map((item) => {
                const dPrice = getDiscountedPrice(item);
                const hasDisc = !!item.discountPercentage;

                return (
                  <div key={item.id} className="recommend-card">
                    <img src={item.image} alt={item.name} />
                    <p className="rec-name">{item.name}</p>

                    {hasDisc ? (
                      <div className="rec-pricing">
                        <span className="rec-price">₹{dPrice}</span>
                        <span className="rec-oldprice">₹{item.price}</span>
                        <span className="rec-discount">{item.discountPercentage}% OFF</span>
                      </div>
                    ) : (
                      <span className="rec-price">₹{item.price}</span>
                    )}

                    <button
                      className="add-btn"
                      onClick={() => {
                        addToCart(item);
                        toast.success(`${item.name} added to cart`, { autoClose: 1500 });
                        navigate("/cart");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        {/* Left - Cart Items */}
        <div className="cart-left">
          {cart.map((item) => {
            const discountedPrice = getDiscountedPrice(item);
            const perUnitOff = item.price - discountedPrice;
            const hasDisc = !!item.discountPercentage;

            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <h3 className="product-name">{item.name}</h3>

                  {hasDisc ? (
                    <p className="product-price">
                      ₹{discountedPrice}{" "}
                      <span className="rec-oldprice">₹{item.price}</span>
                      <span
                        className="discount"
                        title={`₹${perUnitOff} off per item (${item.discountPercentage}% of ₹${item.price})`}
                      >
                        {item.discountPercentage}% OFF
                      </span>
                    </p>
                  ) : (
                    <p className="product-price">₹{item.price}</p>
                  )}

                   {/* ✅ Show selected Size & Color */}
                   {item.size && <p>Size: {item.size}</p>}
                    {item.color && <p>Color: {item.color}</p>}

                  <p className="product-seller">
                    Sold by: {item.seller || "Ten Store"} <span className="free-delivery">Free Delivery</span>
                  </p>
                  <p className="product-return">14 Days Return Policy</p>

                  <div className="cart-controls">
                    <div className="quantity-box">
                      <button
                        onClick={() => {
                          updateQuantity(item.id, Math.max(1, item.quantity - 1));
                          toast.info(`Quantity of ${item.name} decreased`);
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => {
                          updateQuantity(item.id, item.quantity + 1);
                          toast.info(`Quantity of ${item.name} increased`);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button className="edit-btn" onClick={() => setEditItemId(item.id)}>
                      Edit
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.error(`${item.name} removed from cart`, { autoClose: 1500 });
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  {editItemId === item.id && (
                    <div className="edit-section">
                      <label>
                        Size:
                        <select
                          value={item.size || "M"}
                          onChange={(e) =>
                            updateCartItem(item.id, { size: e.target.value })
                          }
                        >
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </select>
                      </label>

                      <label>
                        Color:
                        <select
                          value={item.color || "Black"}
                          onChange={(e) =>
                            updateCartItem(item.id, { color: e.target.value })
                          }
                        >
                          <option>Black</option>
                          <option>Blue</option>
                          <option>White</option>
                          <option>Red</option>
                        </select>
                      </label>

                      <button className="save-btn" onClick={() => setEditItemId(null)}>
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right - Summary */}
        <div className="cart-right">
          <div className="coupon-card">
            <h4>Apply Coupon</h4>
            <div className="coupon-input">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>
            {couponApplied && couponDiscount > 0 && (
              <p className="note">Coupon applied: TEN10 (You saved ₹{couponDiscount})</p>
            )}
          </div>

         

          <div className="price-card">
            <h4>Price Details ({cart.length} {cart.length === 1 ? "item" : "items"})</h4>
            <hr />
            <div className="price-row">
              <span>Total MRP</span>
              <span>₹{cartMRP}</span>
            </div>

            <div
              className="price-row"
              title={`Product discounts: ₹${productDiscount}${couponDiscount ? ` + Coupon: ₹${couponDiscount}` : ""}`}
            >
              <span>Discount on MRP</span>
              <span className="discount-amount">-₹{productDiscount}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="price-row">
                <span>Coupon Discount (TEN10)</span>
                <span className="discount-amount">-₹{couponDiscount}</span>
              </div>
            )}

            <div className="price-row">
              <span>Delivery</span>
              <span className="free-delivery">Free</span>
            </div>

            <hr />
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{totalPayable}</span>
            </div>

            <p className="note">You will save ₹{totalSavings} on this order</p>

            <button className="checkout-btn" onClick={handlePlaceOrder}>
             Go to CheckOut
            </button>
          </div>

          <div className="safety-msg">✅ Safe and Secure Payments • 100% Authentic Products</div>
        </div>
      </div>
    </>
  );
};

export default Cart;
