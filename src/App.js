import React, { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
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

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from './components/admin/AdminRegister';
import AdminForgotPassword  from './components/admin/AdminForgotPassword';

import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCart } from "./components/CartContext";
import { Routes, Route, Navigate } from "react-router-dom";

import PasswordReset from "./components/PasswordReset";

// ✅ AppRoutes for routing
function AppRoutes({ isAdminLoggedIn, handleAdminLogin, handleAdminLogout }) {
  const { addToCart, addToWishlist } = useCart();

  return (
    <>
     {/* Show Navbar only for non-admin */}
      {!isAdminLoggedIn && <Navbar />}
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<PasswordReset />} />

        {/* Wishlist & Cart */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Orders Page */}
          <Route path="/orders" element={<Orders />} />
          
        <Route path="/profile" element={<ProfilePage />} />

        {/* Products */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Other product browsing pages */}
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

        {/* Admin routes */}
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
              <AdminDashboard onLogout={handleAdminLogout} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/forgotpassword" element={<AdminForgotPassword />} />
      
      </Routes>
       {/* Footer always visible */}
      <Footer />

      {/* Global Toast Container */}
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

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("isAdmin", "true");
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <AppRoutes
      isAdminLoggedIn={isAdminLoggedIn}
      handleAdminLogin={handleAdminLogin}
      handleAdminLogout={handleAdminLogout}
    />
  );
}

export default App;
