import React, { useEffect, useRef } from "react";
import './About.css';

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
                }, index * 100); // Stagger animation by 100ms for faster effect
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

  return (
    <section className="about" ref={aboutRef}>
      <h2 className="about-title">
        <span className="animate-on-scroll">W</span>
        <span className="animate-on-scroll">h</span>
        <span className="animate-on-scroll">o</span>
        <span className="animate-on-scroll"> </span>
        <span className="animate-on-scroll">i</span>
        <span className="animate-on-scroll">s</span>
        <span className="animate-on-scroll"> </span>
        <span className="animate-on-scroll">$</span>
        <span className="animate-on-scroll">D</span>
        <span className="animate-on-scroll">O</span>
        <span className="animate-on-scroll">B</span>
        <span className="animate-on-scroll">S</span>
        <span className="animate-on-scroll">?</span>
      </h2>
      <div className="about-content">
        <div className="about-image animate-on-scroll">
          <img
            src="/DOBS.png"
            alt="Myro illustration"
            className="about-dog-image"
          />
        </div>
        <div className="about-text">
          <p className="animate-on-scroll">
            <span className="highlight animate-on-scroll">DOBs</span> is a <span className="highlight animate-on-scroll">legendary</span> character within the Digital world of Solana,
            known as the <span className="highlight animate-on-scroll">Guardian of Trust</span>. He embodies <span className="highlight animate-on-scroll">integrity</span>, <span className="highlight animate-on-scroll">transparency</span>, and <span className="highlight animate-on-scroll">community protection</span>, ensuring fairness in all transactions.
          </p>
          <p className="animate-on-scroll">
            DOBs' unwavering <span className="highlight animate-on-scroll">dedication</span> thrives and conflicts are <span className="highlight animate-on-scroll">peacefully resolved</span>, making him a referred figure in Solana's history.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
