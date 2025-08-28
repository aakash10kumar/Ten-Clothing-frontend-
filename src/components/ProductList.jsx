import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({ products, onAddToCart, onAddToWishlist }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          showAddToCart={true}
        />
      ))}
    </div>
  );
};

export default ProductList;
