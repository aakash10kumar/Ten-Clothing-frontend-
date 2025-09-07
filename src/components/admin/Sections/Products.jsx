import React, { useState } from "react";


function Products() {
  const [Products, setProducts] = useState([
    { id: 1, name: "Men's Kurta", category: "Men's", price: "₹1,199", stock: 50, description: "A traditional cotton kurta suitable for festive and casual wear.", gender: "Men", size: "M, L, XL", country: "India", image: "https://example.com/images/mens-kurta.jpg", fabric: "Cotton", colour: "White" },
    { id: 2, name: "Women's Traditional Wear", category: "Women's", price: "₹2,499", stock: 30, description: "Elegant embroidered suit set perfect for weddings and festivals.", gender: "Women", size: "S, M, L", country: "India", image: "https://example.com/images/womens-traditional.jpg", fabric: "Silk Blend", colour: "Maroon" },
    { id: 3, name: "Kids Jeans", category: "Kids", price: "₹799", stock: 40, description: "Comfortable and durable jeans for kids, ideal for daily wear.", gender: "Unisex", size: "4-5Y, 6-7Y, 8-9Y", country: "Bangladesh", image: "https://example.com/images/kids-jeans.jpg", fabric: "Denim", colour: "Blue" },
    { id: 4, name: "Evening Gown", category: "Women's", price: "₹3,999", stock: 15, description: "Flowy floor-length evening gown with sequin detailing.", gender: "Women", size: "M, L", country: "India", image: "https://example.com/images/evening-gown.jpg", fabric: "Georgette", colour: "Navy Blue" },
    { id: 5, name: "Printed T-Shirt", category: "Men's", price: "₹499", stock: 100, description: "Casual round-neck printed T-shirt for everyday wear.", gender: "Men", size: "M, L, XL", country: "India", image: "https://example.com/images/printed-tshirt.jpg", fabric: "Cotton", colour: "Black" },
    { id: 6, name: "Women's Kurta Set", category: "Women's", price: "₹1499", stock: 50, description: "A stylish kurta set with matching pants and dupatta.", gender: "Women", size: "S, M, L, XL", country: "India", image: "https://example.com/images/womens-kurta-set.jpg", fabric: "Rayon", colour: "Teal Green" },
    { id: 7, name: "Checks Shirts", category: "Men's", price: "₹599", stock: 30, description: "Full-sleeve checkered shirt for formal or casual wear.", gender: "Men", size: "M, L, XL", country: "India", image: "https://example.com/images/checks-shirt.jpg", fabric: "Cotton Blend", colour: "Red & Black" },
    { id: 8, name: "Night Suits", category: "Kids", price: "₹499", stock: 60, description: "Soft cotton night suits designed for comfort and warmth.", gender: "Unisex", size: "3-4Y, 5-6Y, 7-8Y", country: "India", image: "https://example.com/images/kids-night-suit.jpg", fabric: "Cotton", colour: "Light Blue" },
    { id: 9, name: "Kids Frocks", category: "Kids", price: "₹399", stock: 20, description: "Floral printed frocks perfect for parties and playtime.", gender: "Girls", size: "2-3Y, 4-5Y", country: "India", image: "https://example.com/images/kids-frock.jpg", fabric: "Cotton", colour: "Pink" },
  ]);

  const [activeSection, setActiveSection] = useState("Products");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    gender: "",
    size: "",
    country: "",
    image: "",
    fabric: "",
    colour: "",
  });

  // Handlers
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Products.length ? Math.max(...Products.map((p) => p.id)) + 1 : 1,
      ...productForm,
      stock: parseInt(productForm.stock),
    };
    setProducts((prev) => [...prev, newProduct]);
    resetForm();
    setActiveSection("Products");
  };

  const handleEditProductClick = (productId) => {
    const product = Products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setProductForm({ ...product });
      setActiveSection("EditProduct");
    }
  };

  const submitEditedProduct = (e) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? { ...p, ...productForm, stock: parseInt(productForm.stock) }
          : p
      )
    );
    resetForm();
    setActiveSection("Products");
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setProductForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      gender: "",
      size: "",
      country: "",
      image: "",
      fabric: "",
      colour: "",
    });
  };

  // Renders
  if (activeSection === "AddProduct") {
    return (
      <section>
        <h2>Add New Product</h2>
        <form className="settings-form" onSubmit={handleAddProduct}>
          <label>Product Name</label>
          <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />

          <label>Category</label>
          <input type="text" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} required />

          <label>Price</label>
          <input type="text" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />

          <label>Stock</label>
          <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} required />

          <label>Description</label>
          <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required />

          <label>Gender</label>
          <select value={productForm.gender} onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })} required>
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>

          <label>Size</label>
          <input type="text" value={productForm.size} onChange={(e) => setProductForm({ ...productForm, size: e.target.value })} required />

          <label>Country</label>
          <input type="text" value={productForm.country} onChange={(e) => setProductForm({ ...productForm, country: e.target.value })} required />

          <label>Image URL</label>
          <input type="text" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} required />

          <label>Fabric</label>
          <input type="text" value={productForm.fabric} onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })} required />

          <label>Colour</label>
          <input type="text" value={productForm.colour} onChange={(e) => setProductForm({ ...productForm, colour: e.target.value })} required />

          <button className="btn-primary" type="submit">Add Product</button>
          <button className="btn-small btn-cancel" type="button" onClick={() => setActiveSection("Products")}>Cancel</button>
        </form>
      </section>
    );
  }

  if (activeSection === "EditProduct" && selectedProduct) {
    return (
      <section>
        <h2>Edit Product – {selectedProduct.name}</h2>
        <form className="settings-form" onSubmit={submitEditedProduct}>
          <label>Product Name</label>
          <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />

          <label>Category</label>
          <input type="text" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} required />

          <label>Price</label>
          <input type="text" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />

          <label>Stock</label>
          <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} required />

          <label>Description</label>
          <input type="text" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required />

          <label>Gender</label>
          <input type="text" value={productForm.gender} onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })} required />

          <label>Size</label>
          <input type="text" value={productForm.size} onChange={(e) => setProductForm({ ...productForm, size: e.target.value })} required />

          <label>Country</label>
          <input type="text" value={productForm.country} onChange={(e) => setProductForm({ ...productForm, country: e.target.value })} required />

          <label>Image URL</label>
          <input type="text" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} required />

          <label>Fabric</label>
          <input type="text" value={productForm.fabric} onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })} required />

          <label>Colour</label>
          <input type="text" value={productForm.colour} onChange={(e) => setProductForm({ ...productForm, colour: e.target.value })} required />

          <button className="btn-primary" type="submit">Save Changes</button>
          <button className="btn-small btn-cancel" type="button" onClick={() => setActiveSection("Products")}>Cancel</button>
        </form>
      </section>
    );
  }

  return (
    <section>
      <h2>👕 Products</h2>
      <p>Add, edit, and manage clothing products.</p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product Name</th><th>Category</th><th>Price</th><th>Stock</th>
            <th>Description</th><th>Gender</th><th>Size</th><th>Country</th>
            <th>Image</th><th>Fabric</th><th>Colour</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td><td>{p.category}</td><td>{p.price}</td><td>{p.stock}</td>
              <td>{p.description}</td><td>{p.gender}</td><td>{p.size}</td><td>{p.country}</td>
              <td><img src={p.image} alt={p.name} width="50" /></td>
              <td>{p.fabric}</td><td>{p.colour}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-small" onClick={() => handleEditProductClick(p.id)}>Edit</button>
                  <button className="btn-small btn-delete" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-primary" onClick={() => { resetForm(); setActiveSection("AddProduct"); }}>Add New Product</button>
    </section>
  );
}

export default Products;
