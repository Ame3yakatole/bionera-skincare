import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function NotFound() {
  return (
    <main className="container text-center py-5">
      <h1 className="display-4 fw-bold">404</h1>
      <h2 className="h4">Page Not Found</h2>
      <p className="text-secondary">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-success rounded-pill px-4">
        Back to Home
      </Link>
    </main>
  );
}

function App() {
  return (
    <>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

