
import React, { useState } from 'react';
import './AdminDashboard.css';

import Dashboard from './Sections/Dashboard';
import Orders from './Sections/Orders';
import Products from './Sections/Products';
import Categories from './Sections/Categories';
import Customers from './Sections/Customers';
import Inventory from './Sections/Inventory';
import Reviews from './Sections/Reviews';
import Reports from './Sections/Reports';
import Settings from './Sections/Settings';

function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('Dashboard');

  // --- STATE ARRAYS ---
  const [orders] = useState([
   { orderNumber: "1001", poNumber: "PO-501", orderDate: "2025-08-10", customer: "John Doe", status: "Pending Acceptance", total: "₹3,200" },
    { orderNumber: "1002", poNumber: "PO-502", orderDate: "2025-08-11", customer: "Jane Smith", status: "Shipped", total: "₹7,500" },
    { orderNumber: "1003", poNumber: "PO-503", orderDate: "2025-08-12", customer: "Venishetti Sangeetha", status: "Backordered", total: "₹1,150" },
    { orderNumber: "1004", poNumber: "PO-504", orderDate: "2025-08-13", customer: "Alice Brown", status: "Processing", total: "₹4,000" },
    { orderNumber: "1005", poNumber: "PO-505", orderDate: "2025-08-14", customer: "Charlie Davis", status: "Delivered", total: "₹2,000" },
    { orderNumber: "1006", poNumber: "PO-506", orderDate: "2025-08-15", customer: "Surya", status: "Processing", total: "₹6,000" },
    { orderNumber: "1007", poNumber: "PO-507", orderDate: "2025-08-16", customer: "Akhila", status: "On the way", total: "₹7,000" },
    { orderNumber: "1008", poNumber: "PO-508", orderDate: "2025-08-19", customer: "Lahari", status: "Processing", total: "₹4,000" },
    { orderNumber: "1009", poNumber: "PO-509", orderDate: "2025-08-25", customer: "Mokkapati Sampath", status: "Shipped", total: "₹5,500" },
  ]);
  
  const [customers] = useState([
    { id: 1, name: 'Keerthi', email: 'keerthi123@gmail.com', phone: '9876543210' },
    { id: 2, name: 'Surya', email: 'surya912@gmail.com', phone: '9123456780' },
    { id: 3, name: 'Minni raj', email: 'minniraj@gmail.com', phone: '9988776655' },
    { id: 4, name: 'Sherya', email: 'sherya34@gmail.com', phone: '9000000010' },
    { id: 5, name: 'Deepika', email: 'deepika@gmail.com', phone: '9000000011' },
    { id: 6, name: 'Nikitha', email: 'nikitha@gmail.com', phone: '6376547890' },
    { id: 7, name: 'Malika', email: 'malika345@gmail.com', phone: '9943215679' },
    { id: 8, name: 'Koushik', email: 'koushik@gmail.com', phone: '9001234567' },
    { id: 9, name: 'Venkat', email: 'venkat@gmail.com', phone: '9988001122' },
  ]);

  const [inventory] = useState([
   { product: 'Kids Frocks', stock: 60, reorderLevel: 10 },
  { product: "Men's Kurta", stock: 50, reorderLevel: 20 },
  { product: "Women's Traditional Wear", stock: 15, reorderLevel: 20 },
  { product: 'Kids Jeans', stock: 40, reorderLevel: 20 },
  { product: 'Evening Gown', stock: 0, reorderLevel: 10 },    
  { product: 'Kids jeans', stock: 0, reorderLevel: 10 },
  { product: "Women's Kurta Sets", stock: 50, reorderLevel: 20 },
  { product: "Men's Shirts", stock: 0, reorderLevel: 10 },
]);

  // --- LOGOUT ---
  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  // --- RENDER SECTIONS ---
  const renderSection = () => {
    switch(activeSection) {
      case 'Dashboard': 
        return <Dashboard orders={orders} customers={customers} inventory={inventory} revenue="₹1,25,000" />;
      case 'Orders': return <Orders />;
      case 'Products': return <Products />;
      case 'Categories': return <Categories />;
      case 'Customers': return <Customers />;
      case 'Inventory': return <Inventory />;
      case 'Reviews': return <Reviews />;
      case 'Reports': return <Reports />;
      case 'Settings': return <Settings />;
      default: return <section><h2>Section Not Found</h2></section>;
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="logo">🛍 TEN Clothing Admin</h2>
        <ul className="admin-menu">
          {['Dashboard','Orders','Products','Categories','Customers','Inventory','Reviews','Reports','Settings'].map(item => (
            <li key={item} onClick={() => setActiveSection(item)} className={activeSection === item ? 'active' : ''}>
              {item}
            </li>
          ))}
          <li onClick={handleLogoutClick} className="logout">Logout</li>
        </ul>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          {!(activeSection === 'Categories' || activeSection === 'Settings') && (
            <input type="text" placeholder="Search products, orders..." />
          )}
          <div className="admin-user">
            <span>admin@clothing.com</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>
        {renderSection()}
      </main>
    </div>
  );
}

export default AdminDashboard;
