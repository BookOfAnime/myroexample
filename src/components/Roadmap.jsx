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
      description: "Myro Buy Bot: Solana's first public BuyBot on Telegram. Promotes cross-pollination and offers free exposure through 'MYRO Trending'."
    },
    {
      phase: "Phase 2",
      title: "Expansion",
      description: "Social-Fi mobile app: A social media app based on Solana Mobile that allows selling posted images and media as cNFTs."
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
          scrub: 1.5, // Slowed down the scroll speed
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
        <h2 className="roadmap-title">Our Journey <span className="compass-icon">🧭</span></h2>
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
