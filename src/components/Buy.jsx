import React, { useEffect, useRef } from 'react';

const Buy = () => {
  const buyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate');
              }, index * 200); // Stagger animation by 200ms
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (buyRef.current) {
      observer.observe(buyRef.current);
    }

    return () => {
      if (buyRef.current) {
        observer.unobserve(buyRef.current);
      }
    };
  }, []);

  return (
    <section className="buy" ref={buyRef}>
      <div className="buy-content">
        <div className="buy-image animate-on-scroll">
          <svg viewBox="0 0 300 300" width="100%" height="100%">
            <text x="10" y="30" fill="white" fontSize="24">1</text>
            <rect x="40" y="10" width="100" height="80" stroke="white" strokeWidth="2" fill="none" />
            <rect x="50" y="20" width="80" height="60" stroke="white" strokeWidth="2" fill="none" />
            <line x1="70" y1="90" x2="110" y2="90" stroke="white" strokeWidth="2" />
            
            <text x="10" y="160" fill="white" fontSize="24">2</text>
            <rect x="40" y="140" width="100" height="80" stroke="white" strokeWidth="2" fill="none" />
            <line x1="50" y1="160" x2="130" y2="160" stroke="white" strokeWidth="2" />
            <line x1="50" y1="180" x2="130" y2="180" stroke="white" strokeWidth="2" />
            <line x1="50" y1="200" x2="130" y2="200" stroke="white" strokeWidth="2" />
            
            <text x="10" y="290" fill="white" fontSize="24">3</text>
            <circle cx="90" cy="260" r="40" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="75" cy="250" r="5" fill="white" />
            <circle cx="105" cy="250" r="5" fill="white" />
            <path d="M 70 275 Q 90 290 110 275" stroke="white" strokeWidth="2" fill="none" />
            
            <path d="M 140 50 Q 170 80 140 110" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <path d="M 140 180 Q 170 210 140 240" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </svg>
        </div>
        <div className="buy-text animate-on-scroll">
          <h2 className="buy-title">How to buy $MYRO</h2>
          <p className="buy-description">
            To buy $MYRO, download phantom wallet, purchase $SOL from an exchange or bridge $SOL and send it to your Phantom wallet then buy $MYRO on Jupiter or Raydium. You can also buy $MYRO on a wide variety of centralised exchanges, including Crypto.com, Kucoin, Bybit and others.
          </p>
          <a href="https://phantom.app/" className="get-phantom-button" target="_blank" rel="noopener noreferrer">
            Get Phantom
          </a>
        </div>
      </div>
    </section>
  );
};

export default Buy;