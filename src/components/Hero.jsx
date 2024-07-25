import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const Hero = () => {
  const heroRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Calculate tilt based on mouse position
    const tiltX = (y - 0.5) * 10;
    const tiltY = (x - 0.5) * -10;

    imageContainerRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    // Calculate shadow and glow based on mouse position
    const shadowX = 30 * (x - 0.5);
    const shadowY = 30 * (y - 0.5);
    const hue = (x * 360) | 0;
    imageContainerRef.current.style.boxShadow = `
      ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.5),
      0 0 70px 30px hsla(${hue}, 100%, 50%, 0.7)
    `;
  };

  const handleMouseLeave = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      imageContainerRef.current.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }
    setIsHovered(false);
  };

  return (
    <main className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="welcome animate-on-scroll">
          Welcome to <br />
          <span className="myro-text">DOBS</span>
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
      <div 
        className={`hero-image-container ${isHovered ? 'hovered' : ''} animate-on-scroll`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={imageContainerRef}
      >
        <img src="/sec.webp" alt="Myro the dog" className="dog-image" ref={imageRef} />
      </div>
    </main>
  );
};

export default Hero;
