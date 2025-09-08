import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.scss";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import FindGems from "./pages/FindGems.jsx";
import Swap from "./pages/Swap.jsx"; // renamed
import About from "./pages/About.jsx";

function App() {
  const [theme, setTheme] = useState("dark");

  // Load saved theme from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
    }
  }, []);

  // Save theme whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-gems" element={<FindGems />} />
          <Route path="/swap" element={<Swap />} /> {/* moved */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
