import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/"; // Change this to your backend URL or keep "" if using proxy

function Products() {
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("Products"); // Products, AddProduct, EditProduct
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    discount: "", // NEW discount field
    netQuantity: "",
    description: "",
    gender: "",
    sizes: [],
    countryOfOrigin: "",
    images: [], // for multiple images
    fabric: "",
    colour: "",
  });

  const adminToken = localStorage.getItem("adminToken") || "";
  console.log(adminToken);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/products"
      );

      const productList = Array.isArray(res.data.data) ? res.data.data : [];

      setProducts(productList);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setProducts([]);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`${BASE_URL}api/products/products/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id)); // use _id
    } catch (error) {
      console.error("Delete product failed:", error);
    }
  };

  const toggleSize = (size) => {
    if (productForm.sizes.includes(size)) {
      setProductForm({
        ...productForm,
        sizes: productForm.sizes.filter((s) => s !== size),
      });
    } else {
      setProductForm({
        ...productForm,
        sizes: [...productForm.sizes, size],
      });
    }
  };

  // Example: Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", productForm.name);
      formData.append("category", productForm.category);
      formData.append("price", productForm.price);
      formData.append("discount", productForm.discount || 0);
      formData.append("netQuantity", productForm.netQuantity);
      formData.append("description", productForm.description);
      formData.append("gender", productForm.gender);
      formData.append("countryOfOrigin", productForm.countryOfOrigin);
      formData.append("fabric", productForm.fabric);

      // Append sizes
      productForm.sizes.forEach((size) => formData.append("sizes", size));

      // Append colours (split by comma if user entered multiple colors)
      productForm.colour
        .split(",")
        .map((c) => c.trim())
        .forEach((c) => formData.append("colour", c));

      // Append images
      productForm.images.forEach((img) => formData.append("images", img));

      const adminToken = localStorage.getItem("adminToken");

      const res = await axios.post(
        "http://localhost:5000/api/products/createProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      console.log("✅ Product added:", res.data);
      fetchProducts(); // refresh list
      resetForm();
      setActiveSection("Products");
    } catch (error) {
      console.error("Add product failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

const handleEditProductClick = (id) => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setSelectedProduct(product);
      setProductForm({
        ...product,
        sizes: product.sizes || [],
        images: [],
        discount: product.discount || "",
      });
      setActiveSection("EditProduct");
    }
  };

  const submitEditedProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(productForm).forEach(([key, value]) => {
        if (key === "sizes" || key === "colour") {
          value.forEach((v) => formData.append(key, v));
        } else if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      const res = await axios.put(
        `${BASE_URL}api/products/updateProduct/${selectedProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === selectedProduct._id ? res.data.data : p))
      );
      resetForm();
      setActiveSection("Products");
    } catch (error) {
      console.error("Update product failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setProductForm({
      name: "",
      category: "",
      price: "",
      discount: "",
      netQuantity: "",
      description: "",
      gender: "",
      sizes: [],
      countryOfOrigin: "",
      images: [],
      fabric: "",
      colour: "",
    });
  };

  if (activeSection === "AddProduct") {
    return (
      <section>
        <h2>Add New Product</h2>
        <form className="settings-form" onSubmit={handleAddProduct}>
          <label>Product Name</label>
          <input
            type="text"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
            required
          />

          <label>Category</label>
          <input
            type="text"
            value={productForm.category}
            onChange={(e) =>
              setProductForm({ ...productForm, category: e.target.value })
            }
            required
          />

          <label>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
            required
          />

          <label>Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={productForm.discount}
            onChange={(e) =>
              setProductForm({ ...productForm, discount: e.target.value })
            }
            placeholder="0"
          />

          <label>Net Quantity</label>
          <input
            type="number"
            min="0"
            value={productForm.netQuantity}
            onChange={(e) =>
              setProductForm({ ...productForm, netQuantity: e.target.value })
            }
            required
          />

          <label>Description</label>
          <textarea
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            required
          />

          <label>Gender</label>
          <select
            value={productForm.gender}
            onChange={(e) =>
              setProductForm({ ...productForm, gender: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Kids">Kids</option>
          </select>

          <label>Size</label>
          <div>
            {availableSizes.map((size) => (
              <label key={size} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  value={size}
                  checked={productForm.sizes.includes(size)}
                  onChange={() => toggleSize(size)}
                />
                {size}
              </label>
            ))}
          </div>

          <label>Country of Origin</label>
          <input
            type="text"
            value={productForm.countryOfOrigin}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                countryOfOrigin: e.target.value,
              })
            }
            required
          />

          <label>Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setProductForm({
                ...productForm,
                images: Array.from(e.target.files),
              });
            }}
          />

          <label>Fabric</label>
          <input
            type="text"
            value={productForm.fabric}
            onChange={(e) =>
              setProductForm({ ...productForm, fabric: e.target.value })
            }
            required
          />

          <label>Colour</label>
          <input
            type="text"
            value={productForm.colour}
            onChange={(e) =>
              setProductForm({ ...productForm, colour: e.target.value })
            }
            required
          />

          <button className="btn-primary" type="submit">
            Add Product
          </button>
          <button
            className="btn-small btn-cancel"
            type="button"
            onClick={() => setActiveSection("Products")}
          >
            Cancel
          </button>
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
          <input
            type="text"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
            required
          />

          <label>Category</label>
          <input
            type="text"
            value={productForm.category}
            onChange={(e) =>
              setProductForm({ ...productForm, category: e.target.value })
            }
            required
          />

          <label>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
            required
          />

          <label>Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={productForm.discount}
            onChange={(e) =>
              setProductForm({ ...productForm, discount: e.target.value })
            }
            placeholder="0"
          />

          <label>Net Quantity</label>
          <input
            type="number"
            min="0"
            value={productForm.netQuantity}
            onChange={(e) =>
              setProductForm({ ...productForm, netQuantity: e.target.value })
            }
            required
          />

          <label>Description</label>
          <textarea
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            required
          />

          <label>Gender</label>
          <select
            value={productForm.gender}
            onChange={(e) =>
              setProductForm({ ...productForm, gender: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Kids">Kids</option>
          </select>

          <label>Sizes</label>
          <div>
            {availableSizes.map((sizes) => (
              <label key={sizes} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  value={sizes}
                  checked={productForm.sizes.includes(sizes)}
                  onChange={() => toggleSize(sizes)}
                />
                {sizes}
              </label>
            ))}
          </div>

          <label>Country of Origin</label>
          <input
            type="text"
            value={productForm.countryOfOrigin}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                countryOfOrigin: e.target.value,
              })
            }
            required
          />

          <label>Images (Add new)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setProductForm({
                ...productForm,
                images: Array.from(e.target.files),
              });
            }}
          />

          <label>Fabric</label>
          <input
            type="text"
            value={productForm.fabric}
            onChange={(e) =>
              setProductForm({ ...productForm, fabric: e.target.value })
            }
            required
          />

          <label>Colour</label>
          <input
            type="text"
            value={productForm.colour}
            onChange={(e) =>
              setProductForm({ ...productForm, colour: e.target.value })
            }
            required
          />

          <button className="btn-primary" type="submit">
            Save Changes
          </button>
          <button
            className="btn-small btn-cancel"
            type="button"
            onClick={() => setActiveSection("Products")}
          >
            Cancel
          </button>
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
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount (%)</th>
            <th>Net Quantity</th>
            <th>Description</th>
            <th>Gender</th>
            <th>Sizes</th>
            <th>Country of Origin</th>
            <th>Image</th>
            <th>Fabric</th>
            <th>Colour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.discount || 0}</td>
                <td>{p.netQuantity}</td>
                <td>{p.description}</td>
                <td>{p.gender}</td>
                <td>{p.sizes.join(", ")}</td>
                <td>{p.countryOfOrigin}</td>
                <td>
                  {p.images && p.images.length > 0 ? (
                    <div style={{ display: "flex", gap: "5px" }}>
                      {p.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5000/uploads/${img}`} // use `uploads/` if needed
                          alt={`${p.name} ${idx + 1}`}
                          width="50"
                          height="50"
                          style={{ objectFit: "cover", borderRadius: "4px" }}
                        />
                      ))}
                    </div>
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{p.fabric}</td>
                <td>{p.colour}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-small"
                      onClick={() => handleEditProductClick(p._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-small btn-delete"
                      onClick={() => handleDeleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button
        className="btn-primary"
        onClick={() => {
          resetForm();
          setActiveSection("AddProduct");
        }}
      >
        Add New Product
      </button>
    </section>
  );
}

export default Products;
