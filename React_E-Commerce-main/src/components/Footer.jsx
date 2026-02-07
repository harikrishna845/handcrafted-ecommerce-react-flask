import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>
          Made with <span className="heart">♥</span> by{" "}
          <a
            href="https://example.com"
            target="_blank"
            rel="noreferrer"
          >
            HLS
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
