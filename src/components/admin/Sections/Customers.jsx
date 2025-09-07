import React, { useState } from "react";


function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543211" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", phone: "9876543212" },
    { id: 4, name: "Charlie Davis", email: "charlie@example.com", phone: "9876543213" },
    { id: 5, name: "Sangeetha Venishetti", email: "sangeetha@example.com", phone: "9876543214" },
    { id: 6, name: "Surya", email: "surya@example.com", phone: "9876543215" },
    { id: 7, name: "Akhila", email: "akhila@example.com", phone: "9876543216" },
    { id: 8, name: "Lahari", email: "lahari@example.com", phone: "9876543217" },
    { id: 9, name: "Mokkapati Sampath", email: "sampath@example.com", phone: "9876543218" },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleDelete = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section>
      {!selectedCustomer ? (
        <>
          <h2>👥 Customers</h2>
          <p>Manage customer records.</p>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button
                      className="btn-small"
                      onClick={() => setSelectedCustomer(c)}
                    >
                      Details
                    </button>
                    <button
                      className="btn-small btn-cancel"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
    
    <h2>Customer Details</h2>
    <p>
      <strong>Name:</strong> {selectedCustomer.name}
    </p>
    <p>
      <strong>Email:</strong> {selectedCustomer.email}
    </p>
    <p>
      <strong>Phone:</strong> {selectedCustomer.phone}
    </p>
    <button className="btn-primary" onClick={() => setSelectedCustomer(null)}>
      Back to Customers
    </button>
  </>
)}

    
    </section>
  );
}

export default Customers;
