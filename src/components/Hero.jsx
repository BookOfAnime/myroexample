import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <main className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="welcome animate-on-scroll">
          Welcome to <br />
          <span className="myro-text">MYRO</span>
        </h1>
        <p className="description animate-on-scroll">
          Myro the dog: Named after Solana Co-Founder Raj Gokal's dog Myro.
        </p>
        <div className="buttons animate-on-scroll">
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
        <img src="/myro.png" alt="Myro the dog" className="dog-image" />
      </div>
    </main>
  );
};

export default Hero;