import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/order");
        const list = Array.isArray(res.data?.orders) ? res.data.orders : [];
        setOrders(list);
      } catch (e) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const summaryRows = useMemo(() => {
    return orders.map((o) => ({
      _id: o._id,
      orderNumber: o._id?.slice(-6) || "-",
      orderDate: new Date(o.createdAt).toLocaleDateString(),
      customer: o.user?.name || "-",
      status: o.orderStatus,
      total: `₹${Number(o.orderTotal || 0).toLocaleString("en-IN")}`,
    }));
  }, [orders]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/order/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      if (selectedOrder?._id === id) setSelectedOrder(null);
    } catch (e) {
      alert("Failed to delete order");
    }
  };

  const updateOrder = async (id, updates) => {
    try {
      setSaving(true);
      const res = await axios.put(`http://localhost:5000/api/order/${id}`, updates);
      const updated = res.data?.order;
      if (updated) {
        setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
        setSelectedOrder((prev) => (prev?._id === id ? updated : prev));
      }
    } catch (e) {
      alert("Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      {!selectedOrder ? (
        <>
          <h2>🧾 Orders</h2>
          <p>Manage and track all customer orders.</p>
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Order Date</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {summaryRows.map((o) => (
                  <tr key={o._id}>
                    <td>{o.orderNumber}</td>
                    <td>{o.orderDate}</td>
                    <td>{o.customer}</td>
                    <td>{o.status}</td>
                    <td>{o.total}</td>
                    <td>
                      <button className="btn-small" onClick={() => setSelectedOrder(orders.find(ord => ord._id === o._id))}>
                        Details
                      </button>
                      <button className="btn-small btn-delete" onClick={() => handleDelete(o._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <>
          <h2>Order Details – #{selectedOrder._id?.slice(-6)}</h2>
          <p><strong>Customer:</strong> {selectedOrder.user?.name || '-'}</p>
          <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
          <p><strong>Payment:</strong> {selectedOrder.paymentStatus}</p>
          <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
          <p><strong>Total:</strong> ₹{Number(selectedOrder.orderTotal || 0).toLocaleString('en-IN')}</p>

          <h3>Items</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {(selectedOrder.items || []).map((it, idx) => (
                <tr key={idx}>
                  <td>{it.product?.name || '-'}</td>
                  <td>{it.quantity}</td>
                  <td>₹{Number(it.price || 0).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <select
              value={selectedOrder.orderStatus}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={selectedOrder.paymentStatus}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>
            <button
              className="btn-primary"
              disabled={saving}
              onClick={() => updateOrder(selectedOrder._id, {
                orderStatus: selectedOrder.orderStatus,
                paymentStatus: selectedOrder.paymentStatus,
              })}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button className="btn-small btn-cancel" onClick={() => setSelectedOrder(null)}>
              Back to Orders
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Orders;
