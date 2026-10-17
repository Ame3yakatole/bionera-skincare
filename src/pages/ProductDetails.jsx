
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-dark mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <main className="container py-5">
      <Link to="/" className="text-decoration-none text-dark">
        <ArrowLeft size={18} className="me-2" />
        Back to products
      </Link>

      <div className="row align-items-center g-5 mt-2">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded-4 w-100"
            style={{
              maxHeight: "520px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-6">
          <p className="text-uppercase text-secondary small">
            {product.category}
          </p>

          <h1 className="display-5 fw-bold">
            {product.name}
          </h1>

          <p className="text-warning mb-3">
            ★ {product.rating || "4.8"} / 5
          </p>

          <h3 className="fw-bold mb-3">
            ₹{product.price}
            {product.oldPrice && (
              <del className="text-secondary fs-5 ms-3">
                ₹{product.oldPrice}
              </del>
            )}
          </h3>

          <p className="text-secondary">
            {product.description ||
              "A gentle skincare essential designed to support your daily skincare routine."}
          </p>

          <div className="d-flex align-items-center gap-3 my-4">
            <span className="fw-semibold">Quantity:</span>

            <button
              className="btn btn-outline-dark"
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              disabled={quantity <= 1}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              className="btn btn-outline-dark"
              onClick={() =>
                setQuantity((q) => Math.min(10, q + 1))
              }
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-dark btn-lg rounded-pill px-4"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} className="me-2" />
            Add to Cart
          </button>

          <p className="small text-secondary mt-3">
            Free shipping on orders above ₹999.
          </p>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
