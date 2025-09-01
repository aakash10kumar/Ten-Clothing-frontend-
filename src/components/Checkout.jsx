import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "./Checkout.css";
import GPay from "../assets/gpay.jpeg"
import Phonepe from "../assets/phonepe.png"
import Paytm from "../assets/paytm.jpeg"

const Checkout = () => {
  const { cart, removeFromCart, placeOrder } = useCart();
  const { addresses } = useUser();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length > 0 ? addresses[0].id : null
  );
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [showQRCode, setShowQRCode] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [showUPIInput, setShowUPIInput] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const discountedPrice = totalPrice - 21;

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Countdown timer for QR
  useEffect(() => {
    if (!showQRCode || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [showQRCode, timeLeft]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.warning("⚠️ Please select an address before placing the order.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (selectedPayment === "ONLINE" && !upiId) {
      toast.error("Please enter your UPI ID to proceed.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: selectedPayment === "ONLINE" ? discountedPrice : totalPrice,
      address: addresses.find((addr) => addr.id === selectedAddress) || {},
      payment: selectedPayment,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    placeOrder(newOrder);
    toast.success("✅ Your order has been placed!");
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your Checkout is Empty</h2>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        {/* Left Column */}
        <div className="checkout-left">
          {/* Delivery Address */}
          <div className="checkout-section">
            <h3>Delivery Address</h3>
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`address-card ${
                    selectedAddress === addr.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAddress(addr.id)}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                  />
                  <div>
                    <p className="name">
                      {addr.name} <span>({addr.type})</span>
                    </p>
                    <p>
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p>📞 {addr.phone}</p>
                  </div>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/profile");
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p>No saved addresses. Please add one in Profile.</p>
            )}
            <button
              type="button"
              className="add-address-btn"
              onClick={() => navigate("/profile")}
            >
              + Add New Address
            </button>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <h3>Select Payment Method</h3>

            {/* COD */}
            <div
              className={`payment-card ${
                selectedPayment === "COD" ? "selected" : ""
              }`}
              onClick={() => setSelectedPayment("COD")}
            >
              <div className="payment-row">
                <p className="price">₹{totalPrice}</p>
                <p className="payment-title"> <i className="fa-solid fa-truck"></i>Cash on Delivery</p>
              </div>
              <div className="radio-circle">
                {selectedPayment === "COD" && <span className="checked"></span>}
              </div>
            </div>

            {/* ONLINE */}
        <div
  className={`payment-card ${
    selectedPayment === "ONLINE" ? "selected" : ""
  }`}
  onClick={() => setSelectedPayment("ONLINE")}
>
  <div className="payment-row">
    <p className="original-price">₹{totalPrice}</p>
    <p className="discounted-price">₹{discountedPrice}</p>
    <p className="save-text">Save ₹21</p>
    <p className="payment-title"> <i className="fa-solid fa-credit-card"></i>Pay Online</p>
  </div>
  <div className="radio-circle">
    {selectedPayment === "ONLINE" && <span className="checked"></span>}
  </div>
</div>

{/* 👉 Separate UPI / QR Section (only visible when ONLINE selected) */}
{selectedPayment === "ONLINE" && (
  <div className="upi-card">
    <h4 className="upi-title">Scan & Pay</h4>

    {/* UPI Icons */}
    <div className="upi-icons">
      <img src={GPay} alt="Google Pay" />
      <img src={Phonepe} alt="PhonePe" />
      <img src={Paytm} alt="Paytm" />
    </div>

    {/* QR + Timer */}
    {showQRCode ? (
      <>
        <div className="qr-wrapper">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=ShopName&am=103"
            alt="UPI QR"
            className="qr-image"
          />
        </div>
        <p className="qr-timer">
          QR Code is valid for{" "}
          <span className="highlight">{formatTime(timeLeft)}</span> minutes
        </p>
      </>
    ) : (
      <button
        type="button"
        className="view-qr-btn"
        onClick={(e) => {
          e.stopPropagation();
          setShowQRCode(true);
        }}
      >
        View QR Code
      </button>
    )}

    {/* Add UPI ID toggle */}
    <div
      className="add-upi"
      onClick={(e) => {
        e.stopPropagation();
        setShowUPIInput((prev) => !prev);
      }}
    >
      {showUPIInput ? "− HIDE UPI ID" : "+ ADD UPI ID"}
    </div>

    {/* Input */}
    {showUPIInput && (
      <div className="upi-input fade-in">
        <input
          id="upiId"
          type="text"
          placeholder="example@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />
        <button className="upi-submit">Verify</button>
      </div>
    )}
  </div>
)}

          </div>

          {/* Order Items */}
          <div className="checkout-section">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price} × {item.quantity || 1}
                  </p>
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.info(`${item.name} removed from cart`);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="checkout-right">
          <div className="price-summary">
            <h3>Price Details</h3>
            <p>
              Price ({cart.length} items) <span>₹{totalPrice}</span>
            </p>
            <p>
              Discount <span className="discount">-₹150</span>
            </p>
            <p>
              Delivery Charges <span className="free">FREE</span>
            </p>
            <hr />
            <h2>
              Total Amount{" "}
              <span>
                ₹
                {selectedPayment === "ONLINE"
                  ? discountedPrice
                  : totalPrice - 150}
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="place-order-btn"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
