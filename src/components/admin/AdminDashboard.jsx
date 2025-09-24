import React, { useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import { useEffect } from "react";
import Dashboard from "./Sections/Dashboard";
import Orders from "./Sections/Orders";
import Products from "./Sections/Products";
import Categories from "./Sections/Categories";
import Customers from "./Sections/Customers";
import Inventory from "./Sections/Inventory";
import Reviews from "./Sections/Reviews";
import Reports from "./Sections/Reports";
import Settings from "./Sections/Settings";

function AdminDashboard({ adminEmail, onLogout }) {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [customersData, setCustomersData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews/all"); // all reviews
        setReviewsData(res.data.data || []); // make sure API returns { data: [...] }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
        setReviewsData([]);
      }
    };
    fetchReviews();
  }, []);

  // Sample data
  const [orders] = useState([
    {
      orderNumber: "1001",
      customer: "John Doe",
      status: "Pending",
      total: "₹3,200",
    },
    {
      orderNumber: "1002",
      customer: "Jane Smith",
      status: "Shipped",
      total: "₹7,500",
    },
  ]);

  const [customers] = useState([
    { id: 1, name: "Keerthi", email: "keerthi@gmail.com" },
    { id: 2, name: "Surya", email: "surya@gmail.com" },
  ]);

  const [inventory] = useState([
    { product: "Men's Kurta", stock: 50 },
    { product: "Kids Frocks", stock: 60 },
  ]);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all"); // or your API endpoint
        setCustomersData(res.data.users || []); // Make sure your API returns { users: [...] }
      } catch (err) {
        console.error("Failed to fetch customers", err);
        setCustomersData([]);
      }
    };

    fetchCustomers();
  }, []);

  // Logout confirmation
  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
    }
  };

  // Render sections
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <Dashboard
            orders={orders}
            customers={customers}
            inventory={inventory}
            revenue="₹1,25,000"
          />
        );
      case "Orders":
        return <Orders />;
      case "Products":
        return <Products />;
      case "Categories":
        return <Categories />;
      case "Customers":
        return <Customers customersData={customersData} />;
      case "Inventory":
        return <Inventory />;
      case "Reviews":
        return <Reviews reviewsData={reviewsData} />;
      case "Reports":
        return <Reports />;
      case "Settings":
        return <Settings />;
      default:
        return (
          <section>
            <h2>Section Not Found</h2>
          </section>
        );
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="logo">🛍 TEN Clothing Admin</h2>
        <ul className="admin-menu">
          {[
            "Dashboard",
            "Orders",
            "Products",
            "Categories",
            "Customers",
            "Inventory",
            "Reviews",
            "Reports",
            "Settings",
          ].map((item) => (
            <li
              key={item}
              onClick={() => setActiveSection(item)}
              className={activeSection === item ? "active" : ""}
            >
              {item}
            </li>
          ))}
          <li onClick={handleLogoutClick} className="logout">
            Logout
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          {!(
            activeSection === "Categories" || activeSection === "Settings"
          ) && <input type="text" placeholder="Search products, orders..." />}
          <div className="admin-user">
            {/* Show admin email */}
            <span>{adminEmail ?? "Admin"}</span>

            {/* Avatar: first letter of email */}
            <div className="admin-avatar">
              {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {renderSection()}
      </main>
    </div>
  );
}

export default AdminDashboard;
