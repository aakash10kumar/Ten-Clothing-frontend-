import React, { useState } from "react";

function EditProduct({ products, editingProductId, handleUpdateProduct, setActiveSection }) {
  const product = products.find((p) => p.id === editingProductId);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProduct(editingProductId, updatedProduct);
    setActiveSection("Products");
  };

  return (
    <section>
      <h2>✏️ Edit Product</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {Object.keys(updatedProduct).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={updatedProduct[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit" className="btn-primary">Update</button>
        <button type="button" className="btn-secondary" onClick={() => setActiveSection("Products")}>
          Cancel
        </button>
      </form>
    </section>
  );
}

export default EditProduct;
