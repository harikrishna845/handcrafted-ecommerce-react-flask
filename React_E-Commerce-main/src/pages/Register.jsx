import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components";
import "./Login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Registered successfully");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="auth-section">
        <h1>Register</h1>
        <p className="auth-subtitle">
          Create an account to start shopping.
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <button type="submit">Register</button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Register;
