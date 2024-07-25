import React, { useEffect, useRef } from 'react';
import { FaWallet, FaExchangeAlt, FaRocket } from 'react-icons/fa';
import './Buy.css';

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
              }, index * 200);
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
        <h2 className="buy-title animate-on-scroll">How to buy $DOBS</h2>
        <div className="buy-steps">
          <div className="buy-step animate-on-scroll">
            <div className="step-icon">
              <FaWallet />
            </div>
            <h3>1. Get a Wallet</h3>
            <p>Download and set up a Phantom wallet</p>
          </div>
          <div className="buy-step animate-on-scroll">
            <div className="step-icon">
              <FaExchangeAlt />
            </div>
            <h3>2. Get SOL</h3>
            <p>Purchase $SOL from an exchange or bridge it</p>
          </div>
          <div className="buy-step animate-on-scroll">
            <div className="step-icon">
              <FaRocket />
            </div>
            <h3>3. Buy $MYRO</h3>
            <p>Use Jupiter or Raydium to buy $MYRO</p>
          </div>
        </div>
        <div className="button-container">
          <a href="https://phantom.app/" className="get-phantom-button animate-on-scroll" target="_blank" rel="noopener noreferrer">
            Get Started with Phantom
          </a>
          <img src="/greenChar.png" alt="Character" className="button-character animate-on-scroll" />
        </div>
      </div>
    </section>
  );
};

export default Buy;
