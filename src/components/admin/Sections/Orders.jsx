import React, { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
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

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancel = (orderNumber) => {
    setOrders((prev) => prev.filter((o) => o.orderNumber !== orderNumber));
  };

  return (
    <section>
      {!selectedOrder ? (
        <>
          <h2>🧾 Orders</h2>
          <p>Manage and track all customer orders.</p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>PO Number</th>
                <th>Order Date</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.orderNumber}>
                  <td>{o.orderNumber}</td>
                  <td>{o.poNumber}</td>
                  <td>{o.orderDate}</td>
                  <td>{o.customer}</td>
                  <td>{o.status}</td>
                  <td>{o.total}</td>
                  <td>
                    <button className="btn-small" onClick={() => setSelectedOrder(o)}>
                      Details
                    </button>
                    <button
                      className="btn-small btn-cancel"
                      onClick={() => handleCancel(o.orderNumber)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2>Order Details – #{selectedOrder.orderNumber}</h2>
          <p>
            <strong>PO Number:</strong> {selectedOrder.poNumber}
          </p>
          <p>
            <strong>Order Date:</strong> {selectedOrder.orderDate}
          </p>
          <p>
            <strong>Customer:</strong> {selectedOrder.customer}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.status}
          </p>
          <p>
            <strong>Total:</strong> {selectedOrder.total}
          </p>
          <button className="btn-primary" onClick={() => setSelectedOrder(null)}>
            Back to Orders
          </button>
        </>
      )}
    </section>
  );
}

export default Orders;
