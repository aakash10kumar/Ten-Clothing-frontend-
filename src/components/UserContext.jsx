import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "anjali",
    email: "anjali@example.com",
    phone: "+91 9876543210",
  });

  const [addresses, setAddresses] = useState([
    // start empty
  ]);

  const addAddress = (address) => {
    setAddresses([...addresses, { id: Date.now(), ...address }]);
  };

  const updateAddress = (id, updated) => {
    setAddresses(addresses.map((a) => (a.id === id ? updated : a)));
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, addresses, addAddress, updateAddress, deleteAddress }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
