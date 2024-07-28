import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Roadmap.css";

gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const roadmapData = [
    {
      phase: "Phase 1",
      title: "Launch",
      description:
        "DOBS will make his first appearing on July 29th, in Pump.Fun to ensure a fair launch",
    },
    {
      phase: "Phase 2",
      title: "Expansion",
      description:
        "Regular Community Challenges: We will host a series of interactive and engaging community challenges. These events will not only reward participants with tokens and NFTs but also foster a strong sense of community and collaboration.",
    },
    {
      phase: "Phase 3",
      title: "Evolution",
      description:
        "Further Use-Cases: SMYRO aims to enhance the Solana ecosystem, providing essential utilities for evolving user needs.",
    },
    {
      phase: "Phase 4",
      title: "Integration",
      description:
        "Seamless integration of all features, creating a comprehensive ecosystem within the Solana network.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let pin;

    if (!isMobile) {
      pin = gsap.fromTo(
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
            end: () => `+=${roadmapData.length * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            snap: 1 / (roadmapData.length - 1),
            onUpdate: (self) => {
              const currentIndex = Math.round(
                self.progress * (roadmapData.length - 1)
              );
              document
                .querySelectorAll(".roadmap-card")
                .forEach((card, index) => {
                  if (index === currentIndex) {
                    card.classList.add("active");
                  } else {
                    card.classList.remove("active");
                  }
                });
            },
          },
        }
      );
    }

    return () => {
      if (pin) {
        pin.kill();
      }
    };
  }, [roadmapData.length, isMobile]);

  return (
    <section
      className={`roadmap-section ${isMobile ? "mobile" : ""}`}
      ref={triggerRef}
    >
      <h2 className="roadmap-title">DOBSMAP</h2>
      <div
        className={`roadmap-container ${isMobile ? "mobile" : ""}`}
        ref={sectionRef}
      >
        <div className="roadmap-cards">
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className={`roadmap-card ${
                index === roadmapData.length - 1 ? "last-card" : ""
              }`}
            >
              <div className="roadmap-card-content">
                <h3>
                  {item.phase}: {item.title}
                </h3>
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
