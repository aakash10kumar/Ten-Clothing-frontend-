import React, { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [orders, setOrders] = useState([
    { orderNumber: '1001', poNumber: 'PO-501', orderDate: '2025-08-10', customer: 'John Doe', status: 'Pending Acceptance', total: '₹3,200' },
    { orderNumber: '1002', poNumber: 'PO-502', orderDate: '2025-08-11', customer: 'Jane Smith', status: 'Shipped', total: '₹7,500' },
    { orderNumber: '1003', poNumber: 'PO-503', orderDate: '2025-08-12', customer: 'Venishetti Sangeetha', status: 'Backordered', total: '₹1,150' },
    { orderNumber: '1004', poNumber: 'PO-504', orderDate: '2025-08-13', customer: 'Alice Brown', status: 'Processing', total: '₹4,000' },
    { orderNumber: '1005', poNumber: 'PO-505', orderDate: '2025-08-14', customer: 'Charlie Davis', status: 'Delivered', total: '₹2,000' },
    { orderNumber: '1006', poNumber: 'PO-506', orderDate: '2025-08-15', customer: 'Surya', status: 'Processing', total: '₹6,000' },
    { orderNumber: '1007', poNumber: 'PO-507', orderDate: '2025-08-16', customer: 'Akhila ', status: 'On the way ', total: '₹7,000' },
    { orderNumber: '1008', poNumber: 'PO-508', orderDate: '2025-08-19', customer: 'Lahari', status: 'Processing', total: '₹4,000' },
    { orderNumber: '1009', poNumber: 'PO-509', orderDate: '2025-08-25', customer: 'Mokkapati Sampath', status: 'Shipped', total: '₹5,500' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Men's Kurta", category: "Men's", price: '₹1,199', stock: 50 ,description: 'A traditional cotton kurta suitable for festive and casual wear.',gender: 'Men',size: 'M, L, XL',country: 'India',image: 'https://example.com/images/mens-kurta.jpg',fabric: 'Cotton',colour: 'White' },
    { id: 2, name: "Women's Traditional Wear", category: "Women's", price: '₹2,499', stock: 30 ,description: 'Elegant embroidered suit set perfect for weddings and festivals.',gender: 'Women', size: 'S, M, L',country: 'India',image: 'https://example.com/images/womens-traditional.jpg',fabric: 'Silk Blend', colour: 'Maroon'},
    { id: 3, name: 'Kids Jeans', category: 'Kids', price: '₹799', stock: 40,description: 'Comfortable and durable jeans for kids, ideal for daily wear.',gender: 'Unisex',size: '4-5Y, 6-7Y, 8-9Y', country: 'Bangladesh',image: 'https://example.com/images/kids-jeans.jpg',fabric: 'Denim',colour: 'Blue' },
    { id: 4, name: 'Evening Gown', category: "Women's", price: '₹3,999', stock: 15 ,description: 'Flowy floor-length evening gown with sequin detailing.',gender: 'Women',size: 'M, L',country: 'India', image: 'https://example.com/images/evening-gown.jpg',fabric: 'Georgette',colour: 'Navy Blue'},
    { id: 5, name: 'Printed T-Shirt', category: "Men's", price: '₹499', stock: 100 , description: 'Casual round-neck printed T-shirt for everyday wear.', gender: 'Men',size: 'M, L, XL',country: 'India',image: 'https://example.com/images/printed-tshirt.jpg',fabric: 'Cotton',colour: 'Black'},
    { id: 6, name: "Women's Kurta Set", category: "Women's", price: '₹1499', stock: 50 , description: 'A stylish kurta set with matching pants and dupatta.', gender: 'Women',size: 'S, M, L, XL',country: 'India',image: 'https://example.com/images/womens-kurta-set.jpg',fabric: 'Rayon',colour: 'Teal Green'},
    { id: 7, name: 'Checks Shirts', category: "Men's", price: '₹599', stock: 30 , description: 'Full-sleeve checkered shirt for formal or casual wear.',gender: 'Men',size: 'M, L, XL',country: 'India',image: 'https://example.com/images/checks-shirt.jpg',fabric: 'Cotton Blend',colour: 'Red & Black'},
    { id: 8, name: 'Night Suits', category: 'Kids', price: '₹499', stock: 60 ,description: 'Soft cotton night suits designed for comfort and warmth.',gender: 'Unisex',size: '3-4Y, 5-6Y, 7-8Y',country: 'India',image: 'https://example.com/images/kids-night-suit.jpg',fabric: 'Cotton',colour: 'Light Blue'},
    { id: 9, name: 'Kids Frocks', category: 'Kids', price: '₹399', stock: 20 ,description: 'Floral printed frocks perfect for parties and playtime.',gender: 'Girls',size: '2-3Y, 4-5Y',country: 'India', image: 'https://example.com/images/kids-frock.jpg',fabric: 'Cotton',colour: 'Pink'},
    
  ]);

  const [categories, setCategories] = useState(["Men's", "Women's", "Kids", "New Arrivals", "Sale"]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'Keerthi', email: 'keerthi123@gmail.com', phone: '9876543210' },
    { id: 2, name: 'Surya', email: 'surya912@gmail.com', phone: '9123456780' },
    { id: 3, name: 'Minni raj', email: 'minniraj@gmail.com', phone: '9988776655' },
    { id: 4, name: 'Sherya ', email: 'sherya34@gmail.com', phone: '9000000010' },
    { id: 5, name: 'Deepika', email: 'deepika@gmail.com', phone: '9000000011' },
    { id: 6, name: 'Nikitha', email: 'nikitha@gmail.com', phone: '6376547890' },
    { id: 7, name: 'Malika', email: 'malika345@gmail.com', phone: '9943215679' },

  ]);

  const [inventory] = useState([
    { product: 'Kids Frocks', stock: 60, reorderLevel: 10 },
    { product: "Men's Kurta", stock: 50, reorderLevel: 20 },
    { product: "Women's Traditional Wear", stock: 15, reorderLevel: 20 },
    { product: 'Kids Jeans', stock: 40, reorderLevel: 20 },
    { product: 'Evening Gown', stock: 0, reorderLevel: 10 },    
    { product: 'Kids jeans', stock: 0, reorderLevel: 10 },
    { product: "Women's Kurta Sets", stock: 50, reorderLevel: 20 },
    { product: "Men's Shirts", stock: 0, reorderLevel: 10 },
   
  ]);

  const [reviews] = useState([
    { id: 1, product: "Men's Kurta", customer: 'John Doe', rating: 4, comment: 'Great fit!' },
    { id: 2, product: "Women's Traditional Wear", customer: 'Jane Smith', rating: 5, comment: 'Beautiful!' },
    { id: 3, product: 'Kids Jeans', customer: 'Alice Brown', rating: 3, comment: 'Good for price.' },
    { id: 4, product: 'Evening Gown', customer: 'Charlie Davis', rating: 4, comment: 'Lovely material.' },
    { id: 5, product: "Men's Hoodie", customer: 'Koushik', rating: 5, comment: 'Loved it!' },
    { id: 6, product: 'Kids Frock', customer: 'Charlie Davis', rating: 4, comment: 'Nice!' },
    { id: 7, product: "Women's kurta set", customer: 'Nikitha', rating: 4, comment: 'Worth one.' },
    
    
  ]);
    const reports = [
    { id: 1, name: 'Sales Report – July', date: '2025-08-01' },
    { id: 2, name: 'Inventory Report', date: '2025-08-05' },
    { id: 3, name: 'Customer Growth Report', date: '2025-08-07' },
  ];



  // --- TEMP STATE FOR FORMS ---
  const [productForm, setProductForm] = useState({ name: '', category: '', price: '', stock: ''  ,description: '',gender: '',size: '',country: '',image: '',fabric: '',colour: ''
  });
  const [categoryForm, setCategoryForm] = useState('');

  // --- HANDLERS ---
  const handleCancel = orderNumber => {
    setOrders(prev => prev.filter(o => o.orderNumber !== orderNumber));
  };

  const handleDeleteProduct = id => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleDeleteCustomer = id => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };
 
  // MODIFIED: Show only alert instead of file download
  const handleDownloadReport = (rep) => {
    alert(`Downloading: ${rep.name}`);
  };
  
const handleEditProductClick = (productId) => {
  const product = products.find(p => p.id === productId);
  if (product) {
    setSelectedProduct(product);
    setProductForm({ ...product });
    setActiveSection('EditProduct');
  }
};


  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  // --- ADD PRODUCT SUBMIT ---
  const handleAddProduct = e => {
  e.preventDefault();
  const newProduct = {
    id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name: productForm.name,
    category: productForm.category,
    price: productForm.price,
    stock: parseInt(productForm.stock),
    description: productForm.description,
    gender: productForm.gender,
    size: productForm.size,
    country: productForm.country,
    image: productForm.image,
    fabric: productForm.fabric,
    colour: productForm.colour
  };
  setProducts(prev => [...prev, newProduct]);
  setProductForm({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    gender: '',
    size: '',
    country: '',
    image: '',
    fabric: '',
    colour: ''
  });
  setActiveSection('Products');
};

  // --- EDIT PRODUCT SUBMIT ---
  const submitEditedProduct = e => {
  e.preventDefault(); // ✅ only used on form submit
  setProducts(prev =>
    prev.map(p =>
      p.id === selectedProduct.id
        ? { ...p, ...productForm, stock: parseInt(productForm.stock) }
        : p
    )
  );

    setSelectedProduct(null);
    setProductForm({ name: '', category: '', price: '', stock: '' ,description: '', gender: '',size: '',country: '',image: '',fabric: '',colour: ''});
    setActiveSection('Products');
  };

  // --- ADD CATEGORY SUBMIT ---
  const handleAddCategory = e => {
    e.preventDefault();
    if (categoryForm.trim() !== '' && !categories.includes(categoryForm.trim())) {
      setCategories(prev => [...prev, categoryForm.trim()]);
    }
    setCategoryForm('');
    setActiveSection('Categories');
  };

  // --- RENDER LOGIC ---
  const renderSection = () => {
    if (activeSection === 'ViewOrder' && selectedOrder) {
      const o = selectedOrder;
      return (
        <section>
          <h2>Order Details – #{o.orderNumber}</h2>
          <p><strong>PO Number:</strong> {o.poNumber}</p>
          <p><strong>Order Date:</strong> {o.orderDate}</p>
          <p><strong>Customer:</strong> {o.customer}</p>
          <p><strong>Status:</strong> {o.status}</p>
          <p><strong>Total:</strong> {o.total}</p>
          <button className="btn-primary" onClick={() => setActiveSection('Orders')}>Back to Orders</button>
        </section>
      );
    }

    if (activeSection === 'AddProduct') {
  return (
    <section>
      <h2>Add New Product</h2>
      <form className="settings-form" onSubmit={handleAddProduct}>
        <label>Product Name</label>
        <input type="text" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />

        <label>Category</label>
        <input type="text" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} required />

        <label>Price</label>
        <input type="text" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} required />

        <label>Stock</label>
        <input type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} required />

        <label>Description</label>
        <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} required />

        <label>Gender</label>
        <select value={productForm.gender} onChange={e => setProductForm({ ...productForm, gender: e.target.value })} required>
          <option value="">Select</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Unisex">Unisex</option>
        </select>

        <label>Size</label>
        <input type="text" value={productForm.size} onChange={e => setProductForm({ ...productForm, size: e.target.value })} required />

        <label>Country</label>
        <input type="text" value={productForm.country} onChange={e => setProductForm({ ...productForm, country: e.target.value })} required />

        <label>Image URL</label>
        <input type="text" value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} required />

        <label>Fabric</label>
        <input type="text" value={productForm.fabric} onChange={e => setProductForm({ ...productForm, fabric: e.target.value })} required />

        <label>Colour</label>
        <input type="text" value={productForm.colour} onChange={e => setProductForm({ ...productForm, colour: e.target.value })} required />

        <button className="btn-primary" type="submit">Add Product</button>
        <button className="btn-small btn-cancel" type="button" onClick={() => setActiveSection('Products')}>Cancel</button>
      </form>
    </section>
  );
}


    if (activeSection === 'EditProduct' && selectedProduct) {
      if (productForm.name === '') {
        // first time opening form, load product details
        setProductForm({
          name: selectedProduct.name,
          category: selectedProduct.category,
          price: selectedProduct.price,
          stock: selectedProduct.stock,
          description: selectedProduct.description,
          gender: selectedProduct.gender,
          size: selectedProduct.size,
          country: selectedProduct.country,
          image: selectedProduct.image,
          fabric: selectedProduct.fabric,
          colour: selectedProduct.colour
        });
      }
      return (
        <section>
          <h2>Edit Product – {selectedProduct.name}</h2>
          <form className="settings-form" onSubmit={submitEditedProduct}>
            <label>Product Name</label>
            <input type="text" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
            <label>Category</label>
            <input type="text" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} required />
            <label>Price</label>
            <input type="text" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} required />
            <label>Stock</label>
            <input type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} required />
           <label>description</label>
            <input type="text" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} required />
          <label>gender</label>
            <input type="text" value={productForm.gender} onChange={e => setProductForm({ ...productForm, gender: e.target.value })} required />
        <label>size</label>
            <input type="text" value={productForm.size} onChange={e => setProductForm({ ...productForm, size: e.target.value })} required />
        <label>Country</label>
            <input type="text" value={productForm.country} onChange={e => setProductForm({ ...productForm, country: e.target.value })} required />
            <label>image</label>
            <input type="text" value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} required />
          <label>Fabric</label>
            <input type="text" value={productForm.fabric} onChange={e => setProductForm({ ...productForm, fabric: e.target.value })} required />
          <label>Colour</label>
            <input type="text" value={productForm.colour} onChange={e => setProductForm({ ...productForm, colour: e.target.value })} required />
            <button className="btn-primary" type="submit">Save Changes</button>
            <button className="btn-small btn-cancel" type="button" onClick={() => setActiveSection('Products')}>Cancel</button>
          </form>
        </section>
      );
    }

    if (activeSection === 'AddCategory') {
      return (
        <section>
          <h2>Add New Category</h2>
          <form className="settings-form" onSubmit={handleAddCategory}>
            <label>Category Name</label>
            <input type="text" value={categoryForm} onChange={e => setCategoryForm(e.target.value)} required />
            <button className="btn-primary" type="submit">Add Category</button>
            <button className="btn-small btn-cancel" type="button" onClick={() => setActiveSection('Categories')}>Cancel</button>
          </form>
        </section>
      );
    }

    if (activeSection === 'ViewCustomer' && selectedCustomer) {
      const c = selectedCustomer;
      return (
        <section>
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> {c.name}</p>
          <p><strong>Email:</strong> {c.email}</p>
          <p><strong>Phone:</strong> {c.phone}</p>
          <button className="btn-primary" onClick={() => setActiveSection('Customers')}>Back to Customers</button>
        </section>
      );
    }

    if (activeSection === 'Settings') {
      return (
        <section>
          <h2>Settings</h2>
          <form className="settings-form" onSubmit={e => { e.preventDefault(); alert('Updated'); }}>
            <label>Admin Name</label><input type="text" defaultValue="Admin" required />
            <label>Admin Email</label><input type="email" defaultValue="admin@clothing.com" required />
            <label>New Password</label><input type="password" required />
            <label>Confirm Password</label><input type="password" required />
            <button className="btn-primary" type="submit">Update Settings</button>
          </form>
        </section>
      );
    }

    // Default Sections (unchanged)
    switch (activeSection) {
      case 'Dashboard':
        return (
          <section className="dashboard-overview">
            <h1>Welcome to TEN Clothing Admin 👋</h1>
            <p>Here's a quick summary of your store's performance today.</p>
            <div className="dashboard-cards centered">
              <div className="card"><h3>Total Orders</h3><p>{orders.length}</p></div>
              <div className="card"><h3>Revenue</h3><p>₹1,25,000</p></div>
              <div className="card"><h3>New Customers</h3><p>{customers.length}</p></div>
              <div className="card"><h3>Out of Stock</h3><p>{inventory.filter(i => i.stock <= i.reorderLevel).length} Items</p></div>
            </div>
          </section>
        );

      case 'Orders':
        return (
          <section>
            <h2>🧾 Orders</h2>
            <p>Manage and track all customer orders.</p>
            <table className="data-table">
              <thead>
                <tr><th>Order #</th><th>PO Number</th><th>Order Date</th><th>Customer</th><th>Status</th><th>Total</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.orderNumber}>
                    <td>{o.orderNumber}</td><td>{o.poNumber}</td><td>{o.orderDate}</td><td>{o.customer}</td><td>{o.status}</td><td>{o.total}</td>
                    <td>
                      <button className="btn-small" onClick={() => { setSelectedOrder(o); setActiveSection('ViewOrder'); }}>Details</button>
                      <button className="btn-small btn-cancel" onClick={() => handleCancel(o.orderNumber)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );

      case 'Products':
        return (
          
                <section>
  <h2>👕 Products</h2>
  <p>Add, edit, and manage clothing products.</p>
  <table className="data-table">
    <thead>
      <tr>
        <th>Product Name</th><th>Category</th><th>Price</th><th>Stock</th>
        <th>description</th><th>gender</th><th>size</th><th>country</th>
        <th>image</th><th>fabric</th><th>colour</th><th>Actions</th> {/* moved to last */}
      </tr>
    </thead>
    <tbody>
      {products.map(p => (
        <tr key={p.id}>
          <td>{p.name}</td><td>{p.category}</td><td>{p.price}</td><td>{p.stock}</td>
          <td>{p.description}</td>
          <td>{p.gender}</td>
          <td>{p.size}</td>
          <td>{p.country}</td>
          <td><img src={p.image} alt={p.name} width="50" /></td>
          <td>{p.fabric}</td>
          <td>{p.colour}</td>
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
  <button className="btn-primary" onClick={() => { setProductForm({ name: '', category: '', price: '', stock: '' }); setActiveSection('AddProduct'); }}>Add New Product</button>
</section>
        );

      case 'Categories':
        return (
          <section>
            <h2>📁 Categories</h2>
            <p>Organize products into categories.</p>
            <ul className="category-list">
              {categories.map(cat => <li key={cat}>{cat}</li>)}
            </ul>
            <button className="btn-primary" onClick={() => setActiveSection('AddCategory')}>Add New Category</button>
          </section>
        );

      case 'Customers':
        return (
          <section>
            <h2>👤 Customers</h2>
            <p>View and manage all customer accounts and data.</p>
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td>
                    <td>
                      <button className="btn-small" onClick={() => { setSelectedCustomer(c); setActiveSection('ViewCustomer'); }}>View</button>
                      <button className="btn-small btn-delete" onClick={() => handleDeleteCustomer(c.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );

      case 'Inventory':
        return (
          <section>
            <h2>📦 Inventory</h2>
            <p>Monitor stock levels and restock alerts.</p>
            <table className="data-table">
              <thead>
                <tr><th>Product</th><th>Stock</th><th>Reorder Level</th><th>Status</th></tr>
              </thead>
              <tbody>
                {inventory.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.product}</td><td>{item.stock}</td><td>{item.reorderLevel}</td>
                    <td className={item.stock <= item.reorderLevel ? 'status-warning' : 'status-ok'}>
                      {item.stock <= item.reorderLevel ? 'Out of Stock' : 'Stock OK'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );

      case 'Reviews':
        return (
          <section>
            <h2>⭐ Reviews</h2>
            <p>View customer feedback and ratings.</p>
            <table className="data-table">
              <thead>
                <tr><th>Product</th><th>Customer</th><th>Rating</th><th>Comment</th></tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id}>
                    <td>{r.product}</td><td>{r.customer}</td><td>{'⭐'.repeat(r.rating)}</td><td>{r.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );

        case 'Reports':
        return (
          <section>
            <h2>📊 Reports</h2>
            <p>Download and analyze sales reports.</p>
            <ul className="report-list">
              {reports.map(rep => (
                <li key={rep.id}>
                  {rep.name} – <small>{rep.date}</small>
                 <button className="btn-small btn-download" onClick={() => handleDownloadReport(rep)}>Download CSV</button>
                 </li>
              ))}
            </ul>
          </section>
        );


      default:
        return <section><h2>Section Not Found</h2></section>;
    }
  };
  

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="logo">🛍 TEN Clothing Admin</h2>
        <ul className="admin-menu">
          {['Dashboard','Orders','Products','Categories','Customers','Inventory','Reviews','Reports','Settings'].map(item => (
            <li key={item} onClick={() => { setActiveSection(item); /* reset sub-mode states */ setSelectedOrder(null); setSelectedProduct(null); setSelectedCustomer(null); }} className={activeSection === item ? 'active' : ''}>{item}</li>
          ))}
          <li onClick={handleLogoutClick} className="logout">Logout</li>
        </ul>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          {!(activeSection === 'Categories' || activeSection === 'Settings') && (
    <input type="text" placeholder="Search products, orders..." />
)}

          <div className="admin-user">
            <span>admin@clothing.com</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>
        {renderSection()}
      </main>
    </div>
  );
}

export default AdminDashboard;