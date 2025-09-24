import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function Dashboard({ orders = [], customers = [], inventory = [], revenue = '₹1,25,000' }) {
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/order'),
          axios.get('http://localhost:5000/api/products/products'),
        ]);
        setOrderList(Array.isArray(ordersRes.data?.orders) ? ordersRes.data.orders : []);
        setProductList(Array.isArray(productsRes.data?.data) ? productsRes.data.data : []);
      } catch (e) {
        setOrderList([]);
        setProductList([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const outOfStockCount = useMemo(() => {
    return productList.filter(p => Number(p.netQuantity || 0) <= Number(p.reorderLevel || 10)).length;
  }, [productList]);

  const computedRevenue = useMemo(() => {
    // Sum of orderTotal for Paid orders
    const total = orderList
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, o) => sum + Number(o.orderTotal || 0), 0);
    return total;
  }, [orderList]);

  return (
    <section className="dashboard-overview">
      <h1>Welcome to TEN Clothing Admin 👋</h1>
      <p>Here's a quick summary of your store's performance today.</p>

      <div className="dashboard-cards centered">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{loading ? '...' : orderList.length}</p>
        </div>
        <div className="card">
          <h3>Revenue</h3>
          <p>{loading ? '...' : `₹${computedRevenue.toLocaleString('en-IN')}`}</p>
        </div>
        <div className="card">
          <h3>New Customers</h3>
          <p>{Array.isArray(customers) ? customers.length : 0}</p>
        </div>
        <div className="card">
          <h3>Out of Stock</h3>
          <p>{loading ? '...' : `${outOfStockCount} Items`}</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
