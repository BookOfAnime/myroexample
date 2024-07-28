import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(answerRef.current, { height: 'auto', duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(answerRef.current, { height: 0, duration: 0.3, ease: 'power2.out' });
    }
  }, [isOpen]);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="question-text">{question}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>
      <div className="faq-answer" ref={answerRef}>
        <div className="answer-content">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    { question: "WHAT BLOCKCHAIN IS $MAD ON?", answer: "Answer here..." },
    { question: "WHAT'S THE TOKEN CONTRACT ADDRESS?", answer: "Answer here..." },
    { question: "ON WHICH EXCHANGES WILL BE MAD LISTED?", answer: "Answer here..." },
    { question: "WHAT'S THE VISION OF MAD?", answer: "Answer here..." },
    { question: "WHAT'S THE MAD VIP LIST?", answer: "Answer here..." },
    { question: "WHAT'S THE MAD PROMOTERS CLUB?", answer: "Answer here..." },
    { question: "WHAT ARE THE COMMUNITY QUESTS?", answer: "Answer here..." },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const list = listRef.current;
    const image = imageRef.current;

    gsap.set([title, list, image], { autoAlpha: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(title, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(list, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .to(image, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="faq-overlay"></div>
      <div className="faq-content">
        <h2 className="faq-title" ref={titleRef}>Frequently Asked Questions</h2>
        <div className="faq-list" ref={listRef}>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} index={index} />
          ))}
        </div>
        <img src="/turn.png" alt="Character" className="faq-image" ref={imageRef} />
      </div>
    </section>
  );
};

export default FAQ;