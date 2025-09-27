import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";
import axios from "axios";
import "./CategoryPage.css";

const AllProductsPage = () => {
  const { addToCart, addToWishlist } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/allProducts");
        setProducts(res.data.data); // your backend returns { success: true, data: [...] }
        setLoading(false);
      } catch (err) {
        setError("Failed to load products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id} // use _id from MongoDB
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
