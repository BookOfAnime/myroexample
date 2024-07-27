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
          <img src="/char.png" alt="$DOBS logo" className="logo-img" />
          <span className="logo-text">$DOBS</span>
        </div>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {['Home', 'About', 'Features', 'Buy'].map((item, index) => (
              <li key={index} className="nav-item">
                <a href={`#${item.toLowerCase()}`} onClick={toggleMenu}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-toggle-icon"></span>
        </button>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            {['Home', 'About', 'Features', 'Buy'].map((item, index) => (
              <li key={index} className="mobile-nav-item">
                <a href={`#${item.toLowerCase()}`} onClick={toggleMenu}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
