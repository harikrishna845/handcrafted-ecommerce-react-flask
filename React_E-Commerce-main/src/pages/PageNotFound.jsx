import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <Navbar />

      <section className="notfound-section">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="notfound-btn">
          ← Back to Home
        </Link>
      </section>
    </>
  );
};

export default PageNotFound;
