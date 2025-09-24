import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState("");
  const [renameFrom, setRenameFrom] = useState("");
  const [renameTo, setRenameTo] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/products");
        setProducts(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const cat = p.category || "Uncategorized";
      map.set(cat, (map.get(cat) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const newCategory = categoryForm.trim();
    if (!newCategory) return;
    // No dedicated category endpoint; categories derive from products. We'll just add a placeholder by creating no product.
    // To surface immediately, we can keep a local synthetic entry until real products exist.
    if (!categories.find((c) => c.name.toLowerCase() === newCategory.toLowerCase())) {
      setProducts((prev) => prev.concat([]));
      alert("Category will appear once a product is assigned to it.");
    }
    setCategoryForm("");
    setShowForm(false);
  };

  const handleBulkRename = async () => {
    const from = renameFrom.trim();
    const to = renameTo.trim();
    if (!from || !to) return alert("Please provide both source and target categories");
    const affected = products.filter((p) => (p.category || "").toLowerCase() === from.toLowerCase());
    if (affected.length === 0) return alert("No products found in the source category");

    if (!window.confirm(`Rename category "${from}" to "${to}" for ${affected.length} products?`)) return;

    try {
      // Update products one by one. Could be optimized via backend bulk endpoint.
      await Promise.all(
        affected.map((p) => {
          const form = new FormData();
          form.append("category", to);
          return axios.put(`http://localhost:5000/api/products/updateProduct/${p._id}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        })
      );
      // Refresh list
      const res = await axios.get("http://localhost:5000/api/products/products");
      setProducts(Array.isArray(res.data?.data) ? res.data.data : []);
      setRenameFrom("");
      setRenameTo("");
      alert("Category rename completed");
    } catch (e) {
      alert("Failed to rename category");
    }
  };

  return (
    <section>
      {!showForm ? (
        <>
          <h2>📁 Categories</h2>
          <p>Organize products into categories.</p>
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <ul className="category-list">
              {categories.map((cat) => (
                <li key={cat.name}>{cat.name} ({cat.count})</li>
              ))}
            </ul>
          )}
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Add New Category
          </button>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Rename from..."
              value={renameFrom}
              onChange={(e) => setRenameFrom(e.target.value)}
            />
            <span>→</span>
            <input
              type="text"
              placeholder="Rename to..."
              value={renameTo}
              onChange={(e) => setRenameTo(e.target.value)}
            />
            <button className="btn-small" onClick={handleBulkRename}>Rename/Move</button>
          </div>
        </>
      ) : (
        <>
          <h2>Add New Category</h2>
          <form className="settings-form" onSubmit={handleAddCategory}>
            <label>Category Name</label>
            <input
              type="text"
              value={categoryForm}
              onChange={(e) => setCategoryForm(e.target.value)}
              required
            />
            <button className="btn-primary" type="submit">
              Add Category
            </button>
            <button
              className="btn-small btn-cancel"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </section>
  );
}

export default Categories;
