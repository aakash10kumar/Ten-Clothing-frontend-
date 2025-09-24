import React, { useMemo, useState } from "react";

function Reviews({ reviewsData }) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [query, setQuery] = useState("");

  // Filter reviews based on search query
  const filteredReviews = useMemo(() => {
    if (!reviewsData) return [];
    if (!query.trim()) return reviewsData;

    const q = query.toLowerCase();
    return reviewsData.filter(
      (r) =>
        (r.productName || r.productId?.name || "")
          .toLowerCase()
          .includes(q) ||
        (r.userName || r.userId?.name || "")
          .toLowerCase()
          .includes(q) ||
        (r.comment || r.review || "").toLowerCase().includes(q)
    );
  }, [reviewsData, query]);

  return (
    <section>
      {!selectedReview ? (
        <>
          <h2>⭐ Customer Reviews</h2>
          <input
            type="text"
            placeholder="Search by product, customer, or comment"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: 320, width: "100%", marginBottom: 12 }}
          />
          {filteredReviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((r) => (
                  <tr key={r._id}>
                    <td>{r.productName || r.productId?.name || "Unknown Product"}</td>
                    <td>{r.userName || r.userId?.name || "Guest User"}</td>
                    <td>{"⭐".repeat(r.rating || 0)}</td>
                    <td>{r.comment || r.review || "-"}</td>
                    <td>
                      <button onClick={() => setSelectedReview(r)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <>
          <h2>Review Details</h2>
          <p>
            <strong>Product:</strong>{" "}
            {selectedReview.productName || selectedReview.productId?.name || "Unknown Product"}
          </p>
          <p>
            <strong>Customer:</strong>{" "}
            {selectedReview.userName || selectedReview.userId?.name || "Guest User"}
          </p>
          <p>
            <strong>Rating:</strong> {"⭐".repeat(selectedReview.rating || 0)}
          </p>
          <p>
            <strong>Comment:</strong> {selectedReview.comment || selectedReview.review || "-"}
          </p>
          <button onClick={() => setSelectedReview(null)}>Back to Reviews</button>
        </>
      )}
    </section>
  );
}

export default Reviews;
