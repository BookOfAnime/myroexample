import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTelegram, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import './JoinMADMovement.css';

gsap.registerPlugin(ScrollTrigger);

const JoinMADMovement = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialRef = useRef(null);

  const socialLinks = [
    { name: 'Telegram', icon: FaTelegram, url: 'https://t.me/MADmovementchannel' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/madmovementofficial/' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/MADMovement_' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://www.tiktok.com/@madmovementofficial' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const socialButtons = socialRef.current.children;

    gsap.set([title, description, socialButtons], { autoAlpha: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(title, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(description, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
      .to(socialButtons, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.5");

    // Particle effect
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      container.appendChild(particle);
      particles.push(particle);

      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
      });

      animateParticle(particle);
    }

    function animateParticle(particle) {
      gsap.to(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 10 + 5,
        ease: "none",
        onComplete: () => animateParticle(particle)
      });
    }

    return () => {
      if (tl) tl.kill();
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div className="join-mad-movement" ref={containerRef}>
      <div className="background-overlay"></div>
      <div className="mad-content">
        <h1 ref={titleRef} className="mad-title">Join the $DOBS<br/>MAD Meme Club</h1>
        <p ref={descriptionRef} className="mad-description">Let's have fun while making BANK! Follow us for updates so juicy, you might get a buzz!</p>
        <div ref={socialRef} className="mad-social-buttons">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mad-social-button"
            >
              <social.icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinMADMovement;