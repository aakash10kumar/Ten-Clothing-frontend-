import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./components/UserContext";
import { CartProvider } from "./components/CartContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        {/* Only one BrowserRouter here */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
