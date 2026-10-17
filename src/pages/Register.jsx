import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, Mail, LockKeyhole, Sparkles } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("bioneraUser") || "null"
    );

    if (
      existingUser &&
      existingUser.email.toLowerCase() === formData.email.trim().toLowerCase()
    ) {
      setError("An account with this email already exists. Please log in.");
      return;
    }

    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    localStorage.setItem("bioneraUser", JSON.stringify(newUser));

    navigate("/login");
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="text-center mb-4">
            <Sparkles size={36} className="text-success mb-2" />
            <h1 className="fw-bold">Join Bionera</h1>
            <p className="text-secondary">
              Create your account and start your skincare journey.
            </p>
          </div>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <h2 className="h4 fw-bold mb-4">Create your account</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <UserRound size={18} />
                    </span>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Mail size={18} />
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <LockKeyhole size={18} />
                    </span>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 rounded-pill"
                >
                  Create Account
                </button>
              </form>

              <p className="text-center text-secondary mt-4 mb-0">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-success fw-semibold text-decoration-none"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;