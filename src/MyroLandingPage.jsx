import React, { useEffect, useRef } from 'react';

const MyroLandingPage = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="app">
      <header className="header animate-on-scroll">
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

      <main className="main">
        <div className="hero-content animate-on-scroll">
          <h1 className="welcome">
            Welcome to <br />
            <span className="myro-text">MYRO</span>
          </h1>
          <p className="description">
            Myro the dog: Named after Solana Co-Founder Raj Gokal's dog Myro.
          </p>
          <div className="buttons">
            <button className="buy-button">
              Buy on Raydium
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="learn-button">Learn More</button>
          </div>
        </div>
        <div className="hero-image animate-on-scroll">
          <img src="/myro-dog.png" alt="Myro the dog" className="dog-image" />
        </div>
      </main>

      <section className="about animate-on-scroll">
        <h2 className="about-title">About $MYRO</h2>
        <div className="exchanges">
          {['Gate.io', 'Bitget', 'BINANCE', 'crypto.com', 'KUCOIN', 'POLONIEX'].map((exchange, index) => (
            <div key={index} className="exchange-bubble">
              <img src={`/${exchange.toLowerCase()}-logo.png`} alt={exchange} className="exchange-image" />
              <span className="exchange-text">{exchange}</span>
            </div>
          ))}
        </div>
        <div className="about-content">
          <div className="about-image">
            <img src="/myro-illustration.png" alt="Myro illustration" className="about-dog-image" />
          </div>
          <div className="about-text">
            <p>Many may ask, what is Myro? Myro is the name of the dog owned by Raj Gokal, one of the co-founders of Solana. This project pays homage to him, and his dog, and responds to the popular demand for dog-based narratives in the crypto space.</p>
            <p>Myro is more than just a cryptocurrency, it is also a movement. We believe that Solana has the potential to change the world for the better, and we are committed to making it more inclusive and welcoming for everyone.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyroLandingPage;