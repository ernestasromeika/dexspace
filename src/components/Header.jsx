import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src="/dexspace.png" alt="dexspace logo" className="logo-img" />
      </div>

      {/* Navigation */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"} onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/find-gems" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"} onClick={() => setMenuOpen(false)}>
          Find Gems
        </NavLink>
        <NavLink to="/swap" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"} onClick={() => setMenuOpen(false)}>
          Swap
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"} onClick={() => setMenuOpen(false)}>
          About
        </NavLink>
      </nav>

      {/* Theme toggle */}
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>

      

      {/* Hamburger button (shown on mobile) */}
      <button 
        className="hamburger" 
        onClick={() => setMenuOpen(!menuOpen)} 
        aria-label="Toggle menu"
      >
        ☰
      </button>

    </header>
  );
}

export default Header;
