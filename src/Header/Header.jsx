import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => (currentPath === path ? "active" : "");

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="header">
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <span className="close-icon">&#10006;</span>
        ) : (
          <>
            <span className="menu-icon"/>
            <span className="menu-icon"/>
            <span className="menu-icon"/>
          </>
        )}
      </div>

      <img className="logo" src="/Logo.png" alt="Logo" />

      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" className={`home ${isActive("/")}`} onClick={handleLinkClick}>HOME</Link>
        <Link to="/rank" className={`rank ${isActive("/rank")}`} onClick={handleLinkClick}>RANK</Link>
        <Link to="/contact" className={`contact ${isActive("/contact")}`} onClick={handleLinkClick}>CONTACT</Link>
        <Link to="/about" className={`about ${isActive("/about")}`} onClick={handleLinkClick}>ABOUT</Link>
        <Link to="/sitemap" className={`sitemap ${isActive("/sitemap")}`} onClick={handleLinkClick}>SITE Map</Link>
        <Link to="/FAQs" className={`faqs ${isActive("/FAQs")}`} onClick={handleLinkClick}>FAQs</Link>
      </div>

      <div className="settings">
        {/* Optional settings */}
      </div>
    </div>
  );
};

export default Header;

