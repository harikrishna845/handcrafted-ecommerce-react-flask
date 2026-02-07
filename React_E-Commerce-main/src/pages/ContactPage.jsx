import React from "react";
import { Navbar, Footer } from "../components";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <>
      <Navbar />

      <section className="contact-section">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          Have a question or feedback? We’d love to hear from you.
        </p>

        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="5"
            placeholder="Enter your message"
          />

          <button type="submit" disabled>
            Send Message
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
