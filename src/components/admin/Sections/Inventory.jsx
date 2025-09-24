import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/products');
        const list = Array.isArray(res.data?.data) ? res.data.data : [];
        const mapped = list.map(p => ({
          _id: p._id,
          product: p.name,
          stock: Number(p.netQuantity || 0),
          reorderLevel:  Number(p.reorderLevel || 10),
        }));
        setInventory(mapped);
      } catch (e) {
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <h2>📦 Inventory</h2>
      <p>Monitor stock levels and restock alerts.</p>
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Reorder Level</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.product}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={item.stock}
                  onChange={(e) =>
                    setInventory((prev) =>
                      prev.map((row) =>
                        row._id === item._id
                          ? { ...row, stock: Number(e.target.value) }
                          : row
                      )
                    )
                  }
                  style={{ width: 80 }}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={item.reorderLevel}
                  onChange={(e) =>
                    setInventory((prev) =>
                      prev.map((row) =>
                        row._id === item._id
                          ? { ...row, reorderLevel: Number(e.target.value) }
                          : row
                      )
                    )
                  }
                  style={{ width: 80 }}
                />
              </td>
              <td className={item.stock <= item.reorderLevel ? 'status-warning' : 'status-ok'}>
                {item.stock <= item.reorderLevel ? 'Out of Stock' : 'Stock OK'}
              </td>
              <td>
                <button
                  className="btn-small"
                  disabled={savingId === item._id}
                  onClick={async () => {
                    try {
                      setSavingId(item._id);
                      const form = new FormData();
                      form.append('netQuantity', item.stock);
                      // If backend supports reorder level, include it
                      // form.append('reorderLevel', item.reorderLevel);
                      await axios.put(
                        `http://localhost:5000/api/products/updateProduct/${item._id}`,
                        form,
                        { headers: { 'Content-Type': 'multipart/form-data' } }
                      );
                    } catch (e) {
                      alert('Failed to update stock');
                    } finally {
                      setSavingId(null);
                    }
                  }}
                >
                  {savingId === item._id ? 'Saving...' : 'Save'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </section>
  );
}

export default Inventory;
