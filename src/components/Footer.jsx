import React from "react";
import "./Footer.css";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import twitterIcon from "../assets/twitter.png";
import { useAuth } from "../context/authContext.jsx";

function Footer() {
  const { user } = useAuth(); // ✅ get user details

  const isAdmin = user?.role === "admin";

  return (
    <footer className={`footer ${isAdmin ? "admin-footer" : "user-footer"}`}>
      <div className="footer-container">
        {/* ✅ Branding */}
        <div className="footer-brand">
          <h2>
            <span role="img" aria-label="Cart" style={{ marginRight: 8 }}>
              🛒
            </span>
            QuickBasket
          </h2>
          <p>Your one-stop shop for fresh groceries!</p>
        </div>

        {/* ✅ Links (Only for users, not admins) */}
        {!isAdmin && (
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/account">Account</a></li>
            </ul>
          </div>
        )}

        {/* ✅ Contact Section (same for both) */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@quickbasket.com</p>
          <p>Phone: +977-9823917146</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook" tabIndex="0">
              <img
                src={facebookIcon}
                alt="Facebook"
                style={{ width: 28, verticalAlign: "middle" }}
              />
            </a>
            <a href="#" aria-label="Instagram" tabIndex="0">
              <img
                src={instagramIcon}
                alt="Instagram"
                style={{ width: 28, verticalAlign: "middle" }}
              />
            </a>
            <a href="#" aria-label="Twitter" tabIndex="0">
              <img
                src={twitterIcon}
                alt="Twitter"
                style={{ width: 28, verticalAlign: "middle" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Footer Bottom */}
      <div className="footer-bottom">
        © 2025 QuickBasket. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
