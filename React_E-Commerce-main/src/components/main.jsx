import React from "react";
import "./main.css";

const Main = () => {
  return (
    <section className="main-hero">
      <img
        src="./assets/main.png.jpg"
        alt="Handmade Products"
        className="main-hero-image"
      />

      <div className="main-overlay">
        <div className="main-content">
          <h1>Desi Esty Handmade Products</h1>
          <p>Every product tells a handmade story</p>
        </div>
      </div>
    </section>
  );
};

export default Main;
