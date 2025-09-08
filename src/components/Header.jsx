import React from "react";
import { NavLink } from "react-router-dom";

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="/dexspace.png" alt="dexspace logo" className="logo-img" />
      </div>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>
          Home
        </NavLink>
        <NavLink to="/find-gems" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>
          Find Gems
        </NavLink>
        <NavLink to="/swap" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>
          Swap
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>
          About
        </NavLink>
      </nav>

      <div>
        <label class="switch">
          <input type="checkbox" onClick={toggleTheme}/>
          {/* <span class="slider round">{theme === "dark" ? "🌙" : "🌞"}</span> */}
          <span class="slider round"></span>
        </label>
      </div>
    </header>
  );
}

export default Header;
