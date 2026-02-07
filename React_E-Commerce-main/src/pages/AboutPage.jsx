import React from "react";
import { Navbar, Footer } from "../components";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      <section className="about-section">
        <div className="about-header">
          <h1>About Us</h1>
          <p>
            We celebrate handcrafted products made with passion, tradition, and
            creativity. Every piece tells a story of skill and culture.
          </p>
        </div>

        <div className="about-content">
          <p>
            Our collection brings together artisans who preserve traditional
            craftsmanship while creating products for modern living. From
            pottery to handloom and jewelry, each item reflects dedication and
            authenticity.
          </p>
        </div>

        <h2 className="products-title">Our Products</h2>

        <div className="about-products">
          <div className="about-card">
            <img
              src="https://th.bing.com/th/id/OIP.gvokSHPmZGfnnYjST7rvBAHaFM?w=252&h=180&c=7&r=0&o=5"
              alt="Pottery"
            />
            <span>Pottery</span>
          </div>

          <div className="about-card">
            <img
              src="https://images.pexels.com/photos/1117272/pexels-photo-1117272.jpeg"
              alt="Wood Craft"
            />
            <span>Wood Craft</span>
          </div>

          <div className="about-card">
            <img
              src="https://th.bing.com/th/id/OIP.2MtdvgsKOaahnUIBZ8xqKwHaE8?w=235&h=180&c=7&r=0&o=5"
              alt="Handloom"
            />
            <span>Handloom</span>
          </div>

          <div className="about-card">
            <img
              src="https://th.bing.com/th/id/OIP.7iRcIsPLWLJHKSazfyctKQHaIT?w=208&h=234&c=7&r=0&o=5"
              alt="Jewelry"
            />
            <span>Jewelry</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
