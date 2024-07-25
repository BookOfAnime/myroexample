import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/char.png" alt="Myro logo" className="logo-img" />
        <span className="logo-text">$DOBS</span>
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <a href="#hero" className="nav-item">Home</a>
        <a href="#about" className="nav-item">About</a>
        <a href="#features" className="nav-item">Features</a>
        <a href="#buy" className="nav-item">Buy</a>
      </nav>
      <button className="join-button">Join Telegram</button>
    </header>
  );
};

export default Header;
