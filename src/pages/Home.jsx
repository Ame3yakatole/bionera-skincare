
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShoppingBag,
  Leaf,
  Droplets,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function Home() {
  const { cartCount } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Create category names from product data
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.description || "").toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-dark text-white text-center py-2 small">
        Free shipping on orders above ₹999 | Discover your natural glow
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
        <div className="container py-2">
          <Link
            className="navbar-brand fw-bold fs-3"
            to="/"
            style={{ letterSpacing: "2px" }}
          >
            bionera<span className="text-success">.</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bioneraNavbar"
            aria-controls="bioneraNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="bioneraNavbar"
          >
            <ul className="navbar-nav mx-auto gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#products">
                  Shop
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  Our Story
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <a
                href="#products"
                className="text-dark"
                aria-label="Search products"
              >
                <Search size={21} />
              </a>

              <Link
                to="/cart"
                className="text-dark position-relative"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <Link
  to="/login"
  className="btn btn-outline-dark rounded-pill px-3"
>
  Login
</Link>
 <Link
  to="/register"
  className="btn btn-outline-dark rounded-pill px-3"
>
  Register
</Link>
                <ShoppingBag size={23} />

                <span className="badge bg-success rounded-pill position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="py-5"
        style={{ backgroundColor: "#f3f5ed" }}
      >
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-white text-success rounded-pill px-3 py-2 mb-4">
                <Sparkles size={14} className="me-2" />
                CLEAN BEAUTY, NATURALLY
              </span>

              <h1
                className="display-3 fw-bold mb-4"
                style={{ lineHeight: 1.15 }}
              >
                Your skin,
                <br />
                your <span className="text-success">natural</span>
                <br />
                glow.
              </h1>

              <p className="fs-5 text-secondary mb-4">
                Thoughtful skincare for your everyday routine.
                Discover products to help your skin feel fresh,
                nourished, and cared for.
              </p>

              <a
                href="#products"
                className="btn btn-dark btn-lg rounded-pill px-4 py-3"
              >
                Explore skincare
                <ArrowRight size={18} className="ms-2" />
              </a>

              <div className="d-flex flex-wrap gap-4 mt-5">
                <span className="small">
                  <Leaf size={19} className="text-success me-2" />
                  Nature-inspired
                </span>

                <span className="small">
                  <Droplets
                    size={19}
                    className="text-success me-2"
                  />
                  Daily hydration
                </span>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85"
                alt="Skincare products in a natural setting"
                className="img-fluid rounded-4 w-100"
                style={{
                  height: "460px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-5">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <Leaf size={32} className="text-success mb-3" />

            <h5 className="fw-bold">Thoughtful Ingredients</h5>

            <p className="text-secondary">
              Explore skincare essentials for your daily routine.
            </p>
          </div>

          <div className="col-md-4">
            <Droplets size={32} className="text-success mb-3" />

            <h5 className="fw-bold">Everyday Hydration</h5>

            <p className="text-secondary">
              Find products that fit your personal skincare needs.
            </p>
          </div>

          <div className="col-md-4">
            <PackageCheck
              size={32}
              className="text-success mb-3"
            />

            <h5 className="fw-bold">Easy Shopping</h5>

            <p className="text-secondary">
              Browse your favorites and add them to your cart.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container py-5">
        <div className="text-center mb-4">
          <p className="text-success fw-semibold small text-uppercase">
            YOUR DAILY RITUAL
          </p>

          <h2 className="display-5 fw-bold">
            Skincare Favorites
          </h2>

          <p className="text-secondary">
            Discover your next skincare essential.
          </p>
        </div>

        {/* Search Bar */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-7 col-lg-5">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Search size={18} />
              </span>

              <input
                type="search"
                className="form-control py-2"
                placeholder="Search serums, moisturizers..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search skincare products"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`btn rounded-pill px-4 ${
                category === item
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Reusable ProductCard Components */}
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <Search
                size={42}
                className="text-secondary mb-3"
              />

              <h4>No products found</h4>

              <p className="text-secondary">
                Try a different search term or category.
              </p>

              <button
                type="button"
                className="btn btn-outline-dark rounded-pill px-4"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Our Story Section */}
      <section
        id="about"
        className="py-5"
        style={{ backgroundColor: "#f3f5ed" }}
      >
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=85"
                alt="Skincare products and botanical ingredients"
                className="img-fluid rounded-4 w-100"
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-lg-6">
              <p className="text-success fw-semibold small">
                A LITTLE ABOUT BIONERA
              </p>

              <h2 className="display-5 fw-bold mb-3">
                Simple routines.
                <br />
                Feel-good skincare.
              </h2>

              <p className="text-secondary mb-4">
                We believe skincare should feel simple and personal.
                Explore our collection and create a daily routine
                that works for you.
              </p>

              <a
                href="#products"
                className="btn btn-dark rounded-pill px-4 py-3"
              >
                Find Your Favorites
                <ArrowRight size={18} className="ms-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <Link
                to="/"
                className="text-white text-decoration-none"
              >
                <h3 className="fw-bold">
                  bionera<span className="text-success">.</span>
                </h3>
              </Link>

              <p className="text-white-50">
                Make room for your natural glow.
              </p>
            </div>

            <div className="col-md-3">
              <h6 className="fw-bold mb-3">Explore</h6>

              <p>
                <a
                  href="#products"
                  className="text-white-50 text-decoration-none"
                >
                  Shop Products
                </a>
              </p>

              <p>
                <a
                  href="#about"
                  className="text-white-50 text-decoration-none"
                >
                  Our Story
                </a>
              </p>
            </div>

            <div className="col-md-3">
              <h6 className="fw-bold mb-3">Shopping</h6>

              <p>
                <Link
                  to="/cart"
                  className="text-white-50 text-decoration-none"
                >
                  My Cart ({cartCount})
                </Link>
              </p>
            </div>
          </div>

          <hr className="border-secondary my-4" />

          <p className="small text-white-50 text-center mb-0">
            © {new Date().getFullYear()} Bionera Skincare. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;

