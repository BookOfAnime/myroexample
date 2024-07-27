import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setGlitch(true);
  };

  useEffect(() => {
    if (glitch) {
      const timer = setTimeout(() => setGlitch(false), 500);
      return () => clearTimeout(timer);
    }
  }, [glitch]);

  return (
    <header className="header">
      <div className="header-container">
        <div className={`logo ${glitch ? 'glitch' : ''}`}>
          <img src="/DOBS.png" alt="$DOBS logo" className="logo-img" />
          <span className="logo-text">$DOBS</span>
        </div>
        <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="menu-toggle-icon"></div>
        </button>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {['Home', 'About', 'Features', 'Buy'].map((item, index) => (
              <li key={index} className="nav-item-wrapper" style={{ '--i': index }}>
                <a href={`#${item.toLowerCase()}`} className="nav-item" onClick={toggleMenu}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button className="join-button">
            <span className="button-text">Join Telegram</span>
            <span className="button-icon">🚀</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
