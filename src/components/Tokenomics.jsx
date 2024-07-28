import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Tokenomics.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Tokenomics = () => {
  const [copySuccess, setCopySuccess] = useState('');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleElement = titleRef.current;
    const boxes = containerRef.current.querySelectorAll('.tokenomics-box');

    // Create a timeline for the animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Starts animation when the top of the section is 80% from the top of the viewport
        end: "bottom 20%", // Ends animation when the bottom of the section is 20% from the top of the viewport
        toggleActions: "play none none reverse"
      }
    });

    // Add animations to the timeline
    tl.fromTo(titleElement, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(boxes, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      "-=0.5" // Start slightly before the title animation ends
    );

    // Cleanup function
    return () => {
      tl.kill(); // Kill the timeline on component unmount
    };
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <section className="tokenomics" ref={sectionRef}>
      <div className="tokenomics-title-container" ref={titleRef}>
        <img src="/otherChar.png" alt="Character" className="tokenomics-character" />
        <h2 className="tokenomics-title glow-effect">Tokenomics</h2>
        <img src="/otherChar.png" alt="Character" className="tokenomics-character mirrored" />
      </div>
      <div className="tokenomics-container" ref={containerRef}>
        <div className="tokenomics-row">
          <div className="tokenomics-box glow-on-hover" onClick={() => handleCopy('$DOBS')}>
            <span className="tokenomics-label">Symbol</span>
            <span className="tokenomics-value">$DOBS</span>
          </div>
          <div className="tokenomics-box glow-on-hover" onClick={() => handleCopy('0/0')}>
            <span className="tokenomics-label">Tax</span>
            <span className="tokenomics-value">0/0</span>
          </div>
          <div className="tokenomics-box glow-on-hover" onClick={() => handleCopy('Burned Forever')}>
            <span className="tokenomics-label">LP</span>
            <span className="tokenomics-value">Burned Forever</span>
          </div>
        </div>
        <div className="tokenomics-row">
          <div className="tokenomics-box full-width glow-on-hover" onClick={() => handleCopy('HhJpBhRRn4g56VsyLuT8...')}>
            <span className="tokenomics-label">Token Address</span>
            <span className="tokenomics-value">HhJpBhRRn4g56VsyLuT8...</span>
          </div>
        </div>
      </div>
      {copySuccess && <div className="copy-notification">{copySuccess}</div>}
    </section>
  );
};

export default Tokenomics;