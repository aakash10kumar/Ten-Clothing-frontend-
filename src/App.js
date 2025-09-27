import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Checkout from "./components/Checkout";
import ProfilePage from "./components/Profile";
import CategoryPage from "./components/CategoryPage";
import SubCategoryPage from "./components/SubCategoryPage";
import AllProductsPage from "./components/AllProductsPage";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import AdminForgotPassword from "./components/admin/AdminForgotPassword";

// Context
import { useCart } from "./components/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { addToCart, addToWishlist } = useCart();
const [adminEmail, setAdminEmail] = useState(null);

const handleAdminLogin = (email) => {
  // Accept any type, but check for null/undefined
  if (email != null) {
    setAdminEmail(email); 
    setIsAdminLoggedIn(true);
  } else {
    console.error("Admin email is missing!");
  }
};




  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <>
      {/* Show Navbar only for non-admin users */}
      {!isAdminLoggedIn && <Navbar />}

      <Routes>
        {/* ----- User Routes ----- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/all-products" element={<AllProductsPage />} />

        <Route
          path="/category/:category/:subcategory"
          element={
            <SubCategoryPage
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          }
        />
        <Route
          path="/:category/:subcategory"
          element={
            <CategoryPage
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          }
        />
        <Route
          path="/:category"
          element={
            <CategoryPage
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          }
        />

        {/* ----- Admin Routes ----- */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAdminLoggedIn ? (
              <AdminDashboard 
               adminEmail={adminEmail} 
              onLogout={handleAdminLogout} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/forgotpassword" element={<AdminForgotPassword />} />
      </Routes>

      {/* Footer is always visible */}
      {!isAdminLoggedIn && <Footer />}

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
