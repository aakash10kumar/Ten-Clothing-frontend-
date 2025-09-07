import React, { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
    "Men's",
    "Women's",
    "Kids",
    "New Arrivals",
    "Sale",
  ]);

  const [categoryForm, setCategoryForm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const newCategory = categoryForm.trim();

    if (newCategory !== "" && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
    }

    setCategoryForm("");
    setShowForm(false);
  };

  return (
    <section>
      {!showForm ? (
        <>
          <h2>📁 Categories</h2>
          <p>Organize products into categories.</p>
          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Add New Category
          </button>
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
