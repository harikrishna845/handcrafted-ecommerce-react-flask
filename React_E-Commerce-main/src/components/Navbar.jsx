import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const isLoggedIn = localStorage.getItem("userEmail");

  return (
    <header className="nav-wrapper">
      <div className="nav-container">
        {/* Brand */}
        <NavLink to="/" className="nav-brand">
          React<span>Store</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
          <NavLink to="/product" className="nav-item">
            Products
          </NavLink>
          <NavLink to="/about" className="nav-item">
            About
          </NavLink>
          <NavLink to="/contact" className="nav-item">
            Contact
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Login & Register (only if NOT logged in) */}
          {!isLoggedIn && (
            <>
              <NavLink to="/login" className="nav-btn">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-btn outline">
                Register
              </NavLink>
            </>
          )}

          {/* Profile (only if logged in) */}
          {isLoggedIn && (
            <NavLink to="/profile" className="nav-btn">
              Profile
            </NavLink>
          )}

          {/* Cart (always visible) */}
          <NavLink to="/cart" className="nav-btn cart">
            Cart <span className="cart-count">{cartItems.length}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
