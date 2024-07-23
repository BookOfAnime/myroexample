import React, { useEffect, useRef } from 'react';

const About = () => {
  const aboutRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const exchanges = ['Gate.io', 'Bitget', 'BINANCE', 'crypto.com', 'KUCOIN', 'POLONIEX'];

  return (
    <section className="about" ref={aboutRef}>
      <h2 className="about-title animate-on-scroll">About $MYRO</h2>
      <div className="exchanges">
        {exchanges.map((exchange, index) => (
          <div key={index} className="exchange-bubble animate-on-scroll">
            <img src={`/${exchange.toLowerCase()}-logo.png`} alt={exchange} className="exchange-image" />
            <span className="exchange-text">{exchange}</span>
          </div>
        ))}
      </div>
      <div className="about-content">
        <div className="about-image animate-on-scroll">
          <img src="/myro.png" alt="Myro illustration" className="about-dog-image" />
        </div>
        <div className="about-text">
          <p className="animate-on-scroll">Many may ask, what is Myro? Myro is the name of the dog owned by Raj Gokal, one of the co-founders of Solana. This project pays homage to him, and his dog, and responds to the popular demand for dog-based narratives in the crypto space.</p>
          <p className="animate-on-scroll">Myro is more than just a cryptocurrency, it is also a movement. We believe that Solana has the potential to change the world for the better, and we are committed to making it more inclusive and welcoming for everyone.</p>
        </div>
      </div>
    </section>
  );
};

export default About;