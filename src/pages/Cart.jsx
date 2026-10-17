
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const shipping = cartTotal >= 999 || cartTotal === 0 ? 0 : 79;
  const grandTotal = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="container text-center py-5">
        <ShoppingBag size={65} className="text-secondary mb-4" />

        <h1 className="fw-bold">Your cart is empty</h1>

        <p className="text-secondary mb-4">
          Discover your skincare favorites and start your routine.
        </p>

        <Link to="/" className="btn btn-dark rounded-pill px-4 py-3">
          <ArrowLeft size={18} className="me-2" />
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold">Your Shopping Cart</h1>
          <p className="text-secondary mb-0">
            Review your skincare essentials.
          </p>
        </div>

        <button
          className="btn btn-outline-danger rounded-pill"
          onClick={clearCart}
        >
          <Trash2 size={17} className="me-2" />
          Clear Cart
        </button>
      </div>

      <div className="row g-4">
        {/* Cart items */}
        <div className="col-lg-8">
          {cart.map((item) => (
            <div
              className="card border-0 shadow-sm rounded-4 mb-3"
              key={item.id}
            >
              <div className="card-body p-3 p-md-4">
                <div className="row align-items-center g-3">
                  <div className="col-4 col-md-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-3 w-100"
                      style={{
                        height: "130px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="col-8 col-md-9">
                    <div className="d-flex justify-content-between gap-2">
                      <div>
                        <p className="text-secondary small mb-1">
                          {item.category}
                        </p>
                        <h5 className="fw-bold">{item.name}</h5>
                        <p className="fw-semibold">
                          ₹{item.price}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn btn-light text-danger align-self-start"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm rounded-circle"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm rounded-circle"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>

                      <span className="ms-auto fw-bold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link to="/" className="text-dark text-decoration-none">
            <ArrowLeft size={17} className="me-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Order Summary</h4>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>

              {cartTotal < 999 && (
                <p className="small text-success">
                  Add ₹{999 - cartTotal} more for free shipping.
                </p>
              )}

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-4">₹{grandTotal}</span>
              </div>

              <button
                type="button"
                className="btn btn-dark rounded-pill w-100 py-3"
                onClick={() =>
                  alert("Checkout will be added in the next step!")
                }
              >
                Proceed to Checkout
              </button>

              <p className="text-secondary text-center small mt-3 mb-0">
                Thank you for shopping with Bionera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
