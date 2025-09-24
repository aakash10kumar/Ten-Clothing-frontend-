import React, { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [query, setQuery] = useState("");

  // Fetch all users from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all");
        if (res.data.success) {
          const users = res.data.users.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            phoneNumber: u.phoneNumber || "-", // ensure phone number is present
          }));
          setCustomers(users);
        } else {
          setCustomers([]);
        }
      } catch (err) {
        console.error("Failed to fetch customers", err);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Filter customers based on search query
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase()) ||
    String(c.phoneNumber).includes(query)
  );

  return (
    <section>
      {!selectedCustomer ? (
        <>
          <h2>👥 Customers</h2>
          <input
            type="text"
            placeholder="Search by name, email, phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: 320, width: "100%", margin: "8px 0" }}
          />
          {loading ? (
            <p>Loading customers...</p>
          ) : (
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
                {filteredCustomers.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phoneNumber}</td>
                    <td>
                      <button onClick={() => setSelectedCustomer(c)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <>
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> {selectedCustomer.name}</p>
          <p><strong>Email:</strong> {selectedCustomer.email}</p>
          <p><strong>Phone:</strong> {selectedCustomer.phoneNumber}</p>
          <button onClick={() => setSelectedCustomer(null)}>
            Back to Customers
          </button>
        </>
      )}
    </section>
  );
}

export default Customers;
