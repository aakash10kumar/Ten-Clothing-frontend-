import React from 'react';

function Dashboard({ orders = [], customers = [], inventory = [], revenue = '₹1,25,000' }) {
  
  const safeInventory = Array.isArray(inventory) ? inventory : [];

  return (
    <section className="dashboard-overview">
      <h1>Welcome to TEN Clothing Admin 👋</h1>
      <p>Here's a quick summary of your store's performance today.</p>

      <div className="dashboard-cards centered">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{Array.isArray(orders) ? orders.length : 0}</p>
        </div>
        <div className="card">
          <h3>Revenue</h3>
          <p>{revenue}</p>
        </div>
        <div className="card">
          <h3>New Customers</h3>
          <p>{Array.isArray(customers) ? customers.length : 0}</p>
        </div>
        <div className="card">
          <h3>Out of Stock</h3>
          <p>{safeInventory.filter(item => item.stock <= item.reorderLevel).length} Items</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
