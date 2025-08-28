import React from "react";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import "./Orders.css";

const Orders = () => {
  const { orders } = useCart();

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <p>You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-item-details">
                        <p className="order-item-name">{item.name}</p>
                        <p className="order-item-qty">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="order-total">
                    Total: ₹{order.total}
                  </span>
                  <span className="order-status">Processing</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
