import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Roadmap.css';

gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const roadmapData = [
    {
      phase: "Phase 1",
      title: "Launch",
      description: "Dobs is just the beginning. We have a lineup of innovative and fun memecoins that will capture the imagination of the crypto community. Each project will bring its unique twist, humor, and utility, contributing to a diverse and entertaining ecosystem.\NFT Collections: We are preparing to launch exclusive NFT collections that celebrate the spirit of Dobs and his adventures. These NFTs will offer unique art, special utilities, and will be key to unlocking various features and benefits within the ecosystem."
    },
    {
      phase: "Phase 2",
      title: "Expansion",
      description: "Regular Community Challenges: We will host a series of interactive and engaging community challenges. These events will not only reward participants with tokens and NFTs but also foster a strong sense of community and collaboration."
    },
    {
      phase: "Phase 3",
      title: "Evolution",
      description: "Further Use-Cases: SMYRO aims to enhance the Solana ecosystem, providing essential utilities for evolving user needs."
    },
    {
      phase: "Phase 4",
      title: "Integration",
      description: "Seamless integration of all features, creating a comprehensive ecosystem within the Solana network."
    }
  ];

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        xPercent: 0,
      },
      {
        xPercent: -100 * (roadmapData.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${roadmapData.length * 150}vw`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          snap: 1 / (roadmapData.length - 1),
          onUpdate: (self) => {
            const currentIndex = Math.round(self.progress * (roadmapData.length - 1));
            document.querySelectorAll('.roadmap-card').forEach((card, index) => {
              if (index === currentIndex) {
                card.classList.add('active');
              } else {
                card.classList.remove('active');
              }
            });
          }
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, [roadmapData.length]);

  return (
    <section className="roadmap-section" ref={triggerRef}>
      <div className="roadmap-container" ref={sectionRef}>
        <h2 className="roadmap-title">DOBSMAP</h2>
        <div className="roadmap-cards">
          {roadmapData.map((item, index) => (
            <div key={index} className={`roadmap-card ${index === roadmapData.length - 1 ? 'last-card' : ''}`}>
              <div className="roadmap-card-content">
                <h3>{item.phase}: {item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

// <span className="compass-icon">🧭</span><
