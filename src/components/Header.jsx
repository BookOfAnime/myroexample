import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/char.png" alt="Myro logo" className="logo-img" />
          <span className="logo-text">$DOBS</span>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-toggle-icon">&#9776;</span>
        </button>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#hero" className="nav-item" onClick={toggleMenu}>Home</a></li>
            <li><a href="#about" className="nav-item" onClick={toggleMenu}>About</a></li>
            <li><a href="#features" className="nav-item" onClick={toggleMenu}>Features</a></li>
            <li><a href="#buy" className="nav-item" onClick={toggleMenu}>Buy</a></li>
          </ul>
          <button className="join-button">Join Telegram</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
