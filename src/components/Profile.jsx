import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Navbar from "./Navbar";
import { useUser } from "./UserContext";
import { useCart } from "./CartContext"; // ✅ import orders

const Profile = () => {
  const navigate = useNavigate();

  // Grab data & methods from contexts
  const { user, setUser, addresses, addAddress, updateAddress, deleteAddress } = useUser();
  const { orders } = useCart(); // ✅ get orders list

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [editingAddress, setEditingAddress] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    type: "Home",
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [emailData, setEmailData] = useState({
    email: user?.email || "",
  });

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Open modal
  const openModal = (type, address = null) => {
    setModalType(type);

    if (type === "address") {
      if (address) {
        setEditingAddress(address.id);
        setFormData({ ...address });
      } else {
        setEditingAddress(null);
        setFormData({
          name: "",
          phone: "",
          pincode: "",
          address: "",
          city: "",
          state: "",
          type: "Home",
        });
      }
    }

    if (type === "profile") {
      setProfileData({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }

    if (type === "password") {
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }

    if (type === "email") {
      setEmailData({ email: user.email });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  // Save address
  const handleSaveAddress = () => {
    if (!formData.name || !formData.phone || !formData.pincode || !formData.address || !formData.city || !formData.state) {
      alert("Please fill all fields");
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress, formData);
    } else {
      addAddress({ ...formData });
    }
    closeModal();
  };

  // Save profile
  const handleSaveProfile = () => {
    setUser((prev) => ({
      ...prev,
      name: profileData.name,
      phone: profileData.phone,
      email: profileData.email,
    }));
    closeModal();
  };

  // Save password (demo only)
  const handleSavePassword = () => {
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully (demo)");
    closeModal();
  };

  // Save email
  const handleSaveEmail = () => {
    if (!emailData.email) {
      alert("Please enter an email");
      return;
    }
    setUser((prev) => ({ ...prev, email: emailData.email }));
    closeModal();
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>

        {/* User Info */}
        <div className="profile-card">
          <h3>User Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button className="primary-btn" onClick={() => openModal("profile")}>Edit Profile</button>
        </div>

        {/* Addresses */}
        <div className="profile-card">
          <h3>My Addresses</h3>
          {addresses.map((addr) => (
            <div key={addr.id} className="address-box">
              <div>
                <h4>{addr.type} Address</h4>
                <p>{addr.name}, {addr.phone}</p>
                <p>{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
              <div className="address-actions">
                <button className="secondary-btn" onClick={() => openModal("address", addr)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => deleteAddress(addr.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
          <button className="primary-btn" onClick={() => openModal("address")}>+ Add New Address</button>
        </div>

        {/* Orders */}
        <div className="profile-card">
          <h3>My Orders</h3>
          {orders && orders.length > 0 ? (
            <>
              <ul className="order-list">
                {orders.slice(0, 3).map((order) => (
                  <li key={order.id} className="order-item">
                    <p><strong>Order #{order.id}</strong></p>
                    <p>{order.date}</p>
                    <p>Total: ₹{order.total}</p>
                  </li>
                ))}
              </ul>
              <button className="primary-btn" onClick={() => navigate("/orders")}>
                View All Orders
              </button>
            </>
          ) : (
            <>
              <p>You haven’t placed any orders yet.</p>
              <button className="primary-btn" onClick={() => navigate("/orders")}>
                View Orders
              </button>
            </>
          )}
        </div>

        {/* Settings */}
        <div className="profile-card">
          <h3>Account Settings</h3>
          <button className="secondary-btn" onClick={() => openModal("password")}>Change Password</button>
          <button className="secondary-btn" onClick={() => openModal("email")}>Update Email</button>
        </div>

        {/* Logout */}
        <div className="profile-card logout-card">
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              {/* Address Modal */}
              {modalType === "address" && (
                <>
                  <h3>{editingAddress ? "Edit Address" : "Add New Address"}</h3>
                  <input type="text" placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input type="text" placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <input type="text" placeholder="Pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                  <textarea placeholder="Address (House No, Road, Area)"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <input type="text" placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  <input type="text" placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                  <div className="address-type">
                    <label>
                      <input type="radio" name="type" value="Home"
                        checked={formData.type === "Home"}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      /> Home
                    </label>
                    <label>
                      <input type="radio" name="type" value="Work"
                        checked={formData.type === "Work"}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      /> Work
                    </label>
                  </div>
                  <div className="modal-actions">
                    <button className="primary-btn" onClick={handleSaveAddress}>Save</button>
                    <button className="secondary-btn" onClick={closeModal}>Cancel</button>
                  </div>
                </>
              )}

              {/* Profile Modal */}
              {modalType === "profile" && (
                <>
                  <h3>Edit Profile</h3>
                  <input type="text" placeholder="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                  <input type="text" placeholder="Phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                  <input type="email" placeholder="Email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                  <div className="modal-actions">
                    <button className="primary-btn" onClick={handleSaveProfile}>Save</button>
                    <button className="secondary-btn" onClick={closeModal}>Cancel</button>
                  </div>
                </>
              )}

              {/* Password Modal */}
              {modalType === "password" && (
                <>
                  <h3>Change Password</h3>
                  <input type="password" placeholder="Old Password"
                    value={passwordData.oldPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                  />
                  <input type="password" placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                  <input type="password" placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                  <div className="modal-actions">
                    <button className="primary-btn" onClick={handleSavePassword}>Save</button>
                    <button className="secondary-btn" onClick={closeModal}>Cancel</button>
                  </div>
                </>
              )}

              {/* Email Modal */}
              {modalType === "email" && (
                <>
                  <h3>Update Email</h3>
                  <input type="email" placeholder="New Email"
                    value={emailData.email}
                    onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                  />
                  <div className="modal-actions">
                    <button className="primary-btn" onClick={handleSaveEmail}>Save</button>
                    <button className="secondary-btn" onClick={closeModal}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
