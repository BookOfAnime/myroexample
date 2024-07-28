import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    gsap.fromTo(title, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: section, start: "top 80%" } }
    );

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: index * 0.2,
          scrollTrigger: { trigger: card, start: "top 90%" }
        }
      );
    });
  }, []);

  return (
    <section className="features" ref={sectionRef}>
      <h2 className="features-title" ref={titleRef}>Our Vision <span className="features-icon">🚀</span></h2>
      <div className="features-grid">
        {[
          { icon: '🎨', title: 'Innovative Memecoins', description: 'Dobs is just the beginning. We have a lineup of innovative and fun memecoins that will capture the imagination of the crypto community, each with its unique twist and utility.' },
          { icon: '🖼️', title: 'NFT Collections', description: 'Exclusive NFT collections celebrating Dobs and his adventures, offering unique art, special utilities, and key features within our ecosystem.' },
          { icon: '🏆', title: 'Community Challenges', description: 'Regular interactive events rewarding participants with tokens and NFTs, fostering a strong sense of community and collaboration.' },
          { icon: '🎉', title: 'Virtual Meetups', description: 'Exciting virtual events featuring live entertainment, exclusive giveaways, and interactive games to bring our community together.' },
          { icon: '📈', title: 'Continuous Development', description: 'Ongoing enhancement of $DOBS utility, including staking rewards, governance participation, and exclusive access to new features.' },
          { icon: '🤝', title: 'Community First', description: 'All developer profits reinvested to benefit the community, ensuring sustainable growth and exciting developments in our ecosystem.' }
        ].map((feature, index) => (
          <div className="feature-card" key={index} ref={el => cardsRef.current[index] = el}>
            <div className="feature-icon-wrapper">
              <div className="feature-icon">{feature.icon}</div>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;