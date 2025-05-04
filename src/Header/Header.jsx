import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => (currentPath === path ? "active" : "");

  return (
    <div className="header">
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </div>

      <img className="logo" src="/Logo.png" alt="Logo" />

      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" className={`home ${isActive("/")}`}>HOME</Link>
        <Link to="/rank" className={`rank ${isActive("/rank")}`}>RANK</Link>
        <Link to="/contact" className={`contact ${isActive("/contact")}`}>CONTACT</Link>
        <Link to="/about" className={`about ${isActive("/about")}`}>ABOUT</Link>
        <Link to="/sitemap" className={`sitemap ${isActive("/sitemap")}`}>SITE Map</Link>
        <Link to="/FAQs" className={`faqs ${isActive("/FAQs")}`}>FAQs</Link>
      </div>

      <div className="settings">
        {/* Optional settings */}
      </div>
    </div>
  );
};

export default Header;
