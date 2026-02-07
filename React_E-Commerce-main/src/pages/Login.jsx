import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("userEmail", email);
      alert("Login successful");
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />

      <section className="auth-section">
        <h1>Login</h1>
        <p className="auth-subtitle">
          Login to continue shopping.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="auth-link">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

          <button type="submit">Login</button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Login;
