import React from "react";
import { useParams } from "react-router-dom";
import productsData from "./products";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import "./SubCategoryPage.css"; // Import the CSS file

const SubCategoryPage = ({ onAddToCart, onAddToWishlist }) => {
  const { category, subcategory } = useParams();

  const categoryProducts = productsData.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  let groupedProducts = {};
  if (subcategory && subcategory.toLowerCase() === "all") {
    // Group products by subcategory
    groupedProducts = categoryProducts.reduce((groups, product) => {
      const groupName = product.subcategory;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(product);
      return groups;
    }, {});
  } else {
    // Show only products matching the selected subcategory
    const formattedSubcategory = subcategory?.replace(/-/g, " ").toLowerCase();
    groupedProducts[subcategory] = categoryProducts.filter(
      (p) => p.subcategory.toLowerCase() === formattedSubcategory
    );
  }

  return (
    <>
      <Navbar />
      <div className="subcategory-page">
        <h2 style={{ marginBottom: "20px", textTransform: "capitalize" }}>
          {subcategory === "all" ? category : subcategory}
        </h2>

        {Object.keys(groupedProducts).length > 0 ? (
          Object.keys(groupedProducts).map((group) => (
            <div key={group} style={{ marginBottom: "40px" }}>
              <h3 style={{ marginBottom: "15px", textTransform: "capitalize" }}>
                {group}
              </h3>

              {/* ✅ Centered product grid */}
              <div className="products-grid">
                {groupedProducts[group].map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onAddToWishlist={onAddToWishlist}
                    showAddToCart={true}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
};

export default SubCategoryPage;
