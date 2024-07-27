import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src="/DOBS.png" alt="$DOBS logo" className="logo-img" />
        $DOBS
      </div>
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <a href="#about">About</a>
        <a href="#token">Token</a>
        <a href="#nft">NFT</a>
        <a href="#dapp">Dapp</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="launch-app-btn">Join Us! →</button>
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;