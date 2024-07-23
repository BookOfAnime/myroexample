import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/myro-logo.png" alt="Myro logo" className="logo-img" />
        <span className="logo-text">MYRO</span>
      </div>
      <nav className="nav">
        <a href="#" className="nav-item">Home</a>
        <a href="#" className="nav-item">About</a>
        <a href="#" className="nav-item">Tokenomics</a>
        <a href="#" className="nav-item">Whitepaper</a>
        <a href="#" className="nav-item">Socials</a>
      </nav>
      <button className="join-button">Join Telegram</button>
    </header>
  );
};

export default Header;