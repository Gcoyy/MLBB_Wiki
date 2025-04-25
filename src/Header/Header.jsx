import "./Header.css"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom";


function Header() {
const [language, setLanguage] = useState("English");
const location = useLocation();
const currentPath = location.pathname;

const isActive = (path) => currentPath === path ? 'active' : '';

  return (
    <div className="header">
      <img className="logo" src="/Logo.png" alt="Logo" />
      <div className="menu">
        <Link to="/" className={`home ${isActive("/")}`}>HOME</Link>
        <Link to="/rank" className={`rank ${isActive("/rank")}`}>RANK</Link>
        <Link to="/contact" className={`contact ${isActive("/contact")}`}>CONTACT</Link>
        <Link to="/about" className={`about ${isActive("/about")}`}>ABOUT</Link>
        <Link to="/sitemap" className={`sitemap ${isActive("/sitemap")}`}>SITE Map</Link>
        <Link to="/FAQs" className={`faqs ${isActive("/FAQs")}`}>FAQs</Link>
      </div>
      <div className="settings">
        <img className="settings_icon" src="/settings.png" alt="Settings icon" />
        <p>{language}</p>
        <div className="triangle" />
      </div>
    </div>
  );
}

export default Header;