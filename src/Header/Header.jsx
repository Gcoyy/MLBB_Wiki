import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [rankDropdownOpen, setRankDropdownOpen] = useState(false);

  const isActive = (path) => currentPath === path ? "active" : "";

  const handleLinkClick = () => {
    setMenuOpen(false);
    setRankDropdownOpen(false);
  };

  const toggleRankDropdown = () => {
    setRankDropdownOpen(!rankDropdownOpen);
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

      <img className="logo" src="/Logo.png" alt="Logo" title="Logo"/>

      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" className={`home ${isActive("/")}`} onClick={handleLinkClick}>HOME</Link>
        
        <div 
          className={`rank-dropdown ${isActive("/warrior-gm") || isActive("/epic-legend") || isActive("/mythic") || isActive("/mythical-honor") || isActive("/mythical-glory") ? "active" : ""}`}
          onClick={toggleRankDropdown}
        >
          <span className="rank-dropdown-toggle">
            RANK {rankDropdownOpen ? "▲" : "▼"}
          </span>
          {rankDropdownOpen && (
            <div className="rank-dropdown-menu">
              <Link to="/warrior-gm" className={`rank-dropdown-item ${isActive("/warrior-gm")}`} onClick={handleLinkClick}>
                Warrior - Grandmaster
              </Link>
              <Link to="/epic-legend" className={`rank-dropdown-item ${isActive("/epic-legend")}`} onClick={handleLinkClick}>
                Epic - Legend
              </Link>
              <Link to="/mythic" className={`rank-dropdown-item ${isActive("/mythic")}`} onClick={handleLinkClick}>
                Mythic
              </Link>
              <Link to="/mythical-honor" className={`rank-dropdown-item ${isActive("/mythical-honor")}`} onClick={handleLinkClick}>
                Mythical Honor
              </Link>
              <Link to="/mythical-glory" className={`rank-dropdown-item ${isActive("/mythical-glory")}`} onClick={handleLinkClick}>
                Mythical Glory
              </Link>
            </div>
          )}
        </div>

        <Link to="/contact" className={`contact ${isActive("/contact")}`} onClick={handleLinkClick}>CONTACT</Link>
        <Link to="/about" className={`about ${isActive("/about")}`} onClick={handleLinkClick}>ABOUT</Link>
        <Link to="/sitemap" className={`sitemap ${isActive("/sitemap")}`} onClick={handleLinkClick}>SITE MAP</Link>
        <Link to="/FAQs" className={`faqs ${isActive("/FAQs")}`} onClick={handleLinkClick}>FAQs</Link>
      </div>

      <div className="settings">
        {/* Optional settings */}
      </div>
    </div>
  );
};

export default Header;