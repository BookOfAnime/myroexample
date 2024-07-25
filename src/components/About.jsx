import React, { useEffect, useRef } from "react";

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".animate-on-scroll")
              .forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add("animate");
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

  const exchanges = [
    "Gate.io",
    "Bitget",
    "BINANCE",
    "crypto.com",
    "KUCOIN",
    "POLONIEX",
  ];

  return (
    <section className="about" ref={aboutRef}>
      <h2 className="about-title animate-on-scroll">Who is $DOBS?</h2>
      <div className="exchanges">
        {exchanges.map((exchange, index) => (
          <div key={index} className="exchange-bubble animate-on-scroll">
            <img
              src={`/${exchange.toLowerCase()}-logo.png`}
              alt={exchange}
              className="exchange-image"
            />
            <span className="exchange-text">{exchange}</span>
          </div>
        ))}
      </div>
      <div className="about-content">
        <div className="about-image animate-on-scroll">
          <img
            src="/green.png"
            alt="Myro illustration"
            className="about-dog-image"
          />
        </div>
        <div className="about-text">
          <p className="animate-on-scroll">
            DOBs' is a legendary character within the Digital world of Solana,
            known as the Guardian of Trust. He embodies integrity transparency,
            and community protection, ensuring fairness in all transactions.
          </p>
          <p className="animate-on-scroll">
            Dobs' unwavering dedication thrives and conflicts are peacefully
            resolved, making him a referred figure in Solana's history.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
