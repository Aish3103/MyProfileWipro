import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../redux/productsSlice";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const patchPrice = (id) => {
    const newPrice = Math.round((Math.random() * 100 + 1) * 100) / 100;
    dispatch(updateProduct({ id, changes: { price: newPrice } }));
  };

  return (
    <div className="card p-3 mt-3">
      <h4>Products</h4>

      {status === "loading" && <p>Loading products…</p>}
      {status === "failed" && <p className="text-danger">Error: {error}</p>}

      <div className="list-group">
        {items.slice(0, 10).map(p => (
          <div key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div className="text-muted">Price: {p.price}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => patchPrice(p.id)}>
                Update Price
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
