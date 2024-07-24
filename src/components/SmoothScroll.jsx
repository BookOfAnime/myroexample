import React, { useEffect, useState, useRef } from 'react';

const SmoothScroll = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = document.querySelectorAll('.hero, .about, .buy, .features');
    sectionsRef.current = sections;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(Array.from(sections).indexOf(entry.target));
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;
      setIsScrolling(true);

      let nextSection = currentSection;
      if (e.deltaY > 0 && currentSection < sectionsRef.current.length - 1) {
        nextSection = currentSection + 1;
      } else if (e.deltaY < 0 && currentSection > 0) {
        nextSection = currentSection - 1;
      }

      sectionsRef.current[nextSection].scrollIntoView({ behavior: 'smooth' });

      const handleScrollEnd = () => {
        setIsScrolling(false);
        window.removeEventListener('scroll', handleScrollEnd);
      };

      window.addEventListener('scroll', handleScrollEnd);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, isScrolling]);

  return <div className="smooth-scroll">{children}</div>;
};

export default SmoothScroll;
