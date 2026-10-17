
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
      {/* Product image */}
      <div
        className="position-relative"
        style={{ backgroundColor: "#f5f5ef" }}
      >
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top product-card-image"
            loading="lazy"
          />
        </Link>

        {/* Product tag */}
        {product.tag && (
          <span className="badge bg-white text-dark position-absolute top-0 start-0 m-3">
            {product.tag}
          </span>
        )}

        {/* Wishlist button */}
        <button
          type="button"
          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 wishlist-button"
          onClick={() => setIsFavorite((previous) => !previous)}
          aria-label={
            isFavorite
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={19}
            fill={isFavorite ? "#198754" : "none"}
            color={isFavorite ? "#198754" : "#333333"}
          />
        </button>
      </div>

      {/* Product information */}
      <div className="card-body p-3 p-md-4 d-flex flex-column">
        <p className="small text-secondary mb-2">
          {product.category}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none text-dark"
        >
          <h5 className="fw-bold product-card-title">
            {product.name}
          </h5>
        </Link>

        {product.rating != null && (
          <div className="d-flex align-items-center gap-1 mb-2">
            <Star size={15} fill="#e6b34c" color="#e6b34c" />
            <span className="small">
              {product.rating}
            </span>
          </div>
        )}

        <p className="text-secondary small product-card-description">
          {product.description}
        </p>

        {/* Price */}
        <div className="d-flex align-items-center gap-2 mb-3 mt-auto">
          <span className="fw-bold fs-5">
            ₹{product.price}
          </span>

          {product.oldPrice != null && (
            <del className="text-secondary small">
              ₹{product.oldPrice}
            </del>
          )}
        </div>

        {/* Add to cart */}
        <button
          type="button"
          className="btn btn-dark rounded-pill w-100"
          onClick={handleAddToCart}
        >
          <ShoppingBag size={17} className="me-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
