import React, { useState } from 'react';

const initialInventory = [
  { product: 'Kids Frocks', stock: 60, reorderLevel: 10 },
  { product: "Men's Kurta", stock: 50, reorderLevel: 20 },
  { product: "Women's Traditional Wear", stock: 15, reorderLevel: 20 },
  { product: 'Kids Jeans', stock: 40, reorderLevel: 20 },
  { product: 'Evening Gown', stock: 0, reorderLevel: 10 },    
  { product: 'Kids jeans', stock: 0, reorderLevel: 10 },
  { product: "Women's Kurta Sets", stock: 50, reorderLevel: 20 },
  { product: "Men's Shirts", stock: 0, reorderLevel: 10 },
];

function Inventory() {
  const [inventory] = useState(initialInventory);

  return (
    <section>
      <h2>📦 Inventory</h2>
      <p>Monitor stock levels and restock alerts.</p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Reorder Level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, idx) => (
            <tr key={idx}>
              <td>{item.product}</td>
              <td>{item.stock}</td>
              <td>{item.reorderLevel}</td>
              <td className={item.stock <= item.reorderLevel ? 'status-warning' : 'status-ok'}>
                {item.stock <= item.reorderLevel ? 'Out of Stock' : 'Stock OK'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Inventory;
