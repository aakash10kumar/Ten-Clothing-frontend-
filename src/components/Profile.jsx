import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useUser } from "./UserContext";
import { useCart } from "./CartContext";
import {
  User,
  Mail,
  Phone,
  ShoppingBag,
  Heart,
  Bell,
  LogOut,
  Edit,
} from "lucide-react";
import "./Profile.css";
import Avatar from "../assets/avatar.jpeg";
const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, addresses, addAddress, updateAddress, deleteAddress } = useUser();
  const { orders } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingAddress, setEditingAddress] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

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
      setProfileData({ name: user.name, phone: user.phone, email: user.email });
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

  const handleSaveProfile = () => {
    setUser((prev) => ({
      ...prev,
      name: profileData.name,
      phone: profileData.phone,
      email: profileData.email,
    }));
    closeModal();
  };

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
      <div className="profile-wrapper">
        <div className="profile-sidebar">
          <div className="profile-avatar">
        <img
          src={user?.avatar || Avatar } // default placeholder
          alt="Profile"
          className="avatar-img"
        />
        <button
    className="edit-avatar-btn"
    onClick={() => document.getElementById("avatarUpload").click()}
  >
    <Edit size={16} />
  </button>

  {/* Hidden file input */}
  <input
    type="file"
    id="avatarUpload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setUser((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file); // convert to base64 so you can preview immediately
      }
    }}
  />
</div>

          <h3 className="profile-name">{user?.name}</h3>
          

          <div className="sidebar-menu">
            <button className="sidebar-btn"><User size={18}/> Profile</button>
            <button className="sidebar-btn"onClick={() => navigate("/orders")}><ShoppingBag size={18}/> Orders</button>
            <button className="sidebar-btn" onClick={() => navigate("/wishlist")}><Heart size={18}/> Wishlist</button>
            <button className="sidebar-btn"><Bell size={18}/> Notifications</button>
            
            <button className="sidebar-btn logout-btn" onClick={handleLogout}>
              <LogOut size={18}/> Logout
            </button>
          </div>
        </div>

        <div className="profile-content">
          {/* User Info */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Personal Information</h3>
              <button className="secondary-btn" onClick={() => openModal("profile")}>
                <Edit size={16}/> Edit
              </button>
            </div>
            <p><Mail size={16}/> {user?.email}</p>
            <p><Phone size={16}/> {user?.phone}</p>
           
           
          </div>

          {/* Orders */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Recent Orders</h3>
            </div>
            {orders && orders.length > 0 ? (
              <>
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="order-card">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <p>{order.date}</p>
                    </div>
                    <div className="order-right">
                      <p>₹{order.total}</p>
                      <span className="status-badge">Delivered</span>
                    </div>
                  </div>
                ))}
                <button className="primary-btn" onClick={() => navigate("/orders")}>
                  View All Orders
                </button>
              </>
            ) : (
              <p>No orders yet.</p>
            )}
          </div>

          {/* Addresses */}
          <div className="profile-card">
            <div className="card-header">
              <h3>My Addresses</h3>
              <button className="primary-btn" onClick={() => openModal("address")}>
                + Add Address
              </button>
            </div>
            {addresses.map((addr) => (
              <div key={addr.id} className="address-card">
                <p><strong>{addr.type}:</strong> {addr.address}, {addr.city}, {addr.state}</p>
                <div className="address-actions">
                  <button className="secondary-btn" onClick={() => openModal("address", addr)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => deleteAddress(addr.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="profile-card">
            <h3>Account Settings</h3>
            <button className="secondary-btn" onClick={() => openModal("password")}>Change Password</button>
            <button className="secondary-btn" onClick={() => openModal("email")}>Update Email</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* Modal */}
{showModal && (
  <div className="modal-overlay">
    <div className="modal">
      {/* Profile Modal */}
      {modalType === "profile" && (
        <>
          <h3>Edit Profile</h3>
          <input
            type="text"
            placeholder="Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
          <div className="modal-actions">
            <button className="primary-btn" onClick={handleSaveProfile}>Save</button>
            <button className="secondary-btn" onClick={closeModal}>Cancel</button>
          </div>
        </>
      )}

      {/* Address Modal */}
      {modalType === "address" && (
        <>
          <h3>{editingAddress ? "Edit Address" : "Add Address"}</h3>
          <input type="text" placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input type="text" placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <input type="text" placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />
          <textarea placeholder="Address"
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
          <div className="modal-actions">
            <button className="primary-btn" onClick={handleSaveAddress}>Save</button>
            <button className="secondary-btn" onClick={closeModal}>Cancel</button>
          </div>
        </>
      )}

      {/* Password Modal */}
      {modalType === "password" && (
        <>
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
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
          <input
            type="email"
            placeholder="New Email"
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

    </>
  );
};

export default Profile;
