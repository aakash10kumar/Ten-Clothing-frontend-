import React from "react";
import Navbar from "./Navbar";
import productsData from "./products";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";
import "./CategoryPage.css";

const AllProductsPage = () => {
  const { addToCart, addToWishlist } = useCart();

  return (
    <div>
      <Navbar />
      <h1>All Products</h1>
      <div className="products-grid">
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            showAddToCart={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
