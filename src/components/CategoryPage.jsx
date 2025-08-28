import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import productsData from "./products";
import Navbar from "./Navbar";
import "./CategoryPage.css";

const CategoryPage = ({ onAddToCart, onAddToWishlist }) => {
  const { category, subcategory } = useParams();

  // Normalize category from URL (e.g., "new-arrivals" → "new arrivals")
  const formattedCategory = category.replace(/-/g, " ").toLowerCase();

  const filteredProducts = productsData.filter((product) => {
    const productCategory = product.category?.toLowerCase();

    // Check category match
    const isCategoryMatch = productCategory === formattedCategory;

    // If subcategory exists in URL and in product
    if (subcategory && subcategory !== "all") {
      const productSub = product.subcategory?.toLowerCase().replace(/\s+/g, "-");
      return isCategoryMatch && productSub === subcategory.toLowerCase();
    }

    return isCategoryMatch; // No subcategory case
  });

  return (
    <><Navbar />
    <div>
      
      <h1>
        {category.replace(/-/g, " ").toUpperCase()}{" "}
        {subcategory && subcategory !== "all" && `- ${subcategory.replace(/-/g, " ")}`}
      </h1>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              showAddToCart={true}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default CategoryPage;
