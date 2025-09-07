import React, { useState } from 'react';

const initialReviews = [
  { id: 1, product: "Men's Kurta", customer: 'John Doe', rating: 4, comment: 'Great fit!' },
  { id: 2, product: "Women's Traditional Wear", customer: 'Jane Smith', rating: 5, comment: 'Beautiful!' },
  { id: 3, product: 'Kids Jeans', customer: 'Alice Brown', rating: 3, comment: 'Good for price.' },
  { id: 4, product: 'Evening Gown', customer: 'Charlie Davis', rating: 4, comment: 'Lovely material.' },
  { id: 5, product: "Men's Hoodie", customer: 'Koushik', rating: 5, comment: 'Loved it!' },
  { id: 6, product: 'Kids Frock', customer: 'Charlie Davis', rating: 4, comment: 'Nice!' },
  { id: 7, product: "Women's kurta set", customer: 'Nikitha', rating: 4, comment: 'Worth one.' },
];

function Reviews() {
  const [reviews] = useState(initialReviews);

  return (
    <section>
      <h2>⭐ Reviews</h2>
      <p>View customer feedback and ratings.</p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Customer</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(r => (
            <tr key={r.id}>
              <td>{r.product}</td>
              <td>{r.customer}</td>
              <td>{'⭐'.repeat(r.rating)}</td>
              <td>{r.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Reviews;
